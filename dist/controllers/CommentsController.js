"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _client = require('@prisma/client');


const prisma = new (0, _client.PrismaClient)()

async function registerComent(req, res) {
  try {
    await prisma.coments.create({
      data: {
        post_id: req.params.id,
        comments: req.body.comments,
        user_name: req.body.user_name,
      },
    })

    return res.status(201).send({ message: 'Comentário Created with success!' })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function getAllComents(req, res) {
  try {
    const data = await prisma.coments.findMany({
        take: Number(4),
      // skip: 1,

      orderBy: {
        createdAt: 'desc',
      },
    })
    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ message: 'DEU ERRO!' })
  }
}

async function getOneComents(req, res) {
  try {
    const { id } = req.params

    const data = await prisma.coments.findMany({
      where: { post_id: id },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ message: 'DEU ERRO!' })
  }
}

exports. default = { registerComent, getOneComents, getAllComents }
