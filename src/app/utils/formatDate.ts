import { hoursToMinutes, format as ft, addMinutes } from 'date-fns'
import { ptBR } from 'date-fns/locale'


export function formatDate(value: Date | string) {

  if (typeof value === "string") {
    value = new Date(value)
  }

  return Intl.DateTimeFormat('pt-br').format(value)
}


export function format(dt: string, format: string) {
  const date = new Date(dt)
  const offset = new Date().getTimezoneOffset()

  return ft(addMinutes(date, offset), format, { locale: ptBR })
}
