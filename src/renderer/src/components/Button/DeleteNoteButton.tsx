import { ActionButton, ActionButtonProps } from '@/components'

import { LuTrash2 } from 'react-icons/lu'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <LuTrash2 className='w-4 h-4 text-zinc-300'/>
    </ActionButton>
  )
}
