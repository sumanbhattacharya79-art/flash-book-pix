/**
 * intentLM consent bridge — FrameBook cookie banner (localStorage cookie-consent).
 * Accept → analytics on; Decline → capture stays off.
 */
'use client'

export const COOKIE_CONSENT_KEY = 'cookie-consent'
export const INTENTLM_CONSENT_EVENT = 'intentlm-consent-updated'

export function ilmAnalyticsGranted(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted'
  } catch {
    return false
  }
}

/** Call after the cookie banner Accept/Decline so the SDK re-checks consent. */
export function notifyIntentLMConsentUpdated(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(INTENTLM_CONSENT_EVENT))
  const ilm = (window as { intentLM?: { refreshVisitorIdentity?: () => void } }).intentLM
  ilm?.refreshVisitorIdentity?.()
}

export function registerIntentLMConsentListeners(onAnalyticsGranted: () => void): () => void {
  function run(): void {
    if (ilmAnalyticsGranted()) onAnalyticsGranted()
  }
  window.addEventListener(INTENTLM_CONSENT_EVENT, run)
  const cm = (window as { ConsentManager?: { on?: (e: string, fn: () => void) => void } })
    .ConsentManager
  cm?.on?.('consent-updated', run)
  run()
  return () => {
    window.removeEventListener(INTENTLM_CONSENT_EVENT, run)
  }
}
