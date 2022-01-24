const Schemas = require("../../models/index");

module.exports = async (req,res) => {
    const organizationId = req.params.id || "453eerw189y6yy6422e23";
    if (organizationId.length != 24) {
        return res.status(400).json({
          success: false,
          message: "Invalid Request",
        });
      }
    try{
    const organization = await Schemas.Organization.findOne({_id: organizationId}).exec();
    if(!organization) {
        return res.status(400).json({
            success: false,
            message: "Organization doesn't exist",
        });
    }
    const result = await Schemas.Organization.deleteOne({_id: organizationId}).exec();
    if(result.deletedCount == 1){
        res.status(200).json({
            success: true,
            message: "Organization deleted successfully",
        });
    }else{
        res.status(400).json({
            success: false,
            message: "Failed to delete",
        });
    }
    }catch (err){
        console.log(err);
        req.status(404).json({
            success: false,
            message: err.message,
        });
    }
};