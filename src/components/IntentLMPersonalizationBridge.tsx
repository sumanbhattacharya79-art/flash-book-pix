'use client'

import { useEffect } from 'react'
import { wireIntentLMPersonalization } from '../lib/intentlm-personalization'

/** Mount once in root layout — gates __ILM_ON_INTENT__ behind Personalization consent. */
export default function IntentLMPersonalizationBridge() {
  useEffect(() => {
    return wireIntentLMPersonalization((data) => {
      if (data.trigger_nudge) {
        // Forward to your chat agent, intentlm-actions, or in-app offer — customize below.
      }
    })
  }, [])
  return null
}
