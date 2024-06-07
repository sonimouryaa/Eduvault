import UserModel from "../Models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const Adduser = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;
    const addData = await UserModel.create({
      name: name,
      email: email,
      password: password,
      contact: contact,
    });

    if (addData) {
      return res.status(201).json({
        message: "user added sucessfulyy",
        data: addData,
        success: true,
      });
    }
    return res.status(400).json({
      message: "Failed to add User",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const userid = req.params.userid;
    const AddData = await UserModel.findOne({ _id: userid });
    if (AddData) {
      return res.status(200).json({
        data: AddData,
        message: " getting Data successfully",
        success: true,
      });
    }
    return res.status(404).json({
      message: "No Data Found",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const UserData = await UserModel.find();
    if (UserData) {
      return res.status(200).json({
        data: UserData,
        message: "Data fetched successfully",
        success: true,
      });
    }
    return res.status(404).json({
      message: "No User found",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const userid = req.params.userid;
    const { name, email, password, contact } = req.body;
    const userData = await UserModel.updateOne(
      { _id: userid },
      {
        $set: {
          name: name,
          email: email,
          password: password,
          contact: contact,
        },
      }
    );
    if (userData.acknowledged) {
      return res.status(201).json({
        data: userData,
        message: "User updated Successfully!",
        success: true,
      });
    }
    return res.status(404).json({
      message: "No Such User Found",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const userid = req.params.userid;
    const delUser = await UserModel.deleteOne({ _id: userid });
    if (delUser) {
      return res.status(200).json({
        message: "User Deleted Successfully",
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "User not Found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const signUp = async (req, res) => {
  try {
    console.log("ttttttttttttttttt")
    const { name, email, password, contact } = req.body;
    const User = await UserModel.findOne({ email: email });
    if (User) {
      return res.status(200).json({
        message: "user already exist",
        success: false,
      });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);
    const saveData = await UserModel.create({
      name: name,
      email: email,
      password: hashPassword,
      contact: contact,
    })
      .then((data) => {
        return res.status(200).json({
          data: data,
          message: "User Created Successfully",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: err.message,
        });
      });
    // if(saveData){
    //  return res.status(201).json({
    //    data:saveData,
    //    message:'Sign Up Successfully',
    //    success:true,
    //  })
    // }
    // return res.status(400).json({
    //   message:'Server Error',
    //   success:false,
    // })
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await UserModel.findOne({ email: email });
    if (!User) {
      return res.status(404).json({
        message: "Email is not registered",
        success: false,
      });
    }
    const comparePassword = bcrypt.compareSync(password, User.password);
    if (!comparePassword) {
      return res.status(401).json({
        message: "Invalid Password!",
        success: false,
      });
    }
    const token = jwt.sign(
      {
        _id: User._id,
        email: User.email,
      },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "365d" }
    );

    console.log(token);
    const resData = User.toObject();
    delete resData.password;
    return res.status(200).json({
      data: resData,
      token: token,
      message: "Logged in Successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      success: false,
    });
  }
};
