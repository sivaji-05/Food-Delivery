import mongoose from "mongoose";

export const connectDB= async () => {
    await mongoose.connect('mongodb+srv://Food-gel:Fooddel$$11221@cluster0.pppdqyh.mongodb.net/food-del').then(()=>console.log("DB Connected"));

}