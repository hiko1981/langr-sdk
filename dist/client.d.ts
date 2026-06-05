import type { LangrClientOptions, LangrError, MailSendParams, MailSendResult, MailInboxParams, MailInboxResult, MailMessageResult, MailDomain, SmsSendParams, SmsSendOtpParams, SmsVerifyOtpParams, SmsVerifyOtpResult, AuthSendOtpParams, AuthVerifyOtpParams, AuthVerifyOtpResult, AuthMagicLinkParams, AuthMagicLinkVerifyParams, AuthMagicLinkVerifyResult, AuthGoogleAuthorizeParams, AuthGoogleAuthorizeResult, AuthGoogleCallbackParams, AuthGoogleCallbackResult, AuthValidateSessionParams, AuthValidateSessionResult, AuthSession, PaymentCheckoutParams, PaymentCheckoutResult, PaymentPortalParams, PaymentPortalResult, PaymentEvent, PaymentEventsParams, SeoAuditParams, SeoBootstrapParams, SeoPipelineTriggerParams, SeoLighthouseParams, ContentGenerateParams, ContentGenerateResult, ContentUsageResult, I18nTranslateParams, I18nTranslateResult, I18nLocalesParams, I18nLocalesResult, ApiKeyInfo, KeyCreateParams, KeyCreateResult, KeyUpdateParams, BrainQueryParams, BrainQueryResult, BrainDomainParams, BrainDomainProfile, BrainStoreParams, BrainKnowledgeItem, BrainSearchParams, BrainSearchResult, BrainFeedbackParams, BrainStats, BrainIngestParams, BrainIngestResult, HealthResult, HealthDetailedResult } from "./types.js";
export declare class LangrAPIError extends Error {
    readonly code: string;
    readonly status: number;
    readonly details?: unknown;
    constructor(error: LangrError, status: number);
}
export declare class LangrClient {
    private readonly apiKey;
    private readonly baseUrl;
    readonly mail: MailService;
    readonly sms: SmsService;
    readonly auth: AuthService;
    readonly payment: PaymentService;
    readonly seo: SeoService;
    readonly content: ContentService;
    readonly i18n: I18nService;
    readonly keys: KeysService;
    readonly brain: BrainService;
    constructor(options: LangrClientOptions);
    /** GET /health */
    health(): Promise<HealthResult>;
    /** GET /v1/health (authenticated) */
    healthDetailed(): Promise<HealthDetailedResult>;
    /** @internal */
    get<T>(path: string, query?: Record<string, string>): Promise<T>;
    /** @internal */
    post<T>(path: string, body?: unknown): Promise<T>;
    /** @internal */
    patch<T>(path: string, body: unknown): Promise<T>;
    /** @internal */
    del<T>(path: string): Promise<T>;
    private handleResponse;
}
declare class MailService {
    private client;
    constructor(client: LangrClient);
    /** POST /v1/mail/send */
    send(params: MailSendParams): Promise<MailSendResult>;
    /** GET /v1/mail/inbox/:namespace */
    inbox(namespace: string, params?: MailInboxParams): Promise<MailInboxResult>;
    /** GET /v1/mail/message/:key */
    message(key: string): Promise<MailMessageResult>;
    /** GET /v1/mail/domains */
    domains(): Promise<{
        domains: MailDomain[];
    }>;
}
declare class SmsService {
    private client;
    constructor(client: LangrClient);
    /** POST /v1/sms/send */
    send(params: SmsSendParams): Promise<{
        ok: boolean;
    }>;
    /** POST /v1/sms/send-otp */
    sendOtp(params: SmsSendOtpParams): Promise<{
        ok: boolean;
    }>;
    /** POST /v1/sms/verify-otp */
    verifyOtp(params: SmsVerifyOtpParams): Promise<SmsVerifyOtpResult>;
    /** GET /v1/sms/stats */
    stats(): Promise<Record<string, unknown>>;
}
declare class AuthService {
    private client;
    constructor(client: LangrClient);
    /** POST /v1/auth/send-otp */
    sendOtp(params: AuthSendOtpParams): Promise<{
        ok: boolean;
    }>;
    /** POST /v1/auth/verify-otp */
    verifyOtp(params: AuthVerifyOtpParams): Promise<AuthVerifyOtpResult>;
    /** POST /v1/auth/magic-link */
    magicLink(params: AuthMagicLinkParams): Promise<{
        ok: boolean;
    }>;
    /** POST /v1/auth/magic-link/verify */
    magicLinkVerify(params: AuthMagicLinkVerifyParams): Promise<AuthMagicLinkVerifyResult>;
    /** POST /v1/auth/google/authorize */
    googleAuthorize(params: AuthGoogleAuthorizeParams): Promise<AuthGoogleAuthorizeResult>;
    /** POST /v1/auth/google/callback */
    googleCallback(params: AuthGoogleCallbackParams): Promise<AuthGoogleCallbackResult>;
    /** POST /v1/auth/session/validate */
    validateSession(params: AuthValidateSessionParams): Promise<AuthValidateSessionResult>;
    /** GET /v1/auth/sessions */
    listSessions(): Promise<{
        sessions: AuthSession[];
    }>;
    /** DELETE /v1/auth/session/:id */
    revokeSession(id: string): Promise<{
        ok: boolean;
    }>;
    /** DELETE /v1/auth/sessions */
    revokeAllSessions(): Promise<{
        ok: boolean;
        revoked: number;
    }>;
}
declare class PaymentService {
    private client;
    constructor(client: LangrClient);
    /** POST /v1/payment/checkout */
    checkout(params: PaymentCheckoutParams): Promise<PaymentCheckoutResult>;
    /** POST /v1/payment/portal */
    portal(params: PaymentPortalParams): Promise<PaymentPortalResult>;
    /** GET /v1/payment/events */
    events(params?: PaymentEventsParams): Promise<{
        ok: boolean;
        events: PaymentEvent[];
    }>;
}
declare class SeoService {
    private client;
    constructor(client: LangrClient);
    /** POST /v1/seo/audit */
    audit(params: SeoAuditParams): Promise<Record<string, unknown>>;
    /** GET /v1/seo/audit/:id */
    getAudit(id: string): Promise<Record<string, unknown>>;
    /** GET /v1/seo/projects */
    projects(): Promise<Record<string, unknown>>;
    /** GET /v1/seo/keywords/:projectId */
    keywords(projectId: string): Promise<Record<string, unknown>>;
    /** GET /v1/seo/rankings/:projectId */
    rankings(projectId: string): Promise<Record<string, unknown>>;
    /** GET /v1/seo/backlinks/:projectId */
    backlinks(projectId: string): Promise<Record<string, unknown>>;
    /** GET /v1/seo/competitors/:projectId */
    competitors(projectId: string): Promise<Record<string, unknown>>;
    /** GET /v1/seo/analyst/:projectId */
    analyst(projectId: string): Promise<Record<string, unknown>>;
    /** GET /v1/seo/crawl/:projectId */
    crawl(projectId: string): Promise<Record<string, unknown>>;
    /** GET /v1/seo/fixes/:projectId */
    fixes(projectId: string): Promise<Record<string, unknown>>;
    /** GET /v1/seo/customer/:projectId/overview */
    customerOverview(projectId: string): Promise<Record<string, unknown>>;
    /** POST /v1/seo/lighthouse */
    lighthouse(params: SeoLighthouseParams): Promise<Record<string, unknown>>;
    /** POST /v1/seo/bootstrap */
    bootstrap(params: SeoBootstrapParams): Promise<Record<string, unknown>>;
    /** POST /v1/seo/pipeline/trigger */
    pipelineTrigger(params: SeoPipelineTriggerParams): Promise<Record<string, unknown>>;
    /** POST /v1/seo/auto-fix/:projectId */
    autoFix(projectId: string, body?: unknown): Promise<Record<string, unknown>>;
    /** GET /v1/seo/health */
    health(): Promise<{
        ok: boolean;
    }>;
}
declare class ContentService {
    private client;
    constructor(client: LangrClient);
    /** POST /v1/content/generate */
    generate(params: ContentGenerateParams): Promise<ContentGenerateResult>;
    /** GET /v1/content/usage */
    usage(): Promise<ContentUsageResult>;
}
declare class I18nService {
    private client;
    constructor(client: LangrClient);
    /** POST /v1/i18n/translate */
    translate(params: I18nTranslateParams): Promise<I18nTranslateResult>;
    /** GET /v1/i18n/locales */
    locales(params?: I18nLocalesParams): Promise<I18nLocalesResult>;
}
declare class KeysService {
    private client;
    constructor(client: LangrClient);
    /** GET /v1/keys */
    list(): Promise<{
        keys: ApiKeyInfo[];
    }>;
    /** POST /v1/keys */
    create(params: KeyCreateParams): Promise<KeyCreateResult>;
    /** PATCH /v1/keys/:id */
    update(id: string, params: KeyUpdateParams): Promise<ApiKeyInfo>;
    /** DELETE /v1/keys/:id */
    revoke(id: string): Promise<{
        ok: boolean;
    }>;
    /** POST /v1/keys/:id/rotate */
    rotate(id: string): Promise<KeyCreateResult>;
}
declare class BrainService {
    private client;
    constructor(client: LangrClient);
    /** POST /v1/brain/query — Ask Brain anything (4-step resolution cascade) */
    query(params: BrainQueryParams): Promise<BrainQueryResult>;
    /** POST /v1/brain/domain — Scan a domain */
    domain(params: BrainDomainParams): Promise<{
        ok: boolean;
        profile: BrainDomainProfile;
    }>;
    /** GET /v1/brain/domain/:domain — Get cached domain profile */
    getDomain(domain: string): Promise<{
        ok: boolean;
        profile: BrainDomainProfile;
    }>;
    /** POST /v1/brain/store — Store knowledge item */
    store(params: BrainStoreParams): Promise<{
        ok: boolean;
        item: BrainKnowledgeItem;
    }>;
    /** GET /v1/brain/knowledge — Search knowledge graph */
    search(params?: BrainSearchParams): Promise<BrainSearchResult>;
    /** GET /v1/brain/knowledge/:id — Get specific knowledge item */
    getKnowledge(id: string): Promise<{
        ok: boolean;
        item: BrainKnowledgeItem;
    }>;
    /** DELETE /v1/brain/knowledge/:id — Deactivate knowledge item */
    deleteKnowledge(id: string): Promise<{
        ok: boolean;
        message: string;
    }>;
    /** POST /v1/brain/feedback — Submit feedback on a response */
    feedback(params: BrainFeedbackParams): Promise<{
        ok: boolean;
        feedback: Record<string, unknown>;
    }>;
    /** GET /v1/brain/stats — Usage statistics */
    stats(): Promise<{
        ok: boolean;
        stats: BrainStats;
    }>;
    /** POST /v1/brain/ingest — Trigger ingestion pipeline (admin only) */
    ingest(params?: BrainIngestParams): Promise<BrainIngestResult>;
}
export {};
//# sourceMappingURL=client.d.ts.map