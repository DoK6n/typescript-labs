export { ERROR } from '../result'

export const USER_NAME_INVALID_ERROR = {
  type: 'business',
  result: false,
  code: 4001,
  data: '이름은 2-50자 사이여야 합니다.',
} as const
export type USER_NAME_INVALID_ERROR = typeof USER_NAME_INVALID_ERROR

export const USER_EMAIL_INVALID_ERROR = {
  type: 'business',
  result: false,
  code: 4002,
  data: '유효한 이메일 주소가 필요합니다.',
} as const
export type USER_EMAIL_INVALID_ERROR = typeof USER_EMAIL_INVALID_ERROR

export const USER_NOT_FOUND_ERROR = {
  type: 'business',
  result: false,
  code: 4003,
  data: '사용자를 찾을 수 없습니다.',
} as const
export type USER_NOT_FOUND_ERROR = typeof USER_NOT_FOUND_ERROR

export const USER_INVALID_DATA_ERROR = {
  type: 'business',
  result: false,
  code: 4004,
  data: '유효하지 않은 사용자 데이터',
} as const
export type USER_INVALID_DATA_ERROR = typeof USER_INVALID_DATA_ERROR

export const USER_ID_REQUIRED_ERROR = {
  type: 'business',
  result: false,
  code: 4005,
  data: '사용자 ID가 필요합니다.',
} as const
export type USER_ID_REQUIRED_ERROR = typeof USER_ID_REQUIRED_ERROR

export const USER_ID_INVALID_TYPE_ERROR = {
  type: 'business',
  result: false,
  code: 4006,
  data: '사용자 ID는 문자열이어야 합니다.',
} as const
export type USER_ID_INVALID_TYPE_ERROR = typeof USER_ID_INVALID_TYPE_ERROR

export const UNKNOWN_ERROR = {
  type: 'unknown',
  result: false,
  code: 5000,
  data: '알 수 없는 오류가 발생했습니다.',
} as const
export type UNKNOWN_ERROR = typeof UNKNOWN_ERROR

export const DATABASE_ERROR = {
  type: 'database',
  result: false,
  code: 6000,
  data: '데이터베이스 오류',
} as const
export type DATABASE_ERROR = typeof DATABASE_ERROR
