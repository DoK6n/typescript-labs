enum PlayerControllerState {
  Idle = 'Idle',
  Walk = 'Walk',
  Jump = 'Jump',
}

class UnrefactoredPlayerController {
  private state: PlayerControllerState

  constructor() {}

  private update() {
    this.getInput()

    switch (this.state) {
      case PlayerControllerState.Idle:
        this.idle()
        break
      case PlayerControllerState.Walk:
        this.walk()
        break
      case PlayerControllerState.Jump:
        this.jump()
        break
      default:
        throw new Error('Invalid state')
    }
  }

  private getInput() {}
  private walk() {}
  private jump() {}
  private idle() {}
}
