const {
  contentTypes: { isDraft },
  sanitizeEntity,
} = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.writer.search(ctx.query);
    } else {
      entities = await strapi.services.writer.find(ctx.query);
    }

    return entities.map((entity) => {
      const model = strapi.models.writer;
      const sanitizedEntity = sanitizeEntity(entity, {
        model: strapi.models.writer,
      });
      return { ...sanitizedEntity, isDraft: isDraft(entity, model) };
    });
  },
};
