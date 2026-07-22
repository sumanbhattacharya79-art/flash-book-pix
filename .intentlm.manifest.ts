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
    "route.booking": 801,
    "route.checkout": 203,
    "route.dashboard": 805,
    "route.home": 101,
    "route.login": 801,
    "route.photographer-dashboard": 805,
    "route.signup": 801,
    "route.wildcard": 801,
    "route.post-booking.bookingId": 801
  }
} as const
