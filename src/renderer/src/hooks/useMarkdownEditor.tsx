import { selectedNoteAtom } from "@renderer/store"
import { useAtomValue } from "jotai"

/* eslint-disable prettier/prettier */
export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  return {
    selectedNote
  }
}
