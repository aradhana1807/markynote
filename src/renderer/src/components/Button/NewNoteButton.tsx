/* eslint-disable prettier/prettier */
import { createEmptyNoteAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { FilePlus } from "@phosphor-icons/react";
import { ActionButton, ActionButtonProps } from './ActionButton'

export const NewNoteButton = ({...props}: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)
  const handleCreation = () => {
    createEmptyNote()
  }

  return (
    <ActionButton onClick={handleCreation} {...props}>
      <FilePlus className='w-5 h-5 text-zinc-300' />
    </ActionButton>
  )
}
