"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// domains/auth/userRole.ts
var roleHierarchy, isAuthenticated, hasRole, isGod, isOrgAdmin, isProjectAdmin, isOrgAdminOrAbove, isAnyAdmin, isSelf, canEditOrgData, canEditProjectData, filterByUserProject, filterByUserOrg, canEditUserByRole;
var init_userRole = __esm({
  "domains/auth/userRole.ts"() {
    "use strict";
    roleHierarchy = {
      ["USER" /* USER */]: 0,
      ["PROJECT_ADMIN" /* PROJECT_ADMIN */]: 1,
      ["ORG_ADMIN" /* ORG_ADMIN */]: 2,
      ["ORG_OWNER" /* ORG_OWNER */]: 3,
      ["GOD" /* GOD */]: 4
    };
    isAuthenticated = ({ session }) => !!session?.email;
    hasRole = (roles) => ({ session }) => {
      if (!session?.role) return false;
      return roles.includes(session?.role);
    };
    isGod = hasRole(["GOD" /* GOD */]);
    isOrgAdmin = hasRole(["ORG_ADMIN" /* ORG_ADMIN */, "ORG_OWNER" /* ORG_OWNER */]);
    isProjectAdmin = hasRole(["PROJECT_ADMIN" /* PROJECT_ADMIN */]);
    isOrgAdminOrAbove = hasRole(["GOD" /* GOD */, "ORG_ADMIN" /* ORG_ADMIN */, "ORG_OWNER" /* ORG_OWNER */]);
    isAnyAdmin = hasRole(["GOD" /* GOD */, "ORG_ADMIN" /* ORG_ADMIN */, "ORG_OWNER" /* ORG_OWNER */, "PROJECT_ADMIN" /* PROJECT_ADMIN */]);
    isSelf = async ({ session }) => {
      if (!session?.id) return false;
      return { id: { equals: session.id } };
    };
    canEditOrgData = ({ session }) => isGod({ session }) || isOrgAdmin({ session });
    canEditProjectData = ({ session }) => isGod({ session }) || isOrgAdmin({ session }) || isProjectAdmin({ session });
    filterByUserProject = async ({ session }) => {
      if (!session?.projectId) return false;
      return { project: { id: { equals: session.projectId } } };
    };
    filterByUserOrg = async ({ session }) => {
      if (!session?.orgId) return false;
      return { org: { id: { equals: session.orgId } } };
    };
    canEditUserByRole = (editorRole, targetRole) => {
      if (!editorRole || !targetRole) return false;
      if (editorRole === "GOD" /* GOD */) return true;
      const editorLevel = roleHierarchy[editorRole] ?? -1;
      const targetLevel = roleHierarchy[targetRole] ?? Number.MAX_SAFE_INTEGER;
      return targetLevel <= editorLevel;
    };
  }
});

// schemas/Chat.ts
var import_core, import_fields, Chat_default;
var init_Chat = __esm({
  "schemas/Chat.ts"() {
    "use strict";
    import_core = require("@keystone-6/core");
    import_fields = require("@keystone-6/core/fields");
    init_userRole();
    Chat_default = (0, import_core.list)({
      fields: {
        title: (0, import_fields.text)({ validation: { isRequired: true }, defaultValue: "AI chat" }),
        contextType: (0, import_fields.select)({
          options: [
            { label: "Transcript", value: "TRANSCRIPT" },
            { label: "Project", value: "PROJECT" }
          ],
          validation: { isRequired: true }
        }),
        org: (0, import_fields.relationship)({ ref: "Organization.chats", many: false }),
        project: (0, import_fields.relationship)({ ref: "Project.chats", many: false }),
        transcript: (0, import_fields.relationship)({ ref: "Transcript.chats", many: false }),
        messages: (0, import_fields.relationship)({ ref: "ChatMessage.chat", many: true }),
        createdAt: (0, import_fields.timestamp)({ defaultValue: { kind: "now" }, ui: { createView: { fieldMode: "hidden" } } }),
        updatedAt: (0, import_fields.timestamp)({ db: { updatedAt: true }, ui: { createView: { fieldMode: "hidden" } } })
      },
      access: {
        operation: {
          query: isAuthenticated,
          create: isAuthenticated,
          update: isOrgAdmin,
          delete: isOrgAdmin
        },
        filter: {
          query: async ({ session }) => {
            if (!isAuthenticated({ session })) return false;
            if (isGod({ session })) return true;
            return filterByUserOrg({ session });
          }
        }
      }
    });
  }
});

// schemas/ChatMessage.ts
var import_core2, import_fields2, ChatMessage_default;
var init_ChatMessage = __esm({
  "schemas/ChatMessage.ts"() {
    "use strict";
    import_core2 = require("@keystone-6/core");
    import_fields2 = require("@keystone-6/core/fields");
    init_userRole();
    ChatMessage_default = (0, import_core2.list)({
      fields: {
        chat: (0, import_fields2.relationship)({ ref: "Chat.messages", many: false }),
        role: (0, import_fields2.select)({
          options: [
            { label: "User", value: "user" },
            { label: "Assistant", value: "assistant" }
          ],
          validation: { isRequired: true },
          defaultValue: "user"
        }),
        content: (0, import_fields2.text)({ ui: { displayMode: "textarea" }, validation: { isRequired: true } }),
        segments: (0, import_fields2.relationship)({ ref: "TranscriptSegment.chatMessages", many: true }),
        createdAt: (0, import_fields2.timestamp)({ defaultValue: { kind: "now" }, ui: { createView: { fieldMode: "hidden" } } })
      },
      access: {
        operation: {
          query: isAuthenticated,
          create: isAuthenticated,
          update: isOrgAdmin,
          delete: isOrgAdmin
        },
        filter: {
          query: async ({ session }) => {
            if (!isAuthenticated({ session })) return false;
            if (isGod({ session })) return true;
            return filterByUserOrg({ session });
          }
        }
      }
    });
  }
});

// schemas/Organization.ts
var import_core3, import_fields3, import_free_email_domains, freeEmailDomainSet, normalizeDomains, Organization_default;
var init_Organization = __esm({
  "schemas/Organization.ts"() {
    "use strict";
    import_core3 = require("@keystone-6/core");
    import_fields3 = require("@keystone-6/core/fields");
    import_free_email_domains = __toESM(require("free-email-domains"));
    init_userRole();
    freeEmailDomainSet = new Set(import_free_email_domains.default.map((domain) => domain.toLowerCase()));
    normalizeDomains = (value) => {
      if (!Array.isArray(value)) return [];
      const seen = /* @__PURE__ */ new Set();
      const result = [];
      value.map((domain) => typeof domain === "string" ? domain.trim().toLowerCase() : "").filter(Boolean).forEach((domain) => {
        if (seen.has(domain)) return;
        seen.add(domain);
        result.push(domain);
      });
      return result;
    };
    Organization_default = (0, import_core3.list)({
      fields: {
        name: (0, import_fields3.text)({ validation: { isRequired: true } }),
        autojoinDomains: (0, import_fields3.json)({
          defaultValue: [],
          ui: {
            description: 'Array of domains allowed to auto-join (e.g. ["example.com"])'
          }
        }),
        users: (0, import_fields3.relationship)({ ref: "User.org", many: true }),
        projects: (0, import_fields3.relationship)({ ref: "Project.org", many: true }),
        transcripts: (0, import_fields3.relationship)({ ref: "Transcript.org", many: true }),
        chats: (0, import_fields3.relationship)({ ref: "Chat.org", many: true })
      },
      ui: {
        labelField: "name"
      },
      access: {
        operation: {
          query: isAuthenticated,
          create: isAuthenticated,
          update: hasRole(["GOD" /* GOD */, "ORG_OWNER" /* ORG_OWNER */]),
          delete: isGod
        },
        item: {
          update: async ({ session, item }) => {
            if (isGod({ session })) return true;
            return session?.orgId === item.id;
          }
        }
      },
      hooks: {
        resolveInput: {
          create: async ({ resolvedData }) => ({
            ...resolvedData,
            autojoinDomains: normalizeDomains(resolvedData.autojoinDomains)
          }),
          update: async ({ resolvedData }) => {
            if (!Object.prototype.hasOwnProperty.call(resolvedData, "autojoinDomains")) return resolvedData;
            return {
              ...resolvedData,
              autojoinDomains: normalizeDomains(resolvedData.autojoinDomains)
            };
          }
        },
        afterOperation: {
          create: async ({ item, context }) => {
            const session = context.session;
            if (session?.id && item?.id) {
              const sudo = context.sudo();
              const user = await sudo.query.User.findOne({
                where: { id: session.id },
                query: "id project { id }"
              });
              if (user?.project?.id) {
                await sudo.db.User.updateOne({
                  where: { id: session.id },
                  data: {
                    role: "ORG_OWNER" /* ORG_OWNER */,
                    org: { connect: { id: item.id } }
                  }
                });
              }
            }
          }
        },
        validateInput: async ({ resolvedData, item, addValidationError }) => {
          const candidate = Object.prototype.hasOwnProperty.call(resolvedData, "autojoinDomains") ? normalizeDomains(resolvedData.autojoinDomains) : normalizeDomains(item?.autojoinDomains);
          const invalidDomain = candidate.find((domain) => freeEmailDomainSet.has(domain));
          if (invalidDomain) {
            addValidationError(`Domain ${invalidDomain} is a free email provider and cannot be used for auto-join.`);
          }
        }
      }
    });
  }
});

// schemas/Project.ts
var import_core4, import_fields4, Project_default;
var init_Project = __esm({
  "schemas/Project.ts"() {
    "use strict";
    import_core4 = require("@keystone-6/core");
    import_fields4 = require("@keystone-6/core/fields");
    init_userRole();
    Project_default = (0, import_core4.list)({
      fields: {
        name: (0, import_fields4.text)({ validation: { isRequired: true } }),
        description: (0, import_fields4.text)({ ui: { displayMode: "textarea" }, validation: { isRequired: false } }),
        org: (0, import_fields4.relationship)({ ref: "Organization.projects", many: false }),
        users: (0, import_fields4.relationship)({ ref: "User.project", many: true }),
        transcripts: (0, import_fields4.relationship)({ ref: "Transcript.project", many: true }),
        chats: (0, import_fields4.relationship)({ ref: "Chat.project", many: true })
      },
      ui: {
        labelField: "name"
      },
      access: {
        operation: {
          query: ({ session }) => isAuthenticated({ session }),
          create: canEditOrgData,
          update: canEditProjectData,
          delete: canEditOrgData
        },
        item: {
          update: async ({ session, item, context }) => {
            if (isGod({ session })) return true;
            if (!item?.id) return false;
            const targetProjectId = String(item.id);
            const sudoContext = context.sudo();
            const project = await sudoContext.query.Project.findOne({
              where: { id: targetProjectId },
              query: "id org { id }"
            });
            if (!project) return false;
            if (isOrgAdmin({ session })) {
              if (!session?.orgId) return false;
              return project.org?.id ? String(project.org.id) === String(session.orgId) : false;
            }
            if (isProjectAdmin({ session })) {
              if (!session?.projectId) return false;
              return targetProjectId === String(session.projectId);
            }
            return false;
          },
          delete: async ({ session, item, context }) => {
            if (isGod({ session })) return true;
            if (!isOrgAdmin({ session })) return false;
            if (!session?.orgId || !item?.id) return false;
            const sudoContext = context.sudo();
            const project = await sudoContext.query.Project.findOne({
              where: { id: String(item.id) },
              query: "id org { id }"
            });
            if (!project?.org?.id) return false;
            return String(project.org.id) === String(session.orgId);
          }
        },
        filter: {
          query: async ({ session }) => {
            if (!isAuthenticated({ session })) return false;
            if (isGod({ session })) return true;
            if (isOrgAdmin({ session })) return filterByUserOrg({ session });
            if (!session?.projectId) return false;
            return { id: { equals: session.projectId } };
          }
        }
      },
      hooks: {
        resolveInput: {
          create: async ({ resolvedData, context }) => {
            if (resolvedData.org) return resolvedData;
            const orgId = context.session?.orgId;
            if (!orgId) return resolvedData;
            return {
              ...resolvedData,
              org: { connect: { id: orgId } }
            };
          }
        },
        validateDelete: async ({ item, context, addValidationError }) => {
          if (!item?.id) return;
          const sudoContext = context.sudo();
          const projectId = String(item.id);
          const project = await sudoContext.query.Project.findOne({
            where: { id: projectId },
            query: "id org { id }"
          });
          if (!project?.org?.id) {
            addValidationError("Project is missing organization context.");
            return;
          }
          const [orgProjectCount, userCount] = await Promise.all([
            sudoContext.db.Project.count({ where: { org: { id: { equals: project.org.id } } } }),
            sudoContext.db.User.count({ where: { project: { id: { equals: projectId } } } })
          ]);
          if (userCount > 0) {
            addValidationError("You cannot delete a project that still has users.");
            return;
          }
          if (orgProjectCount <= 1) {
            addValidationError("Each organization must have at least one project.");
          }
        }
      }
    });
  }
});

// schemas/Transcript.ts
var import_core5, import_fields5, Transcript_default;
var init_Transcript = __esm({
  "schemas/Transcript.ts"() {
    "use strict";
    import_core5 = require("@keystone-6/core");
    import_fields5 = require("@keystone-6/core/fields");
    init_userRole();
    Transcript_default = (0, import_core5.list)({
      fields: {
        title: (0, import_fields5.text)({ validation: { isRequired: true } }),
        intervieweeName: (0, import_fields5.text)(),
        sourceUrl: (0, import_fields5.text)({ ui: { description: "Optional source or recording URL" } }),
        language: (0, import_fields5.text)(),
        notes: (0, import_fields5.text)({ ui: { displayMode: "textarea" } }),
        project: (0, import_fields5.relationship)({ ref: "Project.transcripts", many: false }),
        org: (0, import_fields5.relationship)({ ref: "Organization.transcripts", many: false }),
        segments: (0, import_fields5.relationship)({ ref: "TranscriptSegment.transcript", many: true }),
        chats: (0, import_fields5.relationship)({ ref: "Chat.transcript", many: true }),
        createdAt: (0, import_fields5.timestamp)({ defaultValue: { kind: "now" }, ui: { createView: { fieldMode: "hidden" } } }),
        updatedAt: (0, import_fields5.timestamp)({ db: { updatedAt: true }, ui: { createView: { fieldMode: "hidden" } } })
      },
      ui: {
        labelField: "title"
      },
      access: {
        operation: {
          query: ({ session }) => isAuthenticated({ session }),
          create: canEditProjectData,
          update: canEditProjectData,
          delete: canEditOrgData
        },
        filter: {
          query: async ({ session }) => {
            if (!isAuthenticated({ session })) return false;
            if (isGod({ session })) return true;
            return filterByUserOrg({ session });
          }
        },
        item: {
          update: async ({ session, item, context }) => {
            if (isGod({ session })) return true;
            if (!item?.id) return false;
            const sudoContext = context.sudo();
            const stored = await sudoContext.query.Transcript.findOne({
              where: { id: String(item.id) },
              query: "id project { id org { id } }"
            });
            if (!stored?.project?.id || !stored.project.org?.id) return false;
            if (isOrgAdmin({ session })) {
              return stored.project.org.id === session.orgId;
            }
            if (isProjectAdmin({ session })) {
              return stored.project.id === session.projectId && stored.project.org.id === session.orgId;
            }
            return false;
          },
          delete: async ({ session, item, context }) => {
            if (isGod({ session })) return true;
            if (!isOrgAdmin({ session })) return false;
            if (!session?.orgId || !item?.id) return false;
            const sudoContext = context.sudo();
            const stored = await sudoContext.query.Transcript.findOne({
              where: { id: String(item.id) },
              query: "project { org { id } }"
            });
            return stored?.project?.org?.id === session.orgId;
          }
        }
      },
      hooks: {
        resolveInput: {
          create: async ({ resolvedData, context }) => {
            if (resolvedData.org) return resolvedData;
            const orgId = context.session?.orgId;
            if (!orgId) return resolvedData;
            return {
              ...resolvedData,
              org: { connect: { id: orgId } }
            };
          }
        }
      }
    });
  }
});

// config/env.ts
var import_dotenv, import_envalid, DEFAULT_PORT, DEFAULT_APP_URL, DEFAULT_BASE_URL, DEFAULT_ALLOWED_ORIGINS, env, env_default;
var init_env = __esm({
  "config/env.ts"() {
    "use strict";
    import_dotenv = __toESM(require("dotenv"));
    import_envalid = require("envalid");
    import_dotenv.default.config();
    DEFAULT_PORT = 3e3;
    DEFAULT_APP_URL = "http://localhost:3000";
    DEFAULT_BASE_URL = `http://localhost:${DEFAULT_PORT}`;
    DEFAULT_ALLOWED_ORIGINS = [DEFAULT_APP_URL, DEFAULT_BASE_URL].join(",");
    env = (0, import_envalid.cleanEnv)(process.env, {
      NODE_ENV: (0, import_envalid.str)({ choices: ["development", "production"], default: "development" }),
      DATABASE_URL: (0, import_envalid.url)(),
      /**
       * The secret used to encrypt session data and magic links using @hapi/iron.
       * Please use a 32-char or more password.
       */
      SESSION_SECRET: (0, import_envalid.str)(),
      APP_URL: (0, import_envalid.url)({ default: DEFAULT_APP_URL }),
      BASE_URL: (0, import_envalid.url)({ default: DEFAULT_BASE_URL }),
      NEXTAUTH_URL: (0, import_envalid.url)(),
      // must be set in .env - the npm package reads from there
      ALLOWED_ORIGINS: (0, import_envalid.str)({ default: DEFAULT_ALLOWED_ORIGINS }),
      COOKIE_DOMAIN: (0, import_envalid.str)({ default: "localhost" }),
      DATABASE_PROVIDER: (0, import_envalid.str)({ choices: ["sqlite", "postgresql", "mysql"], default: "sqlite" }),
      OPENAI_API_KEY: (0, import_envalid.str)(),
      OPENAI_MODEL: (0, import_envalid.str)({ default: "gpt-4o-mini" }),
      OPENAI_EMBEDDING_MODEL: (0, import_envalid.str)({ default: "text-embedding-3-small" }),
      GOOGLE_CLIENT_ID: (0, import_envalid.str)(),
      GOOGLE_CLIENT_SECRET: (0, import_envalid.str)(),
      CLOUDINARY_CLOUD_NAME: (0, import_envalid.str)(),
      CLOUDINARY_API_KEY: (0, import_envalid.str)(),
      CLOUDINARY_API_SECRET: (0, import_envalid.str)(),
      CLOUDINARY_API_FOLDER: (0, import_envalid.str)()
    });
    env_default = env;
  }
});

// lib/openai.ts
var import_openai, apiKey, client, ensureClient, getOpenAIClient, openAiModel, embeddingModel, createEmbeddings;
var init_openai = __esm({
  "lib/openai.ts"() {
    "use strict";
    import_openai = __toESM(require("openai"));
    init_env();
    apiKey = env_default.OPENAI_API_KEY.trim();
    client = null;
    ensureClient = () => {
      if (!apiKey) {
        throw new Error("OPENAI_API_KEY is not configured");
      }
      if (!client) {
        client = new import_openai.default({ apiKey });
      }
      return client;
    };
    getOpenAIClient = () => ensureClient();
    openAiModel = env_default.OPENAI_MODEL || "gpt-4o-mini";
    embeddingModel = env_default.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small";
    createEmbeddings = async (input) => {
      if (!input.length) return [];
      const openai = ensureClient();
      const response = await openai.embeddings.create({
        model: embeddingModel,
        input
      });
      if (!response.data || !response.data.length) {
        throw new Error("OpenAI returned no embeddings");
      }
      return response.data.map((item) => item.embedding ?? []);
    };
  }
});

// lib/pgvector.ts
var formatVectorLiteral;
var init_pgvector = __esm({
  "lib/pgvector.ts"() {
    "use strict";
    formatVectorLiteral = (values) => {
      if (!values?.length) return;
      return `vector'[${values.map((value) => Number.isFinite(value) ? value.toString() : "0").join(",")}]'`;
    };
  }
});

// schemas/TranscriptSegment.ts
var import_core6, import_fields6, import_client, TranscriptSegment_default;
var init_TranscriptSegment = __esm({
  "schemas/TranscriptSegment.ts"() {
    "use strict";
    import_core6 = require("@keystone-6/core");
    import_fields6 = require("@keystone-6/core/fields");
    import_client = require("@prisma/client");
    init_userRole();
    init_openai();
    init_pgvector();
    TranscriptSegment_default = (0, import_core6.list)({
      fields: {
        transcript: (0, import_fields6.relationship)({ ref: "Transcript.segments", many: false }),
        index: (0, import_fields6.integer)(),
        startMs: (0, import_fields6.integer)(),
        endMs: (0, import_fields6.integer)(),
        durationMs: (0, import_fields6.integer)(),
        text: (0, import_fields6.text)({ ui: { displayMode: "textarea" } }),
        speaker: (0, import_fields6.text)(),
        isMetadata: (0, import_fields6.checkbox)({ defaultValue: false }),
        chatMessages: (0, import_fields6.relationship)({ ref: "ChatMessage.segments", many: true })
      },
      db: {
        extendPrismaSchema: (schema) => {
          const schemaArray = schema.split("\n");
          const additions = [
            '  embedding Unsupported("vector(1536)")?',
            '  @@index([embedding], map: "TranscriptSegment_embedding_idx")'
          ];
          return [...schemaArray.slice(0, -1), ...additions, schemaArray.pop()].join("\n");
        }
      },
      access: {
        operation: {
          query: ({ session }) => isAuthenticated({ session }),
          create: canEditProjectData,
          update: canEditProjectData,
          delete: canEditProjectData
        },
        filter: {
          query: async ({ session }) => {
            if (!isAuthenticated({ session })) return false;
            if (isGod({ session })) return true;
            if (!session?.orgId) return false;
            const orgFilter = {
              transcript: { project: { org: { id: { equals: session.orgId } } } }
            };
            if (session.projectId) {
              return {
                OR: [orgFilter, { transcript: { project: { id: { equals: session.projectId } } } }]
              };
            }
            return orgFilter;
          }
        },
        item: {
          update: async ({ session, item, context }) => {
            if (isGod({ session })) return true;
            if (!item?.id) return false;
            const sudoContext = context.sudo();
            const record = await sudoContext.query.TranscriptSegment.findOne({
              where: { id: String(item.id) },
              query: "transcript { project { org { id } } }"
            });
            if (!record?.transcript?.project?.org?.id) return false;
            return record.transcript.project.org.id === session.orgId;
          },
          delete: async ({ session, item, context }) => {
            if (isGod({ session })) return true;
            if (!isOrgAdmin({ session })) return false;
            if (!item?.id) return false;
            const sudoContext = context.sudo();
            const record = await sudoContext.query.TranscriptSegment.findOne({
              where: { id: String(item.id) },
              query: "transcript { project { org { id } } }"
            });
            return record?.transcript?.project?.org?.id === session.orgId;
          }
        }
      },
      hooks: {
        afterOperation: async ({ operation, item, resolvedData, context }) => {
          const shouldEmbed = operation === "create" || operation === "update" && resolvedData?.text !== void 0;
          if (!shouldEmbed) return;
          if (!item?.id || !item?.text) return;
          try {
            const embedding = formatVectorLiteral((await createEmbeddings([item.text]))[0]);
            if (!embedding) return;
            await context.sudo().prisma.$executeRaw`
          UPDATE "TranscriptSegment" SET "embedding" = ${import_client.Prisma.raw(embedding)} WHERE id = ${item.id}
        `;
          } catch (error) {
            console.error("Failed to generate embedding for TranscriptSegment", error);
          }
        }
      }
    });
  }
});

// schemas/User.ts
var import_cloudinary, import_core7, import_access, import_fields7, import_crypto, validation, socialLoginOpts, userRoleOptions, User_default;
var init_User = __esm({
  "schemas/User.ts"() {
    "use strict";
    import_cloudinary = require("@keystone-6/cloudinary");
    import_core7 = require("@keystone-6/core");
    import_access = require("@keystone-6/core/access");
    import_fields7 = require("@keystone-6/core/fields");
    import_crypto = require("crypto");
    init_env();
    init_userRole();
    validation = { isRequired: true };
    socialLoginOpts = [{ label: "Google", value: "google" }];
    userRoleOptions = [
      { label: "User", value: "USER" /* USER */ },
      { label: "Project Admin", value: "PROJECT_ADMIN" /* PROJECT_ADMIN */ },
      { label: "Organization Admin", value: "ORG_ADMIN" /* ORG_ADMIN */ },
      { label: "Organization Owner", value: "ORG_OWNER" /* ORG_OWNER */ },
      { label: "System Admin", value: "GOD" /* GOD */ }
    ];
    User_default = (0, import_core7.list)({
      fields: {
        avatarSocialUrl: (0, import_fields7.text)({
          ui: {
            createView: {
              fieldMode: "hidden"
            },
            itemView: {
              fieldMode: "hidden"
            }
          }
        }),
        avatarUploaded: (0, import_cloudinary.cloudinaryImage)({
          cloudinary: {
            cloudName: env_default.CLOUDINARY_CLOUD_NAME,
            apiKey: env_default.CLOUDINARY_API_KEY,
            apiSecret: env_default.CLOUDINARY_API_SECRET,
            folder: env_default.CLOUDINARY_API_FOLDER
          }
        }),
        avatarUrl: (0, import_fields7.virtual)({
          field: import_core7.graphql.field({
            type: import_core7.graphql.String,
            resolve: (item) => item.avatarUploaded?.publicUrl || item.avatarSocialUrl || ""
          })
        }),
        email: (0, import_fields7.text)({
          validation,
          isIndexed: true,
          isFilterable: true
        }),
        firstName: (0, import_fields7.text)(),
        lastName: (0, import_fields7.text)(),
        displayName: (0, import_fields7.virtual)({
          field: import_core7.graphql.field({
            type: import_core7.graphql.String,
            resolve: (item) => {
              const name = [item.firstName, item.lastName].filter(Boolean).join(" ");
              return name || item.email || "";
            }
          })
        }),
        role: (0, import_fields7.select)({
          type: "enum",
          options: userRoleOptions,
          defaultValue: "USER" /* USER */,
          access: {
            ...(0, import_access.allOperations)(import_access.denyAll),
            read: isAuthenticated,
            create: isAnyAdmin,
            update: isAnyAdmin
          }
        }),
        providerAccountId: (0, import_fields7.text)({
          isIndexed: "unique",
          access: {
            ...(0, import_access.allOperations)(import_access.denyAll),
            read: isGod,
            create: isGod,
            update: isGod
          },
          ui: {
            createView: { fieldMode: "hidden" }
          }
        }),
        provider: (0, import_fields7.select)({
          type: "enum",
          validation,
          options: socialLoginOpts,
          access: { ...(0, import_access.allOperations)(import_access.denyAll), read: isGod, create: isGod },
          defaultValue: socialLoginOpts[0].value
        }),
        rawAuth: (0, import_fields7.json)({
          access: { ...(0, import_access.allOperations)(import_access.denyAll), read: isGod, create: isGod },
          ui: {
            createView: { fieldMode: "hidden" },
            itemView: { fieldMode: "hidden" }
          }
        }),
        org: (0, import_fields7.relationship)({
          ref: "Organization.users",
          many: false,
          access: {
            ...(0, import_access.allOperations)(import_access.denyAll),
            read: isAuthenticated,
            create: isAnyAdmin,
            update: isOrgAdminOrAbove
          }
        }),
        project: (0, import_fields7.relationship)({
          ref: "Project.users",
          many: false,
          access: {
            ...(0, import_access.allOperations)(import_access.denyAll),
            read: isAuthenticated,
            create: isAnyAdmin,
            update: isAnyAdmin
          }
        }),
        isActive: (0, import_fields7.checkbox)({
          defaultValue: true,
          access: {
            ...(0, import_access.allOperations)(import_access.denyAll),
            read: isAuthenticated,
            create: isAnyAdmin,
            update: isOrgAdminOrAbove
          }
        }),
        createdAt: (0, import_fields7.timestamp)({
          defaultValue: { kind: "now" },
          ui: {
            createView: { fieldMode: "hidden" },
            itemView: { fieldMode: "read" }
          }
        }),
        provisionedAt: (0, import_fields7.timestamp)({
          ui: {
            createView: { fieldMode: "hidden" },
            itemView: { fieldMode: "read" }
          }
        }),
        updatedAt: (0, import_fields7.timestamp)({
          db: { updatedAt: true },
          ui: {
            createView: { fieldMode: "hidden" },
            itemView: { fieldMode: "read" }
          }
        }),
        seenAt: (0, import_fields7.timestamp)({
          ui: {
            createView: { fieldMode: "hidden" },
            itemView: { fieldMode: "read" }
          }
        })
      },
      ui: {
        labelField: "email"
      },
      access: {
        operation: {
          query: ({ session }) => isAuthenticated({ session }),
          create: ({ session }) => isAnyAdmin({ session }),
          update: ({ session }) => isAuthenticated({ session }),
          delete: async (args) => {
            const typedArgs = args;
            const { session, itemId, context } = typedArgs;
            if (isGod({ session })) return true;
            if (!isOrgAdmin({ session })) return false;
            if (!session?.orgId || !itemId) return false;
            const user = await context.sudo().query.User.findOne({
              where: { id: itemId },
              query: "org { id }"
            });
            if (!user) return false;
            return user.org?.id === session.orgId;
          }
        },
        item: {
          update: async ({ session, item, context }) => {
            if (isGod({ session })) return true;
            if (!session?.id || !item?.id) return false;
            const targetUserId = String(item.id);
            const sessionId = String(session.id);
            if (sessionId === targetUserId) return true;
            const sudoContext = context.sudo();
            const userWithRelations = await sudoContext.query.User.findOne({
              where: { id: targetUserId },
              query: "id org { id } project { id } role"
            });
            if (!userWithRelations) return false;
            if (!canEditUserByRole(session?.role, userWithRelations.role))
              return false;
            if (isOrgAdmin({ session })) {
              if (!session?.orgId) return false;
              if (!userWithRelations.org?.id) return false;
              return String(userWithRelations.org.id) === String(session.orgId);
            }
            if (isProjectAdmin({ session })) {
              if (!session?.projectId || !session?.orgId) return false;
              if (!userWithRelations.project?.id || !userWithRelations.org?.id) return false;
              return String(userWithRelations.project.id) === String(session.projectId) && String(userWithRelations.org.id) === String(session.orgId);
            }
            return false;
          }
        },
        filter: {
          query: async ({ session }) => {
            if (!isAuthenticated({ session })) return false;
            if (isGod({ session })) return true;
            if (isOrgAdmin({ session })) return filterByUserOrg({ session });
            if (isProjectAdmin({ session })) return filterByUserProject({ session });
            return isSelf({ session });
          }
        }
      },
      hooks: {
        resolveInput: {
          create: async ({ resolvedData }) => ({
            ...resolvedData,
            email: resolvedData.email?.toLowerCase(),
            providerAccountId: resolvedData.providerAccountId || (0, import_crypto.randomUUID)()
          }),
          update: async ({ resolvedData }) => ({
            ...resolvedData,
            email: typeof resolvedData.email === "string" ? resolvedData.email.toLowerCase() : resolvedData.email,
            providerAccountId: resolvedData.providerAccountId || (0, import_crypto.randomUUID)()
          })
        },
        validateInput: async ({ operation, resolvedData, item, context, addValidationError }) => {
          const existingUser = item?.id ? await context.query.User.findOne({
            where: { id: item.id },
            query: "id org { id } project { id } role"
          }) : null;
          const session = context.session;
          const isEditingSelf = operation === "update" && existingUser && session?.id && String(existingUser.id) === String(session.id);
          isEditingSelf && resolvedData.role && addValidationError("You cannot edit your own role.");
          isEditingSelf && resolvedData.isActive !== void 0 && addValidationError("You cannot edit your own active status.");
          isEditingSelf && resolvedData.project && session?.role !== "ORG_ADMIN" /* ORG_ADMIN */ && session?.role !== "ORG_OWNER" /* ORG_OWNER */ && addValidationError("You cannot edit your own project.");
          const resolveRelationshipId = (input, existingId) => {
            const typedInput = input;
            if (!typedInput) return existingId ?? null;
            const getDisconnectedId = () => {
              if (!("disconnect" in typedInput) || !typedInput.disconnect) return null;
              if (typedInput.disconnect === true) return null;
              if (Array.isArray(typedInput.disconnect) && typedInput.disconnect.length > 0) return null;
              return existingId ?? null;
            };
            const getConnectedId = () => {
              if (!("connect" in typedInput) || !typedInput.connect) return null;
              if (Array.isArray(typedInput.connect)) return typedInput.connect[0]?.id;
              return typedInput.connect.id;
            };
            const getSetId = () => {
              if (!("set" in typedInput) || typedInput.set === void 0) return null;
              if (typedInput.set === null) return null;
              if (Array.isArray(typedInput.set)) return typedInput.set[0]?.id;
              return typedInput.set?.id;
            };
            return getDisconnectedId() ?? getConnectedId() ?? getSetId() ?? existingId ?? null;
          };
          const getAllowedRolesForAdmin = (adminRole) => {
            const baseRoles = ["USER" /* USER */];
            const roleMap = {
              ["USER" /* USER */]: baseRoles,
              ["PROJECT_ADMIN" /* PROJECT_ADMIN */]: [...baseRoles, "PROJECT_ADMIN" /* PROJECT_ADMIN */],
              ["ORG_ADMIN" /* ORG_ADMIN */]: [...baseRoles, "PROJECT_ADMIN" /* PROJECT_ADMIN */, "ORG_ADMIN" /* ORG_ADMIN */],
              ["ORG_OWNER" /* ORG_OWNER */]: [...baseRoles, "PROJECT_ADMIN" /* PROJECT_ADMIN */, "ORG_ADMIN" /* ORG_ADMIN */, "ORG_OWNER" /* ORG_OWNER */],
              ["GOD" /* GOD */]: [...baseRoles, "PROJECT_ADMIN" /* PROJECT_ADMIN */, "ORG_ADMIN" /* ORG_ADMIN */, "ORG_OWNER" /* ORG_OWNER */]
            };
            return roleMap[adminRole] ?? baseRoles;
          };
          const validateRoleAssignment = (assignedRole, adminRole) => {
            if (!adminRole) return;
            if (assignedRole === "GOD" /* GOD */) {
              addValidationError("GOD role cannot be assigned via API. It can only be set directly in the database.");
              return;
            }
            const allowedRoles = getAllowedRolesForAdmin(adminRole);
            if (!allowedRoles.includes(assignedRole)) {
              addValidationError("You cannot assign this role. You can only assign roles up to your own permission level.");
            }
          };
          const validateProjectRestriction = (operation2, nextProjectId2, adminRole, adminProjectId) => {
            const isProjectAdminCreating = operation2 === "create" && adminRole === "PROJECT_ADMIN" /* PROJECT_ADMIN */ && adminProjectId;
            if (isProjectAdminCreating && nextProjectId2 && String(nextProjectId2) !== String(adminProjectId)) {
              addValidationError("Project Admins can only create users in their own project.");
            }
          };
          const validateProvisioning = (operation2, nextOrgId2, nextProjectId2, existingOrgId, existingProjectId) => {
            const isUnprovisioned = !nextOrgId2 && !nextProjectId2;
            const isInitialProvision = operation2 === "create" && isUnprovisioned;
            const isExistingUnprovisioned = operation2 === "update" && isUnprovisioned && !existingOrgId && !existingProjectId;
            if (!isInitialProvision && !isExistingUnprovisioned && (!nextOrgId2 || !nextProjectId2)) {
              addValidationError("Users must belong to both an organization and a project once provisioned.");
            }
          };
          const validateProjectOrgMatch = async (nextOrgId2, nextProjectId2, context2) => {
            if (!nextOrgId2 || !nextProjectId2) return;
            const project = await context2.query.Project.findOne({
              where: { id: nextProjectId2 },
              query: "id org { id }"
            });
            const projectOrgId = project?.org?.id ?? null;
            if (projectOrgId && projectOrgId !== nextOrgId2) {
              addValidationError("Selected project does not belong to the user's organization.");
            }
          };
          const nextOrgId = resolveRelationshipId(resolvedData.org, existingUser?.org?.id ?? null);
          const nextProjectId = resolveRelationshipId(resolvedData.project, existingUser?.project?.id ?? null);
          resolvedData.role && validateRoleAssignment(resolvedData.role, session?.role);
          validateProjectRestriction(operation, nextProjectId, session?.role, session?.projectId);
          validateProvisioning(
            operation,
            nextOrgId,
            nextProjectId,
            existingUser?.org?.id ?? null,
            existingUser?.project?.id ?? null
          );
          await validateProjectOrgMatch(nextOrgId, nextProjectId, context);
        }
      }
    });
  }
});

// schemas/schemas.ts
var lists, schemas_default;
var init_schemas = __esm({
  "schemas/schemas.ts"() {
    "use strict";
    init_Chat();
    init_ChatMessage();
    init_Organization();
    init_Project();
    init_Transcript();
    init_TranscriptSegment();
    init_User();
    lists = {
      Chat: Chat_default,
      ChatMessage: ChatMessage_default,
      Organization: Organization_default,
      Project: Project_default,
      Transcript: Transcript_default,
      TranscriptSegment: TranscriptSegment_default,
      User: User_default
    };
    schemas_default = lists;
  }
});

// services/chat.ts
var formatMs, buildSegmentDescription, mapSegmentReference, VECTOR_LIMIT, mapRawToSegment, fetchSegments, fetchChatHistory, getOpenAiMessages, getSystemPrompt, runChatConversation, loadChatHistory;
var init_chat = __esm({
  "services/chat.ts"() {
    "use strict";
    init_openai();
    init_pgvector();
    formatMs = (value) => {
      if (typeof value !== "number") return "00:00:00";
      const totalSeconds = Math.max(0, Math.floor(value / 1e3));
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor(totalSeconds % 3600 / 60);
      const seconds = totalSeconds % 60;
      return [hours, minutes, seconds].map((unit) => unit.toString().padStart(2, "0")).join(":");
    };
    buildSegmentDescription = (segment) => `${segment.speaker ?? "Speaker"} (${formatMs(segment.startMs)} - ${formatMs(segment.endMs)}): ${segment.text}`;
    mapSegmentReference = (segment) => ({
      id: segment.id,
      startMs: typeof segment.startMs === "number" ? segment.startMs : null,
      endMs: typeof segment.endMs === "number" ? segment.endMs : null,
      text: segment.text,
      speaker: segment.speaker ?? void 0,
      transcriptTitle: segment.transcript?.title ?? void 0
    });
    VECTOR_LIMIT = 40;
    mapRawToSegment = (row) => ({
      id: row.id,
      text: row.text,
      startMs: row.startMs ?? null,
      endMs: row.endMs ?? null,
      speaker: row.speaker ?? void 0,
      isMetadata: row.isMetadata ?? false,
      transcript: row.transcriptId ? {
        id: row.transcriptId,
        title: row.transcriptTitle ?? null
      } : null
    });
    fetchSegments = async ({ context, contextType, projectId, transcriptId, queryText }) => {
      const sudoContext = context.sudo();
      const fallback = async () => {
        const baseArgs = contextType === "TRANSCRIPT" ? {
          where: { transcript: { id: { equals: transcriptId } } }
        } : {
          where: {
            transcript: {
              project: {
                id: { equals: projectId }
              }
            }
          }
        };
        const segments = await sudoContext.query.TranscriptSegment.findMany({
          ...baseArgs,
          orderBy: [{ startMs: "asc" }],
          take: VECTOR_LIMIT,
          query: "id text startMs endMs speaker isMetadata transcript { id title project { id } }"
        });
        return segments.filter((segment) => segment.text && !segment.isMetadata).map((segment) => ({
          id: segment.id,
          text: segment.text,
          startMs: segment.startMs,
          endMs: segment.endMs,
          speaker: segment.speaker,
          isMetadata: segment.isMetadata,
          transcript: segment.transcript ? {
            id: segment.transcript.id,
            title: segment.transcript.title ?? null
          } : null
        }));
      };
      const runVectorSearch = async (text8) => {
        if (!text8.trim()) return [];
        if (contextType === "TRANSCRIPT" && !transcriptId) return [];
        if (contextType === "PROJECT" && !projectId) return [];
        try {
          const embeddings = await createEmbeddings([text8]);
          const embedding = embeddings?.[0];
          if (!embedding?.length) return [];
          const literal = formatVectorLiteral(embedding);
          const joinClause = contextType === "PROJECT" ? 'INNER JOIN "Transcript" t ON t.id = "TranscriptSegment"."transcriptId"' : 'LEFT JOIN "Transcript" t ON t.id = "TranscriptSegment"."transcriptId"';
          const whereClause = contextType === "TRANSCRIPT" ? `"TranscriptSegment"."transcriptId" = '${transcriptId}'` : `"Transcript"."projectId" = '${projectId}'`;
          const rows = await sudoContext.prisma.$queryRawUnsafe(`
        SELECT
          "TranscriptSegment"."id",
          "TranscriptSegment"."text",
          "TranscriptSegment"."startMs",
          "TranscriptSegment"."endMs",
          "TranscriptSegment"."speaker",
          "TranscriptSegment"."isMetadata",
          t."id" AS "transcriptId",
          t."title" AS "transcriptTitle"
        FROM "TranscriptSegment"
        ${joinClause}
        WHERE "TranscriptSegment"."isMetadata" = FALSE
          AND "TranscriptSegment"."embedding" IS NOT NULL
          AND ${whereClause}
        ORDER BY "TranscriptSegment"."embedding" <-> ${literal}
        LIMIT ${VECTOR_LIMIT}
      `) ?? [];
          return rows.map(mapRawToSegment);
        } catch (error) {
          console.error("Vector search fallback", error);
          return [];
        }
      };
      if (queryText) {
        const vectorSegments = await runVectorSearch(queryText);
        if (vectorSegments.length) return vectorSegments;
      }
      return fallback();
    };
    fetchChatHistory = async (context, chatId) => {
      const sudoContext = context.sudo();
      const messages = await sudoContext.query.ChatMessage.findMany({
        where: { chat: { id: { equals: chatId } } },
        orderBy: [{ createdAt: "asc" }],
        query: "id role content createdAt segments { id text startMs endMs speaker transcript { title } }"
      });
      return messages.map((msg) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        createdAt: msg.createdAt ?? null,
        segments: (msg.segments ?? []).map((segment) => ({
          id: segment.id,
          text: segment.text,
          startMs: typeof segment.startMs === "number" ? segment.startMs : null,
          endMs: typeof segment.endMs === "number" ? segment.endMs : null,
          speaker: segment.speaker ?? void 0,
          transcriptTitle: segment.transcript?.title ?? void 0
        }))
      }));
    };
    getOpenAiMessages = ({
      history,
      systemPrompt,
      userMessage
    }) => {
      const trimmedHistory = history.slice(-6);
      const messages = [{ role: "system", content: systemPrompt }];
      trimmedHistory.forEach((item) => messages.push({ role: item.role, content: item.content }));
      messages.push({ role: "user", content: userMessage });
      return messages;
    };
    getSystemPrompt = ({
      contextType,
      projectName,
      transcriptName
    }) => {
      if (contextType === "TRANSCRIPT") {
        return `You are an interview intelligence assistant. Use timestamps and transcript snippets when you answer questions about "${transcriptName ?? "this transcript"}".`;
      }
      return `You are an insights assistant for the "${projectName ?? "project"}" workspace. Lean on the available transcript segments when summarizing or answering questions.`;
    };
    runChatConversation = async ({
      context,
      session,
      input,
      contextType
    }) => {
      if (!session?.id) throw new Error("Unauthorized");
      if (!session?.orgId) throw new Error("Missing organization context");
      const sudoContext = context.sudo();
      const messageText = input.message.trim();
      if (!messageText) throw new Error("Message cannot be empty");
      let targetProject = null;
      let targetTranscript = null;
      if (contextType === "TRANSCRIPT") {
        if (!input.transcriptId) throw new Error("Transcript ID is required");
        targetTranscript = await sudoContext.query.Transcript.findOne({
          where: { id: input.transcriptId },
          query: "id title project { id name org { id } } org { id }"
        });
        if (!targetTranscript) throw new Error("Transcript not found");
        if (!targetTranscript.project?.id) throw new Error("Transcript is missing project reference");
        targetProject = targetTranscript.project;
      } else {
        if (!input.projectId) throw new Error("Project ID is required");
        targetProject = await sudoContext.query.Project.findOne({
          where: { id: input.projectId },
          query: "id name org { id }"
        });
        if (!targetProject) throw new Error("Project not found");
      }
      if (!targetProject?.org?.id && !targetTranscript?.org?.id) {
        throw new Error("Missing organization context for chat target");
      }
      const projectId = targetProject?.id ?? null;
      const transcriptId = targetTranscript?.id ?? null;
      const segments = await fetchSegments({
        context,
        contextType,
        projectId: projectId ?? void 0,
        transcriptId: transcriptId ?? void 0,
        queryText: messageText
      });
      if (!segments.length) {
        throw new Error("No transcript segments found for this context yet");
      }
      const referenceSegments = segments.slice(0, 3);
      const segmentsForPrompt = segments.slice(0, 8);
      const segmentsText = segmentsForPrompt.map(buildSegmentDescription).join("\n");
      const systemPrompt = getSystemPrompt({
        contextType,
        projectName: targetProject?.name,
        transcriptName: targetTranscript?.title
      });
      let chatId = input.chatId ?? null;
      if (!chatId) {
        const existingChats = await sudoContext.query.Chat.findMany({
          where: {
            contextType,
            ...contextType === "TRANSCRIPT" ? { transcript: { id: { equals: transcriptId } } } : { project: { id: { equals: projectId } } }
          },
          orderBy: [{ createdAt: "desc" }],
          take: 1,
          query: "id"
        });
        chatId = existingChats?.[0]?.id ?? null;
      }
      if (!chatId) {
        const created = await sudoContext.db.Chat.createOne({
          data: {
            title: contextType === "TRANSCRIPT" ? `Transcript chat \u2022 ${targetTranscript?.title ?? "untitled"}` : `Project chat \u2022 ${targetProject?.name ?? "untitled"}`,
            contextType,
            org: { connect: { id: session.orgId } },
            ...projectId ? { project: { connect: { id: projectId } } } : {},
            ...transcriptId ? { transcript: { connect: { id: transcriptId } } } : {}
          }
        });
        if (!created?.id) throw new Error("Failed to create chat session");
        chatId = created.id;
      }
      const history = await fetchChatHistory(context, chatId);
      const systemMessages = getOpenAiMessages({
        history: history.map((item) => ({ role: item.role, content: item.content })),
        systemPrompt,
        userMessage: `${segmentsText}

Question: ${messageText}`
      });
      const openai = getOpenAIClient();
      const completion = await openai.chat.completions.create({
        model: openAiModel,
        messages: systemMessages,
        temperature: 0.25,
        max_tokens: 700
      });
      const answer = completion.choices?.[0]?.message?.content?.trim();
      if (!answer) {
        throw new Error("OpenAI did not return an answer");
      }
      await sudoContext.db.ChatMessage.createOne({
        data: {
          chat: { connect: { id: chatId } },
          role: "user",
          content: messageText
        }
      });
      await sudoContext.db.ChatMessage.createOne({
        data: {
          chat: { connect: { id: chatId } },
          role: "assistant",
          content: answer,
          ...referenceSegments.length ? { segments: { connect: referenceSegments.map((segment) => ({ id: segment.id })) } } : {}
        }
      });
      const updatedHistory = await fetchChatHistory(context, chatId);
      return {
        chatId,
        answer,
        messages: updatedHistory,
        references: referenceSegments.map(mapSegmentReference)
      };
    };
    loadChatHistory = fetchChatHistory;
  }
});

// schemas/extensions/Chat.ts
var import_core8, ChatSegmentReference, ChatMessageResult, ChatHistoryResult, ChatMutationResult, TranscriptChatInput, ProjectChatInput, getSession, findLatestChat, ChatExtension;
var init_Chat2 = __esm({
  "schemas/extensions/Chat.ts"() {
    "use strict";
    import_core8 = require("@keystone-6/core");
    init_chat();
    ChatSegmentReference = import_core8.graphql.object()({
      name: "ChatSegmentReference",
      fields: {
        id: import_core8.graphql.field({ type: import_core8.graphql.nonNull(import_core8.graphql.ID) }),
        text: import_core8.graphql.field({ type: import_core8.graphql.nonNull(import_core8.graphql.String) }),
        startMs: import_core8.graphql.field({ type: import_core8.graphql.Int }),
        endMs: import_core8.graphql.field({ type: import_core8.graphql.Int }),
        speaker: import_core8.graphql.field({ type: import_core8.graphql.String }),
        transcriptTitle: import_core8.graphql.field({ type: import_core8.graphql.String })
      }
    });
    ChatMessageResult = import_core8.graphql.object()({
      name: "ChatMessageResult",
      fields: {
        id: import_core8.graphql.field({ type: import_core8.graphql.nonNull(import_core8.graphql.ID) }),
        role: import_core8.graphql.field({ type: import_core8.graphql.nonNull(import_core8.graphql.String) }),
        content: import_core8.graphql.field({ type: import_core8.graphql.nonNull(import_core8.graphql.String) }),
        createdAt: import_core8.graphql.field({ type: import_core8.graphql.String }),
        segments: import_core8.graphql.field({ type: import_core8.graphql.nonNull(import_core8.graphql.list(import_core8.graphql.nonNull(ChatSegmentReference))) })
      }
    });
    ChatHistoryResult = import_core8.graphql.object()({
      name: "ChatHistoryResult",
      fields: {
        chatId: import_core8.graphql.field({ type: import_core8.graphql.ID }),
        messages: import_core8.graphql.field({ type: import_core8.graphql.nonNull(import_core8.graphql.list(import_core8.graphql.nonNull(ChatMessageResult))) })
      }
    });
    ChatMutationResult = import_core8.graphql.object()({
      name: "ChatMutationResult",
      fields: {
        chatId: import_core8.graphql.field({ type: import_core8.graphql.nonNull(import_core8.graphql.ID) }),
        answer: import_core8.graphql.field({ type: import_core8.graphql.nonNull(import_core8.graphql.String) }),
        messages: import_core8.graphql.field({ type: import_core8.graphql.nonNull(import_core8.graphql.list(import_core8.graphql.nonNull(ChatMessageResult))) }),
        references: import_core8.graphql.field({ type: import_core8.graphql.nonNull(import_core8.graphql.list(import_core8.graphql.nonNull(ChatSegmentReference))) })
      }
    });
    TranscriptChatInput = import_core8.graphql.inputObject({
      name: "ChatTranscriptInput",
      fields: {
        chatId: import_core8.graphql.arg({ type: import_core8.graphql.ID }),
        transcriptId: import_core8.graphql.arg({ type: import_core8.graphql.nonNull(import_core8.graphql.ID) }),
        message: import_core8.graphql.arg({ type: import_core8.graphql.nonNull(import_core8.graphql.String) })
      }
    });
    ProjectChatInput = import_core8.graphql.inputObject({
      name: "ChatProjectInput",
      fields: {
        chatId: import_core8.graphql.arg({ type: import_core8.graphql.ID }),
        projectId: import_core8.graphql.arg({ type: import_core8.graphql.nonNull(import_core8.graphql.ID) }),
        message: import_core8.graphql.arg({ type: import_core8.graphql.nonNull(import_core8.graphql.String) })
      }
    });
    getSession = (context) => {
      const session = context.session;
      if (!session?.id) throw new Error("Unauthorized");
      return session;
    };
    findLatestChat = async ({
      context,
      where
    }) => {
      const chats = await context.sudo().query.Chat.findMany({
        where,
        orderBy: [{ createdAt: "desc" }],
        take: 1,
        query: "id"
      });
      const record = chats?.[0];
      if (!record?.id) return null;
      const history = await loadChatHistory(context, record.id);
      return { chatId: record.id, messages: history };
    };
    ChatExtension = (base) => {
      return {
        query: {
          chatTranscriptHistory: import_core8.graphql.field({
            type: import_core8.graphql.nonNull(ChatHistoryResult),
            args: {
              transcriptId: import_core8.graphql.arg({ type: import_core8.graphql.nonNull(import_core8.graphql.ID) })
            },
            resolve: async (_root, { transcriptId }, context) => {
              const session = getSession(context);
              const history = await findLatestChat({
                context,
                where: {
                  contextType: "TRANSCRIPT",
                  transcript: { id: { equals: transcriptId } },
                  org: { id: { equals: session.orgId } }
                }
              });
              if (!history) return { chatId: null, messages: [] };
              return history;
            }
          }),
          chatProjectHistory: import_core8.graphql.field({
            type: import_core8.graphql.nonNull(ChatHistoryResult),
            args: {
              projectId: import_core8.graphql.arg({ type: import_core8.graphql.nonNull(import_core8.graphql.ID) })
            },
            resolve: async (_root, { projectId }, context) => {
              const session = getSession(context);
              const history = await findLatestChat({
                context,
                where: {
                  contextType: "PROJECT",
                  project: { id: { equals: projectId } },
                  org: { id: { equals: session.orgId } }
                }
              });
              if (!history) return { chatId: null, messages: [] };
              return history;
            }
          })
        },
        mutation: {
          chatTranscript: import_core8.graphql.field({
            type: import_core8.graphql.nonNull(ChatMutationResult),
            args: {
              input: import_core8.graphql.arg({ type: import_core8.graphql.nonNull(TranscriptChatInput) })
            },
            resolve: async (_root, { input }, context) => {
              const session = getSession(context);
              return runChatConversation({
                context,
                session,
                contextType: "TRANSCRIPT",
                input: {
                  chatId: input.chatId ?? null,
                  transcriptId: input.transcriptId,
                  message: input.message
                }
              });
            }
          }),
          chatProject: import_core8.graphql.field({
            type: import_core8.graphql.nonNull(ChatMutationResult),
            args: {
              input: import_core8.graphql.arg({ type: import_core8.graphql.nonNull(ProjectChatInput) })
            },
            resolve: async (_root, { input }, context) => {
              const session = getSession(context);
              return runChatConversation({
                context,
                session,
                contextType: "PROJECT",
                input: {
                  chatId: input.chatId ?? null,
                  projectId: input.projectId,
                  message: input.message
                }
              });
            }
          })
        }
      };
    };
  }
});

// schemas/extensions/TranscriptIngestion.ts
var import_core9, TIMESTAMP_RE, parseTimestamp, parseLines, parseSrt, TranscriptIngestion;
var init_TranscriptIngestion = __esm({
  "schemas/extensions/TranscriptIngestion.ts"() {
    "use strict";
    import_core9 = require("@keystone-6/core");
    TIMESTAMP_RE = /(?<hours>\d{2}):(?<minutes>\d{2}):(?<seconds>\d{2}),(?<ms>\d{3})/;
    parseTimestamp = (value) => {
      const match = TIMESTAMP_RE.exec(value);
      if (!match) throw new Error(`Invalid timestamp: ${value}`);
      const { hours, minutes, seconds, ms } = match.groups;
      return Number(hours) * 36e5 + Number(minutes) * 6e4 + Number(seconds) * 1e3 + Number(ms);
    };
    parseLines = (block) => block.split("\n").map((line) => line.trim()).filter(Boolean);
    parseSrt = (srt) => {
      const normalized = srt.replace(/\r\n/g, "\n").trim();
      if (!normalized) return [];
      const groups = normalized.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
      return groups.map((block) => {
        const lines = parseLines(block);
        if (lines.length < 2) return null;
        const [indexLine, timeLine, ...textLines] = lines;
        const timeMatch = timeLine.match(/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/);
        if (!timeMatch) throw new Error(`Invalid timecode line: ${timeLine}`);
        const startMs = parseTimestamp(timeMatch[1]);
        const endMs = parseTimestamp(timeMatch[2]);
        if (endMs <= startMs) throw new Error("Segment end must be greater than start");
        const textValue = textLines.join(" ").trim();
        if (!textValue) return null;
        const speakerMatch = textValue.match(/^([A-Za-z0-9 ]+):\s*(.+)$/);
        const speaker = speakerMatch ? speakerMatch[1] : void 0;
        const cleanedText = speakerMatch ? speakerMatch[2] : textValue;
        const isMetadata = /^\[.*\]$/.test(cleanedText);
        return {
          index: Number.parseInt(indexLine, 10) || 0,
          startMs,
          endMs,
          durationMs: endMs - startMs,
          text: cleanedText,
          speaker,
          isMetadata
        };
      }).reduce((acc, segment, idx) => {
        if (!segment) return acc;
        const normalizedIndex = segment.index || idx + 1;
        acc.push({ ...segment, index: normalizedIndex });
        return acc;
      }, []);
    };
    TranscriptIngestion = (base) => {
      const IngestInput = import_core9.graphql.inputObject({
        name: "IngestTranscriptInput",
        fields: {
          projectId: import_core9.graphql.arg({ type: import_core9.graphql.nonNull(import_core9.graphql.ID) }),
          title: import_core9.graphql.arg({ type: import_core9.graphql.nonNull(import_core9.graphql.String) }),
          intervieweeName: import_core9.graphql.arg({ type: import_core9.graphql.String }),
          sourceUrl: import_core9.graphql.arg({ type: import_core9.graphql.String }),
          language: import_core9.graphql.arg({ type: import_core9.graphql.String }),
          notes: import_core9.graphql.arg({ type: import_core9.graphql.String }),
          srt: import_core9.graphql.arg({ type: import_core9.graphql.nonNull(import_core9.graphql.String) })
        }
      });
      const Result = import_core9.graphql.object()({
        name: "IngestTranscriptResult",
        fields: {
          transcriptId: import_core9.graphql.field({ type: import_core9.graphql.nonNull(import_core9.graphql.ID) }),
          segmentsCount: import_core9.graphql.field({ type: import_core9.graphql.nonNull(import_core9.graphql.Int) }),
          projectId: import_core9.graphql.field({ type: import_core9.graphql.nonNull(import_core9.graphql.ID) })
        }
      });
      return {
        mutation: {
          ingestTranscript: import_core9.graphql.field({
            type: import_core9.graphql.nonNull(Result),
            args: { input: import_core9.graphql.arg({ type: import_core9.graphql.nonNull(IngestInput) }) },
            async resolve(_root, { input }, context) {
              const session = context.session;
              if (!session?.id) throw new Error("Unauthorized");
              if (!session.orgId) throw new Error("Missing organization context");
              const sudoContext = context.sudo();
              const project = await sudoContext.query.Project.findOne({
                where: { id: input.projectId },
                query: "id org { id }"
              });
              if (!project) throw new Error("Project not found");
              if (!project.org?.id || project.org.id !== session.orgId) throw new Error("Project not in your organization");
              const segments = parseSrt(input.srt);
              if (!segments.length) throw new Error("No valid segments detected");
              const transcript = await sudoContext.db.Transcript.createOne({
                data: {
                  title: input.title.trim(),
                  intervieweeName: input.intervieweeName?.trim() || null,
                  sourceUrl: input.sourceUrl?.trim() || null,
                  language: input.language?.trim() || null,
                  notes: input.notes?.trim() || null,
                  project: { connect: { id: project.id } },
                  org: { connect: { id: project.org.id } }
                }
              });
              await Promise.all(
                segments.map(
                  (segment) => sudoContext.db.TranscriptSegment.createOne({
                    data: {
                      transcript: { connect: { id: transcript.id } },
                      index: segment.index,
                      startMs: segment.startMs,
                      endMs: segment.endMs,
                      durationMs: segment.durationMs,
                      text: segment.text,
                      speaker: segment.speaker,
                      isMetadata: segment.isMetadata
                    }
                  })
                )
              );
              return {
                transcriptId: transcript.id,
                segmentsCount: segments.length,
                projectId: project.id
              };
            }
          })
        }
      };
    };
  }
});

// schemas/extensions/index.ts
var SCHEMA_EXTENSIONS;
var init_extensions = __esm({
  "schemas/extensions/index.ts"() {
    "use strict";
    init_Chat2();
    init_TranscriptIngestion();
    SCHEMA_EXTENSIONS = [TranscriptIngestion, ChatExtension];
  }
});

// schemas/graphqlExtensions.ts
var import_core10, graphqlExtensions_default;
var init_graphqlExtensions = __esm({
  "schemas/graphqlExtensions.ts"() {
    "use strict";
    import_core10 = require("@keystone-6/core");
    init_extensions();
    graphqlExtensions_default = import_core10.graphql.extend((base) => SCHEMA_EXTENSIONS.map((item) => item(base)));
  }
});

// schemas/index.ts
var init_schemas2 = __esm({
  "schemas/index.ts"() {
    "use strict";
    init_schemas();
    init_graphqlExtensions();
  }
});

// context/keystoneContext.ts
var import_context, _keystoneContext, getKeystoneContext;
var init_keystoneContext = __esm({
  "context/keystoneContext.ts"() {
    "use strict";
    import_context = require("@keystone-6/core/context");
    _keystoneContext = globalThis._keystoneContext;
    getKeystoneContext = async () => {
      _keystoneContext = _keystoneContext || (0, import_context.getContext)((await Promise.resolve().then(() => (init_keystone(), keystone_exports))).default, await import("@prisma/client"));
      if (process.env.NODE_ENV !== "production") {
        globalThis._keystoneContext = _keystoneContext;
      }
      return _keystoneContext;
    };
  }
});

// domains/auth/google.ts
var getInformationFromProfile;
var init_google = __esm({
  "domains/auth/google.ts"() {
    "use strict";
    getInformationFromProfile = ({ profile }) => ({
      email: profile.email,
      firstName: profile.given_name,
      lastName: profile.family_name,
      pictureUrl: profile.picture
    });
  }
});

// lib/auth/extractUserData.ts
var import_lodash, extractUserData, extractUserData_default;
var init_extractUserData = __esm({
  "lib/auth/extractUserData.ts"() {
    "use strict";
    import_lodash = require("lodash");
    init_google();
    extractUserData = (provider, { user, profile }) => {
      const handler = {
        google: () => getInformationFromProfile({ profile }),
        credentials: () => (0, import_lodash.pick)(user, ["email", "firstName", "lastName"])
      }[provider];
      if (!handler) throw new Error(`Unknown provider: ${provider}`);
      const userData = handler();
      return { ...userData };
    };
    extractUserData_default = extractUserData;
  }
});

// lib/auth/providers.ts
var import_google2, providers, providers_default;
var init_providers = __esm({
  "lib/auth/providers.ts"() {
    "use strict";
    init_env();
    import_google2 = __toESM(require("next-auth/providers/google"));
    providers = [
      (0, import_google2.default)({
        clientId: env_default.GOOGLE_CLIENT_ID,
        clientSecret: env_default.GOOGLE_CLIENT_SECRET
      })
    ];
    providers_default = providers;
  }
});

// auth.ts
var import_cookie, import_free_email_domains2, import_next_auth, freeEmailDomainSet2, extractDomain, isSecureCookies, cookiePrefix, cookiesMappingConfig, cookies, nextAuthOptions, nextAuthSessionStrategy;
var init_auth = __esm({
  "auth.ts"() {
    "use strict";
    import_cookie = require("cookie");
    import_free_email_domains2 = __toESM(require("free-email-domains"));
    import_next_auth = require("next-auth");
    init_env();
    init_keystoneContext();
    init_userRole();
    init_extractUserData();
    init_providers();
    freeEmailDomainSet2 = new Set(import_free_email_domains2.default.map((domain) => domain.toLowerCase()));
    extractDomain = (email) => {
      if (!email) return null;
      const [, domain] = email.toLowerCase().split("@");
      return domain || null;
    };
    isSecureCookies = env_default.NEXTAUTH_URL.startsWith("https://");
    cookiePrefix = isSecureCookies ? "__Secure-" : "";
    cookiesMappingConfig = {
      sessionToken: `${cookiePrefix}next-auth.session-token`,
      callbackUrl: `${cookiePrefix}next-auth.callback-url`,
      csrfToken: `${cookiePrefix}next-auth.csrf-token`,
      pkceCodeVerifier: `${cookiePrefix}next-auth.pkce.code_verifier`,
      state: `${cookiePrefix}next-auth.state`,
      nonce: `${cookiePrefix}next-auth.nonce`
    };
    cookies = Object.fromEntries(
      Object.entries(cookiesMappingConfig).map(([key, name]) => [
        key,
        {
          name,
          options: {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: isSecureCookies,
            domain: env_default.COOKIE_DOMAIN
          }
        }
      ])
    );
    nextAuthOptions = {
      providers: providers_default,
      cookies,
      secret: env_default.SESSION_SECRET,
      pages: {
        error: "/api/auth/error"
      },
      callbacks: {
        async signIn({ user, account, profile }) {
          const sudoContext = (await getKeystoneContext()).sudo();
          if (!account) throw new Error("Missing account param");
          const { providerAccountId, provider } = account;
          const email = user.email?.toLowerCase();
          if (!email) return false;
          const domain = extractDomain(email);
          const nowIso = (/* @__PURE__ */ new Date()).toISOString();
          const extractedData = extractUserData_default(provider, { user, profile });
          const existingUsers = await sudoContext.query.User.findMany({
            where: { email: { equals: email } },
            query: "id org { id } project { id }"
          });
          const baseUserData = {
            email,
            firstName: extractedData.firstName ?? "",
            lastName: extractedData.lastName ?? "",
            avatarSocialUrl: extractedData.pictureUrl ?? "",
            role: "USER" /* USER */,
            providerAccountId,
            provider,
            rawAuth: {
              user,
              profile,
              account
            }
          };
          let matchedOrgId = null;
          if (domain && !freeEmailDomainSet2.has(domain)) {
            const orgs = await sudoContext.query.Organization.findMany({
              query: "id autojoinDomains"
            });
            const matchedOrg = orgs.find((candidate) => {
              const domains = Array.isArray(candidate.autojoinDomains) ? candidate.autojoinDomains : [];
              return domains.map((value) => value?.toLowerCase?.() || "").includes(domain);
            });
            matchedOrgId = matchedOrg?.id ?? null;
          }
          let projectToConnect = null;
          if (matchedOrgId) {
            const candidateProjects = await sudoContext.query.Project.findMany({
              where: { org: { id: { equals: matchedOrgId } } },
              take: 1,
              query: "id"
            });
            const primaryProject = candidateProjects?.[0];
            if (!primaryProject?.id) {
              throw new Error("Auto-join target organization does not have a project configured.");
            }
            projectToConnect = { id: primaryProject.id };
          }
          if (existingUsers.length > 0) {
            const existingUser = existingUsers[0];
            const { role: _, ...userDataWithoutRole } = baseUserData;
            await sudoContext.db.User.updateOne({
              where: { id: existingUser.id },
              data: {
                ...userDataWithoutRole,
                provisionedAt: nowIso,
                ...matchedOrgId && !existingUser.org?.id ? { org: { connect: { id: matchedOrgId } } } : {},
                ...projectToConnect && !existingUser.project?.id ? { project: { connect: projectToConnect } } : {}
              },
              query: "id"
            });
            return true;
          }
          const created = await sudoContext.db.User.createOne({
            data: {
              ...baseUserData,
              provisionedAt: nowIso,
              ...matchedOrgId ? { org: { connect: { id: matchedOrgId } } } : {},
              ...projectToConnect ? { project: { connect: projectToConnect } } : {}
            },
            query: "id"
          });
          return !!created?.id;
        },
        async jwt({ token, user, account, profile }) {
          if (!account) return token;
          const extracted = extractUserData_default(account.provider, { user, profile });
          const normalizedEmail = typeof extracted.email === "string" ? extracted.email.toLowerCase() : null;
          return {
            ...token,
            userData: {
              ...extracted,
              email: normalizedEmail ?? extracted.email ?? null
            }
          };
        },
        async session({ session, token }) {
          const userData = token.userData ?? {};
          const normalizedEmail = typeof userData?.email === "string" ? userData.email.toLowerCase() : null;
          if (!normalizedEmail) {
            throw new Error("Invalid session: no email found");
          }
          const sudoContext = (await getKeystoneContext()).sudo();
          const dbUser = await sudoContext.query.User.findMany({
            where: { email: { equals: normalizedEmail } },
            query: "id email org { id } project { id } role providerAccountId isActive seenAt avatarUrl displayName"
          });
          if (!dbUser || dbUser.length === 0) {
            throw new Error("User not found in database");
          }
          const user = dbUser[0];
          const isDeactivated = !user.isActive;
          const seenAt = (/* @__PURE__ */ new Date()).toISOString();
          await sudoContext.db.User.updateOne({
            where: { id: user.id },
            data: { seenAt },
            query: "id"
          });
          const emailDomain = extractDomain(user?.email ?? normalizedEmail);
          const isAutojoinDomainAllowed = !!(emailDomain && !freeEmailDomainSet2.has(emailDomain));
          const userRole = user?.role || "USER" /* USER */;
          return {
            ...session,
            id: user?.id,
            email: normalizedEmail,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            avatarUrl: user?.avatarUrl || null,
            displayName: user?.displayName || null,
            providerAccountId: user?.providerAccountId || null,
            orgId: user?.org?.id || null,
            projectId: user?.project?.id || null,
            role: userRole,
            emailDomain,
            isAutojoinDomainAllowed,
            isActive: user.isActive ?? true
          };
        },
        async redirect({ url: url2, baseUrl }) {
          if (url2.includes("/api/auth/error")) {
            return url2;
          }
          if (!url2.startsWith(env_default.APP_URL) && !url2.startsWith(baseUrl)) return baseUrl;
          return url2;
        }
      }
    };
    nextAuthSessionStrategy = {
      async get({ context }) {
        const { req, res } = context;
        const { headers } = req ?? {};
        if (!headers?.cookie || !res) return;
        const nextAuthSession = await (0, import_next_auth.getServerSession)(
          { headers, cookies: (0, import_cookie.parse)(headers.cookie) },
          res,
          nextAuthOptions
        );
        if (!nextAuthSession) return;
        return nextAuthSession;
      },
      // we don't need these as next-auth handle start and end for us
      async start() {
      },
      async end() {
      }
    };
  }
});

// lib/cors.ts
var cors_default;
var init_cors = __esm({
  "lib/cors.ts"() {
    "use strict";
    init_env();
    cors_default = {
      credentials: true,
      origin(origin, callback) {
        const allowed = [...env_default.ALLOWED_ORIGINS.split(","), env_default.APP_URL, env_default.BASE_URL].filter(
          Boolean
        );
        if (!origin || allowed.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
      }
    };
  }
});

// routes/example/index.ts
var import_express, example_default;
var init_example = __esm({
  "routes/example/index.ts"() {
    "use strict";
    import_express = __toESM(require("express"));
    example_default = (context) => {
      const router = import_express.default.Router({ mergeParams: true, caseSensitive: false });
      router.get("/", async (req, res) => {
        return res.redirect(301, "https://google.com");
      });
      return router;
    };
  }
});

// routes/index.ts
var import_express2, import_path, publicDir, extendExpressApp, routes_default;
var init_routes = __esm({
  "routes/index.ts"() {
    "use strict";
    import_express2 = __toESM(require("express"));
    import_path = __toESM(require("path"));
    init_example();
    publicDir = import_path.default.resolve(__dirname, "..", "public");
    extendExpressApp = async (app, context) => {
      app.use("/public", import_express2.default.static(publicDir));
      app.use("/example", example_default(context));
    };
    routes_default = extendExpressApp;
  }
});

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core11, keystone_default;
var init_keystone = __esm({
  "keystone.ts"() {
    import_core11 = require("@keystone-6/core");
    init_schemas2();
    init_env();
    init_auth();
    init_providers();
    init_cors();
    init_routes();
    keystone_default = (0, import_core11.config)({
      db: {
        provider: env_default.DATABASE_PROVIDER,
        url: env_default.DATABASE_URL
      },
      lists: schemas_default,
      session: nextAuthSessionStrategy,
      ui: {
        publicPages: [
          "/api/auth/csrf",
          "/api/auth/signin",
          "/api/auth/callback",
          "/api/auth/session",
          "/api/auth/providers",
          "/api/auth/signout",
          "/api/auth/error",
          ...providers_default.flatMap(({ id }) => [`/api/auth/signin/${id}`, `/api/auth/callback/${id}`])
        ],
        pageMiddleware: async ({ wasAccessAllowed }) => {
          if (wasAccessAllowed) return;
          return {
            kind: "redirect",
            to: "/api/auth/signin"
          };
        }
      },
      server: {
        cors: cors_default,
        extendExpressApp: routes_default
      },
      graphql: {
        path: "/api/graphql",
        debug: false,
        // use the builder-style GraphQL extensions
        extendGraphqlSchema: graphqlExtensions_default
      }
    });
  }
});
init_keystone();
//# sourceMappingURL=config.js.map
