import { PostHog } from "posthog-node";

export default function PostHogClient() {
	const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

	if (!posthogKey) {
		console.error("PostHog API key is not defined");
		throw new Error("PostHog API key is not defined");
	}

	const posthogClient = new PostHog(posthogKey, {
		host: "https://eu.i.posthog.com",
		flushAt: 1,
		flushInterval: 0,
	});
	return posthogClient;
}
