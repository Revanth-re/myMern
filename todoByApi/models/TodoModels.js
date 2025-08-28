const mongoose=require("mongoose")



const todosSchema = new mongoose.Schema({
  productname: String,
  productCategory: String,
  productQuantity: Number,
 
  productActualPrice: Number,
  productSellingPrice: Number,
  ProductExpiry: String,
  base64: String, // Image in Base64
  inpValue:Number,
  uploadedBy:String
});

const kathasData = new mongoose.Schema({

   customerName: String,
    items: String,
    totalMoney: Number,
    moneyGiven: Number,
    remainderDate: String,
    uploadedBy:String,
    paymentStatus:String

});
const users=new mongoose.Schema({

  name:String,
  password:String,
  number:String
  

})
const printDetails=new mongoose.Schema({
  productName:String,
  actualPrice:Number,
  uploadedBy:String,
  quantity:{type:Number,default:1}
  
  


})
const StoreDetails=new mongoose.Schema({
storeName:String,
OwnerName:String,
Products:Array,
uploadedBy:String


})
const storePrinting=new mongoose.Schema({

  name:String,
  price:Number,
  quantity:Number,
  uploadedBy:String
})
const additionaldata=new mongoose.Schema({
  productDetails:Array,
  uploadedBy:String
})

const additionalModel=mongoose.model("additionalData",additionaldata)


const storePrintModel=mongoose.model("storePrintDetail",storePrinting)
const storeModel=mongoose.model("storeData",StoreDetails)
const printModel= mongoose.model("printDetail",printDetails)
const todosModel=mongoose.model("todo",todosSchema)
const userModel=mongoose.model("usersData",users)
const kathasModel=mongoose.model("kathasData",kathasData)
module.exports={todosModel,userModel,kathasModel,printModel,storeModel,storePrintModel,additionalModel}

 