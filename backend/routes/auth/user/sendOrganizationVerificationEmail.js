const jwt = require("jsonwebtoken");
const mailer = require("../../../helpers/mailer");
module.exports = async (req, res) => {
  const token = req.params.token;
  const fullUrl = req.protocol + "://" + req.get("host");
  if (!token)
    return res.status(400).json({
      success: false,
      message: "token is required",
    });
  try {
    //check if token is still valid
    const result = jwt.verify(token, process.env.APPROVE_TOKEN_SECRET);

    if (!result.reqType)
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    //create a link with token
    const approveLink = `${fullUrl}/organization/${result.reqType}/token/${token}`;
    const adminEmail = result.adminEmail;
    // send link to admin's email
    await mailer({
      email: adminEmail,
      reason: `Request Approved`,
      link: approveLink,
    });
    // console.log(approveLink);
    res.status(200).json({
      success: true,
      message: "link sent to email successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
