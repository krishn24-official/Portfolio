import { useState, useRef, useEffect } from 'react'

const STARTER_QUESTIONS = [
  '🚀 Tell me about Krishna',
  '💼 Internship experience',
  '🤖 AI projects',
  '⚙️ Tech stack',
  '📄 Resume summary',
  '📬 Contact information',
]

function formatAssistantText(text) {
  if (!text) return ''

  // Split on URLs (http/https) and Email addresses
  const tokenRegex = /(https?:\/\/[^\s<>()]+|[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/g
  const parts = text.split(tokenRegex)

  return parts.map((part, index) => {
    if (!part) return null

    if (/^https?:\/\//i.test(part)) {
      let url = part
      let trailing = ''
      const match = url.match(/[.,;:!?)]+$/)
      if (match) {
        trailing = match[0]
        url = url.slice(0, -trailing.length)
      }
      return (
        <span key={index}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blueprint-accent underline hover:text-blueprint-accent/80 transition-colors break-all"
          >
            {url}
          </a>
          {trailing}
        </span>
      )
    }

    if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(part)) {
      let email = part
      let trailing = ''
      const match = email.match(/[.,;:!?]+$/)
      if (match) {
        trailing = match[0]
        email = email.slice(0, -trailing.length)
      }
      return (
        <span key={index}>
          <a
            href={`mailto:${email}`}
            className="text-blueprint-accent underline hover:text-blueprint-accent/80 transition-colors break-all"
          >
            {email}
          </a>
          {trailing}
        </span>
      )
    }

    return part
  })
}

export default function ChatWidget({ name }) {
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true)
    window.addEventListener('open-portfolio-chat', handleOpenChat)
    return () => window.removeEventListener('open-portfolio-chat', handleOpenChat)
  }, [])
  const firstName = name ? name.trim().split(/\s+/)[0] : 'me'
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const greetingAnimatedRef = useRef(false)
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm Krishna's AI Portfolio Assistant. I can answer questions about his skills, experience, projects, resume, and availability.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Direct Contact Form State
  const [isContactMode, setIsContactMode] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [contactValidationErrors, setContactValidationErrors] = useState({})
  const [contactLoading, setContactLoading] = useState(false)
  const [contactError, setContactError] = useState(null)
  const [contactSuccess, setContactSuccess] = useState(false)

  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  const hasUserMessage = messages.some((m) => m.role === 'user')

  useEffect(() => {
    if (isOpen && !isContactMode) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading, isOpen, isExpanded, isContactMode])

  useEffect(() => {
    if (isOpen && !isContactMode && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 100)
    }
  }, [isOpen, isContactMode])

  const handleTextareaChange = (e) => {
    const val = e.target.value
    if (val.length <= 300) {
      setInput(val)
      adjustTextareaHeight(e.target)
    }
  }

  const adjustTextareaHeight = (element) => {
    if (!element) return
    element.style.height = 'auto'
    element.style.height = `${Math.min(element.scrollHeight, 96)}px`
  }

  const sendMessage = async (textToSend) => {
    const trimmed = (typeof textToSend === 'string' ? textToSend : input).trim()
    if (!trimmed || loading) return

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setError(null)
    setLoading(true)

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    const apiUrl = import.meta.env.VITE_CHAT_API_URL || 'http://127.0.0.1:8000'

    try {
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmed }),
      })

      if (response.status === 429) {
        setError('Getting a lot of questions, try again in a minute.')
        return
      }

      if (!response.ok) {
        setError('Something went wrong. Please try again.')
        return
      }

      const data = await response.json()
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.answer,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError('Could not reach the chat server. Please make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Contact Form Validation & Submission
  const validateContact = () => {
    const errors = {}
    if (!contactForm.name.trim()) {
      errors.name = 'Name is required'
    } else if (contactForm.name.length > 100) {
      errors.name = 'Name must be 100 characters or less'
    }

    const emailTrimmed = contactForm.email.trim()
    if (!emailTrimmed) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!contactForm.message.trim()) {
      errors.message = 'Message is required'
    } else if (contactForm.message.length > 1000) {
      errors.message = 'Message must be 1000 characters or less'
    }

    setContactValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleContactSubmit = async (e) => {
    if (e) e.preventDefault()
    if (!validateContact() || contactLoading) return

    setContactLoading(true)
    setContactError(null)

    const apiUrl = import.meta.env.VITE_CHAT_API_URL || 'http://127.0.0.1:8000'

    try {
      const res = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactForm.name.trim(),
          email: contactForm.email.trim(),
          message: contactForm.message.trim(),
        }),
      })

      if (res.status === 429) {
        setContactError("Couldn't send that — try again in a bit.")
        return
      }

      if (!res.ok) {
        setContactError('Something went wrong. Please try again.')
        return
      }

      setContactSuccess(true)
    } catch (err) {
      setContactError("Couldn't reach server. Please try again.")
    } finally {
      setContactLoading(false)
    }
  }

  // Detect whether this assistant response is answering how to contact
  const isContactResponse = (m, idx, all) => {
    if (m.role !== 'assistant') return false
    const lower = m.content.toLowerCase()
    if (lower.includes('krishtandel24@gmail.com') || (lower.includes('reach') && lower.includes('email'))) {
      return true
    }
    if (idx > 0 && all[idx - 1].role === 'user') {
      const prevText = all[idx - 1].content.toLowerCase()
      if (prevText.includes('contact') || prevText.includes('reach') || prevText.includes('email') || prevText.includes('message')) {
        return true
      }
    }
    return false
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat assistant' : `Ask about ${name || 'portfolio'}`}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blueprint-accent text-blueprint-bgDeep shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-blueprint-accent/90 hover:shadow-[0_0_22px_rgba(94,168,255,0.45)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-accent focus-visible:ring-offset-2 focus-visible:ring-offset-blueprint-bg"
      >
        {isOpen ? (
          <svg
            className="h-6 w-6 stroke-current"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            className="h-6 w-6 fill-none stroke-current"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={`Chat about ${name}`}
          className={`fixed bottom-24 right-4 z-50 flex flex-col overflow-hidden rounded-lg border border-blueprint-line/15 bg-blueprint-bgDeep font-body shadow-2xl animate-chat-open sm:right-6 ${
            isExpanded
              ? 'h-[calc(100vh-7.5rem)] max-h-[750px] w-[calc(100vw-2rem)] sm:w-[32rem] md:w-[38rem] lg:w-[44rem]'
              : 'h-[28rem] w-[calc(100vw-2rem)] max-w-[22rem] sm:w-[22rem]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-blueprint-line/10 bg-blueprint-bg px-4 py-3">
            <div className="flex flex-col">
              <span className="font-display text-sm font-semibold tracking-wide text-blueprint-line">
                Ask about {name || 'Portfolio'}
              </span>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-blueprint-slate">
                <span className="h-1.5 w-1.5 rounded-full bg-blueprint-accent" />
                <span>Powered by RAG over Krishna's portfolio data.</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* Expand / Restore Size Button */}
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-label={isExpanded ? 'Restore size' : 'Expand size'}
                title={isExpanded ? 'Restore size' : 'Expand size'}
                className="rounded p-1 text-blueprint-slate transition-colors hover:bg-blueprint-bgDeep hover:text-blueprint-line"
              >
                {isExpanded ? (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="4 14 10 14 10 20" />
                    <polyline points="20 10 14 10 14 4" />
                    <line x1="14" y1="10" x2="21" y2="3" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                )}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Minimize chat"
                className="rounded p-1 text-blueprint-slate transition-colors hover:bg-blueprint-bgDeep hover:text-blueprint-line"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Conditional Content: Dedicated Contact View vs Normal Chat View */}
          {isContactMode ? (
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Contact Subheader */}
              <div className="flex items-center justify-between border-b border-blueprint-line/10 bg-blueprint-bg/60 px-4 py-2">
                <span className="font-mono text-xs text-blueprint-line font-medium">
                  Send message to {firstName}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsContactMode(false)
                    setContactError(null)
                    setContactValidationErrors({})
                  }}
                  className="font-mono text-xs text-blueprint-accent hover:underline flex items-center gap-1"
                >
                  &larr; Back to chat
                </button>
              </div>

              {contactSuccess ? (
                /* Success Confirmation View */
                <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-blueprint-accent bg-blueprint-accent/10 text-blueprint-accent">
                    <svg
                      className="h-6 w-6 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h4 className="font-display text-base font-semibold text-blueprint-line mb-1">
                    Message Sent
                  </h4>
                  <p className="font-body text-sm text-blueprint-slate mb-6">
                    Thanks — {firstName} will get back to you.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsContactMode(false)
                      setContactSuccess(false)
                      setContactForm({ name: '', email: '', message: '' })
                    }}
                    className="rounded bg-blueprint-accent px-4 py-2 font-mono text-xs font-semibold text-blueprint-bgDeep transition-colors hover:bg-blueprint-accent/90"
                  >
                    Return to chat
                  </button>
                </div>
              ) : (
                /* Full Contact Form View */
                <form
                  onSubmit={handleContactSubmit}
                  className="flex flex-1 flex-col justify-between overflow-y-auto p-4 space-y-3"
                >
                  <div className="space-y-3">
                    {contactError && (
                      <div className="rounded border border-blueprint-amber/30 bg-blueprint-amber/10 px-3 py-2 font-mono text-xs text-blueprint-amber">
                        {contactError}
                      </div>
                    )}

                    {/* Name field */}
                    <div>
                      <label className="block font-mono text-xs text-blueprint-slate mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        maxLength={100}
                        value={contactForm.name}
                        disabled={contactLoading}
                        onChange={(e) => {
                          setContactForm({ ...contactForm, name: e.target.value })
                          if (contactValidationErrors.name) {
                            setContactValidationErrors({ ...contactValidationErrors, name: null })
                          }
                        }}
                        placeholder="John Doe"
                        className="w-full rounded border border-blueprint-line/20 bg-blueprint-bg px-3 py-2 text-sm text-blueprint-line placeholder-blueprint-slate/60 focus:border-blueprint-accent focus:outline-none disabled:opacity-50"
                      />
                      {contactValidationErrors.name && (
                        <p className="mt-1 font-mono text-[11px] text-blueprint-amber">
                          {contactValidationErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email field */}
                    <div>
                      <label className="block font-mono text-xs text-blueprint-slate mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        value={contactForm.email}
                        disabled={contactLoading}
                        onChange={(e) => {
                          setContactForm({ ...contactForm, email: e.target.value })
                          if (contactValidationErrors.email) {
                            setContactValidationErrors({ ...contactValidationErrors, email: null })
                          }
                        }}
                        placeholder="you@example.com"
                        className="w-full rounded border border-blueprint-line/20 bg-blueprint-bg px-3 py-2 text-sm text-blueprint-line placeholder-blueprint-slate/60 focus:border-blueprint-accent focus:outline-none disabled:opacity-50"
                      />
                      {contactValidationErrors.email && (
                        <p className="mt-1 font-mono text-[11px] text-blueprint-amber">
                          {contactValidationErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Message field */}
                    <div>
                      <div className="flex items-center justify-between mb-1 font-mono text-xs text-blueprint-slate">
                        <span>Message *</span>
                        <span>{contactForm.message.length}/1000</span>
                      </div>
                      <textarea
                        rows={3}
                        maxLength={1000}
                        value={contactForm.message}
                        disabled={contactLoading}
                        onChange={(e) => {
                          setContactForm({ ...contactForm, message: e.target.value })
                          if (contactValidationErrors.message) {
                            setContactValidationErrors({ ...contactValidationErrors, message: null })
                          }
                        }}
                        placeholder="Write your note to Krishna..."
                        className="w-full resize-none rounded border border-blueprint-line/20 bg-blueprint-bg px-3 py-2 text-sm text-blueprint-line placeholder-blueprint-slate/60 focus:border-blueprint-accent focus:outline-none disabled:opacity-50"
                      />
                      {contactValidationErrors.message && (
                        <p className="mt-1 font-mono text-[11px] text-blueprint-amber">
                          {contactValidationErrors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-blueprint-line/10">
                    <button
                      type="button"
                      disabled={contactLoading}
                      onClick={() => {
                        setIsContactMode(false)
                        setContactError(null)
                        setContactValidationErrors({})
                      }}
                      className="rounded px-3 py-2 font-mono text-xs text-blueprint-slate hover:text-blueprint-line transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={contactLoading}
                      className="flex items-center gap-1.5 rounded bg-blueprint-accent px-4 py-2 font-mono text-xs font-semibold text-blueprint-bgDeep transition-all hover:bg-blueprint-accent/90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {contactLoading ? (
                        <>
                          <span className="h-3 w-3 animate-spin rounded-full border-2 border-blueprint-bgDeep border-t-transparent" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <span>Send Email</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Normal Chat View */
            <>
              {/* Messages list */}
              <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
                {messages.map((m, idx) => {
                  const isContact = isContactResponse(m, idx, messages)
                  let messageAnimationClass = 'animate-message-in'
                  if (m.id === 'welcome') {
                    if (!greetingAnimatedRef.current) {
                      messageAnimationClass = 'animate-message-in'
                      greetingAnimatedRef.current = true
                    } else {
                      messageAnimationClass = ''
                    }
                  }

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} ${messageAnimationClass}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-3.5 py-2.5 leading-relaxed break-words whitespace-pre-wrap ${
                          m.role === 'user'
                            ? 'rounded-tr-sm bg-blueprint-accent font-medium text-blueprint-bgDeep'
                            : 'rounded-tl-sm border border-blueprint-line/15 bg-blueprint-bg text-blueprint-line'
                        }`}
                      >
                        {m.role === 'user' ? m.content : formatAssistantText(m.content)}

                        {/* Inline Contact Form directly attached to 'How to contact' answers */}
                        {isContact && (
                          <div className="mt-3 border-t border-blueprint-line/15 pt-3">
                            {contactSuccess ? (
                              <div className="rounded border border-blueprint-accent/30 bg-blueprint-accent/10 p-2.5 font-mono text-xs text-blueprint-accent flex items-center gap-2">
                                <svg
                                  className="h-4 w-4 shrink-0 stroke-current"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Message sent! Krishna will get back to you.</span>
                              </div>
                            ) : (
                              <div>
                                <p className="mb-2 font-mono text-xs font-semibold text-blueprint-accent flex items-center gap-1.5">
                                  <svg
                                    className="h-3.5 w-3.5 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                  </svg>
                                  Send {firstName} a direct message:
                                </p>

                                <form onSubmit={handleContactSubmit} className="space-y-2">
                                  {contactError && (
                                    <div className="rounded border border-blueprint-amber/30 bg-blueprint-amber/10 px-2.5 py-1.5 font-mono text-[11px] text-blueprint-amber">
                                      {contactError}
                                    </div>
                                  )}

                                  <div>
                                    <input
                                      type="text"
                                      maxLength={100}
                                      value={contactForm.name}
                                      disabled={contactLoading}
                                      onChange={(e) => {
                                        setContactForm({ ...contactForm, name: e.target.value })
                                        if (contactValidationErrors.name) {
                                          setContactValidationErrors({
                                            ...contactValidationErrors,
                                            name: null,
                                          })
                                        }
                                      }}
                                      placeholder="Your Name *"
                                      className="w-full rounded border border-blueprint-line/20 bg-blueprint-bgDeep px-2.5 py-1.5 text-xs text-blueprint-line placeholder-blueprint-slate/60 focus:border-blueprint-accent focus:outline-none disabled:opacity-50"
                                    />
                                    {contactValidationErrors.name && (
                                      <p className="mt-0.5 font-mono text-[10px] text-blueprint-amber">
                                        {contactValidationErrors.name}
                                      </p>
                                    )}
                                  </div>

                                  <div>
                                    <input
                                      type="email"
                                      value={contactForm.email}
                                      disabled={contactLoading}
                                      onChange={(e) => {
                                        setContactForm({ ...contactForm, email: e.target.value })
                                        if (contactValidationErrors.email) {
                                          setContactValidationErrors({
                                            ...contactValidationErrors,
                                            email: null,
                                          })
                                        }
                                      }}
                                      placeholder="Your Email *"
                                      className="w-full rounded border border-blueprint-line/20 bg-blueprint-bgDeep px-2.5 py-1.5 text-xs text-blueprint-line placeholder-blueprint-slate/60 focus:border-blueprint-accent focus:outline-none disabled:opacity-50"
                                    />
                                    {contactValidationErrors.email && (
                                      <p className="mt-0.5 font-mono text-[10px] text-blueprint-amber">
                                        {contactValidationErrors.email}
                                      </p>
                                    )}
                                  </div>

                                  <div>
                                    <div className="flex items-center justify-between mb-0.5 font-mono text-[10px] text-blueprint-slate">
                                      <span>Message *</span>
                                      <span>{contactForm.message.length}/1000</span>
                                    </div>
                                    <textarea
                                      rows={2}
                                      maxLength={1000}
                                      value={contactForm.message}
                                      disabled={contactLoading}
                                      onChange={(e) => {
                                        setContactForm({ ...contactForm, message: e.target.value })
                                        if (contactValidationErrors.message) {
                                          setContactValidationErrors({
                                            ...contactValidationErrors,
                                            message: null,
                                          })
                                        }
                                      }}
                                      placeholder="Type your message..."
                                      className="w-full resize-none rounded border border-blueprint-line/20 bg-blueprint-bgDeep px-2.5 py-1.5 text-xs text-blueprint-line placeholder-blueprint-slate/60 focus:border-blueprint-accent focus:outline-none disabled:opacity-50"
                                    />
                                    {contactValidationErrors.message && (
                                      <p className="mt-0.5 font-mono text-[10px] text-blueprint-amber">
                                        {contactValidationErrors.message}
                                      </p>
                                    )}
                                  </div>

                                  <div className="flex justify-end pt-1">
                                    <button
                                      type="submit"
                                      disabled={contactLoading}
                                      className="flex items-center gap-1.5 rounded bg-blueprint-accent px-3 py-1.5 font-mono text-xs font-semibold text-blueprint-bgDeep transition-all hover:bg-blueprint-accent/90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {contactLoading ? (
                                        <>
                                          <span className="h-3 w-3 animate-spin rounded-full border-2 border-blueprint-bgDeep border-t-transparent" />
                                          <span>Sending...</span>
                                        </>
                                      ) : (
                                        <span>Send Message &rarr;</span>
                                      )}
                                    </button>
                                  </div>
                                </form>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}

                {/* Starter Questions (shown only before user's first message) */}
                {!hasUserMessage && (
                  <div className="pt-2">
                    <p className="mb-2 font-mono text-[11px] text-blueprint-slate">
                      Suggested questions:
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {STARTER_QUESTIONS.map((question) => (
                        <button
                          key={question}
                          type="button"
                          disabled={loading}
                          onClick={() => sendMessage(question)}
                          className="group flex items-center justify-between rounded border border-blueprint-accent/30 bg-blueprint-accent/5 px-3 py-2 text-left font-mono text-xs text-blueprint-accent transition-all duration-200 hover:border-blueprint-accent hover:bg-blueprint-accent/15 disabled:opacity-50"
                        >
                          <span>{question}</span>
                          <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setIsContactMode(true)
                          setContactSuccess(false)
                          setContactError(null)
                        }}
                        className="rounded border border-blueprint-line/20 bg-blueprint-bg/80 px-3 py-2 text-left font-mono text-xs text-blueprint-slate transition-colors hover:border-blueprint-accent hover:text-blueprint-accent"
                      >
                        ✉ Send {firstName} a direct message &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {/* Loading Indicator (Three-dot bounce) */}
                {loading && (
                  <div className="flex items-start">
                    <div className="flex items-center gap-1.5 rounded-lg rounded-tl-sm border border-blueprint-line/15 bg-blueprint-bg px-4 py-3">
                      <span
                        className="h-2 w-2 rounded-full bg-blueprint-accent animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      />
                      <span
                        className="h-2 w-2 rounded-full bg-blueprint-accent animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      />
                      <span
                        className="h-2 w-2 rounded-full bg-blueprint-accent animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Inline Error */}
              {error && (
                <div className="flex items-center justify-between border-t border-blueprint-amber/20 bg-blueprint-amber/10 px-3 py-2 font-mono text-xs text-blueprint-amber">
                  <span>{error}</span>
                  <button
                    type="button"
                    onClick={() => setError(null)}
                    className="ml-2 font-mono text-[11px] text-blueprint-amber hover:underline"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Input Form */}
              <div className="border-t border-blueprint-line/15 bg-blueprint-bg p-3">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    maxLength={300}
                    placeholder="Ask a question... (Enter to send)"
                    disabled={loading}
                    className="max-h-24 min-h-[40px] flex-1 resize-none rounded border border-blueprint-line/20 bg-blueprint-bgDeep px-3 py-2 text-sm text-blueprint-line placeholder-blueprint-slate transition-colors focus:border-blueprint-accent focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => sendMessage()}
                    disabled={loading || !input.trim()}
                    aria-label="Send message"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-blueprint-accent text-blueprint-bgDeep transition-all hover:bg-blueprint-accent/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <svg
                      className="h-4 w-4 fill-none stroke-current"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-blueprint-line/10 pt-2 font-mono text-[10px] text-blueprint-slate">
                  <button
                    type="button"
                    onClick={() => {
                      setIsContactMode(true)
                      setContactSuccess(false)
                      setContactError(null)
                    }}
                    className="text-blueprint-accent hover:underline flex items-center gap-1 transition-colors"
                  >
                    <span>Need to reach out directly?</span>
                    <span className="font-semibold">Send {firstName} a message &rarr;</span>
                  </button>
                  <span>{input.length}/300</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
