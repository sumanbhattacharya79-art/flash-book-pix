/**
 * Loads intentLM from /public/intentlm and applies auto-generated config.
 */
import { wireIntentLMRouteSync } from './intentlm-views'
import { intentLMRouteViews } from './intentlm-route-views'
export type IntentLMConfig = {
  apiKey: string
  patterns: Record<string, number>
  views?: Record<string, number>
  routeViews?: Record<string, string>
  coreActionToken?: number
  useRemoteConfig?: boolean
  configBaseUrl?: string
}

declare global {
  interface Window {
    intentLM?: {
      init: (config: IntentLMConfig) => void
      setView: (viewId: string) => void
      captureCoreAction: () => void
    }
  }
}

export function initIntentLM(config: IntentLMConfig): void {
  if (typeof window === 'undefined') return

  const run = () => {
    window.intentLM?.init(config)
    wireIntentLMRouteSync(intentLMRouteViews)
  }

  if (window.intentLM) {
    run()
    return
  }

  const base =
    typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL
      ? import.meta.env.BASE_URL
      : '/'
  const script = document.createElement('script')
  script.src = `${base.replace(/\/$/, '')}/intentlm/intentlm.iife.js`
  script.async = true
  script.onload = () => run()
  script.onerror = () =>
    console.error('[intentLM] Failed to load SDK script:', script.src)
  document.head.appendChild(script)
}
