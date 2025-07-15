export enum EMPLOYEE_TYPE {
  EMPLOYEE = "EMPLOYEE",
  OWNER = "OWNER",
}


export enum EMPLOYEE_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const EMPLOYEE_TYPE_LABELS: { [key in EMPLOYEE_TYPE]: string } = {
  [EMPLOYEE_TYPE.EMPLOYEE]: "Profissional",
  [EMPLOYEE_TYPE.OWNER]: "Responsável",
}