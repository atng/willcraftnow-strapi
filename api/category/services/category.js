"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  findOne(params, populate) {
    return strapi.query("category").findOne(params, populate);
  },
  find(params, populate) {
    return strapi.query("category").find(params, populate);
  },
};
