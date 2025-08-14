import { pgTable, text, timestamp, integer, primaryKey, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: text("password"), // Para login com email/senha
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    })
);

export const authenticators = pgTable(
    "authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: text("transports"),
    },
    (authenticator) => ({
        compositePK: primaryKey({
            columns: [authenticator.userId, authenticator.credentialID],
        }),
    })
);

// Checklist tables
export const userProfiles = pgTable("user_profile", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    propertyType: text("propertyType"), // residential, commercial, investment
    location: text("location"), // desired location in Italy
    buyerProfile: text("buyerProfile"), // resident, italian_citizen, foreign_non_resident
    usageType: text("usageType"), // personal_use, long_rental, short_rental
    investmentBudget: integer("investmentBudget"), // budget in euros
    phone: text("phone"), // user's phone number
    investmentGoal: text("investmentGoal"), // user's objective/intention for the property investment
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

export const checklistCategories = pgTable("checklist_category", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    description: text("description"),
    order: integer("order").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const checklistItems = pgTable("checklist_item", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    categoryId: text("categoryId")
        .notNull()
        .references(() => checklistCategories.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    order: integer("order").notNull(),
    // Conditions for when this item applies
    propertyTypes: text("propertyTypes"), // JSON array of applicable property types
    buyerProfiles: text("buyerProfiles"), // JSON array of applicable buyer profiles
    usageTypes: text("usageTypes"), // JSON array of applicable usage types
    isOptional: boolean("isOptional").default(false),
    estimatedDays: integer("estimatedDays"), // estimated time to complete
    resources: text("resources"), // JSON array of helpful links/resources
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const userChecklistProgress = pgTable("user_checklist_progress", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    checklistItemId: text("checklistItemId")
        .notNull()
        .references(() => checklistItems.id, { onDelete: "cascade" }),
    isCompleted: boolean("isCompleted").default(false),
    completedAt: timestamp("completedAt", { mode: "date" }),
    notes: text("notes"), // user's notes for this item
    priority: integer("priority").default(0), // 0=normal, 1=high, -1=low
    dueDate: timestamp("dueDate", { mode: "date" }), // user-defined deadline
    attachments: text("attachments"), // JSON array of file URLs/paths
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

// Nova tabela para histórico de mudanças
export const userProgressHistory = pgTable("user_progress_history", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    progressId: text("progressId")
        .notNull()
        .references(() => userChecklistProgress.id, { onDelete: "cascade" }),
    action: text("action").notNull(), // "created", "completed", "uncompleted", "note_added", "priority_changed"
    previousValue: text("previousValue"), // JSON do estado anterior
    newValue: text("newValue"), // JSON do novo estado
    timestamp: timestamp("timestamp", { mode: "date" }).defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Account = typeof accounts.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type UserProfile = typeof userProfiles.$inferSelect;
export type NewUserProfile = typeof userProfiles.$inferInsert;
export type ChecklistCategory = typeof checklistCategories.$inferSelect;
export type ChecklistItem = typeof checklistItems.$inferSelect;
export type UserChecklistProgress = typeof userChecklistProgress.$inferSelect;
export type NewUserChecklistProgress = typeof userChecklistProgress.$inferInsert;
export type UserProgressHistory = typeof userProgressHistory.$inferSelect;
export type NewUserProgressHistory = typeof userProgressHistory.$inferInsert;

// Property listings tables
export const properties = pgTable("property", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    description: text("description"),
    price: integer("price").notNull(), // price in euros
    location: text("location").notNull(), // city or neighborhood
    regionId: text("regionId")
        .references(() => regions.id, { onDelete: "set null" }), // Italian region
    propertyType: text("propertyType").notNull(), // residential, commercial, investment
    bedrooms: integer("bedrooms"),
    bathrooms: integer("bathrooms"),
    area: integer("area"), // square meters
    features: text("features"), // JSON array of features
    images: text("images"), // JSON array of image URLs
    isAvailable: boolean("isAvailable").default(true),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

// Property matching - links properties to users based on their profile
export const propertyMatches = pgTable("property_match", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    propertyId: text("propertyId")
        .notNull()
        .references(() => properties.id, { onDelete: "cascade" }),
    matchScore: integer("matchScore").default(0), // 0-100 matching score
    matchReason: text("matchReason"), // JSON explaining why it matched
    isActive: boolean("isActive").default(true),
    isInterested: boolean("isInterested").default(false), // User marked as interested
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});



// Regions tables
export const regions = pgTable("region", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull().unique(), // "Lombardia", "Toscana", etc.
    examples: text("examples"), // "Milão, Como, Bergamo" etc.
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

// User profile regions - many-to-many relationship
export const userProfileRegions = pgTable("user_profile_region", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userProfileId: text("userProfileId")
        .notNull()
        .references(() => userProfiles.id, { onDelete: "cascade" }),
    regionId: text("regionId")
        .notNull()
        .references(() => regions.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

// Relations
export const regionsRelations = relations(regions, ({ many, one }) => ({
    userProfileRegions: many(userProfileRegions),
    properties: many(properties),
}));

export const userProfileRegionsRelations = relations(userProfileRegions, ({ one }) => ({
    userProfile: one(userProfiles, {
        fields: [userProfileRegions.userProfileId],
        references: [userProfiles.id],
    }),
    region: one(regions, {
        fields: [userProfileRegions.regionId],
        references: [regions.id],
    }),
}));

export const userProfilesRelations = relations(userProfiles, ({ one, many }) => ({
    user: one(users, {
        fields: [userProfiles.userId],
        references: [users.id],
    }),
    userProfileRegions: many(userProfileRegions),
}));

export const propertiesRelations = relations(properties, ({ one, many }) => ({
    region: one(regions, {
        fields: [properties.regionId],
        references: [regions.id],
    }),
    propertyMatches: many(propertyMatches),
}));

export const propertyMatchesRelations = relations(propertyMatches, ({ one }) => ({
    user: one(users, {
        fields: [propertyMatches.userId],
        references: [users.id],
    }),
    property: one(properties, {
        fields: [propertyMatches.propertyId],
        references: [properties.id],
    }),
}));

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
    authenticators: many(authenticators),
    userProfiles: many(userProfiles),
    propertyMatches: many(propertyMatches),
    userChecklistProgress: many(userChecklistProgress),
}));

export type Region = typeof regions.$inferSelect;
export type NewRegion = typeof regions.$inferInsert;
export type UserProfileRegion = typeof userProfileRegions.$inferSelect;
export type NewUserProfileRegion = typeof userProfileRegions.$inferInsert;
export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;
export type PropertyMatch = typeof propertyMatches.$inferSelect;
export type NewPropertyMatch = typeof propertyMatches.$inferInsert;