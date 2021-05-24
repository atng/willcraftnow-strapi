"use strict";
/**
 *pluginIdjs controller
 *
 * @description: A set of functions called "actions" of the pluginId plugin.
 */
const { sendTemplatedEmail } = require("./utils");
const pluginId = require("../admin/src/pluginId");

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */
  sendEmail: async (ctx) => {
    const { id } = ctx.params;

    const entry = await strapi.query("email-content", pluginId).findOne({ id });
    const subscribers = await strapi
      .query("subscribers", pluginId)
      .find({ subscribed: true });

    const emailTemplate = {
      subject: String(entry.subject),
      text: String(entry.text),
      html: String(entry.html),
    };

    await Promise.all(
      subscribers.map(async (subscriber) => {
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
      })
    );

    ctx.body = {};
  },
  sendTestEmail: async (ctx) => {
    const { id } = ctx.params;

    const entry = await strapi.query("email-content", pluginId).findOne({ id });

    const emailTemplate = {
      subject: String(entry.subject),
      text: String(entry.text),
      html: String(entry.html),
    };

    try {
      await sendTemplatedEmail(
        {
          to: "development@porchbuds.com",
          // from: is not specified, so it's the defaultFrom that will be used instead
        },
        emailTemplate,
        { email: "development@porchbuds.com" }
      );
    } catch (e) {
      ctx.response.status = 403;
      ctx.response.message = e.message;
    }

    ctx.body = {};
  },
  find: async (ctx) => {
    // Add your own logic here
    const { query = {} } = ctx.request;

    const { results, pagination } = await strapi
      .query("email-content", pluginId)
      .findPage({ _sort: "design:desc", ...query });

    ctx.body = { results, pagination };
  },

  count: async (ctx) => {
    // Add your own logic here
    const { query = {} } = ctx.request;

    const { results, pagination } = await strapi
      .query("email-content", pluginId)
      .count();

    ctx.body = { results, pagination };
  },

  findOne: async (ctx) => {
    // Add your own logic here
    const { id } = ctx.params;

    const entry = await strapi.query("email-content", pluginId).findOne({ id });

    ctx.body = entry;
  },

  create: async (ctx) => {
    // Add your own logic here
    const { query = {}, body } = ctx.request;

    const entry = await strapi.query("email-content", pluginId).create(body);

    ctx.body = entry;
  },

  update: async (ctx) => {
    // Add your own logic here
    const { query = {}, body } = ctx.request;
    const { id } = ctx.params;

    const entry = await strapi
      .query("email-content", pluginId)
      .update({ id }, body);

    ctx.body = entry;
  },

  delete: async (ctx) => {
    // Add your own logic here
    const { query = {} } = ctx.request;
    const { id } = ctx.params;

    const entry = await strapi.query("email-content", pluginId).delete({ id });

    ctx.body = entry;
  },
};
