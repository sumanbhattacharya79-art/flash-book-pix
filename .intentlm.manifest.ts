/**
 * intentLM instrumentation manifest (generated — edit before production).
 * View ids are opaque; only token integers are sent to intentLM servers.
 * @see https://docs.intentlm.dev/instrumentation
 */
export const intentLMManifest = {
  "patterns": {
    "/": 101,
    "/booking*": 1536,
    "/checkout*": 203,
    "/dashboard*": 805,
    "/login*": 110,
    "/photographer-dashboard*": 805,
    "/signup*": 111
  },
  "views": {
    "route.wildcard": 801,
    "route.post-booking.bookingid": 1536
  }
} as const
