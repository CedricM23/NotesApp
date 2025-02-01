/*Exports the API*/
export default class NotesAPI {
    /* retrieves all notes */
    static getAllNotes(){
        /* retrieves all notes in the system, if no notes are found an empty array will be returned */
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        /*sorts the notes by desending order*/
        return notes.sort((a ,b) => {

            /* Ternerary statement to sort notes by the updated time stamp, returns -1 if True and 1 if Falsee*/
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;

        });
    }

    /* Saves a note */
    static saveNote(noteToSave){
    /* gets a reference to all existing notes*/
    const notes = NotesAPI.getAllNotes();

    /* Compares new ID to old ID and puts matching ID's into the existing constant*/
    const exisiting = notes.find(note => note.id == noteToSave.id);

    // Edit/Update
    if(exisiting) {
        /* Updates an existing note*/
        /* Updates title*/
        exisiting.title = noteToSave.title;
        /* Updates body*/
        exisiting.body = noteToSave.body;
        /* Updates time*/
        exisiting.updated = new Date().toISOString();
    } else{
        /*creates a random ID for each note*/
        noteToSave.id = Math.floor(Math.random() * 1000000)

        /*returns ISO timestamp*/
        noteToSave.updated = new Date().toISOString();

        /* adds the note to save to the list of existing notes*/
        notes.push(noteToSave)

    }

    /* grabs all exisiting notes and JSON strings*/
    localStorage.setItem("notesapp-notes", JSON.stringify(notes))
    }

    /* Takes in an id of a note to delete*/
    static deleteNote(id){
        
        /* gets a reference to all existing notes*/
        const notes = NotesAPI.getAllNotes();

        /* filters through all noted that dont have the id of the current note*/
        const newNotes = notes.filter(note => note.id != id);

        /* grabs all exisiting notes and JSON strings*/
        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}