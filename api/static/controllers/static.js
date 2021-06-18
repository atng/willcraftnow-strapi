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
      entities = await strapi.services.static.search(ctx.query);
    } else {
      entities = await strapi.services.static.find(ctx.query);
    }

    return entities.map((entity) => {
      const model = strapi.models.static;
      const sanitizedEntity = sanitizeEntity(entity, {
        model: strapi.models.static,
      });
      return { ...sanitizedEntity, isDraft: isDraft(entity, model) };
    });
  },
};
