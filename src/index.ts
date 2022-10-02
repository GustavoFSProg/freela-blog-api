import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes'

dotenv.config()

const { PORT } = process.env

const api = express()

api.use(express.json())
api.use(cors())
api.use(routes)

api.listen(PORT, () => console.log(` 😎 Api running: ${PORT}`))

export default api
 
