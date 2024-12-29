import './App.css';
import React, {useState} from "react";

const App = () => {

    type Note = {
        id: number,
        title: string,
        content: string
    }
    const [notes, setNotes] = useState<Note[]>([
            {
                id: 1,
                title: "Note Title 1",
                content: "Note Content 1"
            },
            {
                id: 2,
                title: "Note Title 2",
                content: "Note Content 2"
            },
            {
                id: 3,
                title: "Note Title 3",
                content: "Note Content 3"
            },
            {
                id: 4,
                title: "Note Title 4",
                content: "Note Content 4"
            },
            {
                id: 5,
                title: "Note Title 5",
                content: "Note Content 5"
            }
        ]
    );

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const handleNoteClick = (note: Note) => {
        setSelectedNote(note);
        setTitle(note.title);
        setContent(note.content);
    }
    const handleAddNote = (event: React.FormEvent) => {
        event.preventDefault();

        const newNote: Note = {
            id: notes.length + 1,
            title: title,
            content: content
        }
        setNotes([...notes, newNote]);
        setTitle("");
        setContent("");
    }

    const handleUpdateNote = (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedNote) return;
        const updatedNote: Note = {
            id: selectedNote.id,
            title: title,
            content: content
        }
        setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
        setTitle("");
        setContent("");
        setSelectedNote(null);
    }

    const handleCancel = () => {
        setTitle("");
        setContent("");
        setSelectedNote(null);
    }

    const handleDeleteNote = (event: React.MouseEvent, id: number) => {
        event.stopPropagation();
        setNotes(notes.filter(note => note.id !== id));
    }
    return (
        <div className={"app-container"}>
            <form className={"note-form"}
                  onSubmit={(event) =>
                      selectedNote ? handleUpdateNote(event) : handleAddNote(event)}>
                <input placeholder={"title"}
                       value={title}
                       onChange={(event) =>
                           setTitle(event.target.value)}
                       required={true}/>
                <textarea placeholder={"Enter your note"}
                          value={content}
                          rows={10}
                          onChange={(event) =>
                              setContent(event.target.value)}
                          required={true}/>
                {selectedNote ? (
                    <div className={"edit-buttons"}>
                        <button type={"submit"}
                                onClick={(event) =>
                                    handleUpdateNote(event)}>Update
                        </button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                ) : <button type={"submit"}>Add Note</button>
                }
            </form>
            <div className={"notes-grid"}>
                {notes.map(note => (
                    <div className={"note-item"} onClick={() => handleNoteClick(note)}>
                        <div className={"notes-header"}>
                            <button onClick={(event) =>
                                handleDeleteNote(event, note.id)}>X
                            </button>
                        </div>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App;