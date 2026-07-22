/**
 * intentLM instrumentation manifest (generated — edit before production).
 * View ids are opaque; only token integers are sent to intentLM servers.
 * @see https://docs.intentlm.dev/instrumentation
 */
export const intentLMManifest = {
  "patterns": {
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
  "views": {
  "route.home": 101
}
} as const
