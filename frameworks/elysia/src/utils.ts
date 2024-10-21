import bcrypt from 'bcrypt'

export const encrypt = (value: string) => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedValue = bcrypt.hashSync(value, salt)
  return hashedValue
}
