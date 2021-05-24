"use strict";
/**
 *pluginIdjs controller
 *
 * @description: A set of functions called "actions" of the pluginId plugin.
 */
const pluginId = require("../admin/src/pluginId");

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
      .query("email-templates", pluginId)
      .findPage({ _sort: "design:desc", ...query });

    ctx.body = { results, pagination };
  },

  count: async (ctx) => {
    // Add your own logic here
    const { query = {} } = ctx.request;

    const { results, pagination } = await strapi
      .query("email-templates", pluginId)
      .count();

    ctx.body = { results, pagination };
  },

  findOne: async (ctx) => {
    // Add your own logic here
    const { id } = ctx.params;

    const entry = await strapi
      .query("email-templates", pluginId)
      .findOne({ id });

    ctx.body = entry;
  },

  create: async (ctx) => {
    // Add your own logic here
    const { query = {}, body } = ctx.request;

    const entry = await strapi.query("email-templates", pluginId).create(body);

    ctx.body = entry;
  },

  update: async (ctx) => {
    // Add your own logic here
    const { query = {}, body } = ctx.request;
    const { id } = ctx.params;

    const entry = await strapi
      .query("email-templates", pluginId)
      .update({ id }, body);

    ctx.body = entry;
  },

  delete: async (ctx) => {
    // Add your own logic here
    const { query = {} } = ctx.request;
    const { id } = ctx.params;

    const entry = await strapi
      .query("email-templates", pluginId)
      .delete({ id });

    ctx.body = entry;
  },
};
