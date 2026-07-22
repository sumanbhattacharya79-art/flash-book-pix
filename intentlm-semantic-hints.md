# intentLM semantic event suggestions

Auto-detected from your repo. Apply in the PR or follow-up commit.

| Intent label | Suggestion | File |
| --- | --- | --- |
| FIRST_CORE_ACTION | `intentLM.captureCoreAction()` after milestone | `public/intentlm/intentlm.iife.js` |

## Layer 3: declarative clicks (no JS handler change)

```html
<button data-ilm-event="UPGRADE_CTA_CLICK">Upgrade</button>
```

See `docs/server-events.md` for Stripe / Auth0 / Supabase server templates.
