import { pgTable, unique, text, timestamp, foreignKey, boolean, integer, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const eventRegistration = pgTable("event_registration", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	phone: text(),
	eventName: text("event_name").notNull(), // Nome do evento (ex: "insider-launch-nov-2025")
	eventDate: timestamp("event_date", { mode: 'string' }).notNull(),
	registeredAt: timestamp("registered_at", { mode: 'string' }).defaultNow().notNull(),
	attended: boolean().default(false),
	source: text(), // Origem da inscrição (ex: "landing-page", "email-campaign", etc)
});



export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text(),
	email: text(),
	emailVerified: timestamp({ mode: 'string' }),
	image: text(),
	password: text(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const session = pgTable("session", {
	sessionToken: text().primaryKey().notNull(),
	userId: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
		columns: [table.userId],
		foreignColumns: [user.id],
		name: "session_userId_user_id_fk"
	}).onDelete("cascade"),
]);

export const userChecklistProgress = pgTable("user_checklist_progress", {
	id: text().primaryKey().notNull(),
	userId: text().notNull(),
	checklistItemId: text().notNull(),
	isCompleted: boolean().default(false),
	completedAt: timestamp({ mode: 'string' }),
	notes: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow(),
	priority: integer().default(0),
	dueDate: timestamp({ mode: 'string' }),
	attachments: text(),
}, (table) => [
	foreignKey({
		columns: [table.userId],
		foreignColumns: [user.id],
		name: "user_checklist_progress_userId_user_id_fk"
	}).onDelete("cascade"),
	foreignKey({
		columns: [table.checklistItemId],
		foreignColumns: [checklistItem.id],
		name: "user_checklist_progress_checklistItemId_checklist_item_id_fk"
	}).onDelete("cascade"),
]);

export const userProfile = pgTable("user_profile", {
	id: text().primaryKey().notNull(),
	userId: text().notNull(),
	propertyType: text(),
	location: text(),
	buyerProfile: text(),
	usageType: text(),
	investmentBudget: integer(),
	createdAt: timestamp({ mode: 'string' }).defaultNow(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow(),
	phone: text(),
	investmentGoal: text(),
}, (table) => [
	foreignKey({
		columns: [table.userId],
		foreignColumns: [user.id],
		name: "user_profile_userId_user_id_fk"
	}).onDelete("cascade"),
]);

export const checklistCategory = pgTable("checklist_category", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	order: integer().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow(),
});

export const checklistItem = pgTable("checklist_item", {
	id: text().primaryKey().notNull(),
	categoryId: text().notNull(),
	title: text().notNull(),
	description: text(),
	order: integer().notNull(),
	propertyTypes: text(),
	buyerProfiles: text(),
	usageTypes: text(),
	isOptional: boolean().default(false),
	estimatedDays: integer(),
	resources: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
		columns: [table.categoryId],
		foreignColumns: [checklistCategory.id],
		name: "checklist_item_categoryId_checklist_category_id_fk"
	}).onDelete("cascade"),
]);

export const userProgressHistory = pgTable("user_progress_history", {
	id: text().primaryKey().notNull(),
	progressId: text().notNull(),
	action: text().notNull(),
	previousValue: text(),
	newValue: text(),
	timestamp: timestamp({ mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
		columns: [table.progressId],
		foreignColumns: [userChecklistProgress.id],
		name: "user_progress_history_progressId_user_checklist_progress_id_fk"
	}).onDelete("cascade"),
]);

export const verificationToken = pgTable("verificationToken", {
	identifier: text().notNull(),
	token: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	primaryKey({ columns: [table.identifier, table.token], name: "verificationToken_identifier_token_pk" }),
]);

export const authenticator = pgTable("authenticator", {
	credentialId: text().notNull(),
	userId: text().notNull(),
	providerAccountId: text().notNull(),
	credentialPublicKey: text().notNull(),
	counter: integer().notNull(),
	credentialDeviceType: text().notNull(),
	credentialBackedUp: boolean().notNull(),
	transports: text(),
}, (table) => [
	foreignKey({
		columns: [table.userId],
		foreignColumns: [user.id],
		name: "authenticator_userId_user_id_fk"
	}).onDelete("cascade"),
	primaryKey({ columns: [table.credentialId, table.userId], name: "authenticator_userId_credentialID_pk" }),
	unique("authenticator_credentialID_unique").on(table.credentialId),
]);

export const account = pgTable("account", {
	userId: text().notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text().notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
}, (table) => [
	foreignKey({
		columns: [table.userId],
		foreignColumns: [user.id],
		name: "account_userId_user_id_fk"
	}).onDelete("cascade"),
	primaryKey({ columns: [table.provider, table.providerAccountId], name: "account_provider_providerAccountId_pk" }),
]);
