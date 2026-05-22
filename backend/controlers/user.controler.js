
// export const login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;
    
//     if (!email || !password || !role) {
//       return res.status(400).json({ success: false, message: 'Email, password, and role are required' });
//     }

//     const user = await User.findOne({ email: email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: "Invalid email or password" });
//     }

//     if (user.role !== role) {
//       return res.status(400).json({
//         success: false,
//         message: `You are not registered as a ${role}. Please login from the correct portal.`
//       });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(400).json({ success: false, message: 'Invalid email or password' });
//     }

//     const tokenInfo = { username: user.fullname, email: user.email, id: user._id, role: user.role };
//     const token = JWT.sign(tokenInfo, process.env.SECRET_KEY, { expiresIn: '1d' });

//     // ■ FIX: Changed sameSite to 'Lax' and secure to false for local dev
//     return res.cookie('token', token, { 
//       httpOnly: true, 
//       sameSite: 'Lax', 
//       secure: false // Set to true only if using HTTPS in production
//     }).status(200).json({
//       success: true,
//       message: 'User login successfully',
//       user
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: `Backend error in the login function: ${error.message}`
//     });
//   }
// };


// //update profile
// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     const userId = req.id;
//     const file = req.file;
//     let cloudResponse = '';

//     //cloudinary
//     if (file) {
//       const fileUri = getDataUri(file);
//       cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
//         resource_type: "auto"
//       });
//     }

//     let user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     if (fullname) user.fullname = fullname;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (bio) user.profile.bio = bio;
//     if (skills) user.profile.skills = skills.split(',');
    
//     if (cloudResponse) {
//       user.profile.resume = cloudResponse.secure_url;
//       user.profile.resumeOriginalName = file.originalname;
//     }

//     await user.save();

//     user = {
//       fullname: user.fullname,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile
//     };

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       user: user
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: `Backend error in the updateProfile function ${error.message}`
//     });
//   }
// };
// // ■ NEW: Get current logged-in user's fresh profile data (including notifications)
// export const getUserProfile = async (req, res) => {
//   try {
//     const userId = req.id;
//     // Fetch user but exclude the password
//     const user = await User.findById(userId).select('-password');
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }
//     return res.status(200).json({ success: true, user });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };
// ///logout
// export const logout = async (req, res) => {
//   // ■ FIX: Match the same cookie settings as login so the browser knows which one to clear
//   return res.cookie('token', '', { 
//     httpOnly: true, 
//     sameSite: 'Lax', 
//     secure: false,
//     expires: new Date(0) 
//   }).status(200).json({
//     success: true,
//     message: 'User logout successfully'
//   });
// };
import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, role, referralCode } = req.body;
    const file = req.file;
    let cloudResponse = '';

    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    if (!fullname || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({ success: false, message: 'Something is empty' });
    }

    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullname, email, password: hashPassword, phoneNumber, role
    });

    if (cloudResponse) {
      user.profile.profilePhoto = cloudResponse.secure_url;
    }

    // ■ REFERRAL SYSTEM LOGIC ■
    user.referralCode = user._id.toString().substring(0, 8).toUpperCase();

    if (referralCode) {
      const referrer = await User.findOne({ referralCode: referralCode });
      if (referrer) {
        user.referredBy = referrer._id;
        referrer.referralCount += 1;
        await referrer.save();
        console.log(`■ User ${referrer.fullname} got a new referral!`);
      }
    }

    await user.save();

    if (user) {
      return res.status(200).json({
        success: true,
        message: "User registered successfully",
        user
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Backend error in register function ${error.message}`
    });
  }
};

///login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: 'Email, password, and role are required' });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    if (user.role !== role) {
      return res.status(400).json({
        success: false,
        message: `You are not registered as a ${role}. Please login from the correct portal.`
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const tokenInfo = { username: user.fullname, email: user.email, id: user._id, role: user.role };
    const token = JWT.sign(tokenInfo, process.env.SECRET_KEY, { expiresIn: '1d' });

    return res.cookie('token', token, { 
      httpOnly: true, 
      sameSite: 'Lax', 
      secure: false 
    }).status(200).json({
      success: true,
      message: 'User login successfully',
      user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Backend error in the login function: ${error.message}`
    });
  }
};

//update profile
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;
    const file = req.file;
    let cloudResponse = '';

    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content, { resource_type: "auto" });
    }

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(',');
    
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    user = {
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res.status(200).json({
      success: true, 
      message: "Profile updated successfully",
      user: user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Backend error in the updateProfile function ${error.message}`
    })
  }
}

///logout
export const logout = async (req, res) => {
  return res.cookie('token', '', { 
    httpOnly: true, 
    sameSite: 'Lax', 
    secure: false,
    expires: new Date(0) 
  }).status(200).json({
    success: true,
    message: 'User logout successfully'
  });
}

// ■ NEW: Get fresh user profile data (including notifications)
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}