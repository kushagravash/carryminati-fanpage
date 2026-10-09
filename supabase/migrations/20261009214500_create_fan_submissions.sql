-- Additive setup for public fan submissions. No existing data or objects are dropped.
create table if not exists public.fan_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  display_name text not null,
  submission_type text not null,
  title text,
  message text,
  content_url text,
  status text not null default 'pending',
  constraint fan_submissions_display_name_length
    check (char_length(btrim(display_name)) between 1 and 60),
  constraint fan_submissions_type_valid
    check (submission_type in ('meme', 'roast_idea', 'fan_message', 'other')),
  constraint fan_submissions_title_length
    check (title is null or char_length(btrim(title)) between 1 and 120),
  constraint fan_submissions_message_length
    check (message is null or char_length(message) between 1 and 2000),
  constraint fan_submissions_message_nonblank
    check (message is null or char_length(btrim(message)) between 1 and 2000),
  constraint fan_submissions_content_url_valid
    check (content_url is null or (
      char_length(content_url) <= 2048
      and content_url ~* '^https?://[^[:space:]]+$'
    )),
  constraint fan_submissions_status_valid
    check (status in ('pending', 'reviewed', 'approved', 'rejected')),
  constraint fan_submissions_meme_requires_url
    check (submission_type <> 'meme' or content_url is not null),
  constraint fan_submissions_roast_requires_copy
    check (submission_type <> 'roast_idea' or (title is not null and message is not null)),
  constraint fan_submissions_message_requires_copy
    check (submission_type <> 'fan_message' or message is not null),
  constraint fan_submissions_other_requires_content
    check (submission_type <> 'other' or title is not null or message is not null or content_url is not null),
  constraint fan_submissions_type_payload_match check (
    (submission_type = 'meme' and title is null and content_url is not null)
    or (submission_type = 'roast_idea' and title is not null and message is not null)
    or (submission_type = 'fan_message' and title is null and message is not null and content_url is null)
    or (submission_type = 'other' and title is not null and message is not null)
  )
);

alter table public.fan_submissions enable row level security;

-- Remove any broad/default table privileges, then allow only the columns the public form needs.
revoke all on table public.fan_submissions from public, anon, authenticated;
grant insert (display_name, submission_type, title, message, content_url)
  on table public.fan_submissions to anon;

-- Inserts must remain pending; the status column itself is not granted to anon.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'fan_submissions'
      and policyname = 'fan_submissions_anon_insert_pending'
  ) then
    create policy fan_submissions_anon_insert_pending
      on public.fan_submissions
      for insert
      to anon
      with check (status = 'pending');
  end if;
end
$$;

create index if not exists fan_submissions_created_at_idx
  on public.fan_submissions (created_at desc);
create index if not exists fan_submissions_status_created_at_idx
  on public.fan_submissions (status, created_at desc);

comment on table public.fan_submissions is
  'Private fan-submission inbox. Anonymous visitors may insert pending submissions only; owners review records in the Supabase dashboard.';
