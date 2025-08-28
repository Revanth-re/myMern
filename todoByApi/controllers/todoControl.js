
const { todosModel,userModel ,kathasModel, printModel,storeModel, storePrintModel, additionalModel} = require("../models/TodoModels.js");
const Razorpay=require("razorpay")
// const escpos = require('escpos');

// const USB = require("escpos-usb");

// Get all todos

const getKhatas=async(req,res)=>{
  try {
    const Data=await kathasModel.find({uploadedBy:req.userId})
  res.json(Data)
  } 
  
  catch (error) {
    res.status(404).json(error)
  }

}
const deleteKhatas=async(req,res)=>{

  const id=req.params.id
  try {
    
  
const deletedProduct=await kathasModel.findByIdAndDelete(id)
res.json(deletedProduct)

}
catch (error) {
    res.json(error)
  }

}
const updateKhatas=async(req,res)=>{
  
  const id=req.params.id


  console.log(id,"params");
  
  const {money}=req.body
  try {
    
  

const data=await kathasModel.findById(id)
console.log(data)
const updatedStatus="cleared"
const completedMoney=money
const updatedProduct=await kathasModel.findByIdAndUpdate(id,{
  paymentStatus:updatedStatus,
  totalMoney:0



},{new:true})
res.json(updatedProduct)
  }
catch (error) {
    res.json(error)
  }




}
const addKhatas=async(req,res)=>{



  
try {
  const newProduct=await new kathasModel({
  uploadedBy:req.userId,
  ...req.body
})
const NewData=await newProduct.save()
res.status(200).json(NewData)
} 

catch (error) {
  res.status(200).json(error)
}



}
const getAllProducts = async (req, res) => {
  
  
 
  
  try {
    const todosData = await todosModel.find({uploadedBy:req.userId});
    // console.log(todosData)
    
    res.status(200).json(todosData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos", error });
  }
};


// Add a new todo
const addProducts = async (req, res) => {


  console.log(req.userId,"userid");
  
  try {
    // const data=req.body
    // console.log(data);

    const newProduct = new todosModel({
      uploadedBy: req.userId,
      ...req.body,
       // userId comes from middleware
    })
    const user=await newProduct.save()
    // await newProduct.save();
console.log(user,"user");

    res.json(user);

  } catch (error) {
    res.status(500).json(error);
  }}



// Update a todo by ID

// const updateTodos= async (req, res) => {
//   let gettodo;
//   try {
//     const { productQuantity, dupQuantity } = req.body;
//          gettodo = await todosModel.findById(id);
//     const updated=Number(gettodo+1)
//     const Value=Number(dupQuantity)
//     console.log(Value);
    

//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       { productQuantity:updated, inpValue:Value},
//       { new: true }
//     );
// console.log(updatedProduct);

//     res.json(updatedProduct);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }


// const updateTodos =async (req, res) => {
//    let gettodo;
      
// // console.log(req.body.counter,"this is body");



  
//   try {
//     const id = req.params.id;
//      gettodo = await todosModel.findById(id);
//     res.status(200).json(gettodo);
//   } catch (error) {
//     res.status(400).json({ message: "Failed to get todo", error });
//   }

      
//   try {
//     const {count} = req.body.counter;
//     const {quantity}=req.body.quantity
//     console.log(Number(gettodo.productQuantity+count));
//     console.log(req.body.quantity,"Currvalue");

    
    
//     const updatedTodo=Number(gettodo.productQuantity+req.body.counter)
//     // console.log(updatedTodo,"ekdew");
//     const newValue=Number(gettodo.req.body.quantity-gettodo.req.body.quantity+quantity)
    

//     const id = req.params.id;


//     console.log(id, "Product ID");

//     const updatedProduct = await todosModel.findByIdAndUpdate(
//       id,
//       { productQuantity: updatedTodo },
//    {inpValue:newValue},
//       { new: true }
//     );

//     console.log(updatedProduct, "Updated Document");

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: "Failed to update product", error });
//   }
// }
const updateTodos = async (req, res) => {
  try {
    const id = req.params.id;
    const { counter, quantity } = req.body; // Both should be numbers

    // Fetch existing document
    const gettodo = await todosModel.findById(id);
    if (!gettodo) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Calculate new values
    const updatedQuantity = Number(gettodo.productQuantity) + Number(counter);
    const newValue = Number(quantity); // Or your intended calculation

    // Update the product
    const updatedProduct = await todosModel.findByIdAndUpdate(
      id,
      { 
        productQuantity: updatedQuantity,
        inpValue: newValue
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to update product", error });
  }
};

const updateDecrease = async (req, res) => {
  try {
    const id = req.params.id;
    const gettodo = await todosModel.findById(id);

    const count = Number(req.body.counter);
  //  const Currquantity=Number(req.body.quantity)
    const updatedTodo = Number(gettodo.productQuantity) + count // ✅ FIX 2
    // const updatedValue=Number(gettodo.inpValue=Currquantity)

    const updatedProduct = await todosModel.findByIdAndUpdate(
      id,
      { productQuantity: updatedTodo },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Failed to update product", error });
  }
};





// Delete a todo by ID
const deletetodos = async(req,res)=>{
      console.log(req,"sdifyheu");
      
const id=req.params.id
console.log(id,"identidty");

    try {
      const deletedProduct=await todosModel.findByIdAndDelete(id)
      res.status(200).json(deletedProduct)
      
    } catch (error) {
      console.log(error)
      
    }

  }


  const expiryDateHandler=async(req,res)=>{
  const {expiry}=req.body.expire

  try {
    const updatedProduct = await todosModel.findByIdAndUpdate(
      id,
      { DateofExpiry: expiry }, // ✅ Only update this field
      { new: true }
    );

    console.log(updatedProduct, "Updated Document");

    res.status(200).json(updatedProduct);
  
  } catch (error) {
    
    console.log(error);
    res.status(400).json({ message: "Failed to update product", error });

  }
  
  }

  const PaymentProcess=async(req,res)=>{
    
const pay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_SECRET_KEY
});
console.log(pay.orders,"pay");




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
  }

  

// Get a single todo by ID
const getOne = async (req, res) => {
  try {
    const {id} = req.params;
    const gettodo = await todosModel.findById(id);
    res.status(200).json(gettodo);
  } catch (error) {
    res.status(400).json({ message: "Failed to get todo", error });
  }
};
const MoreDetails= async(req,res)=>{
      const id=req.params.id

      console.log(id,"wjehwu");

       try {
    const todosData = await todosModel.findById(id);
    console.log(todosData)
    
    res.status(200).json(todosData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos", error });
  }
} 

const LoginController=async(req,res)=>{
 
  const {name,password}=req.body
  
  try{
  const userData=await userModel.findOne({name:name})
  if (userData) {
      const compared=await bcrypt.compare(password,userData.password)
  
  if (compared===true) {
  
  const token=jwt.sign(userData.toObject(),process.env.JWT_SECRET_KEY,{expiresIn:"2400h"})
  
  
  console.log(token)
  res.json({userDetails:{name:name,mobileNum:userData.number},accessToken:{token}})
  
  
  
  
      
      
  } else {
     res.json("error occured in validation") 
  }
  }else{
  res.json("no data found")
  }
  }catch(error){
  console.log(error);
  
  }
  
  
  
  
  }

  const signupController=async(req,res)=>{

   
    const {name,password}=req.body
    
    try{
    const userData=await userModel.findOne({name:name})
    if (userData) {
        const compared=bcrypt.compare(password,userData.password)
    
    if (compared===true) {
    
    const token=jwt.sign(userData.toObject(),process.env.JWT_SECRET_KEY,{expiresIn:"2400h"})
    
    
    console.log(token)
    res.json({userDetails:{name:name,mobileNum:userData.number},accessToken:{token}})
    
    
    
    
        
        
    } else {
       res.json("error occured in validation") 
    }
    }else{
    res.json("no data found")
    }
    }catch(error){
    console.log(error);
    
    }
    
    
    
    
    }
    
    
    



const postPrints = async (req, res) => {
  try {
    const userId = req.userId; // assuming middleware sets this
    const { pName, selling, quantity: quantityFromBody } = req.body;

    // Ensure quantity is a number
    const quantity = 1;

    // Check if product already exists for this user
    const existingProduct = await printModel.findOne({
      productName: pName,
      actualPrice: selling,

      uploadedBy: userId,
    });

    if (existingProduct) {
      // If exists, increment quantity
      existingProduct.quantity += 1;
      const updatedProduct = await existingProduct.save();
      return res.status(200).json(updatedProduct);
    } else {
      // If not exists, create new product
      const newProduct = new printModel({
        productName: pName,
        actualPrice: selling,
        uploadedBy: userId,
        quantity,
      });
      const savedProduct = await newProduct.save();
      return res.status(200).json(savedProduct);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}



const getPrintDetails=async(req,res)=>{
try {
    const Data=await printModel.find({uploadedBy:req.userId})
  res.json(Data)
  } 
  
  catch (error) {
    res.status(404).json(error)
  }

}



const deletebillprint=async(req,res)=>{
  // const id=req.userId
  try {
    const result = await printModel.deleteMany({uploadedBy:req.userId})
    res.status(200).json({
      message: `All items deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting items" });
  }
  }

  const deletestorebillItems=async(req,res)=>{
try {
  const deleted=await printModel.deleteMany({uploadedBy:req.userId})
  console.log(deleted);
  res.json(deleted)
  
  
} catch (error) {
  res.json(error)
  
}


  }


  const postStoreData=async(req,res)=>{
    console.log(req.body,"bodyyyyyy");

    


  console.log(req.userId,"userid");
  
  
  const {storeName,storeOwner,products}=req.body
  console.log(storeName,"name of the storeee");
  
  try {
    // const data=req.body
    // console.log(data);

    const newProduct = new storeModel({
      uploadedBy: req.userId,
     storeName:storeName,
     OwnerName:storeOwner,
     Products:products
      
       // userId comes from middleware
    })
    const user=await newProduct.save()
    // await newProduct.save();
console.log(user,"user");

    res.json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }


  }

  const getYourProducts=async(req,res)=>{


try {
    const Data=await storeModel.find({uploadedBy:req.userId})
  res.json(Data)
  } 
  
  catch (error) {
    res.status(404).json(error)
  }





  }


// const printStoreBill=async(req,res)=>{



//   console.log(req.userId,"userid");
  
//   const {name,price,quantity}=req.body
// try {

//   const products=await storePrintModel.findOne({name:name})
//   console.log(products,"productss");



  
//   if (products) {

//     const updateqty=Number(quantity+1)
//     const updated=await storePrintModel.findOneAndUpdate(name,{
//       quantity:updateqty
//     },
//   {new:true})
//   res.json(updated)
// //     const postedproduct=new storePrintModel({
    
// //   name:name,
// //   price:price,
// //   quantity:quantity+1,
// //   uploadedBy:req.userId

// // })
// // const userSaved=await postedproduct.save()
// // res.json(userSaved)

    
//   }else{
// const postedproduct=new storePrintModel({

//   name:name,
//   price:price,
//   quantity:quantity,
//   uploadedBy:req.userId

// })
// const userSaved=await postedproduct.save()
// res.json(userSaved)

// console.log("hellobroo");
//   }
  


// }
//    catch (error) {
//     res.json(error)
  
// }


// }

const printStoreBill = async (req, res) => {
  const userId = req.userId;
  const { name, price, quantity } = req.body;

  try {
    // Find if the product already exists
    const existingProduct = await storePrintModel.findOne({ name: name });

    if (existingProduct) {
      // Increment quantity
      const updatedQty = (existingProduct.quantity || 0) + Number( 1);
      const updatedProduct = await storePrintModel.findOneAndUpdate(
        { name: name },
        { quantity: updatedQty },
        { new: true }
      );
      return res.json(updatedProduct);
    } else {
      // Create new product
      const newProduct = new storePrintModel({
        name,
        price,
        quantity: Number(quantity || 1),
        uploadedBy: userId
      });
      const savedProduct = await newProduct.save();
      return res.json(savedProduct);
    }
  } catch (error) {
    console.error("Error in printStoreBill:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getStoreBill=async(req,res)=>{
try {
   const Data=await storePrintModel.find({uploadedBy:req.userId})
  res.json(Data)
} catch (error) {
  res.json(error)
}

}

const removeItem=async(req,res)=>{
  const {store}=req.body
  const {name,price}=store
  console.log(store,"name,price");
  
  

  try {
    const deleted=await storePrintModel.deleteMany({name:name})
    res.json(deleted)
    console.log(
      deleted ,"reulted"
    );
    
    // console.log("resulteddddd");
    
    
  } catch (error) {
    res.json(error)
  }

}
const deletestorebillprint=async(req,res)=>{

  // console.log("odiyamma badava");
  // const id=req.userId
  
  try {
    const result = await storePrintModel.deleteMany({uploadedBy:req.userId})
    res.status(200).json({
      message: `All items deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting items" });
  }
  }

const postAdditionalData=async(req,res)=>{
  const {AllData}=req.body
  console.log(AllData,"filterrr");
  
  console.log(req.userId);
  

try {
  const postedData=new additionalModel({
    productDetails:AllData,
    uploadedBy:req.userId
  }

  )
  console.log(postedData,"posted data");
  
  res.json(postedData)
} catch (error) {
  res.json(error)
}

}

const updateExpiredItems=async(req,res)=>{

const expiredProducts=req.body
// console.log(filteredData,"filterdata");


  try {
    const response=await todosModel.find()
    response.forEach()
    
    
  } catch (error) {
    
  }



}

module.exports = {
  getAllProducts,
  getOne,
  addProducts,
  updateTodos,
  updateDecrease,
  deletetodos,
  expiryDateHandler,
  MoreDetails,
  PaymentProcess,
  signupController,
  LoginController,
  addKhatas,
  getKhatas,
  updateKhatas,
  deleteKhatas,
  postPrints,
  getPrintDetails,
  deletebillprint,
  postStoreData,
  getYourProducts,
  printStoreBill,
  getStoreBill,
  deletestorebillprint,
  removeItem,
  postAdditionalData,
  updateExpiredItems,
  deletestorebillItems

};
