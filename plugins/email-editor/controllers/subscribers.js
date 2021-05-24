"use strict";
/**
 *pluginIdjs controller
 *
 * @description: A set of functions called "actions" of the pluginId plugin.
 */
const pluginId = require("../admin/src/pluginId");
const { sendTemplatedEmail } = require("./utils");

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */
  find: async (ctx) => {
    // Add your own logic here
    const { query = {} } = ctx.request;

    const { results, pagination } = await strapi
      .query("subscribers", pluginId)
      .findPage({ _sort: "id:desc", ...query });

    ctx.body = { results, pagination };
  },

  count: async (ctx) => {
    // Add your own logic here
    const { query = {} } = ctx.request;

    const { results, pagination } = await strapi
      .query("subscribers", pluginId)
      .count();

    ctx.body = { results, pagination };
  },

  findOne: async (ctx) => {
    // Add your own logic here
    const { id } = ctx.params;

    const entry = await strapi.query("subscribers", pluginId).findOne({ id });

    ctx.body = entry;
  },

  create: async (ctx) => {
    // Add your own logic here
    const { query = {}, body } = ctx.request;

    const entry = await strapi.query("subscribers", pluginId).create(body);

    ctx.body = entry;
  },
  subscribe: async (ctx) => {
    // Add your own logic here
    const { query = {}, body } = ctx.request;

    const entry = await strapi.query("subscribers", pluginId).create(body);

    const subscriberEmailEntry = await strapi
      .query("default-subscriber", pluginId)
      .findOne({ email_type: "subscribe" });

    try {
      const emailTemplate = {
        subject: String(subscriberEmailEntry.subject),
        text: String(subscriberEmailEntry.text),
        html: String(subscriberEmailEntry.html),
      };
      await sendTemplatedEmail(
        {
          to: entry.email,
          // from: is not specified, so it's the defaultFrom that will be used instead
        },
        emailTemplate,
        entry
      );
    } catch (e) {
      ctx.response.status = 403;
      ctx.response.message = e.message;
    }

    ctx.body = entry;
  },
  unsubscribe: async (ctx) => {
    // Add your own logic here
    const { query = {}, body } = ctx.request;

    const entry = await strapi
      .query("subscribers", pluginId)
      .update({ email: body.email }, { ...body, subscribed: false });

    const subscriberEmailEntry = await strapi
      .query("default-subscriber", pluginId)
      .findOne({ email_type: "unsubscribe" });

    const emailTemplate = {
      subject: String(subscriberEmailEntry.subject),
      text: String(subscriberEmailEntry.text),
      html: String(subscriberEmailEntry.html),
    };

    try {
      await sendTemplatedEmail(
        {
          to: entry.email,
          // from: is not specified, so it's the defaultFrom that will be used instead
        },
        emailTemplate,
        entry
      );
    } catch (e) {
      ctx.response.status = 403;
      ctx.response.message = e.message;
    }

    ctx.body = entry;
  },
  sendSubscribeEmail: async (ctx) => {
    const { id } = ctx.params;
    const subscriber = await strapi
      .query("subscribers", pluginId)
      .findOne({ id });

    const subscriberEmailEntry = await strapi
      .query("default-subscriber", pluginId)
      .findOne({ email_type: "subscribe" });

    try {
      const emailTemplate = {
        subject: String(subscriberEmailEntry.subject),
        text: String(subscriberEmailEntry.text),
        html: String(subscriberEmailEntry.html),
      };
      await sendTemplatedEmail(
        {
          to: subscriber.email,
          // from: is not specified, so it's the defaultFrom that will be used instead
        },
        emailTemplate,
        subscriber
      );
    } catch (e) {
      ctx.response.status = 403;
      ctx.response.message = e.message;
    }
    ctx.body = subscriber;
  },
  sendUnsubscribeEmail: async (ctx) => {
    const { id } = ctx.params;
    const subscriber = await strapi
      .query("subscribers", pluginId)
      .findOne({ id });

    const subscriberEmailEntry = await strapi
      .query("default-subscriber", pluginId)
      .findOne({ email_type: "unsubscribe" });

    const emailTemplate = {
      subject: String(subscriberEmailEntry.subject),
      text: String(subscriberEmailEntry.text),
      html: String(subscriberEmailEntry.html),
    };

    try {
      await sendTemplatedEmail(
        {
          to: subscriber.email,
          // from: is not specified, so it's the defaultFrom that will be used instead
        },
        emailTemplate,
        subscriber
      );
    } catch (e) {
      ctx.response.status = 403;
      ctx.response.message = e.message;
    }
    ctx.body = subscriber;
  },
  update: async (ctx) => {
    // Add your own logic here
    const { query = {}, body } = ctx.request;
    const { id } = ctx.params;

    const entry = await strapi
      .query("subscribers", pluginId)
      .update({ id }, body);

    ctx.body = entry;
  },

  delete: async (ctx) => {
    // Add your own logic here
    const { query = {} } = ctx.request;
    const { id } = ctx.params;

    const entry = await strapi.query("subscribers", pluginId).delete({ id });

    ctx.body = entry;
  },
};
