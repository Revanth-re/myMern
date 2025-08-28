// const express=require("express")
// const dotenv=require("dotenv").config()
// const jwt=require("jsonwebtoken")

// const VerifyToken=(req,res,next)=>{

//     // const token = req.headers.authorization;
//     const token = req.headers.authorization.split(" ")[1];
//     console.log(token,"this is token");
    
//     // console.log(token,"helloRebb");
    


    
// //   if (!token) return res.status(401).json({ message: "No token provided" });


//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     console.log(decoded,"decoded");
    
//     req.userId = decoded._id;
//     console.log(req.userId,"req_user_id");
    
//      // store user ID from token
//     next();

//   } catch (err) {
//     return res.status(403).json({ message: "Invalid token" });

//   }





// }



// module.exports=VerifyToken
const jwt = require("jsonwebtoken");

const VerifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY || "your_jwt_secret_here";
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded._id || decoded.id; // support tokens with either _id or id
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = VerifyToken;
