import { MonoBehaviour } from '../utils'

interface IUnitStats {
  health: number
  defense: number
  die(): void
  takeDamage(): void
  restoreHealth(): void
  moveSpeed: number
  acceleration: number
  goForward(): void
  reverse(): void
  turnLeft(): void
  turnRight(): void
  strength: number
  dexterity: number
  endurance: number
}
