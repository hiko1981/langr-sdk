const DEFAULT_BASE_URL = "https://api.langr.org";
export class LangrAPIError extends Error {
    code;
    status;
    details;
    constructor(error, status) {
        super(error.message);
        this.name = "LangrAPIError";
        this.code = error.code;
        this.status = status;
        this.details = error.details;
    }
}
export class LangrClient {
    apiKey;
    baseUrl;
    mail;
    sms;
    auth;
    payment;
    seo;
    content;
    i18n;
    keys;
    brain;
    constructor(options) {
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
    async health() {
        return this.get("/health");
    }
    /** GET /v1/health (authenticated) */
    async healthDetailed() {
        return this.get("/v1/health");
    }
    // ── Internal HTTP methods ──
    /** @internal */
    async get(path, query) {
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
        return this.handleResponse(res);
    }
    /** @internal */
    async post(path, body) {
        const res = await fetch(`${this.baseUrl}${path}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                "Content-Type": "application/json",
            },
            ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
        });
        return this.handleResponse(res);
    }
    /** @internal */
    async patch(path, body) {
        const res = await fetch(`${this.baseUrl}${path}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return this.handleResponse(res);
    }
    /** @internal */
    async del(path) {
        const res = await fetch(`${this.baseUrl}${path}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                "Content-Type": "application/json",
            },
        });
        return this.handleResponse(res);
    }
    async handleResponse(res) {
        const data = (await res.json());
        if (!res.ok || data.error) {
            throw new LangrAPIError(data.error || { code: "UNKNOWN", message: `HTTP ${res.status}` }, res.status);
        }
        return data;
    }
}
// ──────────────────────────────────────────────
// Service namespaces
// ──────────────────────────────────────────────
class MailService {
    client;
    constructor(client) {
        this.client = client;
    }
    /** POST /v1/mail/send */
    async send(params) {
        return this.client.post("/v1/mail/send", params);
    }
    /** GET /v1/mail/inbox/:namespace */
    async inbox(namespace, params) {
        const query = {};
        if (params?.limit)
            query.limit = String(params.limit);
        if (params?.offset)
            query.offset = String(params.offset);
        return this.client.get(`/v1/mail/inbox/${namespace}`, query);
    }
    /** GET /v1/mail/message/:key */
    async message(key) {
        return this.client.get(`/v1/mail/message/${encodeURIComponent(key)}`);
    }
    /** GET /v1/mail/domains */
    async domains() {
        return this.client.get("/v1/mail/domains");
    }
}
class SmsService {
    client;
    constructor(client) {
        this.client = client;
    }
    /** POST /v1/sms/send */
    async send(params) {
        return this.client.post("/v1/sms/send", params);
    }
    /** POST /v1/sms/send-otp */
    async sendOtp(params) {
        return this.client.post("/v1/sms/send-otp", params);
    }
    /** POST /v1/sms/verify-otp */
    async verifyOtp(params) {
        return this.client.post("/v1/sms/verify-otp", params);
    }
    /** GET /v1/sms/stats */
    async stats() {
        return this.client.get("/v1/sms/stats");
    }
}
class AuthService {
    client;
    constructor(client) {
        this.client = client;
    }
    /** POST /v1/auth/send-otp */
    async sendOtp(params) {
        return this.client.post("/v1/auth/send-otp", params);
    }
    /** POST /v1/auth/verify-otp */
    async verifyOtp(params) {
        return this.client.post("/v1/auth/verify-otp", params);
    }
    /** POST /v1/auth/magic-link */
    async magicLink(params) {
        return this.client.post("/v1/auth/magic-link", params);
    }
    /** POST /v1/auth/magic-link/verify */
    async magicLinkVerify(params) {
        return this.client.post("/v1/auth/magic-link/verify", params);
    }
    /** POST /v1/auth/google/authorize */
    async googleAuthorize(params) {
        return this.client.post("/v1/auth/google/authorize", params);
    }
    /** POST /v1/auth/google/callback */
    async googleCallback(params) {
        return this.client.post("/v1/auth/google/callback", params);
    }
    /** POST /v1/auth/session/validate */
    async validateSession(params) {
        return this.client.post("/v1/auth/session/validate", params);
    }
    /** GET /v1/auth/sessions */
    async listSessions() {
        return this.client.get("/v1/auth/sessions");
    }
    /** DELETE /v1/auth/session/:id */
    async revokeSession(id) {
        return this.client.del(`/v1/auth/session/${id}`);
    }
    /** DELETE /v1/auth/sessions */
    async revokeAllSessions() {
        return this.client.del("/v1/auth/sessions");
    }
}
class PaymentService {
    client;
    constructor(client) {
        this.client = client;
    }
    /** POST /v1/payment/checkout */
    async checkout(params) {
        return this.client.post("/v1/payment/checkout", params);
    }
    /** POST /v1/payment/portal */
    async portal(params) {
        return this.client.post("/v1/payment/portal", params);
    }
    /** GET /v1/payment/events */
    async events(params) {
        const query = {};
        if (params?.limit)
            query.limit = String(params.limit);
        if (params?.offset)
            query.offset = String(params.offset);
        if (params?.type)
            query.type = params.type;
        return this.client.get("/v1/payment/events", query);
    }
}
class SeoService {
    client;
    constructor(client) {
        this.client = client;
    }
    /** POST /v1/seo/audit */
    async audit(params) {
        return this.client.post("/v1/seo/audit", params);
    }
    /** GET /v1/seo/audit/:id */
    async getAudit(id) {
        return this.client.get(`/v1/seo/audit/${encodeURIComponent(id)}`);
    }
    /** GET /v1/seo/projects */
    async projects() {
        return this.client.get("/v1/seo/projects");
    }
    /** GET /v1/seo/keywords/:projectId */
    async keywords(projectId) {
        return this.client.get(`/v1/seo/keywords/${encodeURIComponent(projectId)}`);
    }
    /** GET /v1/seo/rankings/:projectId */
    async rankings(projectId) {
        return this.client.get(`/v1/seo/rankings/${encodeURIComponent(projectId)}`);
    }
    /** GET /v1/seo/backlinks/:projectId */
    async backlinks(projectId) {
        return this.client.get(`/v1/seo/backlinks/${encodeURIComponent(projectId)}`);
    }
    /** GET /v1/seo/competitors/:projectId */
    async competitors(projectId) {
        return this.client.get(`/v1/seo/competitors/${encodeURIComponent(projectId)}`);
    }
    /** GET /v1/seo/analyst/:projectId */
    async analyst(projectId) {
        return this.client.get(`/v1/seo/analyst/${encodeURIComponent(projectId)}`);
    }
    /** GET /v1/seo/crawl/:projectId */
    async crawl(projectId) {
        return this.client.get(`/v1/seo/crawl/${encodeURIComponent(projectId)}`);
    }
    /** GET /v1/seo/fixes/:projectId */
    async fixes(projectId) {
        return this.client.get(`/v1/seo/fixes/${encodeURIComponent(projectId)}`);
    }
    /** GET /v1/seo/customer/:projectId/overview */
    async customerOverview(projectId) {
        return this.client.get(`/v1/seo/customer/${encodeURIComponent(projectId)}/overview`);
    }
    /** POST /v1/seo/lighthouse */
    async lighthouse(params) {
        return this.client.post("/v1/seo/lighthouse", params);
    }
    /** POST /v1/seo/bootstrap */
    async bootstrap(params) {
        return this.client.post("/v1/seo/bootstrap", params);
    }
    /** POST /v1/seo/pipeline/trigger */
    async pipelineTrigger(params) {
        return this.client.post("/v1/seo/pipeline/trigger", params);
    }
    /** POST /v1/seo/auto-fix/:projectId */
    async autoFix(projectId, body) {
        return this.client.post(`/v1/seo/auto-fix/${encodeURIComponent(projectId)}`, body);
    }
    /** GET /v1/seo/health */
    async health() {
        return this.client.get("/v1/seo/health");
    }
}
class ContentService {
    client;
    constructor(client) {
        this.client = client;
    }
    /** POST /v1/content/generate */
    async generate(params) {
        return this.client.post("/v1/content/generate", params);
    }
    /** GET /v1/content/usage */
    async usage() {
        return this.client.get("/v1/content/usage");
    }
}
class I18nService {
    client;
    constructor(client) {
        this.client = client;
    }
    /** POST /v1/i18n/translate */
    async translate(params) {
        return this.client.post("/v1/i18n/translate", params);
    }
    /** GET /v1/i18n/locales */
    async locales(params) {
        const query = {};
        if (params?.rtl)
            query.rtl = "true";
        if (params?.search)
            query.search = params.search;
        return this.client.get("/v1/i18n/locales", query);
    }
}
class KeysService {
    client;
    constructor(client) {
        this.client = client;
    }
    /** GET /v1/keys */
    async list() {
        return this.client.get("/v1/keys");
    }
    /** POST /v1/keys */
    async create(params) {
        return this.client.post("/v1/keys", params);
    }
    /** PATCH /v1/keys/:id */
    async update(id, params) {
        return this.client.patch(`/v1/keys/${id}`, params);
    }
    /** DELETE /v1/keys/:id */
    async revoke(id) {
        return this.client.del(`/v1/keys/${id}`);
    }
    /** POST /v1/keys/:id/rotate */
    async rotate(id) {
        return this.client.post(`/v1/keys/${id}/rotate`);
    }
}
class BrainService {
    client;
    constructor(client) {
        this.client = client;
    }
    /** POST /v1/brain/query — Ask Brain anything (4-step resolution cascade) */
    async query(params) {
        return this.client.post("/v1/brain/query", params);
    }
    /** POST /v1/brain/domain — Scan a domain */
    async domain(params) {
        return this.client.post("/v1/brain/domain", params);
    }
    /** GET /v1/brain/domain/:domain — Get cached domain profile */
    async getDomain(domain) {
        return this.client.get(`/v1/brain/domain/${encodeURIComponent(domain)}`);
    }
    /** POST /v1/brain/store — Store knowledge item */
    async store(params) {
        return this.client.post("/v1/brain/store", params);
    }
    /** GET /v1/brain/knowledge — Search knowledge graph */
    async search(params) {
        const query = {};
        if (params?.query)
            query.query = params.query;
        if (params?.category)
            query.category = params.category;
        if (params?.tags)
            query.tags = params.tags.join(",");
        if (params?.min_confidence !== undefined)
            query.min_confidence = String(params.min_confidence);
        if (params?.limit)
            query.limit = String(params.limit);
        if (params?.include_global !== undefined)
            query.include_global = String(params.include_global);
        return this.client.get("/v1/brain/knowledge", query);
    }
    /** GET /v1/brain/knowledge/:id — Get specific knowledge item */
    async getKnowledge(id) {
        return this.client.get(`/v1/brain/knowledge/${id}`);
    }
    /** DELETE /v1/brain/knowledge/:id — Deactivate knowledge item */
    async deleteKnowledge(id) {
        return this.client.del(`/v1/brain/knowledge/${id}`);
    }
    /** POST /v1/brain/feedback — Submit feedback on a response */
    async feedback(params) {
        return this.client.post("/v1/brain/feedback", params);
    }
    /** GET /v1/brain/stats — Usage statistics */
    async stats() {
        return this.client.get("/v1/brain/stats");
    }
    /** POST /v1/brain/ingest — Trigger ingestion pipeline (admin only) */
    async ingest(params) {
        return this.client.post("/v1/brain/ingest", params || {});
    }
}
//# sourceMappingURL=client.js.map