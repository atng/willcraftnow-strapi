const {
  contentTypes: { isDraft },
  sanitizeEntity,
} = require("strapi-utils");

const getIndex = async (locale) => {
  const key = "category-index";
  const model = strapi.models[key];
  const entity = await strapi.services[key].find({ locale });
  return sanitizeEntity(entity, {
    model,
  });
};

const syncSlug = async (entity) => {
  const defaultEntityRef = entity.localizations.find((e) => e.locale === "en");
  if (!defaultEntityRef) return entity;
  // const allEntities = await strapi.services.category.find({});
  // console.log({ entity, allEntities });
  console.log("finding", strapi.services.category);
  const defaultEntity = await strapi.services.category.findOne({
    id: defaultEntityRef.id,
  });
  return { ...entity, slug: defaultEntity.slug };
};

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    console.log("params", ctx.params);
    const { slug } = ctx.params;

    const entity = await strapi.services.category.findOne({ slug });
    const index = await getIndex(entity.locale);

    return {
      index,
      ...sanitizeEntity(entity, { model: strapi.models.category }),
    };
  },

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.category.search(ctx.query);
    } else {
      entities = await strapi.services.category.find(ctx.query);
    }

    return await Promise.all(
      entities.map(async (entity) => {
        const model = strapi.models.category;
        const index = await getIndex(entity.locale);
        const syncedEntity = await syncSlug(entity);
        const sanitizedEntity = sanitizeEntity(syncedEntity, {
          model: strapi.models.category,
        });
        return { ...sanitizedEntity, isDraft: isDraft(entity, model), index };
      })
    );
  },
};
