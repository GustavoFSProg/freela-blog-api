import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../utils/Token'

const prisma = new PrismaClient()

async function createUser(req: Request, res: Response) {
  try {
    const user = await prisma.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      },
    })

    return res.status(201).json({ msg: 'User created well!!', user })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!!!', error })
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.users.findMany()

    // res.setHeader('Access-Control-Allow-Origin', 'https://freela-blog.netlify.app/')


    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json({ msg: 'Deu erro!' })
  }
}

async function getOne(req: Request, res: Response) {
  try {
    const data = await prisma.users.findFirst({
      where: { id: req.params.id },
    })

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json({ msg: 'Deu erro!' })
  }
}

async function update(req: Request, res: Response) {
  try {
    await prisma.users.update({
      where: { id: req.params.id },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      },
    })

    return res.status(200).json({ msg: 'User Updated' })
  } catch (error) {
    return res.status(400).json({ msg: 'Deu erro!' })
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    await prisma.users.delete({
      where: { id: req.params.id },
    })

    return res.status(200).json({ mdg: 'user Deleted!' })
  } catch (error) {
    return res.status(400).json({ msg: 'Deu erro!' })
  }
}

export async function generateToken(data: any) {
  const { email, password } = data
  return await jwt.sign(
    { email, password },
    String(process.env.SECRET as string & { asBytes: true }),
    {
      expiresIn: '1d',
    }
  )
}


async function Login(req: Request, res: Response) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      },
    })
    if (!user) return res.status(400).send({ msg: 'Email or password invalid!!' })

    const token = await generateToken(user)

    return res.status(201).json(token)
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!!!', error })
  }
}

async function Token(req: Request, res: Response, next: any) {
  const token = req.body.token || req.headers['token'] 

  if (!token) return res.status(401).send({ error: 'Not authorized' })

  const { error, decode }: any = await verifyToken(token)

  if (error) return res.status(401).send({ error: 'Invalid token' })
  // req.body.currentUser = await getCurrentUser(decode.email)
  return next()
}

export default {Token, Login, deleteUser, createUser, update, getAll, getOne }
