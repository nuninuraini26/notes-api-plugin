const {nanoid} = require('nanoid')

class NotesService {
    constructor() {
        this._notes = []
    }
    addNote({title, tags, body}) {
        const id = nanoid(16)
        const createdAt = new Date().toISOString()
        const updatedAt = createdAt
        const newNote = {
            title, 
            tags, 
            body, 
            id, 
            createdAt, 
            updatedAt
        }
        this._notes.push(newNote)
        const isSuccess = this._notes.filter((note) => note.id === id).length > 0
        if(!isSuccess) {
            throw new Error('Note is failed to add.')
        }
        
        return id
    }

    getNote() {
        return this._notes
    }

    getNoteById(id) {
        const note = this._notes.filter((n) => n.id === id)[0]
        if(!note) {
            throw new Error('Note is not found.')
        }

        return note
    }

    editNoteById(id, {title, tags, body}) {
        const index = this._notes.findIndex((note) => note.id === id)
        const updatedAt = new Date().toISOString()
        if(index === -1) {
            throw new Error('Failed to update the note. Note is not found.')
        }
        this._notes[index] = {
            ...this._notes[index],
            title,
            tags,
            body,
            updatedAt
        }
    }

    deleteNotebyId(id) {
        const index = this._notes.findIndex((note) => note.id === id)
        if(index === -1) {
            throw new Error('Failed to delete the note. Note is not found')
        }

        this._notes.splice(index, 1)
    }
}

module.exports = NotesService