import { google } from "googleapis";

const calendar = google.calendar("v3");

function getJwtClient() {
    const clientEmail = process.env.GOOGLE_CALENDAR_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_CALENDAR_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!clientEmail || !privateKey) {
        throw new Error("Google Calendar credentials are missing (GOOGLE_CALENDAR_CLIENT_EMAIL / GOOGLE_CALENDAR_PRIVATE_KEY)");
    }

    return new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/calendar"],
    });
}

export interface CreateCalendarEventInput {
    calendarId: string;
    summary: string;
    description?: string;
    start: string; // ISO string
    end: string; // ISO string
    attendees: { email: string }[];
}

export interface CreateCalendarEventResult {
    eventId: string;
    htmlLink?: string;
    hangoutLink?: string;
    start?: string | null;
    end?: string | null;
}

export async function createCalendarEvent(input: CreateCalendarEventInput): Promise<CreateCalendarEventResult> {
    const auth = getJwtClient();
    const requestId = `brasilita-${Date.now()}`;

    const res = await calendar.events.insert({
        auth,
        calendarId: input.calendarId,
        conferenceDataVersion: 1,
        requestBody: {
            summary: input.summary,
            description: input.description,
            start: { dateTime: input.start },
            end: { dateTime: input.end },
            attendees: input.attendees,
            conferenceData: {
                createRequest: {
                    requestId,
                    conferenceSolutionKey: { type: "hangoutsMeet" },
                },
            },
        },
    });

    if (!res.data || !res.data.id) {
        throw new Error("Google Calendar did not return an event ID.");
    }

    return {
        eventId: res.data.id,
        htmlLink: res.data.htmlLink || undefined,
        hangoutLink: res.data.hangoutLink || res.data.conferenceData?.entryPoints?.find((e) => e.uri)?.uri,
        start: res.data.start?.dateTime || null,
        end: res.data.end?.dateTime || null,
    };
}

