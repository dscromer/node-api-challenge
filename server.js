const express = require('express');
const actionsRouter = require('./actions/actionsRouter');
const projectsRouter = require('./projects/projectsRouter');
const welcomeRouter = require('./welcome/welcomeRouter')

const server = express();
const port = process.env.PORT || 8080

server.use(express.json())

server.use(actionsRouter)
server.use(projectsRouter)
server.use(welcomeRouter)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

module.exports = server;