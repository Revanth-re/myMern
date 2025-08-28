const express=require("express")
const router=express.Router()
const {getAllProducts,getOne,addProducts,updateTodos,deletetodos,updateDecrease,
    MoreDetails,expiryDateHandler,addKhatas,getKhatas,deleteKhatas,
    updateKhatas,postPrints,
    getPrintDetails,
    deletebillprint,postStoreData,getYourProducts,
    printStoreBill,
    getStoreBill,
    deletestorebillprint,
    removeItem,
    postAdditionalData,
    updateExpiredItems,
    deletestorebillItems}=require("../controllers/todoControl.js")
    


const {userModel}=require("../models/TodoModels.js")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Razorpay=require("razorpay")
const dotenv=require("dotenv").config()
const VerifyToken=require("../Authorization/VerifyToken.js")







console.log(process.env.RAZOR_PAY_SECRET_KEY);

// console.log(process.env.RAZOR_PAY_KEY_SECRET,"secret key");


const pay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_SECRET_KEY
});
console.log(pay.orders,"pay");



router.put("/api/poststorebill",VerifyToken,printStoreBill)
router.get("/api/getstorebill",VerifyToken,getStoreBill)
router.delete("/api/removeitemsfromcart",removeItem)

router.post("/api/additionaldata",VerifyToken,postAdditionalData)

router.post("/api/printdetails",VerifyToken,postPrints)
router.get("/api/getprintdetails",VerifyToken,getPrintDetails)
router.delete("/api/deletebillprint",VerifyToken,deletebillprint)
router.delete("/api/deletestorebillprint",VerifyToken,deletestorebillprint)
router.delete("/api/deletebillitems",VerifyToken,deletestorebillItems)

router.post("/api/poststoredata",VerifyToken,postStoreData)

router.get("/api/getyourproducts",VerifyToken,getYourProducts)
// ATHL450 USB device connect

// router.post("/api/print",usbConnection)
router.post("/api/create-order", async (req, res) => {
    try {
        const { amount } = req.body; // Amount in INR
        if (!amount) return res.status(400).json({ message: "Amount is required" });

        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await pay.orders.create(options);
        console.log(order,"hello");
        
        res.status(200).json(order);
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ message: "Error creating order" });
    }
});





router.put("/api/updatekhata/:id",updateKhatas)
router.delete("/api/deletekhata/:id",deleteKhatas)

router.post("/api/addkhatas",VerifyToken,addKhatas)
router.get("/api/getAll",VerifyToken,getAllProducts)
router.get("/api/getkhatas",VerifyToken,getKhatas)

router.post("/api/products",VerifyToken, addProducts)

router.post("/api/signup",async(req,res)=>{

    try {
        const {name,password,number}=req.body

        const HashedPassword=await bcrypt.hash(password,12)
        const newUser=new userModel({name:name,password:HashedPassword,number:number})
const user=await newUser.save()

res.status(200).json(user)

    } catch (error) {
      res.json({message:{error}})  
    }



})

router.post("/api/login", async (req, res) => {
  const { name, password } = req.body;
  console.log(name,password);
  console.log(req.body,
    'req.body'
  );
  
  

  try {
    const userData = await userModel.findOne({ name });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: userData._id, name: userData.name },
      (process.env.JWT_SECRET || process.env.JWT_SECRET_KEY || "your_jwt_secret_here"),
      { expiresIn: "100d" }
    );

    res.status(200).json({
      userDetails: { name: userData.name, mobileNum: userData.number },
      accessToken: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/api/update/:id", updateTodos)

  


    router.put("/api/updateDec/:id",updateDecrease)

    router.delete(`/api/delete/:id`,deletetodos)

    router.get("/api/MoreDetails/:id",MoreDetails)

router.get("/api/MoreDetails/:id",getOne)

router.put("/api/expiryItems",expiryDateHandler)
router.put("/api/updateItems",updateExpiredItems)





module.exports={router}



