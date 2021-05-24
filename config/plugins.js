module.exports = ({ env }) => {
  return {
    email: {
      provider: "gmail-2lo",
      providerOptions: {
        username: env("DEFAULT_EMAIL"),
        clientId: env("EMAIL_CLIENT_ID"),
        privateKey: env("EMAIL_PRIVATE_KEY").replace(/\\n/g, "\n"),
      },
      settings: {
        defaultFrom: env("DEFAULT_EMAIL"),
        defaultReplyTo: env("DEFAULT_EMAIL"),
      },
    },
  };
};
