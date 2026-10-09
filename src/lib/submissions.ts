import { supabase } from './supabase';

export type SubmissionType = 'meme' | 'roast_idea' | 'fan_message' | 'other';

export type SubmissionDraft = {
  displayName: string;
  type: SubmissionType;
  title: string;
  message: string;
  contentUrl: string;
};

export async function submitContribution(draft: SubmissionDraft): Promise<void> {
  if (!supabase) {
    throw new Error('The submission database is not configured yet.');
  }

  const includeTitle = draft.type === 'roast_idea' || draft.type === 'other';
  const includeUrl = draft.type !== 'fan_message';
  const { error } = await supabase.from('fan_submissions').insert({
    display_name: draft.displayName.trim(),
    submission_type: draft.type,
    title: includeTitle ? draft.title.trim() || null : null,
    message: draft.message.trim() || null,
    content_url: includeUrl ? draft.contentUrl.trim() || null : null,
  });

  if (error) {
    throw new Error(error.message);
  }
}
