/* eslint-disable prettier/prettier */
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';


const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: userTimeZone
})

export const formatDateFromMs = (ms: number) => dateFormatter.format(ms)

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
