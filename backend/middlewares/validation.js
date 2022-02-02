module.exports =
  (schema, type = "body") =>
  (req, res, next) => {
    const validation = schema.validate(type === "body" ? req.body : req[type]);
    if (validation.error) {
      return res
        .status(400)
        .send({ success: false, message: validation.error.details[0].message });
    }
    next();
  };
