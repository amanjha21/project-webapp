module.exports = async (req,res) => {
    const organizationId = req.body.organizationId || "453eerw189y6yy6422e23";
    try{
    const organization = await SchemaTypes.Organization.findOne({_id: organizationId}).exec();
    if(!organization) {
        return res.status(400).json({
            success: false,
            message: "Organization doesn't exist",
        });
    }
    const result = await SchemaTypes.Organization.deleteOne({_id: organizationId}).exec();
    if(result.deleteCount == 1){
        res.status(200).json({
            success: true,
            message: "Organization deleted successfully",
        });
    }else{
        res.status(304).json({
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