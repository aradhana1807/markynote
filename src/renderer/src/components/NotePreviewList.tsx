/* eslint-disable prettier/prettier */
import { notesMock } from '@renderer/store/mocks'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { NotePreview } from './NotePreview'

export const NotePreviewList = ({className,...props}: ComponentProps<'ul'>) => {
  if(notesMock.length === 0) {
    return (
      <ul className={twMerge('pt-4 text-center') } {...props}>
        <span>No Notes yet!</span>
      </ul>
    )
  }
  return (
    <ul className={className} {...props}>
      {notesMock.map((note) => (
        <NotePreview key={note.title + note.lastEditTime} {...note} />
      ))}
    </ul>
  )
}
