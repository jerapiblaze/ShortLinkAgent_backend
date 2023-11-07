import dotenv from 'dotenv'

dotenv.config()

export default {
    SECRET_KEY: process.env.JWT_SECRET_KEY,
    TOKEN_HEADER_KEY: process.env.JWT_TOKEN_HEADER_KEY
}