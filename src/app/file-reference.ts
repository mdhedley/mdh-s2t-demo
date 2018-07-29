// File reference object stored in the database
import { Word } from './word'
export class FileReference {
    uuid: string // UUID of the file
    title: string // Title of the file
    status: string  // Status Pending, or Ready
    words: Word[] // Array of word objects that makes up the transcription
}
