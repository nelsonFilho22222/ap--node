import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());


app.post('/usuarios', async (req, res) => {

    await prisma.users.create({
        data: {
            email: req.body.email,
            name : req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {
    let users = [];

    try {
        if(req.query.name){
            users = await prisma.users.findMany({
                where: {
                    name: req.query.name
                }
            });
        } else {
            users = await prisma.users.findMany();
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao buscar usuários: ", error);
        res.status(500).json({ message: "Erro ao buscar usuários." });
    }
});


app.put('/usuarios/:id', async (req, res) => {

    await prisma.   users.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name : req.body.name,
            age: req.body.age
        }
    });
    res.status(200).json(req.body)
});

app.delete("usuarios/:id", async (req, res) => {
    await prisma.users.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({message : ' Usuario deletado com Sucesso'})
})

app.listen(3000);