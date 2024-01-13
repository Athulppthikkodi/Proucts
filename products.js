import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    empName:  {
        type: String,
        required: true,
        
      },
    empId:{
        type: Number,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required:true
    },
    quantity: {
        type: Number,
        required:true
    }
})
const userModel = new mongoose.model("products", userSchema);
export default userModel;