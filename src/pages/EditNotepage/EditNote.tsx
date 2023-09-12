import { FC } from 'react'

import { useNote } from '../../components/Layout'
import NoteForm from '../../components/NoteForm'
import { NoteData, Tag } from '../../types/noteTypes'

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

const EditNote: FC<EditNoteProps> = ({ onSubmit, onAddTag, availableTags }) => {
  const note = useNote()
  return (
    <>
      <h1 className='mb-4'>Edit Note</h1>
      <NoteForm
        title={note.title}
        tags={note.tags}
        markdown={note.markdown}
        onSubmit={(data) => onSubmit(note.id, data)}
        availableTags={availableTags}
        onAddTag={onAddTag}
      />
    </>
  )
}

export default EditNote
