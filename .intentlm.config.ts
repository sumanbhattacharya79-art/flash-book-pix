/**
 * intentLM SDK configuration.
 * useRemoteConfig: load patterns/views from dashboard via same-origin proxy.
 * Proxy: /api/intentlm/sdk/instrumentation → Config API (see vercel.json).
 * Wire consentCheck to your CMP — see dashboard Setup → Compliance.
 */
export const intentLMConfig = {
  apiKey: 'ilm_live_gmn62weu9rst856vn45zqfq4nt93a33u',
  useRemoteConfig: true,
  configBaseUrl: '/api/intentlm',
  consentCheck: () =>
    typeof window !== 'undefined' &&
    localStorage.getItem('cookie-consent') === 'accepted',
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
