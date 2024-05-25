import { GetComponent, MonoBehaviour } from '../utils'

class Player extends MonoBehaviour {
  private playerAudio: PlayerAudio
  private playerInput: PlayerInput
  private playerMovement: PlayerMovement

  private Start() {
    this.playerAudio = GetComponent<PlayerAudio>()
    this.playerInput = GetComponent<PlayerInput>()
    this.playerMovement = GetComponent<PlayerMovement>()
  }
}

class PlayerAudio extends MonoBehaviour {}
class PlayerInput extends MonoBehaviour {}
class PlayerMovement extends MonoBehaviour {}
