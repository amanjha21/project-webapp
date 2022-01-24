const Schemas = require("../../models/index");

module.exports = async (req,res) => {
  const name = req.body.name || "NIT";
  const email_format = req.body.email_format || "nit.ac.in";

  try {
    //Check if Organization already exists
    const result = await Schemas.Organization.findOne({email_format}).exec();
    if(result){
      return res.status(400).json({
        success: false,
        message: "Request failed",
     });
    }

    const organization = new Schemas.Organization({
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