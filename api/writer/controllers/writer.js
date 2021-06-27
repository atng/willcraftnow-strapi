const {
  contentTypes: { isDraft },
  sanitizeEntity,
} = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getIndex = async (locale) => {
  const key = "author-index";
  const model = strapi.models[key];
  const entity = await strapi.services[key].find({ locale });
  return sanitizeEntity(entity, {
    model,
  });
};

const syncSlug = async (entity) => {
  const defaultEntityRef = entity.localizations.find((e) => e.locale === "en");
  if (!defaultEntityRef) return entity;
  const defaultEntity = await strapi.services.writer.findOne({
    id: defaultEntityRef.id,
  });
  return { ...entity, slug: defaultEntity.slug };
};

module.exports = {
  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.writer.findOne({ slug });
    const index = await getIndex(entity.locale);
    return {
      ...sanitizeEntity(entity, { model: strapi.models.writer }),
      index,
    };
  },

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.writer.search(ctx.query);
    } else {
      entities = await strapi.services.writer.find(ctx.query);
    }

    return await Promise.all(
      entities.map(async (entity) => {
        const model = strapi.models.writer;
        const index = await getIndex(entity.locale);
        const syncedEntity = await syncSlug(entity);
        const sanitizedEntity = sanitizeEntity(syncedEntity, {
          model: strapi.models.writer,
        });
        return { ...sanitizedEntity, isDraft: isDraft(entity, model), index };
      })
    );
  },
};
