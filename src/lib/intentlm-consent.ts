/**
 * intentLM consent bridge (intentlm-consent-bridge)
 * Wire consentCheck to ilmAnalyticsGranted in .intentlm.config.ts
 * Register _ilm_vid using public/intentlm/cmp-registry.json in your CMP admin.
 */
'use client'

export function ilmAnalyticsGranted(): boolean {
  return (
    (window as { ConsentManager?: { hasGranted: (c: string) => boolean } }).ConsentManager?.hasGranted(
      'analytics',
    ) ?? false
  )
}

export function registerIntentLMConsentListeners(onAnalyticsGranted: () => void): () => void {
  function run(): void {
    if (ilmAnalyticsGranted()) onAnalyticsGranted()
  }
  const cm = (window as { ConsentManager?: { on?: (e: string, fn: () => void) => void } })
    .ConsentManager
  cm?.on?.('consent-updated', run)
  run()
  return () => {
    /* CMP-specific cleanup — optional */
  }
}
