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
var roleHierarchy, isAuthenticated, hasRole, isGod, isOrgAdmin, isLocationAdmin, isOrgAdminOrAbove, isAnyAdmin, isSelf, canEditOrgData, canEditLocationData, filterByUserLocation, filterByUserOrg, filterTimeTypesByUserLocation, filterPoliciesByUserLocation, canEditUserByRole;
var init_userRole = __esm({
  "domains/auth/userRole.ts"() {
    "use strict";
    roleHierarchy = {
      ["USER" /* USER */]: 0,
      ["LOCATION_ADMIN" /* LOCATION_ADMIN */]: 1,
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
    isLocationAdmin = hasRole(["LOCATION_ADMIN" /* LOCATION_ADMIN */]);
    isOrgAdminOrAbove = hasRole(["GOD" /* GOD */, "ORG_ADMIN" /* ORG_ADMIN */, "ORG_OWNER" /* ORG_OWNER */]);
    isAnyAdmin = hasRole(["GOD" /* GOD */, "ORG_ADMIN" /* ORG_ADMIN */, "ORG_OWNER" /* ORG_OWNER */, "LOCATION_ADMIN" /* LOCATION_ADMIN */]);
    isSelf = async ({ session }) => {
      if (!session?.id) return false;
      return { id: { equals: session.id } };
    };
    canEditOrgData = ({ session }) => isGod({ session }) || isOrgAdmin({ session });
    canEditLocationData = ({ session }) => isGod({ session }) || isOrgAdmin({ session }) || isLocationAdmin({ session });
    filterByUserLocation = async ({ session }) => {
      if (!session?.locationId) return false;
      return { location: { id: { equals: session.locationId } } };
    };
    filterByUserOrg = async ({ session }) => {
      if (!session?.orgId) return false;
      return { org: { id: { equals: session.orgId } } };
    };
    filterTimeTypesByUserLocation = async ({ session }) => {
      if (!session?.orgId || !session?.locationId) return false;
      return {
        org: { id: { equals: session.orgId } },
        timePolicies: {
          some: {
            locations: {
              some: {
                id: { equals: session.locationId }
              }
            }
          }
        }
      };
    };
    filterPoliciesByUserLocation = async ({ session }) => {
      if (!session?.orgId || !session?.locationId) return false;
      return {
        org: { id: { equals: session.orgId } },
        locations: {
          some: {
            id: { equals: session.locationId }
          }
        }
      };
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

// schemas/UserAllocation.ts
var import_core, import_fields, policyScopedFilter, eventTypeOptions, UserAllocation_default;
var init_UserAllocation = __esm({
  "schemas/UserAllocation.ts"() {
    "use strict";
    import_core = require("@keystone-6/core");
    import_fields = require("@keystone-6/core/fields");
    init_userRole();
    policyScopedFilter = async ({ session }) => {
      if (!isAuthenticated({ session })) return false;
      if (isGod({ session })) return true;
      if (isOrgAdmin({ session }) || isLocationAdmin({ session })) {
        const orgFilter = await filterByUserOrg({ session });
        if (!orgFilter) return false;
        return { timePolicy: orgFilter };
      }
      const policyFilter = await filterPoliciesByUserLocation({ session });
      if (!policyFilter) return false;
      return { timePolicy: policyFilter };
    };
    eventTypeOptions = [
      { label: "Manual", value: "MANUAL" },
      { label: "Policy Change (Retro)", value: "POLICY_CHANGE_RETRO" },
      { label: "Carryover Out", value: "CARRYOVER_OUT" },
      { label: "Carryover In", value: "CARRYOVER_IN" }
    ];
    UserAllocation_default = (0, import_core.list)({
      fields: {
        user: (0, import_fields.relationship)({
          ref: "User.allocations",
          many: false
        }),
        timePolicy: (0, import_fields.relationship)({
          ref: "TimePolicy.allocations",
          many: false
        }),
        timePolicyAllocation: (0, import_fields.relationship)({
          ref: "TimePolicyAllocation.events",
          many: false
        }),
        type: (0, import_fields.select)({
          type: "enum",
          options: eventTypeOptions,
          validation: { isRequired: true }
        }),
        effectiveAt: (0, import_fields.timestamp)({
          validation: { isRequired: true },
          defaultValue: { kind: "now" }
        }),
        amount: (0, import_fields.integer)({ validation: { isRequired: true } }),
        notes: (0, import_fields.text)(),
        createdAt: (0, import_fields.timestamp)({
          validation: { isRequired: true },
          defaultValue: { kind: "now" },
          ui: { itemView: { fieldMode: "read" }, listView: { fieldMode: "read" } }
        }),
        createdBy: (0, import_fields.relationship)({
          ref: "User",
          many: false,
          ui: { hideCreate: true }
        })
      },
      ui: {
        labelField: "effectiveAt",
        listView: {
          initialColumns: ["user", "timePolicy", "type", "amount", "effectiveAt"]
        }
      },
      access: {
        operation: {
          query: ({ session }) => isAuthenticated({ session }),
          create: canEditOrgData,
          update: canEditOrgData,
          delete: canEditOrgData
        },
        filter: {
          query: policyScopedFilter
        }
      },
      hooks: {
        resolveInput: {
          create: async ({ context, resolvedData }) => {
            const nextData = { ...resolvedData };
            if (!nextData.createdBy) {
              const userId = context.session?.id;
              if (userId) nextData.createdBy = { connect: { id: userId } };
            }
            return nextData;
          }
        },
        validateInput: async ({ operation, resolvedData, addValidationError }) => {
          if (operation !== "create") return;
          const userId = resolvedData.user?.connect?.id;
          if (!userId) addValidationError("User is required for allocation events.");
          const timePolicyId = resolvedData.timePolicy?.connect?.id;
          if (!timePolicyId) addValidationError("Time policy is required for allocation events.");
        }
      }
    });
  }
});

// domains/timePlan/rrule.ts
var WEEKDAY_NAMES, formatForRRule, buildRRule, WEEKDAY_MAP, BUSINESS_WEEKDAYS, toRRuleDate, buildWeeklyRule, buildMonthlyCalendarRule, buildMonthlyBusinessRule, buildTimePlanRRule;
var init_rrule = __esm({
  "domains/timePlan/rrule.ts"() {
    "use strict";
    WEEKDAY_NAMES = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
    formatForRRule = (value) => {
      if (!value) return null;
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return null;
      const withoutMillis = date.toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
      return withoutMillis;
    };
    buildRRule = ({
      repeatMode,
      repeatInterval,
      repeatDay,
      startAt,
      endAt
    }) => {
      if (!startAt || repeatMode === "SINGLE") return null;
      const parts = [];
      const interval = repeatInterval && repeatInterval > 1 ? repeatInterval : 1;
      const addFrequency = (freq) => {
        parts.push(`FREQ=${freq}`);
        if (interval > 1) parts.push(`INTERVAL=${interval}`);
      };
      switch (repeatMode) {
        case "WEEKLY": {
          addFrequency("WEEKLY");
          const dayIndex = typeof repeatDay === "number" && repeatDay >= 0 && repeatDay < WEEKDAY_NAMES.length ? repeatDay : null;
          if (dayIndex === null) return null;
          parts.push(`BYDAY=${WEEKDAY_NAMES[dayIndex]}`);
          break;
        }
        case "MONTHLY_CALENDAR": {
          addFrequency("MONTHLY");
          if (!repeatDay || repeatDay <= 0 || repeatDay > 31) return null;
          parts.push(`BYMONTHDAY=${repeatDay}`);
          break;
        }
        case "MONTHLY_BUSINESS": {
          addFrequency("MONTHLY");
          const businessDays = ["MO", "TU", "WE", "TH", "FR"];
          if (!repeatDay || repeatDay === 0 || Math.abs(repeatDay) > 31) return null;
          parts.push(`BYDAY=${businessDays.join(",")}`);
          parts.push(`BYSETPOS=${repeatDay}`);
          break;
        }
        default:
          return null;
      }
      const dtStart = formatForRRule(startAt);
      if (dtStart) parts.push(`DTSTART=${dtStart}`);
      const until = formatForRRule(endAt);
      if (until) parts.push(`UNTIL=${until}`);
      return parts.join(";");
    };
    WEEKDAY_MAP = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
    BUSINESS_WEEKDAYS = ["MO", "TU", "WE", "TH", "FR"];
    toRRuleDate = (value) => {
      if (!value) return null;
      const date = typeof value === "string" ? new Date(value) : value;
      if (Number.isNaN(date.getTime())) return null;
      return `${date.toISOString().split(".")[0].replace(/[-:]/g, "")}Z`;
    };
    buildWeeklyRule = (day, interval = 1) => {
      const freqParts = ["FREQ=WEEKLY", `INTERVAL=${interval}`];
      if (typeof day === "number" && day >= 0 && day <= 6) freqParts.push(`BYDAY=${WEEKDAY_MAP[day]}`);
      return freqParts;
    };
    buildMonthlyCalendarRule = (day, interval = 1) => {
      if (typeof day !== "number" || day === 0) return null;
      return ["FREQ=MONTHLY", `INTERVAL=${interval}`, `BYMONTHDAY=${day}`];
    };
    buildMonthlyBusinessRule = (day, interval = 1) => {
      if (typeof day !== "number" || day === 0) return null;
      return ["FREQ=MONTHLY", `INTERVAL=${interval}`, `BYDAY=${BUSINESS_WEEKDAYS.join(",")}`, `BYSETPOS=${day}`];
    };
    buildTimePlanRRule = ({
      repeatMode = "SINGLE",
      repeatInterval,
      repeatDay,
      startAt,
      endAt
    }) => {
      if (repeatMode === "SINGLE") return null;
      const interval = repeatInterval && repeatInterval > 0 ? repeatInterval : 1;
      const dtStart = toRRuleDate(startAt);
      if (!dtStart) return null;
      let components = null;
      switch (repeatMode) {
        case "WEEKLY":
          components = buildWeeklyRule(repeatDay, interval);
          break;
        case "MONTHLY_CALENDAR":
          components = buildMonthlyCalendarRule(repeatDay, interval);
          break;
        case "MONTHLY_BUSINESS":
          components = buildMonthlyBusinessRule(repeatDay, interval);
          break;
        default:
          return null;
      }
      if (!components) return null;
      const endUntil = toRRuleDate(endAt);
      if (endUntil) components.push(`UNTIL=${endUntil}`);
      components.push(`DTSTART=${dtStart}`);
      return components.join(";");
    };
  }
});

// schemas/TimePlan.ts
var import_core2, import_fields2, import_core3, MAX_MONTHLY_CALENDAR_DAYS, MAX_MONTHLY_BUSINESS_DAYS, repeatModeOptions, toIsoString, getRRuleExceptionDates, TimePlan_default;
var init_TimePlan = __esm({
  "schemas/TimePlan.ts"() {
    "use strict";
    import_core2 = require("@keystone-6/core");
    import_fields2 = require("@keystone-6/core/fields");
    import_core3 = require("@keystone-6/core");
    init_userRole();
    init_rrule();
    init_rrule();
    MAX_MONTHLY_CALENDAR_DAYS = 31;
    MAX_MONTHLY_BUSINESS_DAYS = 23;
    repeatModeOptions = [
      { label: "Single", value: "SINGLE" },
      { label: "Weekly", value: "WEEKLY" },
      { label: "Monthly (Calendar Day)", value: "MONTHLY_CALENDAR" },
      { label: "Monthly (Business Day)", value: "MONTHLY_BUSINESS" }
    ];
    toIsoString = (value) => {
      if (!value) return null;
      const date = typeof value === "string" ? new Date(value) : value;
      if (Number.isNaN(date.getTime())) return null;
      return date.toISOString();
    };
    getRRuleExceptionDates = (item) => {
      const exceptions = item?.repeatExceptions ?? [];
      return exceptions.map((exception) => toIsoString(exception.startAt)).filter(Boolean);
    };
    TimePlan_default = (0, import_core2.list)({
      fields: {
        org: (0, import_fields2.relationship)({ ref: "Organization", many: false }),
        user: (0, import_fields2.relationship)({ ref: "User", many: false }),
        timeType: (0, import_fields2.relationship)({ ref: "TimeType.timePlans", many: false }),
        timePolicy: (0, import_fields2.relationship)({ ref: "TimePolicy.timePlans", many: false }),
        // Self-relationship for repeat patterns
        repeatOrigin: (0, import_fields2.relationship)({
          ref: "TimePlan.repeatExceptions",
          many: false,
          ui: { createView: { fieldMode: "hidden" }, itemView: { fieldMode: "read" } }
        }),
        repeatExceptions: (0, import_fields2.relationship)({
          ref: "TimePlan.repeatOrigin",
          many: true,
          ui: { createView: { fieldMode: "hidden" }, itemView: { fieldMode: "read" } }
        }),
        status: (0, import_fields2.select)({
          type: "enum",
          options: [
            { label: "Pending", value: "PENDING" },
            { label: "Approved", value: "APPROVED" },
            { label: "Declined", value: "DECLINED" }
          ],
          defaultValue: "PENDING"
        }),
        origin: (0, import_fields2.select)({
          type: "enum",
          options: [
            { label: "Direct", value: "DIRECT" },
            { label: "Repeater exception", value: "REPEATER_EXCEPTION" }
          ],
          defaultValue: "DIRECT",
          ui: {
            createView: { fieldMode: "hidden" },
            itemView: { fieldMode: "read" }
          }
        }),
        // Unified date/time fields
        startAt: (0, import_fields2.timestamp)({ validation: { isRequired: true } }),
        endAt: (0, import_fields2.timestamp)(),
        durationUnit: (0, import_fields2.select)({
          type: "enum",
          options: [
            { label: "Day", value: "DAY" },
            { label: "Hour", value: "HOUR" }
          ],
          defaultValue: "DAY",
          validation: { isRequired: true }
        }),
        duration: (0, import_fields2.float)({
          defaultValue: 0,
          ui: { createView: { fieldMode: "hidden" }, itemView: { fieldMode: "read" } }
        }),
        isAllDay: (0, import_fields2.checkbox)({ defaultValue: true }),
        // Repeat configuration
        repeatMode: (0, import_fields2.select)({
          type: "enum",
          options: repeatModeOptions,
          defaultValue: "SINGLE",
          validation: { isRequired: true }
        }),
        repeatInterval: (0, import_fields2.integer)({ defaultValue: 1, validation: { min: 1 } }),
        repeatDay: (0, import_fields2.integer)({
          ui: {
            description: "For weekly: 0-6 (Sun-Sat). For monthly calendar: day 1-30. For monthly business: positive from start, negative from end."
          }
        }),
        rrule: (0, import_fields2.virtual)({
          field: import_core3.graphql.field({
            type: import_core3.graphql.String,
            resolve: (item) => buildRRule({
              repeatMode: item.repeatMode,
              repeatInterval: item.repeatInterval,
              repeatDay: item.repeatDay,
              startAt: item.startAt,
              endAt: item.endAt
            })
          })
        }),
        rruleExDates: (0, import_fields2.virtual)({
          field: import_core3.graphql.field({
            type: import_core3.graphql.list(import_core3.graphql.nonNull(import_core3.graphql.String)),
            resolve: (item) => (item.repeatExceptions ?? []).map((exception) => exception?.startAt).filter(Boolean)
          })
        }),
        rrule: (0, import_fields2.virtual)({
          field: import_core3.graphql.field({
            type: import_core3.graphql.String,
            resolve: (item) => buildTimePlanRRule(item)
          })
        }),
        rruleExceptionDates: (0, import_fields2.virtual)({
          field: import_core3.graphql.field({
            type: import_core3.graphql.list(import_core3.graphql.nonNull(import_core3.graphql.String)),
            resolve: (item) => getRRuleExceptionDates(item)
          })
        }),
        // Virtual field for isRepeat
        isRepeat: (0, import_fields2.virtual)({
          field: import_core3.graphql.field({
            type: import_core3.graphql.Boolean,
            resolve: (item) => item.repeatMode !== "SINGLE"
          })
        }),
        // Virtual field for repeat day of week enum (when repeatMode is WEEKLY)
        repeatDayOfWeek: (0, import_fields2.virtual)({
          field: import_core3.graphql.field({
            type: import_core3.graphql.enum({
              name: "TimePlanRepeatDayOfWeek",
              values: import_core3.graphql.enumValues(["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"])
            }),
            resolve: (item) => {
              if (item.repeatMode !== "WEEKLY" || item.repeatDay == null) return null;
              const dayMap = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
              return dayMap[item.repeatDay] || null;
            }
          })
        }),
        reason: (0, import_fields2.text)(),
        decidedBy: (0, import_fields2.relationship)({ ref: "User", many: false }),
        decidedAt: (0, import_fields2.timestamp)()
      },
      ui: { labelField: "id" },
      access: {
        operation: {
          query: isAuthenticated,
          create: isAuthenticated,
          update: isAnyAdmin,
          delete: isAnyAdmin
        }
      },
      hooks: {
        validateInput: async ({ resolvedData, item, operation, addValidationError, context }) => {
          const { repeatMode, repeatDay, timePolicy } = resolvedData;
          if (repeatMode === "WEEKLY") {
            if (repeatDay == null || repeatDay < 0 || repeatDay > 6) {
              addValidationError("Weekly patterns require repeatDay to be between 0 (Sunday) and 6 (Saturday).");
            }
          }
          if (repeatMode === "MONTHLY_CALENDAR") {
            if (!repeatDay || repeatDay <= 0 || repeatDay >= MAX_MONTHLY_CALENDAR_DAYS) {
              addValidationError(
                `Monthly calendar patterns require repeatDay between 1 and ${MAX_MONTHLY_CALENDAR_DAYS - 1}.`
              );
            }
          }
          if (repeatMode === "MONTHLY_BUSINESS") {
            if (!repeatDay || repeatDay === 0 || Math.abs(repeatDay) > MAX_MONTHLY_BUSINESS_DAYS) {
              addValidationError(
                `Monthly business patterns require non-zero repeatDay with absolute value not exceeding ${MAX_MONTHLY_BUSINESS_DAYS}.`
              );
            }
          }
          if (repeatMode && repeatMode !== "SINGLE") {
            const timePolicyId = timePolicy?.connect?.id ? timePolicy.connect.id : operation === "update" && item && !timePolicy ? (() => {
              const existingItem = item;
              return existingItem.timePolicyId ? String(existingItem.timePolicyId) : null;
            })() : null;
            if (!timePolicyId) return;
            const policyDetails = await context.query.TimePolicy.findOne({
              where: { id: timePolicyId },
              query: "id isAllocationManaged"
            });
            if (policyDetails?.isAllocationManaged) {
              addValidationError("Repeat patterns can only be used with policies that have isAllocationManaged set to false.");
            }
          }
        }
      }
    });
  }
});

// schemas/TimeType.ts
var import_core4, import_fields3, typeColorOptions, typeIconOptions, TimeType_default;
var init_TimeType = __esm({
  "schemas/TimeType.ts"() {
    "use strict";
    import_core4 = require("@keystone-6/core");
    import_fields3 = require("@keystone-6/core/fields");
    init_userRole();
    typeColorOptions = [
      { label: "Blue", value: "BLUE" },
      { label: "Green", value: "GREEN" },
      { label: "Red", value: "RED" },
      { label: "Orange", value: "ORANGE" },
      { label: "Purple", value: "PURPLE" },
      { label: "Teal", value: "TEAL" },
      { label: "Yellow", value: "YELLOW" },
      { label: "Pink", value: "PINK" },
      { label: "Gray", value: "GRAY" }
    ];
    typeIconOptions = [
      { label: "Calendar", value: "CALENDAR" },
      { label: "Plane", value: "PLANE" },
      { label: "Medical Cross", value: "MEDICAL_CROSS" },
      { label: "Home", value: "HOME" },
      { label: "Beach", value: "BEACH" },
      { label: "Baby", value: "BABY" },
      { label: "Briefcase", value: "BRIEFCASE" },
      { label: "Star", value: "STAR" },
      { label: "Dot", value: "DOT" }
    ];
    TimeType_default = (0, import_core4.list)({
      fields: {
        name: (0, import_fields3.text)({ validation: { isRequired: true } }),
        isAway: (0, import_fields3.checkbox)({ defaultValue: true }),
        color: (0, import_fields3.select)({
          type: "enum",
          options: typeColorOptions,
          validation: { isRequired: true },
          defaultValue: typeColorOptions[0].value
        }),
        icon: (0, import_fields3.select)({
          type: "enum",
          options: typeIconOptions,
          validation: { isRequired: true },
          defaultValue: typeIconOptions[0].value
        }),
        org: (0, import_fields3.relationship)({ ref: "Organization.timeTypes", many: false }),
        timePolicies: (0, import_fields3.relationship)({ ref: "TimePolicy.timeType", many: true }),
        timePlans: (0, import_fields3.relationship)({ ref: "TimePlan.timeType", many: true })
      },
      ui: {
        labelField: "name"
      },
      access: {
        operation: {
          query: ({ session }) => isAuthenticated({ session }),
          create: canEditOrgData,
          update: canEditOrgData,
          delete: canEditOrgData
        },
        filter: {
          query: async ({ session }) => {
            if (!isAuthenticated({ session })) return false;
            if (isGod({ session })) return true;
            if (isOrgAdmin({ session })) return filterByUserOrg({ session });
            if (isLocationAdmin({ session })) return filterByUserOrg({ session });
            return filterTimeTypesByUserLocation({ session });
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
          const timeTypeId = String(item.id);
          const timeType = await sudoContext.query.TimeType.findOne({
            where: { id: timeTypeId },
            query: "id org { id }"
          });
          if (!timeType?.org?.id) {
            addValidationError("Time type is missing organization context.");
            return;
          }
          const orgTimeTypeCount = await sudoContext.db.TimeType.count({
            where: { org: { id: { equals: timeType.org.id } } }
          });
          if (orgTimeTypeCount <= 1) {
            addValidationError("Each organization must have at least one time type.");
          }
        },
        beforeOperation: {
          delete: async ({ item, context }) => {
            if (!item?.id) return;
            const sudoContext = context.sudo();
            const timeTypeId = String(item.id);
            const policies = await sudoContext.db.TimePolicy.findMany({
              where: { timeType: { id: { equals: timeTypeId } } }
            });
            for (const policy of policies) {
              await sudoContext.db.TimePolicy.deleteOne({ where: { id: policy.id } });
            }
          }
        }
      }
    });
  }
});

// schemas/Location.ts
var import_core5, import_fields4, import_tzdb, import_date_holidays, workingDayOptions, holidayCountryOptions, Location_default;
var init_Location = __esm({
  "schemas/Location.ts"() {
    "use strict";
    import_core5 = require("@keystone-6/core");
    import_fields4 = require("@keystone-6/core/fields");
    import_tzdb = require("@vvo/tzdb");
    import_date_holidays = __toESM(require("date-holidays"));
    init_userRole();
    workingDayOptions = [
      { label: "Monday", value: "MON" },
      { label: "Tuesday", value: "TUE" },
      { label: "Wednesday", value: "WED" },
      { label: "Thursday", value: "THU" },
      { label: "Friday", value: "FRI" },
      { label: "Saturday", value: "SAT" },
      { label: "Sunday", value: "SUN" }
    ];
    holidayCountryOptions = Object.entries(new import_date_holidays.default().getCountries("en")).map(([value, label]) => ({
      value,
      label
    }));
    Location_default = (0, import_core5.list)({
      fields: {
        name: (0, import_fields4.text)({ validation: { isRequired: true } }),
        org: (0, import_fields4.relationship)({ ref: "Organization.locations", many: false }),
        timePolicies: (0, import_fields4.relationship)({ ref: "TimePolicy.locations", many: true }),
        users: (0, import_fields4.relationship)({ ref: "User.location", many: true }),
        timezone: (0, import_fields4.select)({
          options: (0, import_tzdb.getTimeZones)().map(({ name, currentTimeFormat }) => ({ label: currentTimeFormat, value: name })),
          type: "string",
          ui: { description: "IANA timezone" }
        }),
        workingDays: (0, import_fields4.multiselect)({
          options: workingDayOptions,
          defaultValue: workingDayOptions.slice(0, 5).map((option) => option.value),
          type: "enum",
          ui: { description: "Working days of the week" }
        }),
        weekStartDay: (0, import_fields4.select)({
          options: workingDayOptions,
          type: "enum",
          defaultValue: workingDayOptions[0].value,
          validation: { isRequired: true },
          ui: { description: "First day of the work week" }
        }),
        holidayCountry: (0, import_fields4.select)({
          options: holidayCountryOptions,
          type: "string",
          defaultValue: "US",
          validation: { isRequired: true },
          ui: { description: "Select a country to apply national holidays" }
        })
      },
      ui: {
        labelField: "name"
      },
      access: {
        operation: {
          query: ({ session }) => isAuthenticated({ session }),
          create: canEditOrgData,
          update: canEditLocationData,
          delete: canEditOrgData
        },
        item: {
          update: async ({ session, item, context }) => {
            if (isGod({ session })) return true;
            if (!item?.id) return false;
            const targetLocationId = String(item.id);
            const sudoContext = context.sudo();
            const location = await sudoContext.query.Location.findOne({
              where: { id: targetLocationId },
              query: "id org { id }"
            });
            if (!location) return false;
            if (isOrgAdmin({ session })) {
              if (!session?.orgId) return false;
              return location.org?.id ? String(location.org.id) === String(session.orgId) : false;
            }
            if (isLocationAdmin({ session })) {
              if (!session?.locationId) return false;
              return targetLocationId === String(session.locationId);
            }
            return false;
          },
          delete: async ({ session, item, context }) => {
            if (isGod({ session })) return true;
            if (!isOrgAdmin({ session })) return false;
            if (!session?.orgId || !item?.id) return false;
            const sudoContext = context.sudo();
            const location = await sudoContext.query.Location.findOne({
              where: { id: String(item.id) },
              query: "id org { id }"
            });
            if (!location?.org?.id) return false;
            return String(location.org.id) === String(session.orgId);
          }
        },
        filter: {
          query: async ({ session }) => {
            if (!isAuthenticated({ session })) return false;
            if (isGod({ session })) return true;
            if (isOrgAdmin({ session })) return filterByUserOrg({ session });
            if (!session?.locationId) return false;
            return { id: { equals: session.locationId } };
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
          const locationId = String(item.id);
          const location = await sudoContext.query.Location.findOne({
            where: { id: locationId },
            query: "id org { id }"
          });
          if (!location?.org?.id) {
            addValidationError("Location is missing organization context.");
            return;
          }
          const [orgLocationCount, userCount] = await Promise.all([
            sudoContext.db.Location.count({ where: { org: { id: { equals: location.org.id } } } }),
            sudoContext.db.User.count({ where: { location: { id: { equals: locationId } } } })
          ]);
          if (userCount > 0) {
            addValidationError("You cannot delete a location that still has users.");
            return;
          }
          if (orgLocationCount <= 1) {
            addValidationError("Each organization must have at least one location.");
          }
        }
      }
    });
  }
});

// schemas/Organization.ts
var import_core6, import_fields5, import_free_email_domains, freeEmailDomainSet, normalizeDomains, Organization_default;
var init_Organization = __esm({
  "schemas/Organization.ts"() {
    "use strict";
    import_core6 = require("@keystone-6/core");
    import_fields5 = require("@keystone-6/core/fields");
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
    Organization_default = (0, import_core6.list)({
      fields: {
        name: (0, import_fields5.text)({ validation: { isRequired: true } }),
        autojoinDomains: (0, import_fields5.json)({
          defaultValue: [],
          ui: {
            description: 'Array of domains allowed to auto-join (e.g. ["example.com"])'
          }
        }),
        users: (0, import_fields5.relationship)({ ref: "User.org", many: true }),
        timePolicies: (0, import_fields5.relationship)({ ref: "TimePolicy.org", many: true }),
        timeTypes: (0, import_fields5.relationship)({ ref: "TimeType.org", many: true }),
        locations: (0, import_fields5.relationship)({ ref: "Location.org", many: true })
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
                query: "id location { id }"
              });
              if (user?.location?.id) {
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

// schemas/TimePolicy.ts
var import_core7, import_fields6, TimePolicy_default;
var init_TimePolicy = __esm({
  "schemas/TimePolicy.ts"() {
    "use strict";
    import_core7 = require("@keystone-6/core");
    import_fields6 = require("@keystone-6/core/fields");
    init_userRole();
    TimePolicy_default = (0, import_core7.list)({
      fields: {
        name: (0, import_fields6.text)({ validation: { isRequired: true } }),
        org: (0, import_fields6.relationship)({ ref: "Organization.timePolicies", many: false }),
        timeType: (0, import_fields6.relationship)({ ref: "TimeType.timePolicies", many: false }),
        locations: (0, import_fields6.relationship)({ ref: "Location.timePolicies", many: true }),
        isAllocationManaged: (0, import_fields6.checkbox)({ defaultValue: true }),
        isApprovable: (0, import_fields6.checkbox)({ defaultValue: true }),
        timePolicyAllocations: (0, import_fields6.relationship)({ ref: "TimePolicyAllocation.timePolicy", many: true }),
        allocations: (0, import_fields6.relationship)({ ref: "UserAllocation.timePolicy", many: true }),
        timePlans: (0, import_fields6.relationship)({ ref: "TimePlan.timePolicy", many: true })
      },
      ui: {
        labelField: "name"
      },
      access: {
        operation: {
          query: ({ session }) => isAuthenticated({ session }),
          create: canEditOrgData,
          update: canEditOrgData,
          delete: canEditOrgData
        },
        filter: {
          query: async ({ session }) => {
            if (!isAuthenticated({ session })) return false;
            if (isGod({ session })) return true;
            if (isOrgAdmin({ session })) return filterByUserOrg({ session });
            if (isLocationAdmin({ session })) return filterByUserOrg({ session });
            return filterPoliciesByUserLocation({ session });
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
        validateInput: async ({ operation, resolvedData, item, addValidationError, context }) => {
          const session = context?.session ?? null;
          const userIsGod = isGod({ session });
          if (operation === "update" && !userIsGod && Object.prototype.hasOwnProperty.call(resolvedData, "isAllocationManaged") && resolvedData.isAllocationManaged !== item?.isAllocationManaged) {
            addValidationError("isAllocationManaged cannot be changed after creation.");
          }
          if (operation === "update" && !userIsGod && Object.prototype.hasOwnProperty.call(resolvedData, "timeType")) {
            const existingTimeTypeId = item?.timeTypeId ?? item?.timeType?.id ?? null;
            const incoming = resolvedData.timeType;
            const connectId = incoming?.connect?.id ?? null;
            const disconnectFlag = typeof incoming?.disconnect !== "undefined" ? incoming.disconnect : incoming === null ? true : false;
            const disconnectAll = incoming?.disconnectAll;
            const isChanging = disconnectFlag || disconnectAll || connectId !== null && connectId !== existingTimeTypeId || connectId === null && typeof incoming !== "undefined" && incoming !== null && !incoming?.connect;
            if (isChanging) addValidationError("timeType cannot be changed after creation.");
          }
        },
        validateDelete: async ({ item, context, addValidationError }) => {
          if (!item?.id) return;
          const sudoContext = context.sudo();
          const timePolicyId = String(item.id);
          const timePolicy = await sudoContext.query.TimePolicy.findOne({
            where: { id: timePolicyId },
            query: "id org { id }"
          });
          if (!timePolicy?.org?.id) {
            addValidationError("Time policy is missing organization context.");
            return;
          }
          const orgTimePolicyCount = await sudoContext.db.TimePolicy.count({
            where: { org: { id: { equals: timePolicy.org.id } } }
          });
          if (orgTimePolicyCount <= 1) {
            addValidationError("Each organization must have at least one time policy.");
          }
        }
      }
    });
  }
});

// schemas/TimePolicyAllocation.ts
var import_core8, import_fields7, policyFilterForSession, TimePolicyAllocation_default;
var init_TimePolicyAllocation = __esm({
  "schemas/TimePolicyAllocation.ts"() {
    "use strict";
    import_core8 = require("@keystone-6/core");
    import_fields7 = require("@keystone-6/core/fields");
    init_userRole();
    policyFilterForSession = async ({ session }) => {
      if (!isAuthenticated({ session })) return false;
      if (isGod({ session })) return true;
      if (isOrgAdmin({ session }) || isLocationAdmin({ session })) {
        const orgFilter = await filterByUserOrg({ session });
        if (!orgFilter) return false;
        return { timePolicy: orgFilter };
      }
      const policyFilter = await filterPoliciesByUserLocation({ session });
      if (!policyFilter) return false;
      return { timePolicy: policyFilter };
    };
    TimePolicyAllocation_default = (0, import_core8.list)({
      fields: {
        timePolicy: (0, import_fields7.relationship)({
          ref: "TimePolicy.timePolicyAllocations",
          many: false,
          ui: { hideCreate: true }
        }),
        effectiveAt: (0, import_fields7.timestamp)({
          validation: { isRequired: true },
          defaultValue: { kind: "now" },
          isIndexed: true
        }),
        allocation: (0, import_fields7.integer)({ validation: { isRequired: true }, defaultValue: 0 }),
        carryoverLimit: (0, import_fields7.integer)({ validation: { isRequired: true }, defaultValue: 0 }),
        overdraftLimit: (0, import_fields7.integer)({ validation: { isRequired: true }, defaultValue: 0 }),
        notes: (0, import_fields7.text)(),
        createdAt: (0, import_fields7.timestamp)({
          validation: { isRequired: true },
          defaultValue: { kind: "now" },
          ui: { itemView: { fieldMode: "read" }, listView: { fieldMode: "read" } }
        }),
        events: (0, import_fields7.relationship)({ ref: "UserAllocation.timePolicyAllocation", many: true }),
        createdBy: (0, import_fields7.relationship)({
          ref: "User",
          many: false,
          ui: { hideCreate: true }
        })
      },
      ui: {
        labelField: "effectiveAt",
        listView: {
          initialColumns: ["timePolicy", "effectiveAt", "allocation", "carryoverLimit", "overdraftLimit"]
        }
      },
      access: {
        operation: {
          query: ({ session }) => isAuthenticated({ session }),
          create: canEditOrgData,
          update: canEditOrgData,
          delete: canEditOrgData
        },
        filter: {
          query: policyFilterForSession
        }
      },
      hooks: {
        resolveInput: {
          create: async ({ context, resolvedData }) => {
            const nextData = { ...resolvedData };
            if (!nextData.createdBy) {
              const userId = context.session?.id;
              if (userId) {
                nextData.createdBy = { connect: { id: userId } };
              }
            }
            return nextData;
          }
        },
        validateInput: async ({ operation, resolvedData, addValidationError }) => {
          if (operation !== "create") return;
          if (!resolvedData.timePolicy?.connect?.id) {
            addValidationError("Time policy must be provided when creating a TimePolicyAllocation.");
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

// schemas/User.ts
var import_cloudinary, import_core9, import_access, import_fields8, import_crypto, validation, socialLoginOpts, userRoleOptions, User_default;
var init_User = __esm({
  "schemas/User.ts"() {
    "use strict";
    import_cloudinary = require("@keystone-6/cloudinary");
    import_core9 = require("@keystone-6/core");
    import_access = require("@keystone-6/core/access");
    import_fields8 = require("@keystone-6/core/fields");
    import_crypto = require("crypto");
    init_env();
    init_userRole();
    validation = { isRequired: true };
    socialLoginOpts = [{ label: "Google", value: "google" }];
    userRoleOptions = [
      { label: "User", value: "USER" /* USER */ },
      { label: "Location Admin", value: "LOCATION_ADMIN" /* LOCATION_ADMIN */ },
      { label: "Organization Admin", value: "ORG_ADMIN" /* ORG_ADMIN */ },
      { label: "Organization Owner", value: "ORG_OWNER" /* ORG_OWNER */ },
      { label: "System Admin", value: "GOD" /* GOD */ }
    ];
    User_default = (0, import_core9.list)({
      fields: {
        avatarSocialUrl: (0, import_fields8.text)({
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
        avatarUrl: (0, import_fields8.virtual)({
          field: import_core9.graphql.field({
            type: import_core9.graphql.String,
            resolve: (item) => item.avatarUploaded?.publicUrl || item.avatarSocialUrl || ""
          })
        }),
        email: (0, import_fields8.text)({
          validation,
          isIndexed: true,
          isFilterable: true
        }),
        firstName: (0, import_fields8.text)(),
        lastName: (0, import_fields8.text)(),
        displayName: (0, import_fields8.virtual)({
          field: import_core9.graphql.field({
            type: import_core9.graphql.String,
            resolve: (item) => {
              const name = [item.firstName, item.lastName].filter(Boolean).join(" ");
              return name || item.email || "";
            }
          })
        }),
        role: (0, import_fields8.select)({
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
        providerAccountId: (0, import_fields8.text)({
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
        provider: (0, import_fields8.select)({
          type: "enum",
          validation,
          options: socialLoginOpts,
          access: { ...(0, import_access.allOperations)(import_access.denyAll), read: isGod, create: isGod },
          defaultValue: socialLoginOpts[0].value
        }),
        rawAuth: (0, import_fields8.json)({
          access: { ...(0, import_access.allOperations)(import_access.denyAll), read: isGod, create: isGod },
          ui: {
            createView: { fieldMode: "hidden" },
            itemView: { fieldMode: "hidden" }
          }
        }),
        org: (0, import_fields8.relationship)({
          ref: "Organization.users",
          many: false,
          access: {
            ...(0, import_access.allOperations)(import_access.denyAll),
            read: isAuthenticated,
            create: isAnyAdmin,
            update: isOrgAdminOrAbove
          }
        }),
        location: (0, import_fields8.relationship)({
          ref: "Location.users",
          many: false,
          access: {
            ...(0, import_access.allOperations)(import_access.denyAll),
            read: isAuthenticated,
            create: isAnyAdmin,
            update: isAnyAdmin
          }
        }),
        startDate: (0, import_fields8.timestamp)(),
        allocations: (0, import_fields8.relationship)({ ref: "UserAllocation.user", many: true }),
        isActive: (0, import_fields8.checkbox)({
          defaultValue: true,
          access: {
            ...(0, import_access.allOperations)(import_access.denyAll),
            read: isAuthenticated,
            create: isAnyAdmin,
            update: isOrgAdminOrAbove
          }
        }),
        createdAt: (0, import_fields8.timestamp)({
          defaultValue: { kind: "now" },
          ui: {
            createView: { fieldMode: "hidden" },
            itemView: { fieldMode: "read" }
          }
        }),
        provisionedAt: (0, import_fields8.timestamp)({
          ui: {
            createView: { fieldMode: "hidden" },
            itemView: { fieldMode: "read" }
          }
        }),
        updatedAt: (0, import_fields8.timestamp)({
          db: { updatedAt: true },
          ui: {
            createView: { fieldMode: "hidden" },
            itemView: { fieldMode: "read" }
          }
        }),
        seenAt: (0, import_fields8.timestamp)({
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
              query: "id org { id } location { id } role"
            });
            if (!userWithRelations) return false;
            if (!canEditUserByRole(session?.role, userWithRelations.role))
              return false;
            if (isOrgAdmin({ session })) {
              if (!session?.orgId) return false;
              if (!userWithRelations.org?.id) return false;
              return String(userWithRelations.org.id) === String(session.orgId);
            }
            if (isLocationAdmin({ session })) {
              if (!session?.locationId || !session?.orgId) return false;
              if (!userWithRelations.location?.id || !userWithRelations.org?.id) return false;
              return String(userWithRelations.location.id) === String(session.locationId) && String(userWithRelations.org.id) === String(session.orgId);
            }
            return false;
          }
        },
        filter: {
          query: async ({ session }) => {
            if (!isAuthenticated({ session })) return false;
            if (isGod({ session })) return true;
            if (isOrgAdmin({ session })) return filterByUserOrg({ session });
            if (isLocationAdmin({ session })) return filterByUserLocation({ session });
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
            query: "id org { id } location { id } role"
          }) : null;
          const session = context.session;
          const isEditingSelf = operation === "update" && existingUser && session?.id && String(existingUser.id) === String(session.id);
          isEditingSelf && resolvedData.role && addValidationError("You cannot edit your own role.");
          isEditingSelf && resolvedData.isActive !== void 0 && addValidationError("You cannot edit your own active status.");
          isEditingSelf && resolvedData.location && session?.role !== "ORG_ADMIN" /* ORG_ADMIN */ && session?.role !== "ORG_OWNER" /* ORG_OWNER */ && addValidationError("You cannot edit your own location.");
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
              ["LOCATION_ADMIN" /* LOCATION_ADMIN */]: [...baseRoles, "LOCATION_ADMIN" /* LOCATION_ADMIN */],
              ["ORG_ADMIN" /* ORG_ADMIN */]: [...baseRoles, "LOCATION_ADMIN" /* LOCATION_ADMIN */, "ORG_ADMIN" /* ORG_ADMIN */],
              ["ORG_OWNER" /* ORG_OWNER */]: [...baseRoles, "LOCATION_ADMIN" /* LOCATION_ADMIN */, "ORG_ADMIN" /* ORG_ADMIN */, "ORG_OWNER" /* ORG_OWNER */],
              ["GOD" /* GOD */]: [...baseRoles, "LOCATION_ADMIN" /* LOCATION_ADMIN */, "ORG_ADMIN" /* ORG_ADMIN */, "ORG_OWNER" /* ORG_OWNER */]
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
          const validateLocationRestriction = (operation2, nextLocationId2, adminRole, adminLocationId) => {
            const isLocationAdminCreating = operation2 === "create" && adminRole === "LOCATION_ADMIN" /* LOCATION_ADMIN */ && adminLocationId;
            if (isLocationAdminCreating && nextLocationId2 && String(nextLocationId2) !== String(adminLocationId)) {
              addValidationError("Location Admins can only create users in their own location.");
            }
          };
          const validateProvisioning = (operation2, nextOrgId2, nextLocationId2, existingOrgId, existingLocationId) => {
            const isUnprovisioned = !nextOrgId2 && !nextLocationId2;
            const isInitialProvision = operation2 === "create" && isUnprovisioned;
            const isExistingUnprovisioned = operation2 === "update" && isUnprovisioned && !existingOrgId && !existingLocationId;
            if (!isInitialProvision && !isExistingUnprovisioned && (!nextOrgId2 || !nextLocationId2)) {
              addValidationError("Users must belong to both an organization and a location once provisioned.");
            }
          };
          const validateLocationOrgMatch = async (nextOrgId2, nextLocationId2, context2) => {
            if (!nextOrgId2 || !nextLocationId2) return;
            const location = await context2.query.Location.findOne({
              where: { id: nextLocationId2 },
              query: "id org { id }"
            });
            const locationOrgId = location?.org?.id ?? null;
            if (locationOrgId && locationOrgId !== nextOrgId2) {
              addValidationError("Selected location does not belong to the user's organization.");
            }
          };
          const nextOrgId = resolveRelationshipId(resolvedData.org, existingUser?.org?.id ?? null);
          const nextLocationId = resolveRelationshipId(resolvedData.location, existingUser?.location?.id ?? null);
          resolvedData.role && validateRoleAssignment(resolvedData.role, session?.role);
          validateLocationRestriction(operation, nextLocationId, session?.role, session?.locationId);
          validateProvisioning(
            operation,
            nextOrgId,
            nextLocationId,
            existingUser?.org?.id ?? null,
            existingUser?.location?.id ?? null
          );
          await validateLocationOrgMatch(nextOrgId, nextLocationId, context);
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
    init_UserAllocation();
    init_TimePlan();
    init_TimeType();
    init_Location();
    init_Organization();
    init_TimePolicy();
    init_TimePolicyAllocation();
    init_User();
    lists = {
      Organization: Organization_default,
      TimePolicy: TimePolicy_default,
      TimePolicyAllocation: TimePolicyAllocation_default,
      UserAllocation: UserAllocation_default,
      TimeType: TimeType_default,
      Location: Location_default,
      TimePlan: TimePlan_default,
      User: User_default
    };
    schemas_default = lists;
  }
});

// domains/allowance/baseAllowance.ts
var MS_PER_DAY, MIN_DATE, MAX_DATE, toDate, differenceInDays, clampRange, sortByEffectiveAt, createYearPeriod, fetchTimePolicyAllocationTimeline, calculateBaseAllocation, getActiveTimePolicyAllocation, calculateBaseAllocationForTimePolicy;
var init_baseAllowance = __esm({
  "domains/allowance/baseAllowance.ts"() {
    "use strict";
    MS_PER_DAY = 1e3 * 60 * 60 * 24;
    MIN_DATE = /* @__PURE__ */ new Date(-864e13);
    MAX_DATE = /* @__PURE__ */ new Date(864e13);
    toDate = (value) => {
      if (value instanceof Date) return value;
      if (typeof value === "string" || typeof value === "number") return new Date(value);
      throw new Error("Unable to convert value to Date");
    };
    differenceInDays = (start, end) => Math.max(0, (end.getTime() - start.getTime()) / MS_PER_DAY);
    clampRange = (rangeStart, rangeEnd, clampStart, clampEnd) => {
      const start = new Date(Math.max(rangeStart.getTime(), clampStart.getTime()));
      const end = new Date(Math.min(rangeEnd.getTime(), clampEnd.getTime()));
      if (start.getTime() >= end.getTime()) return null;
      return { start, end };
    };
    sortByEffectiveAt = (records) => [...records].sort((a, b) => a.effectiveAt.getTime() - b.effectiveAt.getTime());
    createYearPeriod = (year) => ({
      unit: "YEAR",
      start: new Date(Date.UTC(year, 0, 1)),
      end: new Date(Date.UTC(year + 1, 0, 1)),
      label: `${year}`
    });
    fetchTimePolicyAllocationTimeline = async (context, timePolicyId) => {
      const items = await context.sudo().db.TimePolicyAllocation.findMany({
        where: { timePolicy: { id: { equals: timePolicyId } } },
        orderBy: { effectiveAt: "asc" },
        query: "id effectiveAt allocation carryoverLimit overdraftLimit"
      });
      return items.map((item) => ({
        id: item.id,
        effectiveAt: toDate(item.effectiveAt),
        allocation: item.allocation ?? 0,
        carryoverLimit: item.carryoverLimit ?? 0,
        overdraftLimit: item.overdraftLimit ?? 0
      }));
    };
    calculateBaseAllocation = ({
      allocations,
      period,
      userStartDate
    }) => {
      const sorted = sortByEffectiveAt(allocations);
      const periodDays = differenceInDays(period.start, period.end);
      if (!sorted.length || periodDays <= 0)
        return { amount: 0, breakdown: [], periodDays, activeTimePolicyAllocation: null };
      const employmentStart = userStartDate ?? MIN_DATE;
      const breakdown = sorted.map((current, index, arr) => {
        const next = arr[index + 1];
        const segmentStart = current.effectiveAt;
        const segmentEnd = next?.effectiveAt ?? MAX_DATE;
        const periodClamped = clampRange(segmentStart, segmentEnd, period.start, period.end);
        if (!periodClamped) return null;
        const employmentClamped = clampRange(periodClamped.start, periodClamped.end, employmentStart, period.end);
        if (!employmentClamped) return null;
        const daysInSegment = differenceInDays(employmentClamped.start, employmentClamped.end);
        if (daysInSegment <= 0) return null;
        const portionOfPeriod = daysInSegment / periodDays;
        const contribution = current.allocation * portionOfPeriod;
        return {
          timePolicyAllocationId: current.id,
          effectiveAt: current.effectiveAt,
          from: employmentClamped.start,
          to: employmentClamped.end,
          daysInSegment,
          portionOfPeriod,
          allocationRate: current.allocation,
          contribution
        };
      }).filter((segment) => Boolean(segment));
      const amount = breakdown.reduce((sum, seg) => sum + seg.contribution, 0);
      const activeTimePolicyAllocation = getActiveTimePolicyAllocation(sorted, period.end);
      return { amount, breakdown, periodDays, activeTimePolicyAllocation };
    };
    getActiveTimePolicyAllocation = (records, periodEnd) => [...records].reverse().find((record) => record.effectiveAt.getTime() <= periodEnd.getTime()) ?? null;
    calculateBaseAllocationForTimePolicy = async ({
      context,
      timePolicyId,
      period,
      userStartDate
    }) => {
      const allocations = await fetchTimePolicyAllocationTimeline(context, timePolicyId);
      return calculateBaseAllocation({ allocations, period, userStartDate });
    };
  }
});

// domains/allowance/utils.ts
var MS_PER_DAY2, toDate2, differenceInDays2, clampRange2, getYearBounds, getUserStartDate, sumAdjustmentEvents, sumUsageForYear;
var init_utils = __esm({
  "domains/allowance/utils.ts"() {
    "use strict";
    MS_PER_DAY2 = 1e3 * 60 * 60 * 24;
    toDate2 = (value) => {
      if (value instanceof Date) return value;
      if (typeof value === "string" || typeof value === "number") return new Date(value);
      throw new Error("Unable to convert value to Date");
    };
    differenceInDays2 = (start, end) => Math.max(0, (end.getTime() - start.getTime()) / MS_PER_DAY2);
    clampRange2 = (rangeStart, rangeEnd, clampStart, clampEnd) => {
      const start = new Date(Math.max(rangeStart.getTime(), clampStart.getTime()));
      const end = new Date(Math.min(rangeEnd.getTime(), clampEnd.getTime()));
      if (start.getTime() >= end.getTime()) return null;
      return { start, end };
    };
    getYearBounds = (year) => {
      const start = new Date(Date.UTC(year, 0, 1));
      const end = new Date(Date.UTC(year + 1, 0, 1));
      const yearEnd = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999));
      const nextYearStart = new Date(Date.UTC(year + 1, 0, 1));
      return { start, end, yearEnd, nextYearStart };
    };
    getUserStartDate = async (context, userId) => {
      const user = await context.query.User.findOne({
        where: { id: userId },
        query: "id startDate"
      });
      return user?.startDate ? toDate2(user.startDate) : null;
    };
    sumAdjustmentEvents = async ({
      context,
      userId,
      timePolicyId,
      start,
      end,
      types
    }) => {
      const events = await context.query.UserAllocation.findMany({
        where: {
          user: { id: { equals: userId } },
          timePolicy: { id: { equals: timePolicyId } },
          type: { in: types },
          effectiveAt: {
            gte: start.toISOString(),
            lt: end.toISOString()
          }
        },
        query: "amount"
      });
      return events.reduce((sum, event) => sum + (event.amount ?? 0), 0);
    };
    sumUsageForYear = async ({
      context,
      userId,
      timePolicyId,
      start,
      end
    }) => {
      const requests = await context.query.TimePlan.findMany({
        where: {
          user: { id: { equals: userId } },
          timePolicy: { id: { equals: timePolicyId } },
          status: { equals: "APPROVED" },
          startAt: { lt: end.toISOString() },
          endAt: { gte: start.toISOString() }
        },
        query: "id startAt endAt duration durationUnit"
      });
      return requests.reduce((sum, request) => {
        const requestStart = toDate2(request.startAt);
        const requestEndExclusive = new Date(toDate2(request.endAt).getTime() + MS_PER_DAY2);
        const overlap = clampRange2(requestStart, requestEndExclusive, start, end);
        if (!overlap) return sum;
        const overlapDays = differenceInDays2(overlap.start, overlap.end);
        if (overlapDays <= 0) return sum;
        const totalDays = differenceInDays2(requestStart, requestEndExclusive);
        const baseDuration = request.durationUnit === "DAY" && typeof request.duration === "number" && request.duration > 0 ? request.duration : Math.max(totalDays, 0);
        if (totalDays <= 0) return sum + baseDuration;
        const ratio = overlapDays / totalDays;
        return sum + baseDuration * ratio;
      }, 0);
    };
  }
});

// domains/allowance/carryover.ts
var ensureCarryoverForYear, ensureCarryoverUpToYear, getLastCarryoverYear;
var init_carryover = __esm({
  "domains/allowance/carryover.ts"() {
    "use strict";
    init_baseAllowance();
    init_utils();
    ensureCarryoverForYear = async ({
      context,
      userId,
      timePolicyId,
      year,
      userStartDate
    }) => {
      const sudo = context.sudo();
      const { start, end, yearEnd, nextYearStart } = getYearBounds(year);
      const existingOut = await sudo.db.UserAllocation.findMany({
        where: {
          user: { id: { equals: userId } },
          timePolicy: { id: { equals: timePolicyId } },
          type: { equals: "CARRYOVER_OUT" },
          effectiveAt: {
            gte: start.toISOString(),
            lt: end.toISOString()
          }
        },
        take: 1,
        query: "id"
      });
      if (existingOut.length > 0) return existingOut[0];
      const period = createYearPeriod(year);
      const baseResult = await calculateBaseAllocationForTimePolicy({
        context: sudo,
        timePolicyId,
        period,
        userStartDate
      });
      const carryoverRule = baseResult.activeTimePolicyAllocation;
      if (!carryoverRule) return null;
      const adjustments = await sumAdjustmentEvents({
        context: sudo,
        userId,
        timePolicyId,
        start,
        end,
        types: ["MANUAL", "POLICY_CHANGE_RETRO"]
      });
      const usage = await sumUsageForYear({
        context: sudo,
        userId,
        timePolicyId,
        start,
        end
      });
      const balance = baseResult.amount + adjustments - usage;
      const leftover = Math.max(balance, 0);
      const carryoverLimit = Math.max(carryoverRule.carryoverLimit ?? 0, 0);
      const carry = Math.min(leftover, carryoverLimit);
      const notesOut = `Carryover out for ${year}`;
      const createdBy = context.session?.id ? { connect: { id: String(context.session.id) } } : void 0;
      const outEvent = await sudo.db.UserAllocation.createOne({
        data: {
          user: { connect: { id: userId } },
          timePolicy: { connect: { id: timePolicyId } },
          timePolicyAllocation: carryoverRule?.id ? { connect: { id: carryoverRule.id } } : void 0,
          type: "CARRYOVER_OUT",
          amount: leftover > 0 ? -leftover : 0,
          effectiveAt: yearEnd.toISOString(),
          notes: notesOut,
          createdBy
        },
        query: "id"
      });
      if (carry > 0) {
        const notesIn = `Carryover in from ${year}`;
        await sudo.db.UserAllocation.createOne({
          data: {
            user: { connect: { id: userId } },
            timePolicy: { connect: { id: timePolicyId } },
            timePolicyAllocation: carryoverRule?.id ? { connect: { id: carryoverRule.id } } : void 0,
            type: "CARRYOVER_IN",
            amount: carry,
            effectiveAt: nextYearStart.toISOString(),
            notes: notesIn,
            createdBy
          }
        });
      }
      return outEvent;
    };
    ensureCarryoverUpToYear = async ({
      context,
      userId,
      timePolicyId,
      targetYear
    }) => {
      const sudo = context.sudo();
      const userStartDate = await getUserStartDate(sudo, userId);
      const lastProcessedYear = await getLastCarryoverYear(sudo, userId, timePolicyId);
      const baselineYear = userStartDate?.getUTCFullYear() ?? targetYear - 1;
      const startYear = Number.isFinite(lastProcessedYear) ? lastProcessedYear + 1 : baselineYear;
      for (let year = startYear; year < targetYear; year += 1) {
        await ensureCarryoverForYear({
          context,
          userId,
          timePolicyId,
          year,
          userStartDate
        });
      }
    };
    getLastCarryoverYear = async (context, userId, timePolicyId) => {
      const events = await context.db.UserAllocation.findMany({
        where: {
          user: { id: { equals: userId } },
          timePolicy: { id: { equals: timePolicyId } },
          type: { equals: "CARRYOVER_OUT" }
        },
        orderBy: { effectiveAt: "desc" },
        take: 1,
        query: "effectiveAt"
      });
      if (!events.length) return void 0;
      return toDate2(events[0].effectiveAt).getUTCFullYear();
    };
  }
});

// domains/allowance/retroChanges.ts
var init_retroChanges = __esm({
  "domains/allowance/retroChanges.ts"() {
    "use strict";
    init_baseAllowance();
    init_utils();
  }
});

// domains/allowance/types.ts
var init_types = __esm({
  "domains/allowance/types.ts"() {
    "use strict";
  }
});

// domains/allowance/index.ts
var init_allowance = __esm({
  "domains/allowance/index.ts"() {
    "use strict";
    init_baseAllowance();
    init_carryover();
    init_retroChanges();
    init_types();
    init_baseAllowance();
  }
});

// schemas/extensions/Allocations.ts
var import_core10, toIsoString2, formatUserName, sanitizeNumber, normalizeNotes, timePolicyAllocationHistorySelection, userAllocationSelection, fetchLatestTimePolicyAllocation, fetchTimePolicyAllocationById, fetchUserAllocationById, assertCanAccessTimePolicy, assertCanAccessUser, Allocations;
var init_Allocations = __esm({
  "schemas/extensions/Allocations.ts"() {
    "use strict";
    import_core10 = require("@keystone-6/core");
    init_allowance();
    init_utils();
    init_userRole();
    toIsoString2 = (value) => {
      if (!value) return null;
      const date = value instanceof Date ? value : new Date(value);
      return Number.isNaN(date.getTime()) ? null : date.toISOString();
    };
    formatUserName = (user) => {
      if (!user) return null;
      const parts = [user.firstName, user.lastName].filter(Boolean);
      if (parts.length === 0) return null;
      return parts.join(" ");
    };
    sanitizeNumber = (value) => {
      const numericValue = typeof value === "number" ? value : Number(value);
      return Number.isFinite(numericValue) ? numericValue : 0;
    };
    normalizeNotes = (value) => value?.trim() ?? "";
    timePolicyAllocationHistorySelection = "id allocation carryoverLimit overdraftLimit notes effectiveAt createdAt createdBy { id firstName lastName }";
    userAllocationSelection = "id type amount effectiveAt createdAt notes createdBy { id firstName lastName } timePolicyAllocation { id effectiveAt }";
    fetchLatestTimePolicyAllocation = async (context, timePolicyId) => {
      const history = await context.query.TimePolicyAllocation.findMany({
        where: { timePolicy: { id: { equals: timePolicyId } } },
        orderBy: { effectiveAt: "desc" },
        take: 1,
        query: timePolicyAllocationHistorySelection
      });
      return history[0] ?? null;
    };
    fetchTimePolicyAllocationById = async (context, id) => {
      return await context.query.TimePolicyAllocation.findOne({
        where: { id },
        query: timePolicyAllocationHistorySelection
      });
    };
    fetchUserAllocationById = async (context, id) => {
      return await context.query.UserAllocation.findOne({
        where: { id },
        query: userAllocationSelection
      });
    };
    assertCanAccessTimePolicy = async (context, session, timePolicyId) => {
      const timePolicy = await context.query.TimePolicy.findOne({
        where: { id: timePolicyId },
        query: "id org { id } isAllocationManaged"
      });
      if (!timePolicy) throw new Error("Time policy not found");
      if (isGod({ session })) return timePolicy;
      if (!isAnyAdmin({ session })) throw new Error("Forbidden");
      if (!session?.orgId || timePolicy.org?.id !== session.orgId) throw new Error("Forbidden");
      return timePolicy;
    };
    assertCanAccessUser = async (context, session, userId) => {
      const user = await context.query.User.findOne({
        where: { id: userId },
        query: "id org { id }"
      });
      if (!user) throw new Error("User not found");
      if (session?.id === userId) return user;
      if (isGod({ session })) return user;
      if (!isAnyAdmin({ session })) throw new Error("Forbidden");
      if (!session?.orgId || user.org?.id !== session.orgId) throw new Error("Forbidden");
      return user;
    };
    Allocations = (base) => {
      const TimePolicyAllocationRulesInput = import_core10.graphql.inputObject({
        name: "TimePolicyAllocationRulesInput",
        fields: () => ({
          allocation: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(import_core10.graphql.Int) }),
          carryoverLimit: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(import_core10.graphql.Int) }),
          overdraftLimit: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(import_core10.graphql.Int) }),
          notes: import_core10.graphql.arg({ type: import_core10.graphql.String }),
          effectiveAt: import_core10.graphql.arg({ type: import_core10.graphql.String })
        })
      });
      const TimePolicyMutationInputType = import_core10.graphql.inputObject({
        name: "TimePolicyMutationInput",
        fields: () => ({
          name: import_core10.graphql.arg({ type: import_core10.graphql.String }),
          timeTypeId: import_core10.graphql.arg({ type: import_core10.graphql.ID }),
          locationIds: import_core10.graphql.arg({ type: import_core10.graphql.list(import_core10.graphql.nonNull(import_core10.graphql.ID)) }),
          isAllocationManaged: import_core10.graphql.arg({ type: import_core10.graphql.Boolean })
        })
      });
      const TimePolicyAllocationHistoryEntry = import_core10.graphql.object()({
        name: "TimePolicyAllocationHistoryEntry",
        fields: {
          id: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.ID), resolve: (item) => item.id }),
          effectiveAt: import_core10.graphql.field({
            type: import_core10.graphql.String,
            resolve: (item) => toIsoString2(item.effectiveAt)
          }),
          allocation: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.Float), resolve: (item) => item.allocation ?? 0 }),
          carryoverLimit: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.Float), resolve: (item) => item.carryoverLimit ?? 0 }),
          overdraftLimit: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.Float), resolve: (item) => item.overdraftLimit ?? 0 }),
          notes: import_core10.graphql.field({ type: import_core10.graphql.String, resolve: (item) => item.notes ?? "" }),
          createdAt: import_core10.graphql.field({
            type: import_core10.graphql.String,
            resolve: (item) => toIsoString2(item.createdAt ?? null)
          }),
          createdBy: import_core10.graphql.field({
            type: import_core10.graphql.String,
            resolve: (item) => formatUserName(item.createdBy)
          })
        }
      });
      const UserAllocationEntry = import_core10.graphql.object()({
        name: "UserAllocationEntry",
        fields: {
          id: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.ID), resolve: (item) => item.id }),
          type: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.String), resolve: (item) => item.type }),
          amount: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.Float), resolve: (item) => item.amount }),
          effectiveAt: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.String), resolve: (item) => item.effectiveAt }),
          createdAt: import_core10.graphql.field({ type: import_core10.graphql.String, resolve: (item) => item.createdAt ?? null }),
          notes: import_core10.graphql.field({ type: import_core10.graphql.String, resolve: (item) => item.notes ?? null }),
          createdBy: import_core10.graphql.field({
            type: import_core10.graphql.String,
            resolve: (item) => formatUserName(item.createdBy)
          }),
          timePolicyAllocationId: import_core10.graphql.field({
            type: import_core10.graphql.ID,
            resolve: (item) => item.timePolicyAllocation?.id ?? null
          })
        }
      });
      const AllocationBreakdownSegment = import_core10.graphql.object()({
        name: "AllocationBreakdownSegment",
        fields: {
          timePolicyAllocationId: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.ID), resolve: (item) => item.timePolicyAllocationId }),
          effectiveAt: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.String), resolve: (item) => item.effectiveAt }),
          from: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.String), resolve: (item) => item.from }),
          to: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.String), resolve: (item) => item.to }),
          daysInSegment: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.Float), resolve: (item) => item.daysInSegment }),
          portionOfPeriod: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.Float), resolve: (item) => item.portionOfPeriod }),
          allocationRate: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.Float), resolve: (item) => item.allocationRate }),
          contribution: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.Float), resolve: (item) => item.contribution })
        }
      });
      const UserAllocationBalance = import_core10.graphql.object()({
        name: "UserAllocationBalance",
        fields: {
          year: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.Int), resolve: (item) => item.year }),
          base: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.Float), resolve: (item) => item.base }),
          carryoverIn: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.Float), resolve: (item) => item.carryoverIn }),
          manualAdjustments: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.Float), resolve: (item) => item.manualAdjustments }),
          retroAdjustments: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.Float), resolve: (item) => item.retroAdjustments }),
          used: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.Float), resolve: (item) => item.used }),
          available: import_core10.graphql.field({ type: import_core10.graphql.nonNull(import_core10.graphql.Float), resolve: (item) => item.available }),
          timePolicyAllocationId: import_core10.graphql.field({
            type: import_core10.graphql.ID,
            resolve: (item) => item.timePolicyAllocation?.id ?? null
          }),
          allocationRate: import_core10.graphql.field({
            type: import_core10.graphql.Float,
            resolve: (item) => item.timePolicyAllocation?.allocation ?? null
          }),
          carryoverLimit: import_core10.graphql.field({
            type: import_core10.graphql.Float,
            resolve: (item) => item.timePolicyAllocation?.carryoverLimit ?? null
          }),
          overdraftLimit: import_core10.graphql.field({
            type: import_core10.graphql.Float,
            resolve: (item) => item.timePolicyAllocation?.overdraftLimit ?? null
          }),
          breakdown: import_core10.graphql.field({
            type: import_core10.graphql.list(import_core10.graphql.nonNull(AllocationBreakdownSegment)),
            resolve: (item) => item.breakdown
          })
        }
      });
      const upsertTimePolicyAllocationRules = async ({
        context,
        timePolicyId,
        allocationConfig,
        session
      }) => {
        if (!allocationConfig) return null;
        const timePolicy = await context.query.TimePolicy.findOne({
          where: { id: timePolicyId },
          query: "id isAllocationManaged"
        });
        if (!timePolicy?.isAllocationManaged) return null;
        const normalizedAllocation = sanitizeNumber(allocationConfig.allocation);
        const normalizedCarryover = sanitizeNumber(allocationConfig.carryoverLimit);
        const normalizedOverdraft = sanitizeNumber(allocationConfig.overdraftLimit);
        const normalizedNotes = normalizeNotes(allocationConfig.notes);
        const latest = await fetchLatestTimePolicyAllocation(context, timePolicyId);
        const shouldCreate = !latest || sanitizeNumber(latest.allocation) !== normalizedAllocation || sanitizeNumber(latest.carryoverLimit) !== normalizedCarryover || sanitizeNumber(latest.overdraftLimit) !== normalizedOverdraft || normalizeNotes(latest.notes) !== normalizedNotes;
        if (!shouldCreate) return latest;
        const createdBy = session?.id ? { connect: { id: String(session.id) } } : void 0;
        const effectiveAtIso = allocationConfig.effectiveAt ? toDate2(allocationConfig.effectiveAt).toISOString() : (/* @__PURE__ */ new Date()).toISOString();
        const created = await context.db.TimePolicyAllocation.createOne({
          data: {
            timePolicy: { connect: { id: timePolicyId } },
            allocation: normalizedAllocation,
            carryoverLimit: normalizedCarryover,
            overdraftLimit: normalizedOverdraft,
            notes: normalizedNotes || void 0,
            effectiveAt: effectiveAtIso,
            createdBy
          }
        });
        return fetchTimePolicyAllocationById(context, created.id);
      };
      const buildTimePolicyData = (input, { isUpdate }) => {
        if (!input) return {};
        const next = {};
        if (typeof input.name === "string") {
          const trimmed = input.name.trim();
          if (trimmed.length) next.name = trimmed;
        }
        if (typeof input.isAllocationManaged === "boolean") {
          next.isAllocationManaged = input.isAllocationManaged;
        }
        if (input.timeTypeId) {
          next.timeType = { connect: { id: input.timeTypeId } };
        }
        if (Array.isArray(input.locationIds)) {
          const nodes = input.locationIds.filter(Boolean).map((id) => ({ id }));
          next.locations = isUpdate ? { set: nodes } : { connect: nodes };
        }
        return next;
      };
      return {
        query: {
          timePolicyAllocationHistory: import_core10.graphql.field({
            type: import_core10.graphql.list(import_core10.graphql.nonNull(TimePolicyAllocationHistoryEntry)),
            args: {
              timePolicyId: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(import_core10.graphql.ID) })
            },
            async resolve(source, { timePolicyId }, context) {
              const session = context.session;
              await assertCanAccessTimePolicy(context, session, timePolicyId);
              const items = await context.query.TimePolicyAllocation.findMany({
                where: { timePolicy: { id: { equals: timePolicyId } } },
                orderBy: { effectiveAt: "desc" },
                query: "id effectiveAt allocation carryoverLimit overdraftLimit notes createdAt createdBy { id firstName lastName }"
              });
              return items;
            }
          }),
          userAllocationEventLog: import_core10.graphql.field({
            type: import_core10.graphql.list(import_core10.graphql.nonNull(UserAllocationEntry)),
            args: {
              userId: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(import_core10.graphql.ID) }),
              timePolicyId: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(import_core10.graphql.ID) }),
              year: import_core10.graphql.arg({ type: import_core10.graphql.Int })
            },
            async resolve(source, { userId, timePolicyId, year }, context) {
              const session = context.session;
              const user = await assertCanAccessUser(context, session, userId);
              const timePolicy = await assertCanAccessTimePolicy(context, session, timePolicyId);
              if (timePolicy.org?.id && user.org?.id && timePolicy.org.id !== user.org.id) {
                throw new Error("Time policy does not belong to the same organization as user.");
              }
              const where = {
                user: { id: { equals: userId } },
                timePolicy: { id: { equals: timePolicyId } }
              };
              if (year != null) {
                const { start, end } = getYearBounds(year);
                where.effectiveAt = {
                  gte: start.toISOString(),
                  lt: end.toISOString()
                };
              }
              const events = await context.query.UserAllocation.findMany({
                where,
                orderBy: { effectiveAt: "desc" },
                query: "id type amount effectiveAt createdAt notes createdBy { id firstName lastName } timePolicyAllocation { id effectiveAt }"
              });
              return events.map((event) => ({
                ...event,
                effectiveAt: toDate2(event.effectiveAt).toISOString(),
                createdAt: event.createdAt ? toDate2(event.createdAt).toISOString() : null,
                timePolicyAllocation: event.timePolicyAllocation ? { id: event.timePolicyAllocation.id, effectiveAt: toDate2(event.timePolicyAllocation.effectiveAt).toISOString() } : null
              }));
            }
          }),
          userAllocationBalance: import_core10.graphql.field({
            type: UserAllocationBalance,
            args: {
              userId: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(import_core10.graphql.ID) }),
              timePolicyId: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(import_core10.graphql.ID) }),
              year: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(import_core10.graphql.Int) })
            },
            async resolve(source, { userId, timePolicyId, year }, context) {
              const session = context.session;
              const user = await assertCanAccessUser(context, session, userId);
              const timePolicy = await assertCanAccessTimePolicy(context, session, timePolicyId);
              if (timePolicy.org?.id && user.org?.id && timePolicy.org.id !== user.org.id) {
                throw new Error("Time policy does not belong to the same organization as user.");
              }
              const targetYear = year;
              await ensureCarryoverUpToYear({
                context,
                userId,
                timePolicyId,
                targetYear
              });
              const sudo = context.sudo();
              const userStartDate = await getUserStartDate(sudo, userId);
              const period = createYearPeriod(targetYear);
              const baseResult = await calculateBaseAllocationForTimePolicy({
                context: sudo,
                timePolicyId,
                period,
                userStartDate
              });
              const { start, end } = getYearBounds(targetYear);
              const carryoverIn = await sumAdjustmentEvents({
                context: sudo,
                userId,
                timePolicyId,
                start,
                end,
                types: ["CARRYOVER_IN"]
              });
              const manualAdjustments = await sumAdjustmentEvents({
                context: sudo,
                userId,
                timePolicyId,
                start,
                end,
                types: ["MANUAL"]
              });
              const retroAdjustments = await sumAdjustmentEvents({
                context: sudo,
                userId,
                timePolicyId,
                start,
                end,
                types: ["POLICY_CHANGE_RETRO"]
              });
              const used = await sumUsageForYear({
                context: sudo,
                userId,
                timePolicyId,
                start,
                end
              });
              const available = baseResult.amount + carryoverIn + manualAdjustments + retroAdjustments - used;
              const breakdown = baseResult.breakdown.map((segment) => ({
                timePolicyAllocationId: segment.timePolicyAllocationId,
                effectiveAt: segment.effectiveAt.toISOString(),
                from: segment.from.toISOString(),
                to: segment.to.toISOString(),
                daysInSegment: segment.daysInSegment,
                portionOfPeriod: segment.portionOfPeriod,
                allocationRate: segment.allocationRate,
                contribution: segment.contribution
              }));
              return {
                year: targetYear,
                base: baseResult.amount,
                carryoverIn,
                manualAdjustments,
                retroAdjustments,
                used,
                available,
                timePolicyAllocation: baseResult.activeTimePolicyAllocation ? {
                  id: baseResult.activeTimePolicyAllocation.id,
                  allocation: baseResult.activeTimePolicyAllocation.allocation,
                  carryoverLimit: baseResult.activeTimePolicyAllocation.carryoverLimit,
                  overdraftLimit: baseResult.activeTimePolicyAllocation.overdraftLimit,
                  effectiveAt: baseResult.activeTimePolicyAllocation.effectiveAt.toISOString()
                } : null,
                breakdown
              };
            }
          })
        },
        mutation: {
          createTimePolicyWithAllocation: import_core10.graphql.field({
            type: base.object("TimePolicy"),
            args: {
              data: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(TimePolicyMutationInputType) }),
              allocationConfig: import_core10.graphql.arg({ type: TimePolicyAllocationRulesInput })
            },
            async resolve(_, { data, allocationConfig }, context) {
              const session = context.session;
              if (!isGod({ session }) && !isAnyAdmin({ session })) throw new Error("Forbidden");
              const timePolicyData = buildTimePolicyData(data, { isUpdate: false });
              const created = await context.db.TimePolicy.createOne({
                data: timePolicyData,
                query: "id"
              });
              if (!created?.id) return null;
              await upsertTimePolicyAllocationRules({
                context,
                timePolicyId: created.id,
                allocationConfig,
                session
              });
              return context.query.TimePolicy.findOne({ where: { id: created.id }, query: "id" });
            }
          }),
          updateTimePolicyWithAllocation: import_core10.graphql.field({
            type: base.object("TimePolicy"),
            args: {
              id: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(import_core10.graphql.ID) }),
              data: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(TimePolicyMutationInputType) }),
              allocationConfig: import_core10.graphql.arg({ type: TimePolicyAllocationRulesInput })
            },
            async resolve(_, { id, data, allocationConfig }, context) {
              const session = context.session;
              await assertCanAccessTimePolicy(context, session, id);
              const timePolicyData = buildTimePolicyData(data, { isUpdate: true });
              const updated = await context.db.TimePolicy.updateOne({
                where: { id },
                data: timePolicyData,
                query: "id"
              });
              if (!updated?.id) return null;
              await upsertTimePolicyAllocationRules({
                context,
                timePolicyId: updated.id,
                allocationConfig,
                session
              });
              return context.query.TimePolicy.findOne({ where: { id: updated.id }, query: "id" });
            }
          }),
          createManualAllocationAdjustment: import_core10.graphql.field({
            type: UserAllocationEntry,
            args: {
              userId: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(import_core10.graphql.ID) }),
              timePolicyId: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(import_core10.graphql.ID) }),
              amount: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(import_core10.graphql.Int) }),
              effectiveAt: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(import_core10.graphql.String) }),
              notes: import_core10.graphql.arg({ type: import_core10.graphql.String })
            },
            async resolve(source, args, context) {
              const { userId, timePolicyId, amount, effectiveAt, notes } = args;
              const session = context.session;
              const user = await assertCanAccessUser(context, session, userId);
              const timePolicy = await assertCanAccessTimePolicy(context, session, timePolicyId);
              if (timePolicy.org?.id && user.org?.id && timePolicy.org.id !== user.org.id) {
                throw new Error("Time policy does not belong to the same organization as user.");
              }
              const createdBy = session?.id ? { connect: { id: String(session.id) } } : void 0;
              const event = await context.db.UserAllocation.createOne({
                data: {
                  user: { connect: { id: userId } },
                  timePolicy: { connect: { id: timePolicyId } },
                  type: "MANUAL",
                  amount: sanitizeNumber(amount),
                  effectiveAt: toDate2(effectiveAt).toISOString(),
                  notes: normalizeNotes(notes) || void 0,
                  createdBy
                }
              });
              const fullEvent = await fetchUserAllocationById(context, event.id);
              if (!fullEvent) return null;
              return {
                ...fullEvent,
                effectiveAt: toDate2(fullEvent.effectiveAt).toISOString(),
                createdAt: fullEvent.createdAt ? toDate2(fullEvent.createdAt).toISOString() : null,
                timePolicyAllocation: fullEvent.timePolicyAllocation ? {
                  id: fullEvent.timePolicyAllocation.id,
                  effectiveAt: fullEvent.timePolicyAllocation.effectiveAt ? toDate2(fullEvent.timePolicyAllocation.effectiveAt).toISOString() : null
                } : null
              };
            }
          })
        }
      };
    };
  }
});

// lib/holidays/dateHolidays.ts
function getHolidaysForYear(params) {
  const hd = new import_date_holidays2.default();
  const ok = hd.init(params.country, params.subdivision || void 0);
  if (!ok) return [];
  const holidays = hd.getHolidays(params.year);
  return holidays.filter((h) => h.type === "public").map((h) => ({ date: h.date.substring(0, 10), title: h.name }));
}
function getHolidaysInRange(params) {
  const startYear = params.start.getUTCFullYear();
  const endYear = params.end.getUTCFullYear();
  const all = [];
  for (let y = startYear; y <= endYear; y++) {
    all.push(...getHolidaysForYear({ country: params.country, subdivision: params.subdivision, year: y }));
  }
  const startISO = params.start.toISOString().substring(0, 10);
  const endISO = params.end.toISOString().substring(0, 10);
  return all.filter((h) => h.date >= startISO && h.date <= endISO);
}
var import_date_holidays2;
var init_dateHolidays = __esm({
  "lib/holidays/dateHolidays.ts"() {
    "use strict";
    import_date_holidays2 = __toESM(require("date-holidays"));
  }
});

// schemas/extensions/Holidays.ts
var import_core11, Holidays3;
var init_Holidays = __esm({
  "schemas/extensions/Holidays.ts"() {
    "use strict";
    import_core11 = require("@keystone-6/core");
    init_dateHolidays();
    Holidays3 = () => {
      const Holiday = import_core11.graphql.object()({
        name: "Holiday",
        fields: {
          date: import_core11.graphql.field({ type: import_core11.graphql.nonNull(import_core11.graphql.String), resolve: (root) => root.date }),
          title: import_core11.graphql.field({ type: import_core11.graphql.nonNull(import_core11.graphql.String), resolve: (root) => root.title })
        }
      });
      return {
        query: {
          holidays: import_core11.graphql.field({
            type: import_core11.graphql.list(import_core11.graphql.nonNull(Holiday)),
            args: {
              locationId: import_core11.graphql.arg({ type: import_core11.graphql.nonNull(import_core11.graphql.ID) }),
              start: import_core11.graphql.arg({ type: import_core11.graphql.nonNull(import_core11.graphql.String) }),
              end: import_core11.graphql.arg({ type: import_core11.graphql.nonNull(import_core11.graphql.String) })
            },
            async resolve(source, { locationId, start, end }, context) {
              const location = await context.query.Location.findOne({
                where: { id: locationId },
                query: "holidayCountry"
              });
              if (!location?.holidayCountry) return [];
              const startDate = new Date(start);
              const endDate = new Date(end);
              return getHolidaysInRange({
                country: location.holidayCountry,
                start: startDate,
                end: endDate
              });
            }
          })
        }
      };
    };
  }
});

// schemas/extensions/Onboarding.ts
var import_core12, import_free_email_domains2, freeEmailDomainSet2, defaultWorkingDays, timeTypeBlueprints, extractDomain, Onboarding;
var init_Onboarding = __esm({
  "schemas/extensions/Onboarding.ts"() {
    "use strict";
    import_core12 = require("@keystone-6/core");
    import_free_email_domains2 = __toESM(require("free-email-domains"));
    init_userRole();
    freeEmailDomainSet2 = new Set(import_free_email_domains2.default.map((domain) => domain.toLowerCase()));
    defaultWorkingDays = ["MON", "TUE", "WED", "THU", "FRI"];
    timeTypeBlueprints = [
      {
        name: "Paid Time Off",
        policy: {
          allowance: 20,
          carryoverLimit: 10,
          overdraftLimit: 0
        }
      },
      {
        name: "Sick Day",
        policy: {
          allowance: 18,
          carryoverLimit: 0,
          overdraftLimit: 0
        }
      },
      {
        name: "Work From Home",
        policy: {
          allowance: 120,
          carryoverLimit: 0,
          overdraftLimit: 0
        }
      }
    ];
    extractDomain = (email) => {
      if (!email) return null;
      const [, domain] = email.toLowerCase().split("@");
      return domain || null;
    };
    Onboarding = (base) => {
      const LocationDefaultsInput = import_core12.graphql.inputObject({
        name: "LocationDefaultsInput",
        fields: {
          timezone: import_core12.graphql.arg({ type: import_core12.graphql.nonNull(import_core12.graphql.String) }),
          weekStartDay: import_core12.graphql.arg({ type: import_core12.graphql.nonNull(base.enum("LocationWeekStartDayType")) }),
          workingDays: import_core12.graphql.arg({ type: import_core12.graphql.nonNull(import_core12.graphql.list(import_core12.graphql.nonNull(base.enum("LocationWorkingDayType")))) }),
          holidayCountry: import_core12.graphql.arg({ type: import_core12.graphql.nonNull(import_core12.graphql.String) })
        }
      });
      const CompleteOnboardingInput = import_core12.graphql.inputObject({
        name: "CompleteOnboardingInput",
        fields: {
          orgName: import_core12.graphql.arg({ type: import_core12.graphql.nonNull(import_core12.graphql.String) }),
          allowAutojoinForDomain: import_core12.graphql.arg({ type: import_core12.graphql.nonNull(import_core12.graphql.Boolean) }),
          locationDefaults: import_core12.graphql.arg({ type: import_core12.graphql.nonNull(LocationDefaultsInput) })
        }
      });
      const OnboardingResult = import_core12.graphql.object()({
        name: "CompleteOnboardingPayload",
        fields: {
          orgId: import_core12.graphql.field({ type: import_core12.graphql.nonNull(import_core12.graphql.ID) }),
          locationId: import_core12.graphql.field({ type: import_core12.graphql.nonNull(import_core12.graphql.ID) }),
          timeTypeIds: import_core12.graphql.field({ type: import_core12.graphql.nonNull(import_core12.graphql.list(import_core12.graphql.nonNull(import_core12.graphql.ID))) }),
          policyIds: import_core12.graphql.field({ type: import_core12.graphql.nonNull(import_core12.graphql.list(import_core12.graphql.nonNull(import_core12.graphql.ID))) })
        }
      });
      return {
        mutation: {
          completeOnboarding: import_core12.graphql.field({
            type: import_core12.graphql.nonNull(OnboardingResult),
            args: {
              input: import_core12.graphql.arg({ type: import_core12.graphql.nonNull(CompleteOnboardingInput) })
            },
            async resolve(_root, { input }, context) {
              const session = context.session;
              if (!session?.email) throw new Error("Unauthorized");
              if (session.orgId) throw new Error("Onboarding already completed.");
              const {
                orgName: rawOrgName,
                allowAutojoinForDomain,
                locationDefaults: rawLocationDefaults
              } = input;
              const orgName = typeof rawOrgName === "string" ? rawOrgName.trim() : "";
              if (!orgName) throw new Error("Organization name is required.");
              const locationDefaults = rawLocationDefaults ?? {
                timezone: void 0,
                weekStartDay: void 0,
                workingDays: void 0,
                holidayCountry: void 0
              };
              const timezone = locationDefaults?.timezone || "America/New_York";
              const weekStartDay = locationDefaults?.weekStartDay || "MON";
              const workingDays = Array.isArray(locationDefaults?.workingDays) && locationDefaults.workingDays.length > 0 ? locationDefaults.workingDays : defaultWorkingDays;
              const holidayCountry = locationDefaults?.holidayCountry || "US";
              const domain = extractDomain(session.email);
              const allowAutojoin = Boolean(allowAutojoinForDomain && domain && !freeEmailDomainSet2.has(domain));
              const autojoinDomains = allowAutojoin && domain ? [domain] : [];
              const sudo = context.sudo();
              const organization = await sudo.db.Organization.createOne({
                data: {
                  name: orgName,
                  autojoinDomains
                },
                query: "id"
              });
              if (!organization?.id) {
                throw new Error("Failed to create organization.");
              }
              const location = await sudo.db.Location.createOne({
                data: {
                  name: `${orgName} Primary Location`,
                  org: { connect: { id: organization.id } },
                  timezone,
                  weekStartDay,
                  workingDays,
                  holidayCountry
                },
                query: "id"
              });
              if (!location?.id) {
                throw new Error("Failed to create location.");
              }
              const timeTypeIds = [];
              const policyIds = [];
              for (const blueprint of timeTypeBlueprints) {
                const timeType = await sudo.db.TimeType.createOne({
                  data: {
                    name: blueprint.name,
                    org: { connect: { id: organization.id } }
                  },
                  query: "id"
                });
                if (!timeType?.id) throw new Error(`Failed to create time type ${blueprint.name}.`);
                timeTypeIds.push(timeType.id);
                const timePolicy = await sudo.db.TimePolicy.createOne({
                  data: {
                    name: blueprint.name,
                    org: { connect: { id: organization.id } },
                    timeType: { connect: { id: timeType.id } },
                    locations: { connect: [{ id: location.id }] }
                  },
                  query: "id"
                });
                if (!timePolicy?.id) throw new Error(`Failed to create time policy for ${blueprint.name}.`);
                await sudo.db.TimePolicyAllocation.createOne({
                  data: {
                    timePolicy: { connect: { id: timePolicy.id } },
                    allocation: blueprint.policy.allowance,
                    carryoverLimit: blueprint.policy.carryoverLimit,
                    overdraftLimit: blueprint.policy.overdraftLimit,
                    effectiveAt: (/* @__PURE__ */ new Date()).toISOString()
                  }
                });
                policyIds.push(timePolicy.id);
              }
              let userId = session.id;
              if (!userId) {
                const users = await sudo.query.User.findMany({
                  where: { email: { equals: session.email } },
                  query: "id"
                });
                userId = users?.[0]?.id ?? null;
              }
              if (!userId) {
                throw new Error("Unable to locate user for onboarding.");
              }
              const existingUserRecord = await sudo.query.User.findOne({
                where: { id: userId },
                query: "id org { id } location { id }"
              });
              const userUpdateData = {};
              if (!existingUserRecord?.org?.id) {
                userUpdateData.org = { connect: { id: organization.id } };
              }
              if (!existingUserRecord?.location?.id) {
                userUpdateData.location = { connect: { id: location.id } };
              }
              userUpdateData.role = "ORG_OWNER" /* ORG_OWNER */;
              if (Object.keys(userUpdateData).length > 0) {
                await sudo.db.User.updateOne({
                  where: { id: userId },
                  data: userUpdateData
                });
              }
              return {
                orgId: organization.id,
                locationId: location.id,
                timeTypeIds,
                policyIds
              };
            }
          })
        }
      };
    };
  }
});

// schemas/extensions/Policies.ts
var import_core13, Policies;
var init_Policies = __esm({
  "schemas/extensions/Policies.ts"() {
    "use strict";
    import_core13 = require("@keystone-6/core");
    Policies = (base) => ({
      mutation: {
        assignUserToPolicy: import_core13.graphql.field({
          type: import_core13.graphql.nonNull(import_core13.graphql.Boolean),
          args: {
            userId: import_core13.graphql.arg({ type: import_core13.graphql.nonNull(import_core13.graphql.ID) }),
            policyId: import_core13.graphql.arg({ type: import_core13.graphql.nonNull(import_core13.graphql.ID) }),
            applyConfig: import_core13.graphql.arg({ type: import_core13.graphql.Boolean })
          },
          async resolve(source, { userId, policyId, applyConfig }, context) {
            const policy = await context.query.TimePolicy.findOne({
              where: { id: policyId },
              query: "id locations { id } timeType { id } isAllocationManaged org { id }"
            });
            if (!policy) return false;
            const policyLocations = policy.locations || [];
            if (policyLocations.length === 0) {
              throw new Error("Policy has no locations assigned");
            }
            const user = await context.query.User.findOne({
              where: { id: userId },
              query: "id location { id } org { id }"
            });
            if (!user?.org?.id) {
              throw new Error("User must belong to an organization");
            }
            const userLocationId = user.location?.id;
            const matchingPolicyLocation = policyLocations.find((loc) => loc?.id === userLocationId);
            if (!matchingPolicyLocation && !applyConfig) {
              throw new Error(
                "Policy does not cover the user's current location. Assign user to a matching location first."
              );
            }
            if (!applyConfig) return true;
            const targetLocationId = matchingPolicyLocation?.id ?? policyLocations[0]?.id;
            if (!targetLocationId) {
              throw new Error("No location available from policy");
            }
            const targetLocation = await context.query.Location.findOne({
              where: { id: targetLocationId },
              query: "id org { id }"
            });
            if (!targetLocation || targetLocation.org?.id !== user.org.id) {
              throw new Error("Policy location does not belong to user's organization");
            }
            const updateData = {};
            if (userLocationId !== targetLocationId) {
              updateData.location = { connect: { id: targetLocationId } };
            }
            if (Object.keys(updateData).length > 0) {
              await context.db.User.updateOne({
                where: { id: userId },
                data: updateData
              });
            }
            return true;
          }
        })
      }
    });
  }
});

// domains/timePlan/directEntry.ts
var defaultWorkingDays2, dayIndexToCode, isStringArray, toMidnightUtc, resolveSessionUser, findPolicyForTimeType, iso, daysBetweenInclusive, createDirectTimePlanEntry;
var init_directEntry = __esm({
  "domains/timePlan/directEntry.ts"() {
    "use strict";
    init_dateHolidays();
    defaultWorkingDays2 = ["MON", "TUE", "WED", "THU", "FRI"];
    dayIndexToCode = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    isStringArray = (value) => Array.isArray(value) && value.every((item) => typeof item === "string");
    toMidnightUtc = (value) => new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate(), 0, 0, 0, 0));
    resolveSessionUser = async ({
      context,
      session
    }) => {
      if (!session?.email) throw new Error("Unauthorized");
      const users = await context.query.User.findMany({
        where: { email: { equals: session.email } },
        query: "id org { id } location { id workingDays weekStartDay holidayCountry }"
      });
      const me = users?.[0];
      if (!me?.org?.id) throw new Error("User is not part of an organization");
      return {
        userId: me.id,
        orgId: me.org.id,
        location: me.location ?? null
      };
    };
    findPolicyForTimeType = async ({
      context,
      timeTypeId,
      orgId,
      locationId
    }) => {
      const baseWhere = {
        timeType: { id: { equals: timeTypeId } },
        org: { id: { equals: orgId } }
      };
      const locationAwareWhere = {
        ...baseWhere,
        ...locationId && { locations: { some: { id: { equals: locationId } } } }
      };
      const policies = await context.query.TimePolicy.findMany({
        where: locationAwareWhere,
        query: "id"
      });
      if (policies.length) return policies[0];
      if (locationId) {
        const fallbackPolicies = await context.query.TimePolicy.findMany({
          where: baseWhere,
          query: "id"
        });
        if (fallbackPolicies.length > 0) return fallbackPolicies[0];
      }
      return null;
    };
    iso = (d) => d.toISOString().substring(0, 10);
    daysBetweenInclusive = (a, b) => Array.from(
      { length: Math.floor((b.getTime() - a.getTime()) / (24 * 3600 * 1e3)) + 1 },
      (_, i) => new Date(Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate() + i))
    );
    createDirectTimePlanEntry = async ({
      context,
      session,
      input,
      options
    }) => {
      const { timeTypeId, startDateTime, endDateTime, isHalfDay, reason } = input;
      const sessionUser = await resolveSessionUser({ context, session });
      const startRaw = new Date(startDateTime);
      const endRaw = new Date(endDateTime);
      if (Number.isNaN(startRaw.getTime()) || Number.isNaN(endRaw.getTime()) || startRaw > endRaw)
        throw new Error("Invalid date range");
      const start = toMidnightUtc(startRaw);
      const end = toMidnightUtc(endRaw);
      const timeType = await context.query.TimeType.findOne({
        where: { id: timeTypeId },
        query: "id org { id }"
      });
      if (!timeType || timeType.org?.id !== sessionUser.orgId) {
        throw new Error("Time type not found");
      }
      const timePolicy = await findPolicyForTimeType({
        context,
        timeTypeId: timeType.id,
        orgId: sessionUser.orgId,
        locationId: sessionUser.location?.id
      });
      if (!timePolicy?.id) throw new Error("No time policy configured for this time type and location.");
      const policyDetails = await context.query.TimePolicy.findOne({
        where: { id: timePolicy.id },
        query: "id isAllocationManaged isApprovable timePolicyAllocations(orderBy: { effectiveAt: desc }, take: 1) { id allocation overdraftLimit }"
      });
      const allocationConfig = policyDetails?.timePolicyAllocations?.[0] ?? null;
      const allocation = typeof allocationConfig?.allocation === "number" ? allocationConfig.allocation : null;
      const overdraftLimit = typeof allocationConfig?.overdraftLimit === "number" ? allocationConfig.overdraftLimit : 0;
      const workingDays = isStringArray(sessionUser.location?.workingDays) && sessionUser.location.workingDays.length ? sessionUser.location.workingDays : Array.from(defaultWorkingDays2);
      const cfg = {
        holidayCountry: sessionUser.location?.holidayCountry ?? null,
        workingDays,
        allocation,
        overdraftLimit,
        isAllocationManaged: policyDetails?.isAllocationManaged ?? false
      };
      const workingDaySet = new Set(cfg.workingDays.length ? cfg.workingDays : defaultWorkingDays2);
      const isWorkingDay = (d) => workingDaySet.has(dayIndexToCode[d.getUTCDay()]);
      const buildHolidaySet = (rangeStart, rangeEnd) => {
        const base = cfg.holidayCountry ? getHolidaysInRange({ country: cfg.holidayCountry, start: rangeStart, end: rangeEnd }) : [];
        const filtered = base.filter((h) => {
          const dt = /* @__PURE__ */ new Date(h.date + "T00:00:00.000Z");
          return isWorkingDay(dt);
        });
        return new Set(filtered.map((h) => h.date));
      };
      const holidaySet = buildHolidaySet(start, end);
      const requestedDays = start.getTime() === end.getTime() && !!isHalfDay ? 0.5 : daysBetweenInclusive(start, end).filter((d) => isWorkingDay(d) && !holidaySet.has(iso(d))).length;
      const now = /* @__PURE__ */ new Date();
      const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
      const endOfYear = new Date(Date.UTC(now.getUTCFullYear(), 11, 31, 23, 59, 59, 999));
      const overlapWhere = {
        user: { id: { equals: sessionUser.userId } },
        timePolicy: { id: { equals: timePolicy.id } },
        status: { in: ["PENDING", "APPROVED"] }
      };
      const excludeId = options?.excludeTimePlanId ?? null;
      const overlapFilters = excludeId ? {
        ...overlapWhere,
        id: { not: { equals: excludeId } }
      } : overlapWhere;
      const overlapping = await context.query.TimePlan.findMany({
        where: {
          ...overlapFilters,
          startAt: { lte: end.toISOString() },
          endAt: { gte: start.toISOString() }
        },
        query: "id startAt endAt"
      });
      if (overlapping.length > 0) {
        throw new Error(
          "You already have a pending or approved request for this time policy that overlaps with the requested dates."
        );
      }
      const existing = await context.query.TimePlan.findMany({
        where: {
          ...overlapFilters,
          startAt: { lte: endOfYear.toISOString() },
          endAt: { gte: startOfYear.toISOString() }
        },
        query: "id startAt endAt duration durationUnit"
      });
      const sumExisting = existing.reduce((sum, current) => {
        if (typeof current.duration === "number" && current.duration > 0 && current.durationUnit === "DAY") {
          return sum + current.duration;
        }
        const s = toMidnightUtc(new Date(current.startAt));
        const e = toMidnightUtc(new Date(current.endAt));
        const rangeStart = s < startOfYear ? startOfYear : s;
        const rangeEnd = e > endOfYear ? endOfYear : e;
        const hs = buildHolidaySet(rangeStart, rangeEnd);
        const days = daysBetweenInclusive(rangeStart, rangeEnd).filter((d) => isWorkingDay(d) && !hs.has(iso(d))).length;
        return sum + days;
      }, 0);
      if (cfg.isAllocationManaged && typeof cfg.allocation === "number") {
        const remainingAfter = cfg.allocation - sumExisting - requestedDays;
        if (remainingAfter < -cfg.overdraftLimit) {
          throw new Error("Request exceeds allowed negative balance");
        }
      }
      const isApprovable = policyDetails?.isApprovable !== false;
      const status = isApprovable ? "PENDING" : "APPROVED";
      return await context.db.TimePlan.createOne({
        data: {
          org: { connect: { id: sessionUser.orgId } },
          user: { connect: { id: sessionUser.userId } },
          timeType: { connect: { id: timeType.id } },
          timePolicy: { connect: { id: timePolicy.id } },
          status,
          origin: "DIRECT",
          startAt: start.toISOString(),
          endAt: end.toISOString(),
          durationUnit: "DAY",
          duration: requestedDays,
          isAllDay: !(start.getTime() === end.getTime() && !!isHalfDay),
          repeatMode: "SINGLE",
          reason: typeof reason === "string" ? reason : ""
        }
      });
    };
  }
});

// schemas/extensions/TimePlanEntries.ts
var import_core14, normalizeDateInput, ensureRepeatModeSupportsFields, createRepeatTimePlanEntry, TimePlanEntries;
var init_TimePlanEntries = __esm({
  "schemas/extensions/TimePlanEntries.ts"() {
    "use strict";
    import_core14 = require("@keystone-6/core");
    init_userRole();
    init_directEntry();
    normalizeDateInput = (value, label) => {
      if (!value) return null;
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) throw new Error(`${label ?? "Date"} is invalid.`);
      return date.toISOString();
    };
    ensureRepeatModeSupportsFields = ({
      repeatMode,
      repeatDay
    }) => {
      if (repeatMode === "WEEKLY" && (typeof repeatDay !== "number" || repeatDay < 0 || repeatDay > 6)) {
        throw new Error("Weekly repeating entries require repeatDay between 0-6 (JS weekday).");
      }
      if (repeatMode === "MONTHLY_CALENDAR" && (typeof repeatDay !== "number" || repeatDay <= 0)) {
        throw new Error("Monthly calendar repeating entries require a positive repeatDay value.");
      }
      if (repeatMode === "MONTHLY_BUSINESS" && (typeof repeatDay !== "number" || repeatDay === 0)) {
        throw new Error("Monthly business repeating entries require a non-zero repeatDay value.");
      }
    };
    createRepeatTimePlanEntry = async ({
      context,
      session,
      input
    }) => {
      const { timeTypeId } = input;
      const repeatMode = input.repeatMode;
      if (!repeatMode || repeatMode === "SINGLE") {
        throw new Error("repeatMode is required and must not be SINGLE when creating a repeating entry.");
      }
      const sessionUser = await resolveSessionUser({ context, session });
      const policy = await findPolicyForTimeType({
        context,
        timeTypeId,
        orgId: sessionUser.orgId,
        locationId: sessionUser.location?.id
      });
      if (!policy?.id) throw new Error("No policy configured for this time type and location.");
      const policyDetails = await context.query.TimePolicy.findOne({
        where: { id: policy.id },
        query: "id isAllocationManaged isApprovable"
      });
      if (policyDetails?.isAllocationManaged) {
        throw new Error("Repeating time plans cannot be used with allocation-managed policies.");
      }
      const startsOnIso = normalizeDateInput(input.startDateTime, "startDateTime");
      if (!startsOnIso) throw new Error("startDateTime is required when creating a repeating entry.");
      const interval = input.repeatInterval && input.repeatInterval > 0 ? input.repeatInterval : 1;
      ensureRepeatModeSupportsFields({
        repeatMode,
        repeatDay: input.repeatDay ?? null
      });
      const timePlan = await context.db.TimePlan.createOne({
        data: {
          org: { connect: { id: sessionUser.orgId } },
          user: { connect: { id: sessionUser.userId } },
          timeType: { connect: { id: timeTypeId } },
          timePolicy: { connect: { id: policy.id } },
          status: policyDetails?.isApprovable === false ? "APPROVED" : "PENDING",
          repeatMode,
          repeatInterval: interval,
          repeatDay: typeof input.repeatDay === "number" ? input.repeatDay : null,
          startAt: startsOnIso,
          endAt: normalizeDateInput(input.repeatEndsOn, "repeatEndsOn"),
          reason: typeof input.reason === "string" ? input.reason : ""
        }
      });
      return timePlan;
    };
    TimePlanEntries = (base) => {
      const TimePlanEntryPayload = base.object("TimePlan");
      const PendingTimePlanApproval = import_core14.graphql.object()({
        name: "PendingTimePlanApproval",
        fields: {
          timePlan: import_core14.graphql.field({
            type: base.object("TimePlan"),
            resolve: (item) => item
          }),
          sortKey: import_core14.graphql.field({
            type: import_core14.graphql.nonNull(import_core14.graphql.Float),
            resolve: (item) => item.sortKey
          })
        }
      });
      const TimePlanEntryInput = import_core14.graphql.inputObject({
        name: "TimePlanEntryInput",
        fields: () => ({
          timeTypeId: import_core14.graphql.arg({ type: import_core14.graphql.nonNull(import_core14.graphql.ID) }),
          startDateTime: import_core14.graphql.arg({ type: import_core14.graphql.String }),
          endDateTime: import_core14.graphql.arg({ type: import_core14.graphql.String }),
          isHalfDay: import_core14.graphql.arg({ type: import_core14.graphql.Boolean }),
          reason: import_core14.graphql.arg({ type: import_core14.graphql.String }),
          repeatMode: import_core14.graphql.arg({ type: base.enum("TimePlanRepeatModeType") }),
          repeatInterval: import_core14.graphql.arg({ type: import_core14.graphql.Int }),
          repeatDay: import_core14.graphql.arg({ type: import_core14.graphql.Int }),
          repeatEndsOn: import_core14.graphql.arg({ type: import_core14.graphql.String })
        })
      });
      const TimePlanEntryUpdateInput = import_core14.graphql.inputObject({
        name: "TimePlanEntryUpdateInput",
        fields: () => ({
          id: import_core14.graphql.arg({ type: import_core14.graphql.nonNull(import_core14.graphql.ID) }),
          timeTypeId: import_core14.graphql.arg({ type: import_core14.graphql.ID }),
          startDateTime: import_core14.graphql.arg({ type: import_core14.graphql.String }),
          endDateTime: import_core14.graphql.arg({ type: import_core14.graphql.String }),
          isHalfDay: import_core14.graphql.arg({ type: import_core14.graphql.Boolean }),
          reason: import_core14.graphql.arg({ type: import_core14.graphql.String }),
          repeatMode: import_core14.graphql.arg({ type: base.enum("TimePlanRepeatModeType") }),
          repeatInterval: import_core14.graphql.arg({ type: import_core14.graphql.Int }),
          repeatDay: import_core14.graphql.arg({ type: import_core14.graphql.Int }),
          repeatEndsOn: import_core14.graphql.arg({ type: import_core14.graphql.String })
        })
      });
      const createPendingResult = (item) => {
        const rawSortKey = new Date(item.startAt ?? 0).getTime();
        const sortKey = Number.isNaN(rawSortKey) ? Date.now() : rawSortKey;
        return {
          ...item,
          sortKey
        };
      };
      return {
        mutation: {
          createTimePlanEntry: import_core14.graphql.field({
            type: import_core14.graphql.nonNull(TimePlanEntryPayload),
            args: {
              input: import_core14.graphql.arg({ type: import_core14.graphql.nonNull(TimePlanEntryInput) })
            },
            async resolve(_root, { input }, context) {
              const session = context.session;
              if (!session?.email) throw new Error("Unauthorized");
              const isRepeating = input.repeatMode && input.repeatMode !== "SINGLE";
              if (isRepeating) {
                return await createRepeatTimePlanEntry({
                  context,
                  session,
                  input: {
                    timeTypeId: input.timeTypeId,
                    startDateTime: input.startDateTime,
                    reason: input.reason,
                    repeatMode: input.repeatMode,
                    repeatInterval: input.repeatInterval ?? null,
                    repeatDay: typeof input.repeatDay === "number" ? input.repeatDay : null,
                    repeatEndsOn: input.repeatEndsOn
                  }
                });
              }
              if (!input.startDateTime || !input.endDateTime) {
                throw new Error("startDateTime and endDateTime are required for single time plan entries.");
              }
              return await createDirectTimePlanEntry({
                context,
                session,
                input: {
                  timeTypeId: input.timeTypeId,
                  startDateTime: input.startDateTime,
                  endDateTime: input.endDateTime,
                  isHalfDay: typeof input.isHalfDay === "boolean" ? input.isHalfDay : void 0,
                  reason: typeof input.reason === "string" ? input.reason : void 0
                }
              });
            }
          }),
          updateTimePlanEntry: import_core14.graphql.field({
            type: import_core14.graphql.nonNull(TimePlanEntryPayload),
            args: {
              input: import_core14.graphql.arg({ type: import_core14.graphql.nonNull(TimePlanEntryUpdateInput) })
            },
            async resolve(_root, { input }, context) {
              const session = context.session;
              if (!session?.email) throw new Error("Unauthorized");
              const { id } = input;
              const existingTimePlan = await context.query.TimePlan.findOne({
                where: { id },
                query: "id repeatMode user { id } status startAt endAt timePolicy { isApprovable }"
              });
              if (!existingTimePlan) throw new Error("TimePlan not found");
              const sessionUserId = await resolveSessionUser({ context, session }).then((u) => u.userId);
              const isAdmin = isAnyAdmin({ session });
              if (!isAdmin && existingTimePlan.user?.id !== sessionUserId) {
                throw new Error("Forbidden");
              }
              const referenceDateIso = existingTimePlan.endAt ?? existingTimePlan.startAt;
              if (referenceDateIso) {
                const referenceDate = new Date(referenceDateIso);
                const today = toMidnightUtc(/* @__PURE__ */ new Date());
                if (referenceDate.getTime() < today.getTime()) throw new Error("Past time plans cannot be edited");
              }
              const updateData = {};
              if (input.reason !== void 0) updateData.reason = input.reason;
              if (input.startDateTime) updateData.startAt = normalizeDateInput(input.startDateTime, "startDateTime");
              if (input.endDateTime || input.repeatEndsOn) {
                const endValue = input.endDateTime || input.repeatEndsOn;
                updateData.endAt = normalizeDateInput(endValue, "end date");
              }
              if (input.repeatMode) updateData.repeatMode = input.repeatMode;
              if (typeof input.repeatInterval === "number") updateData.repeatInterval = input.repeatInterval;
              if (typeof input.repeatDay === "number") updateData.repeatDay = input.repeatDay;
              if (input.timeTypeId) {
                const policy = await findPolicyForTimeType({
                  context,
                  timeTypeId: input.timeTypeId,
                  orgId: (await context.query.User.findOne({ where: { id: sessionUserId }, query: "org { id }" }))?.org?.id,
                  locationId: null
                });
                if (policy?.id) {
                  updateData.timeType = { connect: { id: input.timeTypeId } };
                  updateData.timePolicy = { connect: { id: policy.id } };
                }
              }
              const policyAllowsApproval = existingTimePlan.timePolicy?.isApprovable !== false;
              const shouldResetStatus = !isAdmin && policyAllowsApproval && existingTimePlan.status && existingTimePlan.status !== "PENDING";
              if (shouldResetStatus) {
                updateData.status = "PENDING";
                updateData.decidedAt = null;
                updateData.decidedBy = { disconnect: true };
              }
              return await context.db.TimePlan.updateOne({
                where: { id },
                data: updateData
              });
            }
          }),
          deleteTimePlanEntry: import_core14.graphql.field({
            type: import_core14.graphql.nonNull(import_core14.graphql.Boolean),
            args: {
              id: import_core14.graphql.arg({ type: import_core14.graphql.nonNull(import_core14.graphql.ID) })
            },
            async resolve(_root, { id }, context) {
              const session = context.session;
              if (!session?.email) throw new Error("Unauthorized");
              const timePlan = await context.query.TimePlan.findOne({
                where: { id },
                query: "id user { id }"
              });
              if (!timePlan) throw new Error("TimePlan not found");
              const sessionUserId = await resolveSessionUser({ context, session }).then((u) => u.userId);
              const isAdmin = isAnyAdmin({ session });
              if (!isAdmin && timePlan.user?.id !== sessionUserId) {
                throw new Error("Forbidden");
              }
              await context.db.TimePlan.deleteOne({ where: { id } });
              return true;
            }
          })
        },
        query: {
          pendingTimePlanApprovals: import_core14.graphql.field({
            type: import_core14.graphql.nonNull(import_core14.graphql.list(import_core14.graphql.nonNull(PendingTimePlanApproval))),
            async resolve(_root, _args, context) {
              const session = context.session;
              if (!session?.email) throw new Error("Unauthorized");
              const isAdmin = isAnyAdmin({ session });
              if (!isAdmin) throw new Error("Forbidden");
              const sessionUser = await resolveSessionUser({ context, session });
              const timePlans = await context.db.TimePlan.findMany({
                where: {
                  org: { id: { equals: sessionUser.orgId } },
                  status: { equals: "PENDING" }
                },
                orderBy: { startAt: "asc" }
              });
              return timePlans.map(createPendingResult);
            }
          })
        }
      };
    };
  }
});

// schemas/extensions/TimePlans.ts
var import_core15, import_rrule3, isoFromValue, buildOccurrenceId, mapDirectTimePlan, mapOverrideTimePlan, groupOverridesBySeries, expandRecurringTimePlan, TimePlans;
var init_TimePlans = __esm({
  "schemas/extensions/TimePlans.ts"() {
    "use strict";
    import_core15 = require("@keystone-6/core");
    import_rrule3 = require("rrule");
    init_userRole();
    init_rrule();
    init_directEntry();
    isoFromValue = (value) => {
      if (!value) return null;
      const maybeDate = typeof value === "string" ? new Date(value) : value;
      if (Number.isNaN(maybeDate.getTime())) return null;
      return maybeDate.toISOString();
    };
    buildOccurrenceId = (item, fallback) => {
      if (typeof item?.occurrenceId === "string") return item.occurrenceId;
      if (typeof item?.startAt === "string") return item.startAt;
      if (fallback) return fallback;
      return item?.id ?? "";
    };
    mapDirectTimePlan = (timePlan) => ({
      ...timePlan,
      occurrenceId: buildOccurrenceId(timePlan),
      seriesId: timePlan.seriesId ?? timePlan.repeatOrigin?.id ?? null,
      isRecurringInstance: Boolean(timePlan.isRecurringInstance)
    });
    mapOverrideTimePlan = (timePlan) => ({
      ...timePlan,
      occurrenceId: timePlan.replacedStartAt ?? buildOccurrenceId(timePlan),
      seriesId: timePlan.repeatOrigin?.id ?? null,
      isRecurringInstance: true
    });
    groupOverridesBySeries = (plans) => {
      const map = /* @__PURE__ */ new Map();
      plans.forEach((plan) => {
        const seriesId = plan.repeatOrigin?.id;
        if (!seriesId) return;
        const existing = map.get(seriesId) ?? [];
        existing.push(plan);
        map.set(seriesId, existing);
      });
      return map;
    };
    expandRecurringTimePlan = (plan, rangeStart, rangeEnd, overrides) => {
      const ruleSource = plan.rrule ?? buildTimePlanRRule(plan);
      if (!ruleSource) return [];
      let rule;
      try {
        rule = import_rrule3.RRule.fromString(ruleSource);
      } catch {
        return [];
      }
      const skipped = new Set(
        (overrides ?? []).map((exception) => isoFromValue(exception.replacedStartAt ?? exception.startAt)).filter(Boolean)
      );
      return rule.between(rangeStart, rangeEnd, true).filter((occurrence) => !skipped.has(occurrence.toISOString())).map((occurrence) => {
        const occurrenceId = occurrence.toISOString();
        return {
          ...plan,
          id: `${plan.id}:${occurrenceId}`,
          startAt: occurrenceId,
          endAt: occurrenceId,
          occurrenceId,
          seriesId: plan.id,
          isRecurringInstance: true
        };
      });
    };
    TimePlans = (base) => ({
      query: {
        getTimePlans: import_core15.graphql.field({
          type: import_core15.graphql.list(import_core15.graphql.nonNull(base.object("TimePlan"))),
          args: {
            start: import_core15.graphql.arg({ type: import_core15.graphql.nonNull(import_core15.graphql.String) }),
            end: import_core15.graphql.arg({ type: import_core15.graphql.nonNull(import_core15.graphql.String) })
          },
          async resolve(source, { start, end }, context) {
            const session = context.session;
            if (!session?.email) return [];
            const users = await context.query.User.findMany({
              where: { email: { equals: session.email } },
              query: "id role org { id }"
            });
            const user = users?.[0];
            if (!user?.org?.id) return [];
            const startDate = new Date(start);
            const endDate = new Date(end);
            const timePlans = await context.query.TimePlan.findMany({
              where: {
                org: { id: { equals: user.org.id } },
                startAt: { lte: endDate.toISOString() },
                OR: [
                  { endAt: { gte: startDate.toISOString() } },
                  { endAt: { equals: null } }
                ]
              },
              query: `
            id
            startAt
            endAt
            repeatMode
            repeatInterval
            repeatDay
            origin
            status
            reason
            isAllDay
            timeType {
              id
              name
              color
            }
            user {
              id
              displayName
              avatarUrl
              location {
                id
              }
            }
            repeatOrigin {
              id
            }
            replacedStartAt
            rrule
            occurrenceId
            isRecurringInstance
          `
            });
            const startRange = startDate;
            const endRange = endDate;
            const overridePlans = timePlans.filter((plan) => Boolean(plan.repeatOrigin?.id));
            const basePlans = timePlans.filter((plan) => !plan.repeatOrigin?.id && plan.repeatMode && plan.repeatMode !== "SINGLE");
            const singlePlans = timePlans.filter((plan) => !plan.repeatOrigin?.id && (!plan.repeatMode || plan.repeatMode === "SINGLE"));
            const overridesBySeries = groupOverridesBySeries(overridePlans);
            const recurringInstances = basePlans.flatMap(
              (plan) => expandRecurringTimePlan(plan, startRange, endRange, overridesBySeries.get(plan.id))
            );
            const mappedOverrides = overridePlans.map(mapOverrideTimePlan);
            const mappedSingles = singlePlans.map(mapDirectTimePlan);
            return [...mappedSingles, ...recurringInstances, ...mappedOverrides].sort((a, b) => {
              const aStart = new Date(a.startAt ?? 0).getTime();
              const bStart = new Date(b.startAt ?? 0).getTime();
              return aStart - bStart;
            });
          }
        })
      },
      mutation: {
        requestTimePlan: import_core15.graphql.field({
          type: base.object("TimePlan"),
          args: {
            timeTypeId: import_core15.graphql.arg({ type: import_core15.graphql.nonNull(import_core15.graphql.ID) }),
            startDateTime: import_core15.graphql.arg({ type: import_core15.graphql.nonNull(import_core15.graphql.String) }),
            endDateTime: import_core15.graphql.arg({ type: import_core15.graphql.nonNull(import_core15.graphql.String) }),
            isHalfDay: import_core15.graphql.arg({ type: import_core15.graphql.Boolean }),
            reason: import_core15.graphql.arg({ type: import_core15.graphql.String })
          },
          async resolve(source, { timeTypeId, startDateTime, endDateTime, isHalfDay, reason }, context) {
            return await createDirectTimePlanEntry({
              context,
              session: context.session,
              input: {
                timeTypeId,
                startDateTime,
                endDateTime,
                isHalfDay: typeof isHalfDay === "boolean" ? isHalfDay : void 0,
                reason: typeof reason === "string" ? reason : void 0
              }
            });
          }
        }),
        decideTimePlan: import_core15.graphql.field({
          type: base.object("TimePlan"),
          args: {
            timePlanId: import_core15.graphql.arg({ type: import_core15.graphql.nonNull(import_core15.graphql.ID) }),
            decision: import_core15.graphql.arg({ type: import_core15.graphql.nonNull(base.enum("TimePlanStatusType")) })
          },
          async resolve(source, { timePlanId, decision }, context) {
            const session = context.session;
            if (!session?.email) throw new Error("Unauthorized");
            const users = await context.query.User.findMany({
              where: { email: { equals: session.email } },
              query: "id role org { id }"
            });
            const me = users?.[0];
            const canDecideTimePlan = isAnyAdmin({ session });
            if (!canDecideTimePlan || !me?.org?.id) throw new Error("Forbidden");
            const leave = await context.query.TimePlan.findOne({
              where: { id: timePlanId },
              query: "id org { id } status"
            });
            if (!leave || leave.org?.id !== me.org.id) throw new Error("TimePlan not found");
            if (decision === "PENDING") throw new Error("Cannot set status back to pending");
            return await context.db.TimePlan.updateOne({
              where: { id: timePlanId },
              data: {
                status: decision,
                decidedBy: { connect: { id: me.id } },
                decidedAt: (/* @__PURE__ */ new Date()).toISOString()
              }
            });
          }
        })
      }
    });
  }
});

// schemas/extensions/index.ts
var SCHEMA_EXTENSIONS;
var init_extensions = __esm({
  "schemas/extensions/index.ts"() {
    "use strict";
    init_Allocations();
    init_Holidays();
    init_Onboarding();
    init_Policies();
    init_TimePlanEntries();
    init_TimePlans();
    SCHEMA_EXTENSIONS = [Holidays3, TimePlans, Policies, Onboarding, Allocations, TimePlanEntries];
  }
});

// schemas/graphqlExtensions.ts
var import_core16, graphqlExtensions_default;
var init_graphqlExtensions = __esm({
  "schemas/graphqlExtensions.ts"() {
    "use strict";
    import_core16 = require("@keystone-6/core");
    init_extensions();
    graphqlExtensions_default = import_core16.graphql.extend((base) => SCHEMA_EXTENSIONS.map((item) => item(base)));
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
var import_cookie, import_free_email_domains3, import_next_auth, freeEmailDomainSet3, extractDomain2, isSecureCookies, cookiePrefix, cookiesMappingConfig, cookies, nextAuthOptions, nextAuthSessionStrategy;
var init_auth = __esm({
  "auth.ts"() {
    "use strict";
    import_cookie = require("cookie");
    import_free_email_domains3 = __toESM(require("free-email-domains"));
    import_next_auth = require("next-auth");
    init_env();
    init_keystoneContext();
    init_userRole();
    init_extractUserData();
    init_providers();
    freeEmailDomainSet3 = new Set(import_free_email_domains3.default.map((domain) => domain.toLowerCase()));
    extractDomain2 = (email) => {
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
          const domain = extractDomain2(email);
          const nowIso = (/* @__PURE__ */ new Date()).toISOString();
          const extractedData = extractUserData_default(provider, { user, profile });
          const existingUsers = await sudoContext.query.User.findMany({
            where: { email: { equals: email } },
            query: "id org { id } location { id }"
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
          if (domain && !freeEmailDomainSet3.has(domain)) {
            const orgs = await sudoContext.query.Organization.findMany({
              query: "id autojoinDomains"
            });
            const matchedOrg = orgs.find((candidate) => {
              const domains = Array.isArray(candidate.autojoinDomains) ? candidate.autojoinDomains : [];
              return domains.map((value) => value?.toLowerCase?.() || "").includes(domain);
            });
            matchedOrgId = matchedOrg?.id ?? null;
          }
          let locationToConnect = null;
          if (matchedOrgId) {
            const candidateLocations = await sudoContext.query.Location.findMany({
              where: { org: { id: { equals: matchedOrgId } } },
              take: 1,
              query: "id"
            });
            const primaryLocation = candidateLocations?.[0];
            if (!primaryLocation?.id) {
              throw new Error("Auto-join target organization does not have a location configured.");
            }
            locationToConnect = { id: primaryLocation.id };
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
                ...locationToConnect && !existingUser.location?.id ? { location: { connect: locationToConnect } } : {}
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
              ...locationToConnect ? { location: { connect: locationToConnect } } : {}
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
            query: "id email org { id } location { id } role providerAccountId isActive seenAt avatarUrl displayName"
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
          const emailDomain = extractDomain2(user?.email ?? normalizedEmail);
          const isAutojoinDomainAllowed = !!(emailDomain && !freeEmailDomainSet3.has(emailDomain));
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
            locationId: user?.location?.id || null,
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
var import_core17, keystone_default;
var init_keystone = __esm({
  "keystone.ts"() {
    import_core17 = require("@keystone-6/core");
    init_schemas2();
    init_env();
    init_auth();
    init_providers();
    init_cors();
    init_routes();
    keystone_default = (0, import_core17.config)({
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
