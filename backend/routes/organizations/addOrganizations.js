module.exports = async (req,res) => {
  const organizationId = req.body.organizationId || "453eerw189y6yy6422e23";
  const name = req.body.name || "NIT";
  const email_format = req.body.email_format || "nit.ac.in";

  try {
    const organization = new Schemas.Organization({
    organizationId,
    name,
    email_format,
   });

   await organization.save();
   res.status(201).json({
      success: true,
      message: "Organization added successfully"
   });
  } catch (err) {
    console.log(err);
    res.status(404).json({
        success: false,
        message: err.message,
    });
  }
};