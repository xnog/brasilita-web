import { relations } from "drizzle-orm/relations";
import { user, session, userChecklistProgress, checklistItem, userProfile, checklistCategory, userProgressHistory, authenticator, account } from "./schema";

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	sessions: many(session),
	userChecklistProgresses: many(userChecklistProgress),
	userProfiles: many(userProfile),
	authenticators: many(authenticator),
	accounts: many(account),
}));

export const userChecklistProgressRelations = relations(userChecklistProgress, ({one, many}) => ({
	user: one(user, {
		fields: [userChecklistProgress.userId],
		references: [user.id]
	}),
	checklistItem: one(checklistItem, {
		fields: [userChecklistProgress.checklistItemId],
		references: [checklistItem.id]
	}),
	userProgressHistories: many(userProgressHistory),
}));

export const checklistItemRelations = relations(checklistItem, ({one, many}) => ({
	userChecklistProgresses: many(userChecklistProgress),
	checklistCategory: one(checklistCategory, {
		fields: [checklistItem.categoryId],
		references: [checklistCategory.id]
	}),
}));

export const userProfileRelations = relations(userProfile, ({one}) => ({
	user: one(user, {
		fields: [userProfile.userId],
		references: [user.id]
	}),
}));

export const checklistCategoryRelations = relations(checklistCategory, ({many}) => ({
	checklistItems: many(checklistItem),
}));

export const userProgressHistoryRelations = relations(userProgressHistory, ({one}) => ({
	userChecklistProgress: one(userChecklistProgress, {
		fields: [userProgressHistory.progressId],
		references: [userChecklistProgress.id]
	}),
}));

export const authenticatorRelations = relations(authenticator, ({one}) => ({
	user: one(user, {
		fields: [authenticator.userId],
		references: [user.id]
	}),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));