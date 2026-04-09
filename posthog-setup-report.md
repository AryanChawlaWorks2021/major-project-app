<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Billora subscription management app (Expo + React Native). Here is a summary of all changes made:

**New files created:**
- `app.config.js` — Extends `app.json` to inject `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` from environment variables into `expo.extra`, accessible at runtime via `expo-constants`.
- `src/config/posthog.ts` — PostHog client singleton configured with batching, feature flags, and lifecycle event capture. Gracefully disabled when no token is present.
- `.env` — Updated with `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST`.

**Files modified:**
- `app/_layout.tsx` — Added `PostHogProvider` wrapping the app (inside `ClerkProvider`) and manual screen tracking using `usePathname`/`useGlobalSearchParams`.
- `app/(auth)/sign-in.tsx` — Added `posthog.identify()` + `user_signed_in` capture on successful login, and `user_sign_in_failed` capture on errors.
- `app/(auth)/sign-up.tsx` — Added `posthog.identify()` + `user_signed_up` capture on successful sign-up (after email verification), and `user_sign_up_failed` capture on errors.
- `app/(tabs)/settings.tsx` — Added `user_signed_out` capture + `posthog.reset()` before Clerk sign-out.
- `app/(tabs)/index.tsx` — Added `subscription_expanded` / `subscription_collapsed` captures when users interact with subscription cards.
- `app/onboarding.tsx` — Added `onboarding_viewed` capture on mount (top-of-funnel signal).

**Packages installed:** `posthog-react-native`, `react-native-svg`, `expo-file-system`, `expo-application`, `expo-device`, `expo-localization`

---

## Events

| Event | Description | File |
|---|---|---|
| `user_signed_in` | User successfully signs in with email and password | `app/(auth)/sign-in.tsx` |
| `user_sign_in_failed` | User sign-in attempt failed due to an error | `app/(auth)/sign-in.tsx` |
| `user_signed_up` | User successfully creates a new account and verifies email | `app/(auth)/sign-up.tsx` |
| `user_sign_up_failed` | User sign-up attempt failed due to an error | `app/(auth)/sign-up.tsx` |
| `user_signed_out` | User signs out from the settings screen | `app/(tabs)/settings.tsx` |
| `subscription_expanded` | User expands a subscription card on the home screen | `app/(tabs)/index.tsx` |
| `subscription_collapsed` | User collapses an expanded subscription card on the home screen | `app/(tabs)/index.tsx` |
| `onboarding_viewed` | User views the onboarding screen (top of acquisition funnel) | `app/onboarding.tsx` |

---

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics:** https://us.posthog.com/project/375416/dashboard/1448741
- **Sign-up Conversion Funnel** (onboarding → sign-up → sign-in): https://us.posthog.com/project/375416/insights/YtlfrZYf
- **Daily Active Users (Sign-ins):** https://us.posthog.com/project/375416/insights/XDoxo6wO
- **Subscription Engagement** (expanded/collapsed): https://us.posthog.com/project/375416/insights/0410qq8E
- **Sign-out Rate (Churn Signal):** https://us.posthog.com/project/375416/insights/9vOspijg
- **Authentication Failures:** https://us.posthog.com/project/375416/insights/Dnb3Yw9k

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
