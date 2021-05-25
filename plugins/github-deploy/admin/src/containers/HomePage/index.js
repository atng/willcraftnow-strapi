/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import { Button, Padded, Flex } from "@buffetjs/core";
import { Header } from "@buffetjs/custom";
import axios from "axios";

const HomePage = () => {
  const [deployed, setDeployed] = React.useState(false);
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
          label="Deploy"
          disabled={deployed}
          onClick={() => {
            setDeployed(true);
            setTimeout(() => setDeployed(false), 300000);
            try {
              axios.post(`${strapi.backendURL}/${pluginId}/`);
              strapi.notification.toggle({
                type: "info",
                message: "Deploying. Please check the site after 5mins.",
              });
            } catch (e) {
              strapi.notification.toggle({
                type: "warning",
                message: "Oops! Something went wrong.",
              });
            }
          }}
        />
      </Flex>
    </Padded>
  );
};

export default memo(HomePage);
