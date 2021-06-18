const {
  contentTypes: { isDraft },
  sanitizeEntity,
} = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.landing.search(ctx.query);
    } else {
      entities = await strapi.services.landing.find(ctx.query);
    }

    return entities.map((entity) => {
      const model = strapi.models.landing;
      const sanitizedEntity = sanitizeEntity(entity, {
        model: strapi.models.landing,
      });
      return { ...sanitizedEntity, isDraft: isDraft(entity, model) };
    });
  },
};
