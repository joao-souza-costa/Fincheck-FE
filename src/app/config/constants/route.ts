interface iRoute {
  path: string,
  name: string
}

export const DASH: iRoute = {
  path: '/',
  name: 'DASH'
}

export const LOGIN: iRoute = {
  path: '',
  name: 'LOGIN'
}

export const REGISTER: iRoute = {
  path: 'register',
  name: 'REGISTER'
}

export const FORGOT_PASSWORD: iRoute = {
  path: 'forgot-password',
  name: 'FORGOT_PASSWORD'
}

export const FORGOT_CHANGE_PASSWORD: iRoute = {
  path: 'forgot-password/:token',
  name: 'FORGOT_CHANGE_PASSWORD'
}


export const HOME_PAGE: iRoute = {
  path: '/dash-board',
  name: 'PAGE'
}

export const DASHBOARD: iRoute = {
  path: '',
  name: 'DASHBOARD'
}

export const DASHBOARD_SETTINGS: iRoute = {
  path: 'settings',
  name: 'SETTINGS'
}

export const CATEGORY_SETTINGS: iRoute = {
  path: 'categories',
  name: 'CATEGORIES'
}

export const SERVICES_SETTINGS: iRoute = {
  path: 'services',
  name: 'SERVICES'
}

export const OPENING_HOURS_SETTINGS: iRoute = {
  path: 'openingHours',
  name: 'OPENING_HOURS_SETTINGS'
}


export const SCHEDULE_VIEW: iRoute = {
  path: 'schedule',
  name: 'schedule'
}