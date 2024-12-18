import { ButtonType } from '../grimpan-menu/types'

export type GrimpanMode = 'pen' | 'eraser' | 'pipette' | 'circle' | 'rectangle'

export interface GrimpanOption {
  menu: ButtonType[]
}
