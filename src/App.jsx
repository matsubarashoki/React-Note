import './App.css'
import { Sidebar } from './components/Sidebar'
import { Main } from './components/Main'
import { useEffect, useState } from 'react'
import uuid from "react-uuid";

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    //ローカルストレージにノートを保存する
    localStorage.setItem("notes", JSON.stringify(notes));
  },[notes])

  useEffect(() => {
    setActiveNote(notes[0])
  })

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "新しいノートの内容",
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
  }

  const onDeleteNote = (id) => {
    const newNotes = notes.filter((note) => {
      return note.id !== id});
    setNotes(newNotes);
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote)
  }

  const onUpdateNote = (updatedNote) => {
    //修正された新しいノートの配列を返す
    const updatedNotesArray = notes.map((note) => {
      if(note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });
    setNotes(updatedNotesArray);
  };

  return (
      <div className='App'>
        <Sidebar
         onAddNote={() => onAddNote()}
         notes={notes}
         onDeleteNote={(id) => onDeleteNote(id)}
         activeNote={activeNote}
         setActiveNote={setActiveNote}/>
        <Main activeNote={getActiveNote()} onUpdateNote={(updatedNote) => onUpdateNote(updatedNote)}/>
      </div>
  )
}

export default App
