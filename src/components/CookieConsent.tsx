import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  COOKIE_CONSENT_KEY,
  notifyIntentLMConsentUpdated,
} from "@/lib/intentlm-consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  const setConsent = (value: "accepted" | "declined") => {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    setVisible(false);
    notifyIntentLMConsentUpdated();
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl rounded-lg border border-border bg-card p-4 shadow-lg sm:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="hidden shrink-0 rounded-lg bg-gradient-primary p-2 sm:block">
          <Cookie className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-semibold">We value your privacy</h2>
            <button
              onClick={() => setConsent("declined")}
              aria-label="Dismiss"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            We use cookies to enhance your browsing experience, remember your
            preferences, and analyze site traffic. You can read more in our{" "}
            <Link to="/" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={() => setConsent("accepted")} className="sm:flex-1">
              Accept All
            </Button>
            <Button
              variant="outline"
              onClick={() => setConsent("declined")}
              className="sm:flex-1"
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
