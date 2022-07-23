const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')

const Store = require('./store');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const store = new Store();

app.prepare()
    .then(() => {
        const server = express()
        server.use(bodyParser.json())
        server.use(bodyParser.urlencoded({ extended: true }))

        server.get('/api/todo', (req, res) => {
            return res.send({ todo: store.todoList})
        })

        server.get('/api/todo/:id', (req, res) => {
            const id = req.params.id;
            return res.send(store.get(id))
        })

        server.post('/api/todo/new', (req, res) => {
            const entity = req.body;
            return res.send(store.add(entity));
        })

        server.put('/api/todo/:id', (req, res) => {
            const id = req.params.id;
            const entity = req.body;
            return res.send(store.update(id, entity))
        })

        server.delete('/api/todo/:id', (req, res) => {
            const id = req.params.id;
            return res.send(store.delete(id))
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        process.exit(1)
    })