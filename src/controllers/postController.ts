import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary')

import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

let imagem = ''
let resultado = ''

async function registerPost(req: Request, res: Response) {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   })

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
//  cloudinary.uploader.upload(req.file?.path, function (result: any, error: any) {
//     imagem = result.secure_url
//     resultado = result
//     console.log(resultado)
//   })
  try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { filename: image } = req.file

    // const [name] = image.split('.')
    const filename = image
    
    const post = await prisma.posts.create({
      data: {
        title: req.body.title,
        image: filename,
        autor: req.body.autor,
        text: req.body.text,
      },
    })

    return res.status(201).send({ post })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}

//  todo

async function updatePost(req: Request, res: Response) {
 cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
 cloudinary.uploader.upload(req.file?.path, function (result: any, error: any) {
    imagem = result.secure_url
    resultado = result
    console.log(resultado)
  })
  try {
    const post = await prisma.posts.update({
      where:{id: req.params.id},
      data: {
        title: req.body.title,
        image: imagem,
        autor: req.body.autor,
        text: req.body.text,
      },
    })

    return res.status(201).send({ post })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.posts.findMany({
      take: Number(4),
      // skip: 1,

      orderBy: {
        createdAt: 'desc',
      },
    })

    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}


async function getTotal(req: Request, res: Response) {
  try {
    const data = await prisma.posts.findMany()

    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}
async function getOnePost(req: Request, res: Response) {
  try {
    const data = await prisma.posts.findFirst({
      where: { id: req.params.id },
    })

    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}

// async function updateLikes(req: Request, res: Response) {
//   try {
//     const data = await prisma.posts.findFirst({
//       where: { id: req.params.id },
//     })

//     if (!data) return res.status(200).send({ msg: 'Post not found!' })

//     const updateLikes = data.likes + 1

//     await prisma.posts.update({
//       where: { id: req.params.id },
//       data: {
//         likes: updateLikes,
//       },
//     })

//     return res.status(200).send({ data, updateLikes, msg: 'Update likes Success!!' })
//   } catch (error) {
//     return res.status(400).send({ msg: 'ERROR!!', error })
//   }
// }

// async function viewLikes(req: Request, res: Response) {
//   try {
//     const { likes } = await prisma.posts.findFirst({
//       where: { id: req.params.id },
//     })

//     if (!likes) return res.status(200).send({ msg: 'Post not found!' })

//     return res.status(200).send(likes)
//   } catch (error) {
//     return res.status(400).send({ msg: 'ERROR!!', error })
//   }
// }

// async function updateViews(req: Request, res: Response) {
//   try {
//     const data = await prisma.posts.findFirst({
//       where: { id: req.params.id },
//     })

//     if (!data) return res.status(200).send({ msg: 'Post not found!' })

//     const updateViews = data.views + 1

//     await prisma.posts.update({
//       where: { id: req.params.id },
//       data: {
//         views: updateViews,
//       },
//     })

//     return res.status(200).send({ data, updateLikes, msg: 'Update views Success!!' })
//   } catch (error) {
//     return res.status(400).send({ msg: 'ERROR!!', error })
//   }
// }

// async function getSearch(req: Request, res: Response) {
//   try {
//     const data = await prisma.posts.findFirst({
//       where: { title: req.body.title },
//     })

//     return res.status(200).send(data)
//   } catch (error) {
//     return res.status(400).send({ msg: 'ERROR!!', error })
//   }
// }

async function deletePost(req: Request, res: Response) {
  try {
    const data = await prisma.posts.delete({
      where: { id: req.params.id },
    })

    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}


export default { getTotal, deletePost,  updatePost, getOnePost, registerPost, getAll }
