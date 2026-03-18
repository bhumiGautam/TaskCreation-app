import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const buildCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === 'production';

    return {
        httpOnly: true,                      
        secure: isProduction,                 
        sameSite: isProduction ? 'none' : 'lax',
        path: '/',                            
    };
};

const register = async (req,res) =>{
    try {
        const {name , email , password} = req.body;
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!name || !email || !password){
        return res.
        status(400)
        .json({
            message : "All fields are Required"
        })
    }

    if (!regex.test(email)) {
        return res.
        status(400)
        .json({
            message : "Please Enter valid email"
        })
    }


    const existingUser = await userModel.findOne({email})

    if (existingUser) {
        return res.
        status(400)
        .json({
            message : "User Already exists"
        })
    }


    const hashedPassword = await bcrypt.hash(password , 10)

    // Create a new user document
    const User = await userModel.create({
        name,
        email,
        password : hashedPassword
    })

    const token = jwt.sign(
        {id: User._id} , 
        process.env.JWT_SECRET ,
        {expiresIn : "1d"}
    )


    res.cookie("token" , token , buildCookieOptions())

    return res
        .status(201)
        .json({
            message: "User Created Successfully",
        })

    } catch (error) {
         return res
        .status(500)
        .json({
            message: error.message
        })
    }
}



const login = async (req,res) =>{
    try {
        const {email , password} = req.body

        if(!email || !password){
            return res.
            status(400)
            .json({
                message : "All fields are Required"
            })
        }

        // Find user by email
        const user = await userModel.findOne({email})

        if (!user) {
            return res.
            status(400)
            .json({
                message : "User not exists"
            })
        }


        const checkPass = await bcrypt.compare(password , user.password)

        if (!checkPass) {
            return res.
            status(400)
            .json({
                message : "Please enter correct password"
            })
        }


        const token = jwt.sign(
            {id : user._id} ,
            process.env.JWT_SECRET ,
            {expiresIn : "1d"} 
        )


        res.cookie("token" , token , buildCookieOptions())

        return res.
            status(200)
            .json({
                message : "User logged in successfully",
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                message: error.message
            })
    }
}

const logout = async (req, res) => {
    res.clearCookie("token", buildCookieOptions());

    return res.status(200).json({
        message: "Logged out"
    });
};

export {register , login , logout}