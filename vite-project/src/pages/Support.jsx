import { useState } from "react";
import emailjs from "@emailjs/browser";
import "../css/Support.css";
import PageTransition from "../components/PageTransition";

function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "general",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      await emailjs.send(
        "service_2g4ltra",
        "template_zd90t8d",
        {
          name: formData.name,
          email: formData.email,
          type: formData.type,
          subject: formData.subject,
          message: formData.message,
        },
        "sHT4b6wwrwEIuBTOa",
      );
      setSubmitted(true);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <PageTransition>
      <div className="support-page">
        <section className="support-form-section">
          {submitted ? (
            <div className="support-success">
              <div className="support-success-icon">✔</div>
              <h2>Message sent!</h2>
              <p>
                Thanks for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                className="support-btn-outline"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    type: "general",
                    subject: "",
                    message: "",
                  });
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="support-form" onSubmit={handleSubmit}>
              <h2>Send us a message</h2>
              <p className="support-form-sub">
                Fill in the form and our team will get back to you shortly.
              </p>

              {error && <div className="error-message">{error}</div>}

              <div className="support-form-row">
                <div className="support-field">
                  <label htmlFor="name">Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="support-field">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="support-form-row">
                <div className="support-field">
                  <label htmlFor="type">Request type</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="general">General question</option>
                    <option value="bug">Bug report</option>
                    <option value="feature">Feature request</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="support-field">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Brief summary of your request"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="support-field support-field--full">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Describe your issue or question in detail…"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="support-btn-submit"
                disabled={sending}
              >
                {sending ? "Sending..." : "Send message →"}
              </button>
            </form>
          )}
        </section>

        <footer className="support-footer">
          <p>© {new Date().getFullYear()} Movie App · Built with TMDB</p>
        </footer>
      </div>
    </PageTransition>
  );
}

export default Support;
