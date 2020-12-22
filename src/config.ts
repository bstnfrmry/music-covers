export const config = {
  app: {
    env: process.env["NODE_ENV"],
    debug: process.env["NODE_ENV"] === "development",
    url: process.env["NEXT_PUBLIC_URL"] ?? "http://localhost:3000",
  },

  googleAnalytics: {
    trackingCode: process.env["NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"],
  },

  spotify: {
    clientId: process.env["SPOTIFY_CLIENT_ID"],
    clientSecret: process.env["SPOTIFY_CLIENT_SECRET"],
  },
};
