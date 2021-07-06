const {
  contentTypes: { isDraft },
  sanitizeEntity,
} = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const syncSlug = async (entity) => {
  const defaultEntityRef = entity.localizations.find((e) => e.locale === "en");
  if (!defaultEntityRef) return entity;
  const defaultEntity = await strapi.services.landing.findOne({
    id: defaultEntityRef.id,
  });
  return { ...entity, slug: defaultEntity.slug };
};

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.landing.findOne({ id });
    return sanitizeEntity(entity, { model: strapi.models.landing });
  },

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.landing.search(ctx.query);
    } else {
      entities = await strapi.services.landing.find(ctx.query);
    }

    return await Promise.all(
      entities.map(async (entity) => {
        const model = strapi.models.landing;
        const syncedEntity = await syncSlug(entity);
        const sanitizedEntity = sanitizeEntity(syncedEntity, {
          model: strapi.models.landing,
        });
        return { ...sanitizedEntity, isDraft: isDraft(entity, model) };
      })
    );
  },
};
