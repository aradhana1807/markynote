/* eslint-disable prettier/prettier */
import { NotePreview } from '@/components'
import { useNotesList } from '@/hooks/useNotesList'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({onSelect, className,...props}: NotePreviewListProps) => {
  const {notes, selectedNoteIndex, handleNoteSelect } = useNotesList({onSelect})
  
  if(notes.length === 0) {
    return (
      <ul className={twMerge('pt-4 text-center') } {...props}>
        <span>No Notes yet!</span>
      </ul>
    )
  }
  return (
    <ul className={className} {...props}>
      {notes.map((note,index) => (
        <NotePreview key={note.title + note.lastEditTime} 
        isActive={selectedNoteIndex === index}
        onClick={handleNoteSelect(index)}
        {...note} />
      ))}
    </ul>
  )
}
