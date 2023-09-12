import { FC } from 'react'

import NoteForm from '../../components/NoteForm'
import { NoteData, Tag } from '../../types/noteTypes'

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
