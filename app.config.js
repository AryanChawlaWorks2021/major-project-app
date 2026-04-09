// app.config.js — extends app.json and injects PostHog config from environment variables
// The `extra` block is accessed at runtime via Constants.expoConfig?.extra
const baseConfig = require('./app.json')

module.exports = {
  ...baseConfig,
  expo: {
    ...baseConfig.expo,
    extra: {
      posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
      posthogHost: process.env.POSTHOG_HOST,
    },
  },
}
