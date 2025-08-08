import { pgTable, text, timestamp, integer, primaryKey, boolean } from "drizzle-orm/pg-core";
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
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
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