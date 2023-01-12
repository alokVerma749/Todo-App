import User from '../models/User.js'
import JWT from 'jsonwebtoken'

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            res.status(200).json({
                success: false,
                message: 'all fields are required'
            })
        }
        const isUser = await User.findOne({ email })
        if (isUser) {
            res.status(200).json({
                success: false,
                message: 'user Already present'
            })
        }
        else {
            const user = new User({
                name,
                email,
                password
            })
            const response = await user.save()
            if (!response) {
                res.status(200).json({
                    success: false,
                    message: 'user registeration failed'
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: 'user registered successfully',
                    response
                })
            }
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(500).json({
                success: false,
                message: 'all fields are required'
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            res.status(200).json({
                success: false,
                message: 'user not exists'
            })
        } else {
            const isPasswordCorrect = await user.comparePassword(password)
            if (!isPasswordCorrect) {
                res.status(200).json({
                    success: false,
                    message: 'Invalid Credentials'
                })
            } else {
                const token = await user.generateToken()
                res.status(200).json({
                    success: true,
                    message: 'user logged in successfully',
                    token
                })
            }
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
export const findUser = async (req, res) => {
    const { token } = req.body
    const user = await JWT.decode(token)
    if (user) {
        const userId = user._id
        const isValidUser = await User.findById(userId)
        if (isValidUser) {
            res.status(200).json({
                success: true,
                message: 'valid user',
                user
            })
        } else {
            res.status(200).json({
                success: false,
                message: 'invalid user'
            })
        }
    } else {
        res.status(200).json({
            success: false,
            message: 'invalid user'
        })
    }

}