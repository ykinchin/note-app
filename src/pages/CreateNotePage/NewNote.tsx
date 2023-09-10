import { FC } from 'react'

import { NoteData, Tag } from '../../types/noteTypes'
import NoteForm from './components/NoteForm'

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

const NewNote: FC<NewNoteProps> = ({ onSubmit, onAddTag, availableTags }) => {
  return (
    <>
      <h1 className='mb-4'>Create Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        availableTags={availableTags}
        onAddTag={onAddTag}
      />
    </>
  )
}

export default NewNote
