import { pgTable, text, timestamp, integer, primaryKey, boolean, unique, jsonb, decimal } from "drizzle-orm/pg-core";
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

// Password reset tokens table
export const passwordResetTokens = pgTable("password_reset_token", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull().unique(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

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
    propertyType: text("propertyType"), // residential, investment
    location: text("location"), // desired location in Italy
    buyerProfile: text("buyerProfile"), // resident, italian_citizen, foreign_non_resident, brazilian_abroad
    usageType: text("usageType"), // personal_use, long_rental, short_rental
    investmentBudget: integer("investmentBudget"), // budget in euros
    hasFinancing: boolean("hasFinancing"), // whether the user already has the money to buy
    phone: text("phone"), // user's phone number
    investmentGoal: text("investmentGoal"), // user's objective/intention for the property investment
    emailPreferences: jsonb("emailPreferences").default({ weeklySuggestions: true }), // Email notification preferences
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
}, (table) => ({
    // Unique constraint to ensure one profile per user
    uniqueUserProfile: unique("user_profile_userId_unique").on(table.userId),
}));

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
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type NewPasswordResetToken = typeof passwordResetTokens.$inferInsert;

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
    rooms: integer("rooms"),
    bedrooms: integer("bedrooms"),
    bathrooms: integer("bathrooms"),
    area: integer("area"), // square meters
    features: jsonb("features"), // JSON array of features
    images: jsonb("images"), // JSON array of image URLs
    originalUrl: text("originalUrl").unique(), // URL of the original property listing
    latitude: decimal("latitude", { precision: 9, scale: 6 }), // GPS latitude coordinate
    longitude: decimal("longitude", { precision: 9, scale: 6 }), // GPS longitude coordinate
    realEstate: text("realEstate"), // Real estate agency/company name
    isRentToOwn: boolean("isRentToOwn").default(false), // Whether property offers rent-to-own option
    isAvailable: boolean("isAvailable").default(true),
    isRented: boolean("isRented").default(false),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

// User property interests - simple table to track user interest in properties
export const userPropertyInterests = pgTable("user_property_interest", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    propertyId: text("propertyId")
        .notNull()
        .references(() => properties.id, { onDelete: "cascade" }),
    isInterested: boolean("isInterested").default(true),
    wantsToProceed: boolean("wantsToProceed").default(false), // User confirmed intent to proceed with negotiation
    notes: text("notes"), // Optional user notes about the property
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
}, (table) => ({
    // Unique constraint to prevent duplicate interests
    uniqueUserPropertyInterest: unique("user_property_interest_unique").on(table.userId, table.propertyId),
}));

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
}, (table) => ({
    // Unique constraint to prevent duplicate user profile-region combinations
    uniqueUserProfileRegion: unique("user_profile_region_unique").on(table.userProfileId, table.regionId),
}));

// Relations
export const regionsRelations = relations(regions, ({ many }) => ({
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
    userPropertyInterests: many(userPropertyInterests),
}));

export const userPropertyInterestsRelations = relations(userPropertyInterests, ({ one }) => ({
    user: one(users, {
        fields: [userPropertyInterests.userId],
        references: [users.id],
    }),
    property: one(properties, {
        fields: [userPropertyInterests.propertyId],
        references: [properties.id],
    }),
}));

// Property notifications tables
export const propertyNotifications = pgTable("property_notification", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(), // User-defined name for the notification
    isActive: boolean("isActive").default(true),
    filters: jsonb("filters").notNull(), // PropertyFilters object as JSON
    lastProcessedAt: timestamp("lastProcessedAt", { mode: "date" }), // Last time this notification was processed
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

// Relations for notifications
export const propertyNotificationsRelations = relations(propertyNotifications, ({ one }) => ({
    user: one(users, {
        fields: [propertyNotifications.userId],
        references: [users.id],
    }),
}));

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
    authenticators: many(authenticators),
    userProfiles: many(userProfiles),
    userPropertyInterests: many(userPropertyInterests),
    userChecklistProgress: many(userChecklistProgress),
    propertyNotifications: many(propertyNotifications),
    purchaseJourneys: many(purchaseJourneys),
}));

export type Region = typeof regions.$inferSelect;
export type NewRegion = typeof regions.$inferInsert;
export type UserProfileRegion = typeof userProfileRegions.$inferSelect;
export type NewUserProfileRegion = typeof userProfileRegions.$inferInsert;
export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;
export type UserPropertyInterest = typeof userPropertyInterests.$inferSelect;
export type NewUserPropertyInterest = typeof userPropertyInterests.$inferInsert;
export type PropertyNotification = typeof propertyNotifications.$inferSelect;
export type NewPropertyNotification = typeof propertyNotifications.$inferInsert;

// Event registration table
export const eventRegistration = pgTable("event_registration", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    eventName: text("event_name").notNull(), // Nome do evento (ex: "insider-launch-nov-2025")
    eventDate: timestamp("event_date", { mode: "date" }).notNull(),
    registeredAt: timestamp("registered_at", { mode: "date" }).defaultNow().notNull(),
    attended: boolean("attended").default(false),
    source: text("source"), // Origem da inscrição (ex: "landing-page", "email-campaign", etc)
});

export type EventRegistration = typeof eventRegistration.$inferSelect;
export type NewEventRegistration = typeof eventRegistration.$inferInsert;

// Purchase Journey tables - Processo de Compra do Imóvel
export const purchaseJourneys = pgTable("purchase_journey", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    propertyId: text("propertyId")
        .notNull()
        .references(() => properties.id, { onDelete: "cascade" }),
    status: text("status").notNull().default("in_progress"), // in_progress, completed, cancelled
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
}, (table) => ({
    // Unique constraint: apenas uma jornada ativa por usuário + imóvel
    uniqueUserProperty: unique("purchase_journey_user_property_unique").on(table.userId, table.propertyId),
}));

// Purchase Journey Steps - As 24 etapas padronizadas
export const purchaseJourneySteps = pgTable("purchase_journey_step", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    journeyId: text("journeyId")
        .notNull()
        .references(() => purchaseJourneys.id, { onDelete: "cascade" }),
    stepNumber: integer("stepNumber").notNull(), // 1 a 24
    title: text("title").notNull(),
    description: text("description").notNull(),
    uploadRequired: boolean("uploadRequired").default(false),
    status: text("status").notNull().default("pending"), // pending, in_progress, completed
    completedAt: timestamp("completedAt", { mode: "date" }),
    notes: text("notes"), // Notas opcionais do usuário
    // Campos opcionais para integração com reunião (etapa 1)
    eventId: text("eventId"),
    meetingLink: text("meetingLink"),
    eventStart: timestamp("eventStart", { mode: "date" }),
    eventEnd: timestamp("eventEnd", { mode: "date" }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
}, (table) => ({
    // Unique constraint: apenas uma etapa por número em cada jornada
    uniqueJourneyStep: unique("purchase_journey_step_unique").on(table.journeyId, table.stepNumber),
}));

// Purchase Journey Uploads - Arquivos enviados para cada etapa
export const purchaseJourneyUploads = pgTable("purchase_journey_upload", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    journeyId: text("journeyId")
        .notNull()
        .references(() => purchaseJourneys.id, { onDelete: "cascade" }),
    stepId: text("stepId")
        .notNull()
        .references(() => purchaseJourneySteps.id, { onDelete: "cascade" }),
    fileName: text("fileName").notNull(),
    fileUrl: text("fileUrl").notNull(), // URL do arquivo (S3, local, etc)
    fileSize: integer("fileSize"), // Tamanho em bytes
    mimeType: text("mimeType"), // Tipo MIME do arquivo
    uploadedBy: text("uploadedBy")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

// Relations
export const purchaseJourneysRelations = relations(purchaseJourneys, ({ one, many }) => ({
    user: one(users, {
        fields: [purchaseJourneys.userId],
        references: [users.id],
    }),
    property: one(properties, {
        fields: [purchaseJourneys.propertyId],
        references: [properties.id],
    }),
    steps: many(purchaseJourneySteps),
}));

export const purchaseJourneyStepsRelations = relations(purchaseJourneySteps, ({ one, many }) => ({
    journey: one(purchaseJourneys, {
        fields: [purchaseJourneySteps.journeyId],
        references: [purchaseJourneys.id],
    }),
    uploads: many(purchaseJourneyUploads),
}));

export const purchaseJourneyUploadsRelations = relations(purchaseJourneyUploads, ({ one }) => ({
    journey: one(purchaseJourneys, {
        fields: [purchaseJourneyUploads.journeyId],
        references: [purchaseJourneys.id],
    }),
    step: one(purchaseJourneySteps, {
        fields: [purchaseJourneyUploads.stepId],
        references: [purchaseJourneySteps.id],
    }),
    uploadedByUser: one(users, {
        fields: [purchaseJourneyUploads.uploadedBy],
        references: [users.id],
    }),
}));

export type PurchaseJourney = typeof purchaseJourneys.$inferSelect;
export type NewPurchaseJourney = typeof purchaseJourneys.$inferInsert;
export type PurchaseJourneyStep = typeof purchaseJourneySteps.$inferSelect;
export type NewPurchaseJourneyStep = typeof purchaseJourneySteps.$inferInsert;
export type PurchaseJourneyUpload = typeof purchaseJourneyUploads.$inferSelect;
export type NewPurchaseJourneyUpload = typeof purchaseJourneyUploads.$inferInsert;
