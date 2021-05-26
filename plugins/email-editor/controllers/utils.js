"use strict";

const _ = require("lodash");

const sendTemplatedEmail = (
  emailOptions = {},
  emailTemplate = {},
  data = {}
) => {
  const attributes = ["subject", "text", "html"];
  _.templateSettings = {
    interpolate: /\{\{=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g,
  };
  const missingAttributes = _.difference(
    attributes,
    Object.keys(emailTemplate)
  );
  if (missingAttributes.length > 0) {
    throw new Error(
      `Following attributes are missing from your email template : ${missingAttributes.join(
        ", "
      )}`
    );
  }

  const templatedAttributes = attributes.reduce(
    (compiled, attribute) =>
      emailTemplate[attribute]
        ? Object.assign(compiled, {
            [attribute]: _.template(emailTemplate[attribute])(data),
          })
        : compiled,
    {}
  );

  return strapi.plugins.email.provider.send({
    ...emailOptions,
    ...templatedAttributes,
  });
};

module.exports = {
  sendTemplatedEmail,
};
