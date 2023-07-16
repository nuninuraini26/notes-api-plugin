/*Change import modules directory for NotesService*/
require('dotenv').config()
const hapi = require('@hapi/hapi')
const notes = require('./api/notes')
const NotesValidator = require('./validator/notes')
const { NotesService } = require('./services/postgres/notesServices')
const users = require('./api/users')
const UsersService = require('./services/postgres/usersServices')
const UsersValidator = require('./validator/users')

const init = async () => {
    const notesService = new NotesService()
    const usersService = new UsersService()
    const server = hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    })

    await server.register([
        {
            plugin: notes,
            options: {
                service: notesService,
                validator: NotesValidator,
            },
        },
        {
            plugin: users,
            options: {
                service: usersService,
                validator: UsersValidator,
            },
        },
    ])
     
     
    await server.start()
    console.log(`Server berjalan pada ${server.info.uri}`)
}

init()