-- Additive validation tightening for existing fan_submissions installations.
-- Preflight existing rows before applying; this migration never deletes or edits rows.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.fan_submissions'::regclass
      and conname = 'fan_submissions_message_nonblank'
  ) then
    alter table public.fan_submissions
      add constraint fan_submissions_message_nonblank
      check (message is null or char_length(btrim(message)) between 1 and 2000);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.fan_submissions'::regclass
      and conname = 'fan_submissions_type_payload_match'
  ) then
    alter table public.fan_submissions
      add constraint fan_submissions_type_payload_match check (
        (submission_type = 'meme' and title is null and content_url is not null)
        or (submission_type = 'roast_idea' and title is not null and message is not null)
        or (submission_type = 'fan_message' and title is null and message is not null and content_url is null)
        or (submission_type = 'other' and title is not null and message is not null)
      );
  end if;
end;
$$;
