'use strict';

const {
  contentTypes: { isDraft },
  sanitizeEntity,
} = require("strapi-utils");

const key = 'faq'

module.exports = {
    async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services[key].search(ctx.query);
    } else {
      entities = await strapi.services[key].find(ctx.query);
    }

    return await Promise.all(
      entities.map(async (entity) => {
        const model = strapi.models[key];
        const sanitizedEntity = sanitizeEntity(entity, {
          model: strapi.models[key],
        });
        return { ...sanitizedEntity, isDraft: isDraft(entity, model) };
      })
    );
  },
};
