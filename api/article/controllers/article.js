const {
  contentTypes: { isDraft },
  sanitizeEntity,
} = require("strapi-utils");

const getIndex = async (locale) => {
  const key = "article-index";
  const model = strapi.models[key];
  const entity = await strapi.services[key].find({ locale });
  return sanitizeEntity(entity, {
    model,
  });
};

const syncSlug = async (entity) => {
  const defaultEntityRef = entity.localizations.find((e) => e.locale === "en");
  if (!defaultEntityRef) return entity;
  const defaultEntity = await strapi.services.article.findOne({
    id: defaultEntityRef.id,
  });
  console.log({ defaultEntity });
  console.log({ ...entity, slug: defaultEntity.slug });
  return { ...entity, slug: defaultEntity.slug };
};

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.article.findOne({ id });
    const index = await getIndex(entity.locale);
    return {
      ...sanitizeEntity(entity, { model: strapi.models.article }),
      index,
    };
  },

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.article.search(ctx.query);
    } else {
      entities = await strapi.services.article.find(ctx.query);
    }

    return await Promise.all(
      entities.map(async (entity) => {
        const model = strapi.models.article;
        const index = await getIndex(entity.locale);
        const syncedEntity = await syncSlug(entity);
        const sanitizedEntity = sanitizeEntity(syncedEntity, {
          model: strapi.models.article,
        });
        return { ...sanitizedEntity, isDraft: isDraft(entity, model), index };
      })
    );
  },
};
