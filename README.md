# @langr/sdk

[![npm version](https://img.shields.io/npm/v/@langr/sdk.svg)](https://www.npmjs.com/package/@langr/sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official TypeScript SDK for the [LANGR API](https://api.langr.org) — one API for email, SMS, auth, payments, SEO, content, and i18n.

## Features

- **Mail API** — Send transactional email via Resend. 8 verified domains. Inbox reading.
- **SMS API** — Send SMS messages and OTP codes. Europe-optimized delivery.
- **Auth API** — OTP (email + SMS), magic links, Google OAuth, session management.
- **Payment API** — Stripe checkout, billing portal, webhook event tracking.
- **SEO API** — Domain audits, keyword tracking, rankings, backlinks, Lighthouse scans.
- **Content API** — AI content generation via Claude (blog posts, SEO copy, product descriptions).
- **i18n API** — Translate text or JSON to 120+ locales. 9 RTL languages. Batch up to 50 locales.
- **Zero dependencies** — Pure TypeScript, no runtime dependencies.
- **Full type safety** — Complete TypeScript types for all requests and responses.

## Install

```bash
npm install @langr/sdk
```

## Quick Start

```typescript
import { LangrClient } from "@langr/sdk";

const langr = new LangrClient({ apiKey: "lk_live_..." });

// Send an email
await langr.mail.send({
  from: "hello@yourdomain.com",
  to: "user@example.com",
  subject: "Welcome",
  html: "<h1>Hello!</h1>",
});

// Send SMS OTP and verify
await langr.sms.sendOtp({ to: "+4512345678" });
await langr.sms.verifyOtp({ to: "+4512345678", code: "123456" });

// Authenticate with magic link
await langr.auth.magicLink({
  email: "user@example.com",
  redirect_url: "https://example.com/auth/callback",
});

// Create a payment checkout
const checkout = await langr.payment.checkout({
  success_url: "https://example.com/success",
  cancel_url: "https://example.com/cancel",
  lookup_key: "pro_monthly",
});

// Generate AI content
const content = await langr.content.generate({
  type: "blog_post",
  prompt: "Write about modern web development",
  locale: "en",
});

// Translate to multiple languages
const result = await langr.i18n.translate({
  text: "Hello, world!",
  target_locales: ["da", "de", "ar", "ja"],
});

// SEO audit
await langr.seo.audit({ domain: "example.com" });
```

## Services

| Service | Methods |
|---------|---------|
| `mail` | `send`, `inbox`, `message`, `domains` |
| `sms` | `send`, `sendOtp`, `verifyOtp`, `stats` |
| `auth` | `sendOtp`, `verifyOtp`, `magicLink`, `magicLinkVerify`, `googleAuthorize`, `googleCallback`, `validateSession`, `listSessions`, `revokeSession`, `revokeAllSessions` |
| `payment` | `checkout`, `portal`, `events` |
| `seo` | `audit`, `getAudit`, `projects`, `keywords`, `rankings`, `backlinks`, `competitors`, `analyst`, `crawl`, `fixes`, `customerOverview`, `lighthouse`, `bootstrap`, `pipelineTrigger`, `autoFix`, `health` |
| `content` | `generate`, `usage` |
| `i18n` | `translate`, `locales` |
| `keys` | `list`, `create`, `update`, `revoke`, `rotate` |

**47 endpoints** across **11 services** — all accessible from one client instance.

## Why LANGR?

**One API instead of many.** Stop juggling Twilio, SendGrid, Resend, and Auth0. LANGR unifies email, SMS, auth, payments, SEO, content generation, and translation into a single API with one key.

- **47 REST endpoints**, one SDK
- **120+ locales** with 9 RTL languages
- **Europe-hosted**, GDPR-compliant
- **Free tier**: 100 requests/day, all services included
- **Pro**: 10,000 requests/day, $49/month

### Looking for a Twilio, SendGrid, or Resend alternative?

LANGR covers what you'd typically need 3-4 vendors for. See the [full comparison](https://api.langr.org/blog/langr-vs-twilio-sendgrid-resend).

## Error Handling

```typescript
import { LangrClient, LangrAPIError } from "@langr/sdk";

try {
  await langr.mail.send({ /* ... */ });
} catch (err) {
  if (err instanceof LangrAPIError) {
    console.error(err.code, err.message, err.status);
  }
}
```

## Configuration

```typescript
const langr = new LangrClient({
  apiKey: "lk_live_...",
  baseUrl: "https://api.langr.org", // default
});
```

## Links

- [API Documentation](https://api.langr.org/docs) — Interactive Scalar docs
- [OpenAPI Spec](https://api.langr.org/openapi.json) — Machine-readable spec
- [Developer Portal](https://api.langr.org/portal) — Get your API key
- [Pricing](https://api.langr.org/pricing) — Free, Pro, Enterprise
- [Blog](https://api.langr.org/blog) — Guides and tutorials

## License

MIT
