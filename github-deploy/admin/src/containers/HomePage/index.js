/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
import { Padded, Flex, Button } from "@buffetjs/core";
import { Header } from "@buffetjs/custom";
import pluginId from "../../pluginId";
import createStrapi from "strapi";

const HomePage = () => {
  return (
    <Padded left right bottom top size="sm">
      <Header
        title={{
          label: "Github Deploy",
        }}
        content="Deployment webhook with Github."
      />
      <Flex>
        <Button
          onClick={() => {
            // strapi.notification.toggle({
            //   type: "info",
            //   message: "Deploying. Please check the site after 5mins.",
            // });
            // axios.post(
            //   `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${GITHUB_WORKFLOW_FILE}/dispatches`,
            //   { ref: "master" },
            //   {
            //     headers: {
            //       Accept: "application/vnd.github.v3+json",
            //       Authorization: `token ${process.env.GITHUB_TOKEN}`,
            //     },
            //   }
            // );
          }}
        />
      </Flex>
    </Padded>
  );
};

export default memo(HomePage);
