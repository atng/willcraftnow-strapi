"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  find(params, populate) {
    return strapi.query("landing").find(params, populate);
  },
  findOne(params, populate) {
    return strapi.query("landing").findOne(params, populate);
  },
};
