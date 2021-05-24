const path = require("path");

module.exports = {
  webpack: (config, webpack) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    const regexToMatch = /\.m?js$/;
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.test.toString() == regexToMatch.toString()) {
        delete rule.exclude;
      }
      return rule;
    });

    return config;
  },
};
