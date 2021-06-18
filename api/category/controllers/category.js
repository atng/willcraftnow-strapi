const {
  contentTypes: { isDraft },
  sanitizeEntity,
} = require("strapi-utils");

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.category.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.category });
  },

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.category.search(ctx.query);
    } else {
      entities = await strapi.services.category.find(ctx.query);
    }

    return entities.map((entity) => {
      const model = strapi.models.category;
      const sanitizedEntity = sanitizeEntity(entity, {
        model: strapi.models.category,
      });
      return { ...sanitizedEntity, isDraft: isDraft(entity, model) };
    });
  },
};
