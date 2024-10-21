import { encrypt } from './utils'

interface IUser {
  id: string
  name: string
  email: string
  password: string
  isBlocked: boolean
  createdAt: Date
  updatedAt: Date
}

export class User {
  private _id: string

  private constructor(
    private _name: string,
    private _email: string,
    private _password: string,
    private _isBlocked: boolean,
    private _createdAt: Date,
    private _updatedAt: Date,
  ) {
    this._id = crypto.randomUUID()
  }

  static from({ name, email, password, isBlocked, createdAt, updatedAt }: Omit<IUser, 'id'>) {
    return new User(name, email, password, isBlocked, createdAt, updatedAt)
  }

  static signup({ name, email, password }: Pick<IUser, 'name' | 'email' | 'password'>): User {
    const newUser = new User(name, email, encrypt(password), false, new Date(), new Date())
    return newUser
  }

  get id() { return this._id; }
  get name() { return this._name; }
  get email() { return this._email; }
  get isBlocked() { return this._isBlocked; }
  get createdAt() { return this._createdAt; }
  get updatedAt() { return this._updatedAt; }

  toJSON(): IUser {
    return {
      id: this._id,
      name: this._name,
      password: this._password,
      email: this._email,
      isBlocked: this._isBlocked,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    }
  }
}
