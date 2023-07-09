const InvariantError = require('../../exceptions/invariant-error')
const { NotePayloadsSchema } = require('./schema')
 
const NotesValidator = {
    validateNotePayloads: (payload) => {
        const validationResult = NotePayloadsSchema.validate(payload)
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message)
        }
    },
}
 
module.exports = NotesValidator