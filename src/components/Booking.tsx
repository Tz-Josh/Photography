import {
  useState,
  type FormEvent,
} from 'react';

type SessionType = 'Portrait' | 'Event' | 'Lifestyle';

type BookingDetails = {
  name: string;
  email: string;
  phone: string;
  sessionType: SessionType | '';
  date: string;
  location: string;
  message: string;
};

type SubmissionStatus =
  | 'idle'
  | 'sending'
  | 'success'
  | 'error';

type Web3FormsResponse = {
  success: boolean;
  message?: string;
};

const initialDetails: BookingDetails = {
  name: '',
  email: '',
  phone: '',
  sessionType: '',
  date: '',
  location: '',
  message: '',
};

function getLocalToday(): string {
  const now = new Date();

  const localDate = new Date(
    now.getTime() - now.getTimezoneOffset() * 60_000
  );

  return localDate.toISOString().slice(0, 10);
}

export function Booking() {
  const [details, setDetails] =
    useState<BookingDetails>(initialDetails);

  const [status, setStatus] =
    useState<SubmissionStatus>('idle');

  const [errorMessage, setErrorMessage] = useState('');

  function updateField<K extends keyof BookingDetails>(
    field: K,
    value: BookingDetails[K]
  ) {
    setDetails((current) => ({
      ...current,
      [field]: value,
    }));

    if (status !== 'sending') {
      setStatus('idle');
      setErrorMessage('');
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (status === 'sending') return;

    const accessKey =
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus('error');
      setErrorMessage(
        'The booking form is not configured yet. Please contact the photographer directly.'
      );
      return;
    }

    if (details.date < getLocalToday()) {
      setStatus('error');
      setErrorMessage(
        'Please choose today or a future date.'
      );
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `Photography booking request: ${details.sessionType}`,
            name: details.name.trim(),
            email: details.email.trim(),
            phone: details.phone.trim(),
            session_type: details.sessionType,
            preferred_date: details.date,
            location: details.location.trim(),
            message:
              details.message.trim() ||
              'No additional details provided.',
          }),
        }
      );

      const result =
        (await response.json()) as Web3FormsResponse;

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            'Your request could not be sent.'
        );
      }

      setStatus('success');
      setDetails(initialDetails);
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
    }
  }

  return (
    <section
      className="booking-section"
      id="booking"
      aria-labelledby="booking-title"
    >
      <div className="booking-intro">
        <p className="eyebrow">Book a session</p>

        <h2 id="booking-title">
          Let’s make something memorable.
        </h2>

        <p>
          Tell me what you have in mind. Choose a
          preferred date, and I’ll get back to you to
          discuss availability and the details.
        </p>

        <div className="session-list">
          <div>
            <h3>Portrait</h3>
            <p>
              Personal, professional, or family portraits.
            </p>
          </div>

          <div>
            <h3>Event</h3>
            <p>
              Coverage for celebrations and gatherings.
            </p>
          </div>

          <div>
            <h3>Lifestyle</h3>
            <p>
              Natural photographs of everyday stories.
            </p>
          </div>
        </div>
      </div>

      <form
        className="booking-form"
        onSubmit={handleSubmit}
      >
        <h3>Request a session</h3>

        <div className="form-row">
          <label>
            Your name <span aria-hidden="true">*</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              value={details.name}
              onChange={(event) =>
                updateField('name', event.target.value)
              }
            />
          </label>

          <label>
            Email address{' '}
            <span aria-hidden="true">*</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={details.email}
              onChange={(event) =>
                updateField('email', event.target.value)
              }
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Phone number
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              value={details.phone}
              onChange={(event) =>
                updateField('phone', event.target.value)
              }
            />
          </label>

          <label>
            Session type{' '}
            <span aria-hidden="true">*</span>
            <select
              name="sessionType"
              required
              value={details.sessionType}
              onChange={(event) =>
                updateField(
                  'sessionType',
                  event.target.value as
                    | SessionType
                    | ''
                )
              }
            >
              <option value="">
                Select a session
              </option>
              <option value="Portrait">
                Portrait
              </option>
              <option value="Event">
                Event
              </option>
              <option value="Lifestyle">
                Lifestyle
              </option>
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Preferred date{' '}
            <span aria-hidden="true">*</span>
            <input
              type="date"
              name="date"
              required
              min={getLocalToday()}
              value={details.date}
              onChange={(event) =>
                updateField('date', event.target.value)
              }
            />
          </label>

          <label>
            Location{' '}
            <span aria-hidden="true">*</span>
            <input
              type="text"
              name="location"
              required
              maxLength={150}
              placeholder="City or venue"
              value={details.location}
              onChange={(event) =>
                updateField(
                  'location',
                  event.target.value
                )
              }
            />
          </label>
        </div>

        <label>
          Tell me about your session
          <textarea
            name="message"
            rows={5}
            maxLength={2000}
            placeholder="What would you like photographed?"
            value={details.message}
            onChange={(event) =>
              updateField(
                'message',
                event.target.value
              )
            }
          />
        </label>

        <button
          className="button button-primary"
          type="submit"
          disabled={status === 'sending'}
        >
          {status === 'sending'
            ? 'Sending request...'
            : 'Send booking request'}
        </button>

        <div role="status" aria-live="polite">
          {status === 'success' && (
            <p className="form-success">
              Your request was sent. The photographer
              will contact you to discuss availability.
            </p>
          )}

          {status === 'error' && (
            <p className="form-error">
              {errorMessage}
            </p>
          )}
        </div>

        <p className="form-note">
          Sending a request does not confirm the
          session. The photographer will reply to
          confirm the date and details.
        </p>
      </form>
    </section>
  );
}