import posthog from "posthog-js";

export const Analytics = {
  identify: (id: string, email?: string | null, name?: string | null) => {
    if (typeof window !== "undefined") {
      posthog.identify(id, {
        email: email || undefined,
        name: name || undefined,
      });
    }
  },
  track: (eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      posthog.capture(eventName, properties);
    }
  },
  reset: () => {
    if (typeof window !== "undefined") {
      posthog.reset();
    }
  }
};
