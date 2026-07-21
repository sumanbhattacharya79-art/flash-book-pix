'use client'

import { useEffect } from 'react'
import { registerIntentLMConsentListeners } from '../lib/intentlm-consent'

/** Mount once in root layout — refreshes intentLM when analytics consent is granted. */
export default function IntentLMConsentBridge() {
  useEffect(() => {
    return registerIntentLMConsentListeners(() => {
      const ilm = (window as { intentLM?: { refreshVisitorIdentity?: () => void } }).intentLM
      ilm?.refreshVisitorIdentity?.()
    })
  }, [])
  return null
}
