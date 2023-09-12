import { FC } from 'react'
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { useNote } from '../../components/Layout'

type NotePageProps = {
  onDelete: (id: string) => void
}

const NotePage: FC<NotePageProps> = ({ onDelete }) => {
  const note = useNote()
  const navigate = useNavigate()

  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction='horizontal' className='flex-wrap'>
              {note.tags.map((tag) => (
                <Badge className='text-truncate' key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to={`/${note.id}/edit`}>
              <Button variant='primary'>Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(note.id)
                navigate('/')
              }}
              variant='outline-danger'
            >
              Delete
            </Button>
            <Link to='/'>
              <Button variant='outline-secondary'>Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <div>{note.markdown}</div>
    </>
  )
}

export default NotePage
