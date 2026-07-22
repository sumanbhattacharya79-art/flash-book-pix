/**
 * intentLM personalization gate (intentlm-personalization-gate)
 * Gate __ILM_ON_INTENT__ behind Personalization consent — not analytics alone.
 */
'use client'

export function ilmPersonalizationGranted(): boolean {
  return (
    (window as { ConsentManager?: { hasGranted: (c: string) => boolean } }).ConsentManager?.hasGranted(
      'personalization',
    ) ?? false
  )
}

export type IntentLMIntentEvent = {
  intent: string
  confidence: number
  trigger_nudge?: boolean
  suppressed?: boolean
  session_id?: string
  request_id?: string
  [key: string]: unknown
}

/** Wire intent callbacks for your agent, offers, or intentlm-actions. */
export function wireIntentLMPersonalization(
  onIntent?: (data: IntentLMIntentEvent) => void,
): () => void {
  if (typeof window === 'undefined') return () => {}

  const handler = (data: IntentLMIntentEvent): void => {
    if (!ilmPersonalizationGranted()) return
    onIntent?.(data)
  }

  ;(window as Window & { __ILM_ON_INTENT__?: (data: IntentLMIntentEvent) => void }).__ILM_ON_INTENT__ =
    handler

  return () => {
    const w = window as Window & { __ILM_ON_INTENT__?: (data: IntentLMIntentEvent) => void }
    if (w.__ILM_ON_INTENT__ === handler) delete w.__ILM_ON_INTENT__
  }
}
