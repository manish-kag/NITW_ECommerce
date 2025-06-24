import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success:false, message: "User doesn't exists"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success:false, message: "Invalid password" });
        }
        else{
            const token = createToken(user._id);
            res.json({ success: true, token: token });
        }
        
    }
    catch (err) {
        console.error(err);
        res.json({ success: false, message: error.message });
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password, branch, phone } = req.body;
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({ success:false, message: "User already exists" });
        }
        if(!validator.isEmail(email)){
            return res.json({ success:false, message: "Please enter a valid email" });
        }
        if(password.length < 8){
            return res.json({ success:false, message: "Please enter a strong password"});
        }
        // Require phone number
        if (!phone || !validator.isMobilePhone(phone + '', 'any')) {
            return res.json({ success:false, message: "Please enter a valid phone number"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            branch: branch || '',
            phone: phone
        });
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({ success: true, token });

    }
    catch (error){
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, message: "Invalid email or password" });
        }
    }
    catch (error) {
        console.log(error);z
        res.json({ success: false, message: error.message });
    }
}

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id || req.userId;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        // Debug: log user object to check phone field
        console.log("Fetched user:", user);
        // Ensure phone is always present in response
        const userObj = user.toObject();
        if (!('phone' in userObj)) userObj.phone = '';
        res.json({ success: true, user: userObj });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, email, phone, branch } = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { name, email, phone, branch },
            { new: true }
        );
        res.json({ success: true, user: updatedUser });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser, adminLogin, getUserById, updateUserProfile };