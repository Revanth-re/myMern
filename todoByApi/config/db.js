const mongoose=require("mongoose")
const ConnectDB=async()=>{
    const uri=process.env.MONGODB_URI || "mongodb+srv://revanthrevi131:3LyaM6DeU1TSLtmb@cluster0.vvaicm9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
try {
    await mongoose.connect(uri,{dbName:"TodosConnection"})

    // res.json("database connected")
    console.log("database connected");
    
} catch (error) {
    console.log(error);
    
}

}

module.exports={ConnectDB}