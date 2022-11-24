import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors, { CorsOptions } from 'cors'
import routes from './routes'
import path from 'path'

dotenv.config()

const { PORT } = process.env

const api = express()

// , 'https://freela-api-blog.herokuapp.com/'

// 'https://freela-api-blog.herokuapp.com/'

// api.use(
//   cors({
//     origin: 'https://freela-blog.netlify.app/',
//   })
// )

const options: CorsOptions = {
  methods: 'GET,POST,PUT,DELETE',
  origin: 'https://freela-blog.netlify.app/all'
}

api.use(cors(options))


api.use(express.json())
api.use(routes)
api.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

api.listen(PORT, () => console.log(` 😎 Api running: ${PORT}`))

export default api
