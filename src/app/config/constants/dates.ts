
export const MONTHS = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

export enum DAYS_OF_WEEK {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

export enum PERIODS {
  diary = 'DIARY',
  weekly = 'WEEKLY',
  biweekly = 'BIWEEKLY',
  monthly = 'MONTHLY',
}

export const DAYS_OF_WEEK_LABEL = {
  [DAYS_OF_WEEK.SUNDAY]: "Domingo",
  [DAYS_OF_WEEK.MONDAY]: "Segunda",
  [DAYS_OF_WEEK.TUESDAY]: "Terça",
  [DAYS_OF_WEEK.WEDNESDAY]: "Quarta",
  [DAYS_OF_WEEK.THURSDAY]: "Quinta",
  [DAYS_OF_WEEK.FRIDAY]: "Sexta",
  [DAYS_OF_WEEK.SATURDAY]: "Sabado",
}

export const PERIODS_LABEL = {
  [PERIODS.diary]: 'Diário',
  [PERIODS.weekly]: 'Semanal',
  [PERIODS.biweekly]: 'Quinzenal',
  [PERIODS.monthly]: 'Mensal',
}
