# @langr/sdk

Official TypeScript SDK for the [LANGR API](https://api.langr.org).

## Install

```bash
npm install @langr/sdk
```

## Quick start

```ts
import { LangrClient } from "@langr/sdk";

const langr = new LangrClient({ apiKey: "lgr_..." });

// Send an email
await langr.mail.send({
  from: "hello@yourdomain.com",
  to: "user@example.com",
  subject: "Welcome",
  html: "<h1>Hello!</h1>",
});

// Send an SMS
await langr.sms.send({
  to: "+4512345678",
  message: "Your code is 1234",
});

// Authenticate with OTP
await langr.auth.sendOtp({ target: "+4512345678" });
const session = await langr.auth.verifyOtp({
  target: "+4512345678",
  code: "123456",
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

// Translate text
const result = await langr.i18n.translate({
  text: "Hello, world!",
  target_locales: ["da", "de", "ar"],
});

// SEO audit
await langr.seo.audit({ domain: "example.com" });

// Health check
const health = await langr.health();
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

## Error handling

```ts
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

```ts
const langr = new LangrClient({
  apiKey: "lgr_...",
  baseUrl: "https://api.langr.org", // default
});
```

## License

MIT
