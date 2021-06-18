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

    const entity = await strapi.services.article.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.article });
  },

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.article.search(ctx.query);
    } else {
      entities = await strapi.services.article.find(ctx.query);
    }

    return entities.map((entity) => {
      const model = strapi.models.article;
      const sanitizedEntity = sanitizeEntity(entity, {
        model: strapi.models.article,
      });
      return { ...sanitizedEntity, isDraft: isDraft(entity, model) };
    });
  },
};
