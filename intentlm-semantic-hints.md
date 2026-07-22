# intentLM semantic event suggestions

No high-value action hooks detected automatically.

Add manually where needed:
- `data-ilm-event="UPGRADE_CTA_CLICK"` on upgrade buttons
- `intentLM.capture('DATA_EXPORT_INITIATED')` in export handlers
- Server webhooks for login/payment — see docs/server-events.md
