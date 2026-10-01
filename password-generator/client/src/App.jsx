import { useEffect, useMemo, useState } from 'react'
import { generatePassword, getStrength } from './password.js'

const defaultPreferences = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
}

const characterOptions = [
  { key: 'uppercase', label: 'Uppercase', detail: 'A–Z', sample: 'Aa' },
  { key: 'lowercase', label: 'Lowercase', detail: 'a–z', sample: 'ab' },
  { key: 'numbers', label: 'Numbers', detail: '0–9', sample: '09' },
  { key: 'symbols', label: 'Symbols', detail: '!@#', sample: '#$' },
]

function getClientId() {
  const existingId = window.localStorage.getItem('keycraft-client-id')
  if (existingId) return existingId

  const newId = window.crypto.randomUUID()
  window.localStorage.setItem('keycraft-client-id', newId)
  return newId
}

function App() {
  const [name, setName] = useState('')
  const [preferences, setPreferences] = useState(defaultPreferences)
  const [passwords, setPasswords] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [notice, setNotice] = useState('')
  const [apiStatus, setApiStatus] = useState('loading')
  const strength = useMemo(
    () => getStrength(preferences.length, preferences, name),
    [preferences, name],
  )

  useEffect(() => {
    let cancelled = false
    const clientId = getClientId()

    fetch(`/api/preferences/${clientId}`)
      .then(async (response) => {
        if (!response.ok) throw new Error('Could not load preferences.')
        return response.json()
      })
      .then((saved) => {
        if (cancelled) return
        setPreferences({ ...defaultPreferences, ...saved })
        setApiStatus('connected')
      })
      .catch(() => {
        if (!cancelled) setApiStatus('offline')
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (apiStatus !== 'connected') return
    const timer = window.setTimeout(() => {
      fetch(`/api/preferences/${getClientId()}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      }).catch(() => setApiStatus('offline'))
    }, 300)

    return () => window.clearTimeout(timer)
  }, [preferences, apiStatus])

  function updatePreference(key, value) {
    setPreferences((current) => ({ ...current, [key]: value }))
  }

  function createPasswords() {
    if (!name.trim()) {
      setNotice('Add a name or word to get started.')
      setPasswords([])
      return
    }

    try {
      setPasswords(Array.from({ length: 4 }, () => generatePassword(name.trim(), preferences.length, preferences)))
      setNotice('')
      setCopiedIndex(null)
    } catch (error) {
      setPasswords([])
      setNotice(error.message)
    }
  }

  async function copyPassword(password, index) {
    try {
      await navigator.clipboard.writeText(password)
      setCopiedIndex(index)
      window.setTimeout(() => setCopiedIndex(null), 1800)
    } catch {
      setNotice('Clipboard access is unavailable in this browser.')
    }
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Keycraft home">
          <span className="brand-mark" aria-hidden="true">K</span>
          <span>keycraft<span className="brand-period">.</span></span>
        </a>
        <div className="privacy-status">
          <span className="status-dot" />
          <span>{apiStatus === 'connected' ? 'Your settings are saved' : 'Passwords stay on this device'}</span>
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow"><span className="eyebrow-line" /> YOUR WORD, MADE STRONGER</div>
        <h1>A password that<br />starts with <span>you.</span></h1>
        <p className="hero-copy">Turn a name or memorable word into something much harder to guess. Personal enough to remember, random enough to protect you.</p>
      </section>

      <section className="generator-card" aria-label="Password generator">
        <div className="card-heading">
          <div>
            <span className="step-label">01 <span>— YOUR STARTING POINT</span></span>
            <h2>What should we build around?</h2>
          </div>
          <span className="lock-badge"><span aria-hidden="true">⌑</span> PRIVATE BY DESIGN</span>
        </div>

        <label className="field-label" htmlFor="starting-word">Name, word, or phrase</label>
        <div className="name-input-wrap">
          <span className="input-sparkle" aria-hidden="true">✳</span>
          <input
            id="starting-word"
            type="text"
            maxLength={48}
            autoComplete="off"
            placeholder="e.g. Sahil"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') createPasswords()
            }}
          />
          <span className="input-hint">ONLY ON THIS DEVICE</span>
        </div>
        <p className="field-note">Your word is never sent to a server or saved.</p>

        <div className="divider" />

        <div className="settings-heading">
          <div>
            <span className="step-label">02 <span>— MAKE IT YOURS</span></span>
            <h2>Dial in the details</h2>
          </div>
          <span className="length-chip">{preferences.length} characters</span>
        </div>

        <div className="length-control">
          <div className="range-labels"><span>Length</span><span>8 <span className="range-dash">—</span> 32</span></div>
          <input
            aria-label="Password length"
            type="range"
            min="8"
            max="32"
            value={preferences.length}
            style={{ '--range-progress': `${((preferences.length - 8) / 24) * 100}%` }}
            onChange={(event) => updatePreference('length', Number(event.target.value))}
          />
        </div>

        <div className="options-grid">
          {characterOptions.map((option) => (
            <label className={`option-card ${preferences[option.key] ? 'selected' : ''}`} key={option.key}>
              <input
                type="checkbox"
                checked={preferences[option.key]}
                onChange={(event) => updatePreference(option.key, event.target.checked)}
              />
              <span className="custom-checkbox" aria-hidden="true">{preferences[option.key] ? '✓' : ''}</span>
              <span className="option-copy"><span className="option-name">{option.label}</span><span className="option-detail">{option.detail}</span></span>
              <span className="option-sample" aria-hidden="true">{option.sample}</span>
            </label>
          ))}
        </div>

        <div className="strength-row">
          <div className="strength-caption"><span className="strength-icon" aria-hidden="true">◈</span><span>Estimated strength</span></div>
          <div className="strength-meter" aria-label={`Estimated strength: ${strength.label}`}>
            <span className={strength.percent >= 25 ? 'filled' : ''} />
            <span className={strength.percent >= 52 ? 'filled' : ''} />
            <span className={strength.percent >= 78 ? 'filled' : ''} />
            <span className={strength.percent >= 100 ? 'filled' : ''} />
          </div>
          <span className={`strength-label ${strength.label.toLowerCase()}`}>{strength.label}</span>
        </div>

        {notice && <p className="notice" role="alert">{notice}</p>}
        <button className="generate-button" type="button" onClick={createPasswords}>
          <span>Generate passwords</span><span className="button-arrow" aria-hidden="true">↗</span>
        </button>
      </section>

      {passwords.length > 0 && (
        <section className="results" aria-live="polite">
          <div className="results-header">
            <div><span className="step-label">03 <span>— PICK YOUR FAVORITE</span></span><h2>Made for you.</h2></div>
            <button className="regenerate-button" type="button" onClick={createPasswords}><span aria-hidden="true">↻</span> Try again</button>
          </div>
          <div className="password-list">
            {passwords.map((password, index) => (
              <div className="password-option" key={`${password}-${index}`}>
                <span className="result-index">0{index + 1}</span>
                <code>{password}</code>
                <button type="button" aria-label={`Copy password ${index + 1}`} onClick={() => copyPassword(password, index)}>
                  {copiedIndex === index ? 'Copied ✓' : 'Copy ↗'}
                </button>
              </div>
            ))}
          </div>
          <p className="safety-note"><span aria-hidden="true">✳</span> Name-based passwords can be easier to guess. For important accounts, use a password manager to create a fully random password.</p>
        </section>
      )}

      <footer className="footer">
        <span>Made to be remembered. Built to be safer.</span>
        <span className="footer-right"><span className="footer-key" aria-hidden="true">⌑</span> Nothing sensitive ever leaves your browser.</span>
      </footer>
    </main>
  )
}

export default App
