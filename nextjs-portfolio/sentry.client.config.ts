import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: "https://bd7235e7e4d2876630d1a60432da75f1@o4509123267067904.ingest.de.sentry.io/4509123268182096",

	integrations: [Sentry.replayIntegration()],
	// Session Replay
	replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
	replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
