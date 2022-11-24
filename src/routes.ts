import { Router, Request, Response } from 'express'

import uploadConfig from './uploadConfig'
import multer from 'multer'
import postController from './controllers/postController'
import CommentsController from './controllers/CommentsController'

const upload = multer(uploadConfig)
const routes = Router()

routes.get('/', function (req: Request, res: Response) {
  return res.status(200).send({ message: ` 😎 Api running: ` })
})

// routes.get('/all', (req: Request, res: Response) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   // res.setHeader('Access-Control-Allow-Origin', '*')
    

// }, postController.getAll),
  
  routes.get('/all', postController.getAll),
  // routes.get('/total', postController.getAll),
  routes.post('/register', upload.single('image'), postController.registerPost),
  // routes.put('/likes/:id', postController.updateLikes)
// routes.post('/views/:id', postController.updateViews)
// routes.get('/get-likes/:id', postController.viewLikes)
// routes.get('/profile/:id', postController.getOnePost)
routes.put('/update/:id', upload.single('image'), postController.updatePost)
// routes.put('/delete/:id', postController.deletePost)
// routes.get('/total', postController.getTotal)

routes.post('/register-coments/:id', CommentsController.registerComent)
routes.get('/get-comments', CommentsController.getAllComents)
routes.get('/get-one-comments/:id', CommentsController.getOneComents)

export default routes
