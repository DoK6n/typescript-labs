import { Mathf } from '../../design-patterns/utils'

class PlayerController {
  public playerStateMachine: StateMachine
  public charController: any // 캐릭터 컨트롤러를 나타내는 타입을 지정해야 합니다.

  constructor() {
    this.playerStateMachine = new StateMachine(this)
    this.charController = {
      velocity: { x: 0, z: 0 },
    }
  }

  isGrounded(): boolean {
    // 캐릭터가 지면에 있는지 여부를 반환하는 로직을 구현해야 합니다.
    return true
  }

  update(): void {
    this.playerStateMachine.currentState.update()
  }
}

// -------------- State 인터페이스
interface IState {
  enter(): void // code that runs when we first enter the state
  update(): void // per-frame logic. +condition to transition to a new state
  exit(): void // code that runs when we exit the state
}

// -------------- IState를 구체화한 State 구체 클래스
class WalkState implements IState {
  private player: PlayerController

  constructor(player: PlayerController) {
    this.player = player
  }

  enter(): void {}

  update(): void {}

  exit(): void {}
}

class JumpState implements IState {
  private player: PlayerController

  constructor(player: PlayerController) {
    this.player = player
  }

  enter(): void {}

  update(): void {}

  exit(): void {}
}

class IdleState implements IState {
  private player: PlayerController

  constructor(player: PlayerController) {
    this.player = player
  }

  enter(): void {
    // Code to run when entering the idle state
  }

  update(): void {
    // Per-frame logic, include condition to transition to a new state
    if (!this.player.isGrounded()) {
      // If we're no longer grounded, transition to jumping
      this.player.playerStateMachine.transitionTo(this.player.playerStateMachine.jumpState)
    }

    // If we move above a minimum threshold, transition to walking
    if (
      Mathf.Clamp(Math.abs(this.player.charController.velocity.x), 0.1, Infinity) > 0.1 ||
      Mathf.Clamp(Math.abs(this.player.charController.velocity.z), 0.1, Infinity) > 0.1
    ) {
      this.player.playerStateMachine.transitionTo(this.player.playerStateMachine.walkState)
    }
  }

  exit(): void {
    // Code to run when exiting the idle state
  }
}

// --------------

class StateMachine {
  accessor currentState: IState

  public walkState: WalkState
  public jumpState: JumpState
  public idleState: IdleState

  /**
   * 각 상태에 player를 참조시키기 위해 생성자에 주입
   */
  constructor(player: PlayerController) {
    this.walkState = new WalkState(player)
    this.jumpState = new JumpState(player)
    this.idleState = new IdleState(player)
  }

  /**
   * 상태를 초기화하고 시작 상태로 전환
   */
  public initialize(startingState: IState): void {
    this.currentState = startingState
    startingState.enter()
  }

  /**
   * 현재 상태를 나가고 다음 상태로 전환
   */
  public transitionTo(nextState: IState): void {
    this.currentState.exit()
    this.currentState = nextState
    nextState.enter()
  }

  /**
   * 현재 상태의 업데이트 로직 실행
   */
  public update(): void {
    if (this.currentState) {
      this.currentState.update()
    }
  }
}
