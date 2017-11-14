const sessionValidate = require("../validate/session_validate.js");
function loginFile(req,res,next) {
	console.log("fileter loginFile url: "+ req.url);
	if(new RegExp("^(/store/vip/)").test(req.url))
 	  {
 	  	var u_p = sessionValidate(req,res);
 	  	console.log("u_p:  "+ JSON.stringify(u_p));
 	  	console.log("cookie loginFile: "+JSON.stringify(req.session.cookie))
 	  	if(u_p && !u_p.flag)
 	  	{
 	  		res.send({});
 	  	} else {
 	  		next();
 	  	}
 	  	
 	  }
 	  else {
 	  	next();
 	  }
 	
 // next()
 
}
module.exports = loginFile;