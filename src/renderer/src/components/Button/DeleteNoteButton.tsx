/* eslint-disable prettier/prettier */
import { ActionButton, ActionButtonProps } from '@/components';
import { deleteNoteAtom } from '@renderer/store';
import { useSetAtom } from 'jotai';

import { Trash } from "@phosphor-icons/react";


export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {

  const deleteNote = useSetAtom(deleteNoteAtom)
  const handleDelete = () => {
    deleteNote()
  }
  return (
    <ActionButton onClick={handleDelete} {...props}>
      <Trash className="w-5 h-5 text-zinc-300" />
    </ActionButton>
  )
}
