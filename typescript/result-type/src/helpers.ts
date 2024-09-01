import * as readline from 'readline'
import { UserInput } from '.'

// 사용자 ID 입력 받기
export const createRl = () =>
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

export const createRlAction = (rl: readline.Interface) => ({
  getUserInput: (prompt: string): Promise<string> => {
    return new Promise(resolve => {
      rl.question(prompt, answer => {
        resolve(answer)
      })
    })
  },

  inputCreateUser: (prompt: string): Promise<UserInput> => {
    return new Promise(resolve => {
      const userInfo: UserInput = { id: '', name: '', email: '' }

      const askId = () => {
        rl.question('id: ', id => {
          userInfo.id = id
          askName()
        })
      }

      const askName = () => {
        rl.question('name: ', name => {
          userInfo.name = name
          askEmail()
        })
      }

      const askEmail = () => {
        rl.question('email: ', email => {
          userInfo.email = email
          resolve(userInfo)
        })
      }

      console.log(prompt)
      askId()
    })
  },
})
