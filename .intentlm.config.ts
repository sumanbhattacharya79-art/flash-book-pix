import { ilmAnalyticsGranted } from './src/lib/intentlm-consent'

/**
 * intentLM SDK configuration.
 * useRemoteConfig: load patterns/views from dashboard via same-origin proxy.
 * Proxy: /api/intentlm/sdk/instrumentation → Config API (local: Vite proxy / Next rewrites; prod: vercel.json).
 * consentCheck defaults open for setup — wire CMP before production.
 */
export const intentLMConfig = {
  apiKey: 'ilm_live_bewogxwife4qq5rge26nlb79db0p2a77',
  endpoint: 'https://intentlm-dev-inference-krxe5fa7dq-uw.a.run.app/v1',
  useRemoteConfig: true,
  configBaseUrl: '/api/intentlm',
  consentCheck: () => typeof window !== 'undefined' && ilmAnalyticsGranted(),
  enableVisitorPersistence: true,
  patterns: {
  "/Booking*": 1536,
  "/Checkout*": 203,
  "/ClientDashboard*": 805,
  "/Index*": 105,
  "/Login*": 110,
  "/NotFound*": 105,
  "/PhotographerDashboard*": 805,
  "/PostBooking*": 1536,
  "/SignUp*": 111
},
  views: {
  "route.booking": 801,
  "route.checkout": 203,
  "route.dashboard": 805,
  "route.home": 101,
  "route.login": 801,
  "route.photographer-dashboard": 805,
  "route.signup": 801,
  "route.wildcard": 801,
  "route.post-booking.bookingId": 801
},
}
