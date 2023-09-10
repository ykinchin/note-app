import { FC, FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { OnChangeValue } from 'react-select'
import CreatableReactSelect from 'react-select/creatable'

import { v4 as uuidV4 } from 'uuid'

import { NoteData, Tag } from '../../../types/noteTypes'

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

const NoteForm: FC<NoteFormProps> = ({ onSubmit, onAddTag, availableTags }) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })
    navigate('..')
  }

  const onTagChange = (tags: OnChangeValue<Tag[], boolean>) => {
    setSelectedTags(
      (tags as Tag[]).map((tag: Tag) => {
        return { label: tag.label, id: tag.id }
      }),
    )
  }

  const getValue = () => {
    if (selectedTags) {
      selectedTags.map((tag: Tag) => {
        return { label: tag.label, value: tag.id }
      })
    } else {
      return selectedTags
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                value={getValue()}
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label }
                  onAddTag(newTag)
                  setSelectedTags((prev) => [...prev, newTag])
                }}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={onTagChange}
                isMulti={true}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='markdown'>
          <Form.Label>Body</Form.Label>
          <Form.Control ref={markdownRef} required as='textarea' rows={15} />
        </Form.Group>
        <Stack direction='horizontal' gap={2} className='justify-content-end'>
          <Button type='submit' variant='primary'>
            Save
          </Button>
          <Link to='..'>
            <Button type='button' variant='outline-secondary'>
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}

export default NoteForm