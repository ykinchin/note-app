import { useMemo } from 'react'
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import { v4 as uuidV4 } from 'uuid'

import Layout from './components/Layout'
import { useLocalStorage } from './hooks/useLocalStorage'
import NewNote from './pages/CreateNotePage/NewNote'
import EditNote from './pages/EditNotepage/EditNote'
import NoteList from './pages/NoteListPage/NoteList'
import NotePage from './pages/NotePage/NotePage'
import { NoteData, Tag } from './types/noteTypes'

type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ]
    })
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
        } else return note
      })
    })
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id)
    })
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag])
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route
          path='/'
          element={<NoteList notes={notesWithTags} availableTags={tags} />}
        />
        <Route
          path='/new'
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        ></Route>
        <Route path='/:id' element={<Layout notes={notesWithTags} />}>
          <Route index element={<NotePage onDelete={onDeleteNote} />} />
          <Route
            path='edit'
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path='*' element={<Navigate to='/' />}></Route>
      </Routes>
    </Container>
  )
}

export default App
