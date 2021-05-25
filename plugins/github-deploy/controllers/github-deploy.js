"use strict";

/**
 * github-deploy.js controller
 *
 * @description: A set of functions called "actions" of the `github-deploy` plugin.
 */
const axios = require("axios");

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.
    const { GITHUB_OWNER, GITHUB_REPO, GITHUB_WORKFLOW_FILE, GITHUB_TOKEN } =
      process.env;

    try {
      const response = await axios.post(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${GITHUB_WORKFLOW_FILE}/dispatches`,
        { ref: "master" },
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        }
      );
      ctx.send({ message: "ok" });
    } catch (e) {
      ctx.send({ message: "Error" });
    }

    // // Send 200 `ok`
    // ctx.send(response);
  },
};
