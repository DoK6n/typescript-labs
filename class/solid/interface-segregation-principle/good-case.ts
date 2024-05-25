import { MonoBehaviour } from '../utils'

interface IMovable {}

interface IDamageable {}

interface IUnitStats {}

interface IExpodable {}

class ExplodingBarrel extends MonoBehaviour implements IDamageable, IExpodable {}

class EnemyUnit extends MonoBehaviour implements IMovable, IUnitStats, IDamageable {}
