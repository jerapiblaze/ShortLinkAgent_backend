import dotenv from 'dotenv'

dotenv.config()

export default {
    HOST: process.env.DB_HOST,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
    DIALECT: process.env.DB_DIALECT,
    PATH: process.env.DB_PATH,
    LOGGING: process.env.DB_LOGGING,
    OVERWRITE: process.env.DB_OVR
}