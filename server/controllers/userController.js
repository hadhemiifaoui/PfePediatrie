
require('dotenv').config();
const Child = require('../models/users/childs');

const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')  
const { default: mongoose } = require('mongoose')
const User = require('../models/users/user')
const SECRET="hadhemiifaouimpis2"

const signUp = async (req, res) => {
  try {
    const { firstname ,lastname , email, password, birthday , role, tel } = req.body;
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      console.log('User Exists');
      return res.status(400).json({ message: 'This email already exists' });    
    }  
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstname ,lastname , email, password: hashedPassword, birthday, role, tel });
    await newUser.save();
    const token = jwt.sign(
      { _id: newUser._id, firstname ,lastname ,birthday , email, role, tel },
      SECRET,
      { expiresIn: '1h' }
    );
   
    res.status(200).json(token);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const login = async (req, res) => {
  try {
      const { email, password } = req.body;
      if (!email || !password) {
          return res.status(400).json({ message: 'mail et mot de passe sont essentiels' });
      } 
      const existedUser = await User.findOne({ email });
      if (!existedUser) {
          console.log('User not found:');
          return res.status(404).json({ message: 'cet utilisateur n`existe pas ' });
      }
      const isPasswordValid = await bcrypt.compare(password, existedUser.password);
      if (!isPasswordValid) {
          console.log('mot de passe incorrecte');
          return res.status(400).json({ message: 'mot de passe incorrecte' });
      }

      const tokenPayload = {
          _id: existedUser._id,
          email: existedUser.email,
      };
      
      const secretKey = SECRET;
      if (!secretKey) {
          throw new Error('le clé secret nest pas défifinit');
      }
   
      const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });
      res.header('Authorization', `Bearer ${token}`);
      console.log({message : 'Login successful for user:' , email , token , _id: existedUser._id });
      return res.status(200).json({ message: 'Login successful', token, role: existedUser.role, _id: existedUser._id });
    } catch (err) {
      console.error('Error during login:', err);
      if (!res.headersSent) {
          res.status(500).json({ message: 'Internal Server Error' });
      }
  }
};



const getUserById = async(req , res ) => {
       try{ 
          const id = req.params.id
          const user = await  User.findById(id)
          if(!user){
            res.status(404).json({message : 'User Not Found !!'})
          }
         res.status(200).json(user)

       }
       catch(err){
       console.error(err)
       res.status(500).json({ message: `Internal Server Error` });
      } 
    }

const getAllUsers = async( req , res ) => {
       try{
        const users = await User.find()  
        if(!users){
          res.status(404).json({message : 'No User Found !!'})
        }
        res.status(200).json(users)
       }
      catch(err)
       {
        console.error(err)
        res.status(500).json({message : 'Internal Server Error !!'})
        }
      }
      
       const updateUser = async (req ,res ) => {
        try {
          const id = req.params.id
          if (!mongoose.Types.ObjectId.isValid(id)) {
              res.status(400).json({ message: 'Invalid User Id' });
          }
  
          const user = await User.findById(id);
          if (!user) {
              res.status(404).json({ message: 'User Not Found !!' });
          }
  
          const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
          res.json(updatedUser);
      } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal Server Error' });
      }
       }


    const deleteUser = async (req , res) => {
      try {
        const id = req.params.id
        const user = await User.findById(id)   
        if(!user){
          res.status(404).json({message : 'User Not Found'})
        }
        const deletedUser = await User.findByIdAndDelete(id)
        console.log(deletedUser)
        res.json({message : 'User Removed'})
      }
      catch(err)
      {
          console.error(err)
          res.status(500).json({message : 'Internal Server Error'})
      }
    }
       
    const getUserByRole = async (req, res) => {
      try {
        const { role } = req.params;
        if (!role) {
          return res.status(400).json({ message: 'Role parameter is required' });
        }
    
        const usersByRole = await User.find({ role });
    
        if (!usersByRole || usersByRole.length === 0) {
          return res.status(404).json({ message: 'No users found for the specified role' });
        }
    
        res.status(200).json(usersByRole);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };
  


    
    const addNewUser = async (req , res) => {
      try{
        const {nom , email , password ,tel, role  }  = req.body
        const Existeduser = await User.findOne({email})
        if(Existeduser){
          return res.status(400).json({message : 'User already exists !!'})
        }
        const hashedPassword = await bcrypt.hash(password ,10)

        const newUser = new User({nom , email , password: hashedPassword , role})
        newUser.save()
        const token = jwt.sign({nom , email , password,tel, role}  , SEKRET_KEY , { expiresIn: '1h' });
        res.status(200).json({ token });
      }
      catch(err){
        console.error(err)
        res.status(500).json({message : 'Internal Server Error'})
      }
}


   const CreatePedProfile = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      if (req.file) {
        updatedData.image = req.file.filename;
      }
  
      const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: 'Error updating profile', error });
    }
  };
  


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Send Two-Factor Code
const sendTwoFactorCode = async (user) => {
  const twoFactorCode = crypto.randomBytes(3).toString('hex');
  user.twoFactorCode = twoFactorCode;
  user.twoFactorExpires = Date.now() + 600000; // 10 minutes
  await user.save();

  const mailOptions = {
    to: user.email,
    from: process.env.GMAIL_USER,
    subject: 'Your Two-Factor Code',
    text: `Your two-factor authentication code is ${twoFactorCode}`,
  };

  await transporter.sendMail(mailOptions);
};

// Send Reset Password Email
const sendResetPasswordEmail = async (user, resetToken) => {
  const mailOptions = {
    to: user.email,
    from: process.env.GMAIL_USER,
    subject: 'Password Reset',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
           Please click on the following link, or paste this into your browser to complete the process:\n\n
           http://localhost:3000/reset/${resetToken}\n\n
           If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  await transporter.sendMail(mailOptions);
};

// Two-Factor Authentication Middleware
const verifyTwoFactorCode = async (req, res, next) => {
  const { email, twoFactorCode } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.twoFactorCode !== twoFactorCode || user.twoFactorExpires < Date.now()) {
    return res.status(400).json({ message: 'Invalid or expired two-factor code' });
  }

  next();
};

// Password Reset Request
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  await sendResetPasswordEmail(user, resetToken);

  res.status(200).json({ message: 'Password reset email sent' });
};

// Reset Password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
  if (!user) {
    return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({ message: 'Password has been reset' });
};

const getPediatreChildren = async (req, res) => {
  try {
    const pediatreId = req.params.id;
    const pediatre = await User.findById(pediatreId).populate('children');
    if (!pediatre) {
      return res.status(404).json({
        success: false,
        message: 'Pediatre not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Children retrieved successfully',
      children: pediatre.children
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving children',
      error: error.message
    });
  }
};

const unlinkChildFromPediatre = async (req, res) => {
  try {
    const { pediatreId, childId } = req.params;

    await User.findByIdAndUpdate(
      pediatreId,
      { $pull: { children: childId } },
      { new: true }
    );

    await Child.findByIdAndUpdate(
      childId,
      { $unset: { pediatre: "" } }, 
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Child unlinked from pediatrician successfully'
    });
  } catch (error) {
    console.error('Error unlinking child from pediatrician:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unlink child from pediatrician',
      error: error.message
    });
  }
};


const changePassword = async (req, res) => {
  try {
    const { id } = req.user;  // User ID from the middleware (JWT or session)
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current and new passwords are required',
      });
    }

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if the current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    // Hash the new password and update
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};


const deleteAccounte = async (req, res) => {
  try {
    // Check if user is authenticated and has their own ID in the request
    const userId = req.user.id || req.params.id; // Use req.user.id for user-initiated delete or req.params.id for admin delete

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log(deletedUser);

    // Send success response
    res.status(200).json({ message: 'User Removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  signUp,
  login,
  getUserById,
  updateUser,
  getAllUsers,
  deleteUser,
  getUserByRole,
  addNewUser,
  CreatePedProfile,
  requestPasswordReset,
  resetPassword,
  verifyTwoFactorCode,
  sendTwoFactorCode,
  getPediatreChildren,
  unlinkChildFromPediatre ,
  changePassword,
  deleteAccounte
};


