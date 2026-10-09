import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, LoaderCircle, Send } from 'lucide-react';
import { setPageMeta } from '../lib/pageMeta';
import { submitContribution, type SubmissionType } from '../lib/submissions';

const contributionTypes: Array<{ id: SubmissionType; number: string; label: string; note: string }> = [
  { id: 'meme', number: '01', label: 'Meme', note: 'A link to a meme or image' },
  { id: 'roast_idea', number: '02', label: 'Roast idea', note: 'A topic, not a target' },
  { id: 'fan_message', number: '03', label: 'Fan message', note: 'A note for the archive' },
  { id: 'other', number: '04', label: 'Other', note: 'Something that does not fit' },
];

type SubmissionFields = { title: string; message: string; contentUrl: string };

const initialTypeFields: Record<SubmissionType, SubmissionFields> = {
  meme: { title: '', message: '', contentUrl: '' },
  roast_idea: { title: '', message: '', contentUrl: '' },
  fan_message: { title: '', message: '', contentUrl: '' },
  other: { title: '', message: '', contentUrl: '' },
};

const initialValues = { displayName: '', consent: false, website: '' };

function isWebUrl(value: string) {
  try {
    const url = new URL(value);
    return (url.protocol === 'http:' || url.protocol === 'https:') && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export function SubmitPage() {
  const [type, setType] = useState<SubmissionType>('meme');
  const [values, setValues] = useState(initialValues);
  const [fields, setFields] = useState<Record<SubmissionType, SubmissionFields>>(initialTypeFields);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: 'success' | 'error'; message: string } | null>(null);
  const activeFields = fields[type];

  useEffect(() => {
    setPageMeta('Fan Submit', 'Share a meme, roast idea, fan message or other contribution with the independent Carry Archive.');
  }, []);

  const update = (field: keyof typeof initialValues, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }));
    setFeedback(null);
  };

  const updateTypeField = (field: keyof SubmissionFields, value: string) => {
    setFields((current) => ({
      ...current,
      [type]: { ...current[type], [field]: value },
    }));
    setFeedback(null);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    setFeedback(null);

    const name = values.displayName.trim();
    const title = activeFields.title.trim();
    const message = activeFields.message.trim();
    const contentUrl = activeFields.contentUrl.trim();
    const allowsContentUrl = type !== 'fan_message';

    if (values.website) {
      setFeedback({ kind: 'error', message: 'This submission could not be accepted. Please leave the hidden field empty and try again.' });
      return;
    }
    if (!name) {
      setFeedback({ kind: 'error', message: 'Add a display name before submitting.' });
      return;
    }
    if ((type === 'roast_idea' || type === 'other') && !title) {
      setFeedback({ kind: 'error', message: 'Add a short subject for this contribution.' });
      return;
    }
    if (type !== 'meme' && !message) {
      setFeedback({ kind: 'error', message: 'Add a short description or message.' });
      return;
    }
    if (type === 'meme' && !contentUrl) {
      setFeedback({ kind: 'error', message: 'Add the link to your meme.' });
      return;
    }
    if (allowsContentUrl && contentUrl && !isWebUrl(contentUrl)) {
      setFeedback({ kind: 'error', message: 'Enter a complete link beginning with https:// or http://.' });
      return;
    }
    if (!values.consent) {
      setFeedback({ kind: 'error', message: 'Please confirm the community and content-use guidelines.' });
      return;
    }

    setBusy(true);
    try {
      await submitContribution({ displayName: name, type, title, message, contentUrl });
      setValues(initialValues);
      setFields(initialTypeFields);
      setFeedback({ kind: 'success', message: 'Received. Your contribution was saved to the project database and will be reviewed before any use.' });
    } catch (error) {
      console.error('Fan submission failed:', error);
      const notConfigured = error instanceof Error && error.message.includes('not configured');
      setFeedback({
        kind: 'error',
        message: notConfigured
          ? 'The submission database is not connected yet. Your text is still here; check the project setup and retry.'
          : 'The database could not confirm this submission. Your text is still here; check the link and retry in a moment.',
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="page page--submit">
      <section className="page-intro page-intro--submit">
        <div className="page-intro__index">03 <span>/</span> FAN SUBMIT</div>
        <p className="eyebrow">THE COMMUNITY DESK</p>
        <h1>PUT IT<br /><em>ON RECORD.</em></h1>
        <div className="page-intro__foot"><p>Send a link, pitch an idea or leave a message. Submissions go to the project owner’s database and are not published automatically.</p><span>NO ACCOUNT NEEDED</span></div>
      </section>

      <section className="submit-layout" aria-label="Community submission form">
        <aside className="submit-aside">
          <div className="submit-aside__number">03<span>—</span>04</div>
          <h2>A good<br /><em>contribution</em><br />knows its<br />boundaries.</h2>
          <p>Choose a lane, keep it respectful, and share only material you have permission to link. Please do not send personal information, targeted harassment, or abusive or unlawful content.</p>
          <div className="submission-note"><span className="eyebrow">PLEASE NOTE</span><p>This is an independent fan project, not an official channel inbox. A submission is not a promise of publication or a reply.</p></div>
        </aside>

        <form className="submission-form" onSubmit={submit} noValidate>
          <div className="form-step"><span>01</span><div><h2>What are you sending?</h2><p>Pick one contribution type. Its fields will adjust below.</p></div></div>
          <div className="type-selector" role="group" aria-label="Contribution type">
            {contributionTypes.map((item) => (
              <button key={item.id} className={`type-option${type === item.id ? ' is-active' : ''}`} type="button" aria-pressed={type === item.id} onClick={() => { setType(item.id); setFeedback(null); }}>
                <span className="type-option__number">{item.number}</span><strong>{item.label}</strong><small>{item.note}</small><span className="type-option__dot" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="form-step form-step--second"><span>02</span><div><h2>Give it some context.</h2><p>Keep names and descriptions within the limits shown.</p></div></div>
          <div className="form-fields">
            <label className="field"><span>Display name <b aria-hidden="true">*</b></span><input type="text" name="display_name" maxLength={60} autoComplete="nickname" required value={values.displayName} onChange={(event) => update('displayName', event.target.value)} placeholder="What should we call you?" /><small>60 characters max</small></label>

            {(type === 'roast_idea' || type === 'other') && (
              <label className="field"><span>{type === 'roast_idea' ? 'Topic or title' : 'Subject'} <b aria-hidden="true">*</b></span><input type="text" name="title" maxLength={120} required value={activeFields.title} onChange={(event) => updateTypeField('title', event.target.value)} placeholder={type === 'roast_idea' ? 'A situation, trend or idea' : 'A short subject'} /><small>{activeFields.title.length}/120</small></label>
            )}

            {type === 'meme' && (
              <label className="field"><span>Meme link <b aria-hidden="true">*</b></span><input type="url" name="content_url" maxLength={2048} required value={activeFields.contentUrl} onChange={(event) => updateTypeField('contentUrl', event.target.value)} placeholder="https://…" autoComplete="url" /><small>Link to a public page or image you have permission to share.</small></label>
            )}

            <label className="field"><span>{type === 'fan_message' ? 'Your message' : type === 'roast_idea' ? 'Idea description' : type === 'other' ? 'Description' : 'Caption or context'}{type !== 'meme' && <b aria-hidden="true"> *</b>}</span><textarea name="message" rows={type === 'fan_message' ? 6 : 4} maxLength={2000} required={type !== 'meme'} value={activeFields.message} onChange={(event) => updateTypeField('message', event.target.value)} placeholder={type === 'fan_message' ? 'Keep it kind and concise…' : 'Add the context that makes it make sense…'} /><small>{activeFields.message.length}/2,000 characters</small></label>

            {(type === 'roast_idea' || type === 'other') && (
              <label className="field"><span>Reference link <em>(optional)</em></span><input type="url" name="content_url" maxLength={2048} value={activeFields.contentUrl} onChange={(event) => updateTypeField('contentUrl', event.target.value)} placeholder="https://…" /><small>Optional. Use only a public link you have permission to share.</small></label>
            )}

            <label className="honeypot" aria-hidden="true">Leave this field blank<input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update('website', event.target.value)} /></label>

            <label className="consent-check"><input type="checkbox" checked={values.consent} onChange={(event) => update('consent', event.target.checked)} required /><span><strong>I’ve read the guidelines.</strong><small>I have the right to share any linked material, and this submission contains no private personal information, targeted harassment, abusive or unlawful content. I understand it may be reviewed before any use.</small></span></label>

            {feedback && <div className={`form-feedback form-feedback--${feedback.kind}`} role={feedback.kind === 'success' ? 'status' : 'alert'} aria-live="polite"><span className="form-feedback__icon">{feedback.kind === 'success' ? <Check size={17} /> : '!'}</span><p>{feedback.message}</p></div>}

            <button className="button button--dark submit-button" type="submit" disabled={busy}>
              {busy ? <><LoaderCircle size={16} className="spin" /> Sending…</> : <>Send contribution <Send size={16} /> </>}
            </button>
            <p className="form-privacy">No email, phone number or account is collected. Your display name and contribution are stored for review.</p>
          </div>
        </form>
      </section>
      <section className="submit-endnote"><span className="eyebrow">FOUR WAYS TO CONTRIBUTE</span><p>Meme / Roast idea / Fan message / Other</p><a href="https://linktr.ee/ajeynagar" target="_blank" rel="noreferrer noopener">Find official CarryMinati links <ArrowUpRight size={14} /></a></section>
    </main>
  );
}
