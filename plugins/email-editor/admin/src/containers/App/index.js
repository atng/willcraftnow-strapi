/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "strapi-helper-plugin";
// Utils
import pluginId from "../../pluginId";
// Containers
import HomePage from "../HomePage";
import TemplateList from "../TemplateList.js";
import SubscriberList from "../SubscriberList";
import EmailList from "../EmailList";
import Subscriber from "../Subscriber";
import EmailEditor from "../EmailEditor";
import TemplateEditor from "../TemplateEditor";
import DefaultSubscribeEditor from "../DefaultSubscribeEditor";
import TransferEditor from "../TransferEditor";

const App = (props) => {
  return (
    <div>
      <Switch>
        <Route
          path={`/plugins/${pluginId}`}
          render={(componentProps) => {
            const _props = { ...props, ...componentProps };
            return <HomePage {..._props} />;
          }}
          exact
        />
        <Route
          path={`/plugins/${pluginId}/subscribers`}
          render={(componentProps) => {
            const _props = { ...props, ...componentProps };
            return <SubscriberList {..._props} />;
          }}
        />
        <Route
          path={`/plugins/${pluginId}/add_subscribers`}
          render={(componentProps) => {
            const _props = { ...props, ...componentProps };
            return <Subscriber {..._props} />;
          }}
          exact
        />
        <Route
          path={`/plugins/${pluginId}/add_subscribers/:id`}
          render={(componentProps) => {
            const _props = { ...props, ...componentProps };
            return <Subscriber {..._props} />;
          }}
          exact
        />
        <Route
          path={`/plugins/${pluginId}/emails`}
          render={(componentProps) => {
            const _props = { ...props, ...componentProps };
            return <EmailList {..._props} />;
          }}
        />
        <Route
          path={`/plugins/${pluginId}/add_emails`}
          render={(componentProps) => {
            const _props = { ...props, ...componentProps };
            return <EmailEditor {..._props} urlKey="emails" />;
          }}
          exact
        />
        <Route
          path={`/plugins/${pluginId}/add_emails/:id`}
          render={(componentProps) => {
            const _props = { ...props, ...componentProps };
            return <EmailEditor {..._props} urlKey="emails" />;
          }}
        />
        <Route
          path={`/plugins/${pluginId}/default_emails/:email_type`}
          render={(componentProps) => {
            const _props = { ...props, ...componentProps };
            return (
              <DefaultSubscribeEditor {..._props} urlKey="subscriber-email" />
            );
          }}
          exact
        />
        <Route
          path={`/plugins/${pluginId}/templates`}
          render={(componentProps) => {
            const _props = { ...props, ...componentProps };
            return <TemplateList {..._props} />;
          }}
        />
        <Route
          path={`/plugins/${pluginId}/add_templates`}
          render={(componentProps) => {
            const _props = { ...props, ...componentProps };
            return <TemplateEditor {..._props} urlKey="templates" />;
          }}
          exact
        />
        <Route
          path={`/plugins/${pluginId}/add_templates/:id`}
          render={(componentProps) => {
            const _props = { ...props, ...componentProps };
            return <TemplateEditor {..._props} urlKey="templates" />;
          }}
          exact
        />
        <Route
          path={`/plugins/${pluginId}/add_email_templates/:id`}
          render={(componentProps) => {
            const _props = { ...props, ...componentProps };
            return (
              <TransferEditor
                {..._props}
                urlKey="emails"
                getUrlKey="templates"
              />
            );
          }}
          exact
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
