import userModel from '../models/userModel.js'

// add items to user cart 
const addToCart = async (req, res) => {
    try {
        let userData = await userModule.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to cart"});
    } catch (error) {
        res.json({success:false,message:"Error"})
        
    }

}

// remove items from user cart
const removeFromCart = async (req, res) => {

}

//fetch user carrt data
const getCart = async (req, res) => {

}


export {addToCart,removeFromCart,getCart}