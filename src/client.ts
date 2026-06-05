import type {
  LangrClientOptions,
  LangrError,
  // Mail
  MailSendParams,
  MailSendResult,
  MailInboxParams,
  MailInboxResult,
  MailMessageResult,
  MailDomain,
  // SMS
  SmsSendParams,
  SmsSendOtpParams,
  SmsVerifyOtpParams,
  SmsVerifyOtpResult,
  // Auth
  AuthSendOtpParams,
  AuthVerifyOtpParams,
  AuthVerifyOtpResult,
  AuthMagicLinkParams,
  AuthMagicLinkVerifyParams,
  AuthMagicLinkVerifyResult,
  AuthGoogleAuthorizeParams,
  AuthGoogleAuthorizeResult,
  AuthGoogleCallbackParams,
  AuthGoogleCallbackResult,
  AuthValidateSessionParams,
  AuthValidateSessionResult,
  AuthSession,
  // Payment
  PaymentCheckoutParams,
  PaymentCheckoutResult,
  PaymentPortalParams,
  PaymentPortalResult,
  PaymentEvent,
  PaymentEventsParams,
  // SEO
  SeoAuditParams,
  SeoBootstrapParams,
  SeoPipelineTriggerParams,
  SeoLighthouseParams,
  // Content
  ContentGenerateParams,
  ContentGenerateResult,
  ContentUsageResult,
  // i18n
  I18nTranslateParams,
  I18nTranslateResult,
  I18nLocalesParams,
  I18nLocalesResult,
  // Keys
  ApiKeyInfo,
  KeyCreateParams,
  KeyCreateResult,
  KeyUpdateParams,
  // Brain
  BrainQueryParams,
  BrainQueryResult,
  BrainDomainParams,
  BrainDomainProfile,
  BrainStoreParams,
  BrainKnowledgeItem,
  BrainSearchParams,
  BrainSearchResult,
  BrainFeedbackParams,
  BrainStats,
  BrainIngestParams,
  BrainIngestResult,
  // Health
  HealthResult,
  HealthDetailedResult,
} from "./types.js";

const DEFAULT_BASE_URL = "https://api.langr.org";

export class LangrAPIError extends Error {
  readonly code: string;
  readonly status: number;
  readonly details?: unknown;

  constructor(error: LangrError, status: number) {
    super(error.message);
    this.name = "LangrAPIError";
    this.code = error.code;
    this.status = status;
    this.details = error.details;
  }
}

export class LangrClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  readonly mail: MailService;
  readonly sms: SmsService;
  readonly auth: AuthService;
  readonly payment: PaymentService;
  readonly seo: SeoService;
  readonly content: ContentService;
  readonly i18n: I18nService;
  readonly keys: KeysService;
  readonly brain: BrainService;

  constructor(options: LangrClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl || DEFAULT_BASE_URL).replace(/\/$/, "");

    this.mail = new MailService(this);
    this.sms = new SmsService(this);
    this.auth = new AuthService(this);
    this.payment = new PaymentService(this);
    this.seo = new SeoService(this);
    this.content = new ContentService(this);
    this.i18n = new I18nService(this);
    this.keys = new KeysService(this);
    this.brain = new BrainService(this);
  }

  /** GET /health */
  async health(): Promise<HealthResult> {
    return this.get<HealthResult>("/health");
  }

  /** GET /v1/health (authenticated) */
  async healthDetailed(): Promise<HealthDetailedResult> {
    return this.get<HealthDetailedResult>("/v1/health");
  }

  // ── Internal HTTP methods ──

  /** @internal */
  async get<T>(path: string, query?: Record<string, string>): Promise<T> {
    let url = `${this.baseUrl}${path}`;
    if (query) {
      const params = new URLSearchParams(query);
      url += `?${params.toString()}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    return this.handleResponse<T>(res);
  }

  /** @internal */
  async post<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });

    return this.handleResponse<T>(res);
  }

  /** @internal */
  async patch<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return this.handleResponse<T>(res);
  }

  /** @internal */
  async del<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    return this.handleResponse<T>(res);
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    const data = (await res.json()) as T & { error?: LangrError };

    if (!res.ok || data.error) {
      throw new LangrAPIError(
        data.error || { code: "UNKNOWN", message: `HTTP ${res.status}` },
        res.status,
      );
    }

    return data;
  }
}

// ──────────────────────────────────────────────
// Service namespaces
// ──────────────────────────────────────────────

class MailService {
  constructor(private client: LangrClient) {}

  /** POST /v1/mail/send */
  async send(params: MailSendParams): Promise<MailSendResult> {
    return this.client.post("/v1/mail/send", params);
  }

  /** GET /v1/mail/inbox/:namespace */
  async inbox(
    namespace: string,
    params?: MailInboxParams,
  ): Promise<MailInboxResult> {
    const query: Record<string, string> = {};
    if (params?.limit) query.limit = String(params.limit);
    if (params?.offset) query.offset = String(params.offset);
    return this.client.get(`/v1/mail/inbox/${namespace}`, query);
  }

  /** GET /v1/mail/message/:key */
  async message(key: string): Promise<MailMessageResult> {
    return this.client.get(`/v1/mail/message/${encodeURIComponent(key)}`);
  }

  /** GET /v1/mail/domains */
  async domains(): Promise<{ domains: MailDomain[] }> {
    return this.client.get("/v1/mail/domains");
  }
}

class SmsService {
  constructor(private client: LangrClient) {}

  /** POST /v1/sms/send */
  async send(params: SmsSendParams): Promise<{ ok: boolean }> {
    return this.client.post("/v1/sms/send", params);
  }

  /** POST /v1/sms/send-otp */
  async sendOtp(params: SmsSendOtpParams): Promise<{ ok: boolean }> {
    return this.client.post("/v1/sms/send-otp", params);
  }

  /** POST /v1/sms/verify-otp */
  async verifyOtp(params: SmsVerifyOtpParams): Promise<SmsVerifyOtpResult> {
    return this.client.post("/v1/sms/verify-otp", params);
  }

  /** GET /v1/sms/stats */
  async stats(): Promise<Record<string, unknown>> {
    return this.client.get("/v1/sms/stats");
  }
}

class AuthService {
  constructor(private client: LangrClient) {}

  /** POST /v1/auth/send-otp */
  async sendOtp(params: AuthSendOtpParams): Promise<{ ok: boolean }> {
    return this.client.post("/v1/auth/send-otp", params);
  }

  /** POST /v1/auth/verify-otp */
  async verifyOtp(params: AuthVerifyOtpParams): Promise<AuthVerifyOtpResult> {
    return this.client.post("/v1/auth/verify-otp", params);
  }

  /** POST /v1/auth/magic-link */
  async magicLink(params: AuthMagicLinkParams): Promise<{ ok: boolean }> {
    return this.client.post("/v1/auth/magic-link", params);
  }

  /** POST /v1/auth/magic-link/verify */
  async magicLinkVerify(
    params: AuthMagicLinkVerifyParams,
  ): Promise<AuthMagicLinkVerifyResult> {
    return this.client.post("/v1/auth/magic-link/verify", params);
  }

  /** POST /v1/auth/google/authorize */
  async googleAuthorize(
    params: AuthGoogleAuthorizeParams,
  ): Promise<AuthGoogleAuthorizeResult> {
    return this.client.post("/v1/auth/google/authorize", params);
  }

  /** POST /v1/auth/google/callback */
  async googleCallback(
    params: AuthGoogleCallbackParams,
  ): Promise<AuthGoogleCallbackResult> {
    return this.client.post("/v1/auth/google/callback", params);
  }

  /** POST /v1/auth/session/validate */
  async validateSession(
    params: AuthValidateSessionParams,
  ): Promise<AuthValidateSessionResult> {
    return this.client.post("/v1/auth/session/validate", params);
  }

  /** GET /v1/auth/sessions */
  async listSessions(): Promise<{ sessions: AuthSession[] }> {
    return this.client.get("/v1/auth/sessions");
  }

  /** DELETE /v1/auth/session/:id */
  async revokeSession(id: string): Promise<{ ok: boolean }> {
    return this.client.del(`/v1/auth/session/${id}`);
  }

  /** DELETE /v1/auth/sessions */
  async revokeAllSessions(): Promise<{ ok: boolean; revoked: number }> {
    return this.client.del("/v1/auth/sessions");
  }
}

class PaymentService {
  constructor(private client: LangrClient) {}

  /** POST /v1/payment/checkout */
  async checkout(params: PaymentCheckoutParams): Promise<PaymentCheckoutResult> {
    return this.client.post("/v1/payment/checkout", params);
  }

  /** POST /v1/payment/portal */
  async portal(params: PaymentPortalParams): Promise<PaymentPortalResult> {
    return this.client.post("/v1/payment/portal", params);
  }

  /** GET /v1/payment/events */
  async events(
    params?: PaymentEventsParams,
  ): Promise<{ ok: boolean; events: PaymentEvent[] }> {
    const query: Record<string, string> = {};
    if (params?.limit) query.limit = String(params.limit);
    if (params?.offset) query.offset = String(params.offset);
    if (params?.type) query.type = params.type;
    return this.client.get("/v1/payment/events", query);
  }
}

class SeoService {
  constructor(private client: LangrClient) {}

  /** POST /v1/seo/audit */
  async audit(params: SeoAuditParams): Promise<Record<string, unknown>> {
    return this.client.post("/v1/seo/audit", params);
  }

  /** GET /v1/seo/audit/:id */
  async getAudit(id: string): Promise<Record<string, unknown>> {
    return this.client.get(`/v1/seo/audit/${encodeURIComponent(id)}`);
  }

  /** GET /v1/seo/projects */
  async projects(): Promise<Record<string, unknown>> {
    return this.client.get("/v1/seo/projects");
  }

  /** GET /v1/seo/keywords/:projectId */
  async keywords(projectId: string): Promise<Record<string, unknown>> {
    return this.client.get(`/v1/seo/keywords/${encodeURIComponent(projectId)}`);
  }

  /** GET /v1/seo/rankings/:projectId */
  async rankings(projectId: string): Promise<Record<string, unknown>> {
    return this.client.get(`/v1/seo/rankings/${encodeURIComponent(projectId)}`);
  }

  /** GET /v1/seo/backlinks/:projectId */
  async backlinks(projectId: string): Promise<Record<string, unknown>> {
    return this.client.get(
      `/v1/seo/backlinks/${encodeURIComponent(projectId)}`,
    );
  }

  /** GET /v1/seo/competitors/:projectId */
  async competitors(projectId: string): Promise<Record<string, unknown>> {
    return this.client.get(
      `/v1/seo/competitors/${encodeURIComponent(projectId)}`,
    );
  }

  /** GET /v1/seo/analyst/:projectId */
  async analyst(projectId: string): Promise<Record<string, unknown>> {
    return this.client.get(`/v1/seo/analyst/${encodeURIComponent(projectId)}`);
  }

  /** GET /v1/seo/crawl/:projectId */
  async crawl(projectId: string): Promise<Record<string, unknown>> {
    return this.client.get(`/v1/seo/crawl/${encodeURIComponent(projectId)}`);
  }

  /** GET /v1/seo/fixes/:projectId */
  async fixes(projectId: string): Promise<Record<string, unknown>> {
    return this.client.get(`/v1/seo/fixes/${encodeURIComponent(projectId)}`);
  }

  /** GET /v1/seo/customer/:projectId/overview */
  async customerOverview(projectId: string): Promise<Record<string, unknown>> {
    return this.client.get(
      `/v1/seo/customer/${encodeURIComponent(projectId)}/overview`,
    );
  }

  /** POST /v1/seo/lighthouse */
  async lighthouse(params: SeoLighthouseParams): Promise<Record<string, unknown>> {
    return this.client.post("/v1/seo/lighthouse", params);
  }

  /** POST /v1/seo/bootstrap */
  async bootstrap(params: SeoBootstrapParams): Promise<Record<string, unknown>> {
    return this.client.post("/v1/seo/bootstrap", params);
  }

  /** POST /v1/seo/pipeline/trigger */
  async pipelineTrigger(
    params: SeoPipelineTriggerParams,
  ): Promise<Record<string, unknown>> {
    return this.client.post("/v1/seo/pipeline/trigger", params);
  }

  /** POST /v1/seo/auto-fix/:projectId */
  async autoFix(
    projectId: string,
    body?: unknown,
  ): Promise<Record<string, unknown>> {
    return this.client.post(
      `/v1/seo/auto-fix/${encodeURIComponent(projectId)}`,
      body,
    );
  }

  /** GET /v1/seo/health */
  async health(): Promise<{ ok: boolean }> {
    return this.client.get("/v1/seo/health");
  }
}

class ContentService {
  constructor(private client: LangrClient) {}

  /** POST /v1/content/generate */
  async generate(params: ContentGenerateParams): Promise<ContentGenerateResult> {
    return this.client.post("/v1/content/generate", params);
  }

  /** GET /v1/content/usage */
  async usage(): Promise<ContentUsageResult> {
    return this.client.get("/v1/content/usage");
  }
}

class I18nService {
  constructor(private client: LangrClient) {}

  /** POST /v1/i18n/translate */
  async translate(params: I18nTranslateParams): Promise<I18nTranslateResult> {
    return this.client.post("/v1/i18n/translate", params);
  }

  /** GET /v1/i18n/locales */
  async locales(params?: I18nLocalesParams): Promise<I18nLocalesResult> {
    const query: Record<string, string> = {};
    if (params?.rtl) query.rtl = "true";
    if (params?.search) query.search = params.search;
    return this.client.get("/v1/i18n/locales", query);
  }
}

class KeysService {
  constructor(private client: LangrClient) {}

  /** GET /v1/keys */
  async list(): Promise<{ keys: ApiKeyInfo[] }> {
    return this.client.get("/v1/keys");
  }

  /** POST /v1/keys */
  async create(params: KeyCreateParams): Promise<KeyCreateResult> {
    return this.client.post("/v1/keys", params);
  }

  /** PATCH /v1/keys/:id */
  async update(id: string, params: KeyUpdateParams): Promise<ApiKeyInfo> {
    return this.client.patch(`/v1/keys/${id}`, params);
  }

  /** DELETE /v1/keys/:id */
  async revoke(id: string): Promise<{ ok: boolean }> {
    return this.client.del(`/v1/keys/${id}`);
  }

  /** POST /v1/keys/:id/rotate */
  async rotate(id: string): Promise<KeyCreateResult> {
    return this.client.post(`/v1/keys/${id}/rotate`);
  }
}

class BrainService {
  constructor(private client: LangrClient) {}

  /** POST /v1/brain/query — Ask Brain anything (4-step resolution cascade) */
  async query(params: BrainQueryParams): Promise<BrainQueryResult> {
    return this.client.post("/v1/brain/query", params);
  }

  /** POST /v1/brain/domain — Scan a domain */
  async domain(params: BrainDomainParams): Promise<{ ok: boolean; profile: BrainDomainProfile }> {
    return this.client.post("/v1/brain/domain", params);
  }

  /** GET /v1/brain/domain/:domain — Get cached domain profile */
  async getDomain(domain: string): Promise<{ ok: boolean; profile: BrainDomainProfile }> {
    return this.client.get(`/v1/brain/domain/${encodeURIComponent(domain)}`);
  }

  /** POST /v1/brain/store — Store knowledge item */
  async store(params: BrainStoreParams): Promise<{ ok: boolean; item: BrainKnowledgeItem }> {
    return this.client.post("/v1/brain/store", params);
  }

  /** GET /v1/brain/knowledge — Search knowledge graph */
  async search(params?: BrainSearchParams): Promise<BrainSearchResult> {
    const query: Record<string, string> = {};
    if (params?.query) query.query = params.query;
    if (params?.category) query.category = params.category;
    if (params?.tags) query.tags = params.tags.join(",");
    if (params?.min_confidence !== undefined) query.min_confidence = String(params.min_confidence);
    if (params?.limit) query.limit = String(params.limit);
    if (params?.include_global !== undefined) query.include_global = String(params.include_global);
    return this.client.get("/v1/brain/knowledge", query);
  }

  /** GET /v1/brain/knowledge/:id — Get specific knowledge item */
  async getKnowledge(id: string): Promise<{ ok: boolean; item: BrainKnowledgeItem }> {
    return this.client.get(`/v1/brain/knowledge/${id}`);
  }

  /** DELETE /v1/brain/knowledge/:id — Deactivate knowledge item */
  async deleteKnowledge(id: string): Promise<{ ok: boolean; message: string }> {
    return this.client.del(`/v1/brain/knowledge/${id}`);
  }

  /** POST /v1/brain/feedback — Submit feedback on a response */
  async feedback(params: BrainFeedbackParams): Promise<{ ok: boolean; feedback: Record<string, unknown> }> {
    return this.client.post("/v1/brain/feedback", params);
  }

  /** GET /v1/brain/stats — Usage statistics */
  async stats(): Promise<{ ok: boolean; stats: BrainStats }> {
    return this.client.get("/v1/brain/stats");
  }

  /** POST /v1/brain/ingest — Trigger ingestion pipeline (admin only) */
  async ingest(params?: BrainIngestParams): Promise<BrainIngestResult> {
    return this.client.post("/v1/brain/ingest", params || {});
  }
}
