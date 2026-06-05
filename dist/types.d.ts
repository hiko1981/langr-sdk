export interface LangrClientOptions {
    apiKey: string;
    baseUrl?: string;
}
export interface LangrError {
    code: string;
    message: string;
    details?: unknown;
    required_scope?: string;
    your_scopes?: string[];
}
export interface LangrResponse<T = unknown> {
    ok: boolean;
    error?: LangrError;
    data: T;
    status: number;
}
export interface MailSendParams {
    from: string;
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    reply_to?: string;
    cc?: string[];
    bcc?: string[];
    headers?: Record<string, string>;
}
export interface MailSendResult {
    id: string;
}
export interface MailInboxParams {
    limit?: number;
    offset?: number;
}
export interface MailMessage {
    key: string;
    from: string;
    to: string;
    subject: string;
    date: string;
    snippet: string;
}
export interface MailInboxResult {
    messages: MailMessage[];
    total: number;
}
export interface MailMessageResult {
    from: string;
    to: string;
    subject: string;
    html: string;
    text: string;
    date: string;
    headers: Record<string, string>;
}
export interface MailDomain {
    domain: string;
    status: string;
}
export interface SmsSendParams {
    to: string;
    message: string;
    sender?: string;
}
export interface SmsSendOtpParams {
    to: string;
}
export interface SmsVerifyOtpParams {
    to: string;
    code: string;
}
export interface SmsVerifyOtpResult {
    verified: boolean;
}
export interface AuthSendOtpParams {
    target: string;
}
export interface AuthVerifyOtpParams {
    target: string;
    code: string;
}
export interface AuthVerifyOtpResult {
    session_token: string;
    expires_at: string;
    subject: string;
}
export interface AuthMagicLinkParams {
    email: string;
    redirect_url: string;
    subject?: string;
}
export interface AuthMagicLinkVerifyParams {
    token: string;
}
export interface AuthMagicLinkVerifyResult {
    session_token: string;
    expires_at: string;
    subject: string;
}
export interface AuthGoogleAuthorizeParams {
    redirect_url: string;
    scopes?: string[];
}
export interface AuthGoogleAuthorizeResult {
    url: string;
    state: string;
}
export interface AuthGoogleCallbackParams {
    code: string;
    state: string;
}
export interface AuthGoogleCallbackResult {
    session_token: string;
    expires_at: string;
    subject: string;
    user_info: Record<string, unknown>;
}
export interface AuthValidateSessionParams {
    session_token: string;
}
export interface AuthValidateSessionResult {
    valid: boolean;
    subject?: string;
    subject_type?: string;
    user_info?: Record<string, unknown>;
    expires_at?: string;
}
export interface AuthSession {
    id: string;
    subject: string;
    subject_type: string;
    created_at: string;
    expires_at: string;
}
export interface PaymentCheckoutLineItem {
    price?: string;
    price_data?: {
        currency: string;
        product_data: {
            name: string;
            description?: string;
            images?: string[];
        };
        unit_amount: number;
        recurring?: {
            interval: "day" | "week" | "month" | "year";
            interval_count?: number;
        };
    };
    quantity?: number;
}
export interface PaymentCheckoutParams {
    mode?: "payment" | "subscription";
    line_items?: PaymentCheckoutLineItem[];
    success_url: string;
    cancel_url: string;
    customer_email?: string;
    customer_id?: string;
    metadata?: Record<string, string>;
    trial_period_days?: number;
    allow_promotion_codes?: boolean;
    locale?: string;
    account?: "langr" | "aya";
    lookup_key?: string;
}
export interface PaymentCheckoutResult {
    session_id: string;
    url: string;
}
export interface PaymentPortalParams {
    customer_id: string;
    return_url: string;
    account?: "langr" | "aya";
}
export interface PaymentPortalResult {
    url: string;
}
export interface PaymentEvent {
    id: string;
    stripe_event_id: string;
    stripe_account: string;
    event_type: string;
    project_id: string | null;
    data: Record<string, unknown>;
    created_at: string;
}
export interface PaymentEventsParams {
    limit?: number;
    offset?: number;
    type?: string;
}
export interface SeoAuditParams {
    domain: string;
    callback_url?: string;
}
export interface SeoBootstrapParams {
    domain: string;
    name?: string;
}
export interface SeoPipelineTriggerParams {
    projectId: string;
    modules?: string[];
}
export interface SeoLighthouseParams {
    url: string;
    viewports?: ("mobile" | "tablet" | "desktop")[];
}
export interface ContentGenerateParams {
    type?: "blog_post" | "seo_copy" | "product_description" | "email" | "social" | "newsletter" | "custom";
    prompt: string;
    context?: {
        domain?: string;
        keywords?: string[];
        tone?: string;
        audience?: string;
        brand?: string;
    };
    locale?: string;
    max_tokens?: number;
    temperature?: number;
}
export interface ContentGenerateResult {
    content: string;
    type: string;
    locale: string;
    usage: {
        input_tokens: number;
        output_tokens: number;
    };
    model: string;
}
export interface ContentUsageDay {
    date: string;
    requests: number;
    tokens: number;
}
export interface ContentUsageResult {
    project_id: string;
    period: string;
    total_requests: number;
    total_tokens: number;
    daily: ContentUsageDay[];
}
export interface I18nTranslateParams {
    text: string | Record<string, string>;
    source_locale?: string;
    target_locales: string[];
    context?: string;
    formal?: boolean;
}
export interface I18nTranslateResult {
    translations: Record<string, string | Record<string, string>>;
    source_locale: string;
    target_locales: string[];
    rtl_locales: string[];
    usage: {
        input_tokens: number;
        output_tokens: number;
    };
    model: string;
}
export interface LocaleInfo {
    code: string;
    name: string;
    nativeName: string;
    rtl: boolean;
    fallback: string | null;
    fallback_chain: string[];
}
export interface I18nLocalesParams {
    rtl?: boolean;
    search?: string;
}
export interface I18nLocalesResult {
    locales: LocaleInfo[];
    total: number;
    rtl_count: number;
}
export interface ApiKeyInfo {
    id: string;
    key_prefix: string;
    name: string;
    owner_type: string;
    owner_id: string;
    scopes: string[];
    role: string;
    rate_limit_rpm: number;
    environment: string;
    is_active: boolean;
    last_used_at: string | null;
    created_at: string;
}
export interface KeyCreateParams {
    name: string;
    owner_type?: "project" | "user" | "service";
    owner_id: string;
    scopes: string[];
    role?: string;
    rate_limit_rpm?: number;
    environment?: "live" | "test";
    allowed_domains?: string[];
}
export interface KeyCreateResult {
    key: string;
    id: string;
    key_prefix: string;
}
export interface KeyUpdateParams {
    name?: string;
    scopes?: string[];
    rate_limit_rpm?: number;
    allowed_domains?: string[];
    is_active?: boolean;
}
export interface BrainQueryParams {
    query: string;
    context?: Record<string, unknown>;
    domain?: string;
    model?: string;
    max_tokens?: number;
}
export interface BrainQueryResult {
    ok: boolean;
    answer: string;
    resolution: "redis_cache" | "db_cache" | "knowledge_match" | "claude_generated";
    confidence: number;
    cache_id?: string;
    knowledge_ids?: string[];
    tokens?: {
        input: number;
        output: number;
    };
    cost_usd?: number;
    latency_ms: number;
    model?: string;
}
export interface BrainDomainParams {
    domain: string;
    force?: boolean;
}
export interface BrainDomainProfile {
    id: string;
    domain: string;
    industry: string | null;
    sub_industry: string | null;
    tech_stack: string[];
    seo_scores: Record<string, unknown>;
    signals: Record<string, unknown>;
    meta: Record<string, unknown>;
    scan_count: number;
    completeness: number;
    last_scanned_at: string | null;
    created_at: string;
    updated_at: string;
}
export interface BrainStoreParams {
    category: "fact" | "rule" | "convention" | "preference" | "correction" | "domain_signal" | "feature_pattern" | "industry_pattern";
    subject: string;
    content: string;
    tags?: string[];
    confidence?: number;
    supersedes?: string;
    source?: string;
    source_ref?: string;
}
export interface BrainKnowledgeItem {
    id: string;
    tenant_id: string;
    category: string;
    subject: string;
    content: string;
    content_hash: string;
    tags: string[];
    confidence: number;
    supersedes: string | null;
    superseded_by: string | null;
    source: string | null;
    source_ref: string | null;
    usage_count: number;
    last_used_at: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}
export interface BrainSearchParams {
    query?: string;
    category?: string;
    tags?: string[];
    min_confidence?: number;
    limit?: number;
    include_global?: boolean;
}
export interface BrainSearchResult {
    ok: boolean;
    count: number;
    items: BrainKnowledgeItem[];
}
export interface BrainFeedbackParams {
    cache_id?: string;
    query_text?: string;
    rating: -1 | 1;
    correction?: string;
}
export interface BrainStats {
    queries_today: number;
    cache_hits_today: number;
    claude_calls_today: number;
    cache_hit_rate: number;
    knowledge_items: number;
    domain_profiles: number;
}
export interface BrainIngestParams {
    sources?: ("matrix" | "products" | "features" | "capabilities" | "projects" | "cross-matrix")[];
}
export interface BrainIngestResult {
    ok: boolean;
    sources: Array<{
        source: string;
        total: number;
        ingested: number;
        skipped: number;
        errors: number;
    }>;
    total_ingested: number;
    total_skipped: number;
    total_errors: number;
    duration_ms: number;
}
export interface HealthResult {
    ok: boolean;
    version: string;
    uptime: number;
}
export interface HealthDetailedResult extends HealthResult {
    services: Record<string, {
        ok: boolean;
        latency?: number;
        error?: string;
    }>;
}
//# sourceMappingURL=types.d.ts.map