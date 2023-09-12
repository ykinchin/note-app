import { FC } from 'react'
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'

import { Note } from '../types/noteTypes'

type LayoutProps = {
  notes: Note[]
}

const Layout: FC<LayoutProps> = ({ notes }) => {
  const { id } = useParams()
  const note = notes.find((note) => note.id === id)

  if (note === null) return <Navigate to='/' replace />

  return <Outlet context={note} />
}

export default Layout

// eslint-disable-next-line react-refresh/only-export-components
export function useNote() {
  return useOutletContext<Note>()
}
