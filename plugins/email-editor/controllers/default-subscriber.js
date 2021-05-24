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

  findOne: async (ctx) => {
    // Add your own logic here
    const { email_type } = ctx.params;
    const entry = await strapi
      .query("default-subscriber", pluginId)
      .findOne({ email_type });

    ctx.body = entry;
  },

  createOrUpdate: async (ctx) => {
    // Add your own logic here
    const { query = {}, body } = ctx.request;
    const { email_type } = ctx.params;

    const existingCount = await strapi
      .query("default-subscriber", pluginId)
      .count({ email_type });

    if (existingCount === 0) {
      const entry = await strapi
        .query("default-subscriber", pluginId)
        .create({ ...body, email_type });

      ctx.body = entry;
    } else {
      const entry = await strapi
        .query("default-subscriber", pluginId)
        .update({ email_type }, { ...body, email_type });

      ctx.body = entry;
    }
  },
};
