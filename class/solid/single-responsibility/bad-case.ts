import {
  AudioSource,
  Collider,
  GetComponent,
  Input,
  Mathf,
  MonoBehaviour,
  Time,
  Vector3,
} from '../utils'

class UnrefactoredPlayer extends MonoBehaviour {
  private inputAxisName: string
  private positionMultiplier: number
  private yPosition: number
  private bounceSfx: AudioSource
  private transform: { position: Vector3 }

  constructor(inputAxisName: string, positionMultiplier: number) {
    super()
    this.inputAxisName = inputAxisName
    this.positionMultiplier = positionMultiplier
    this.yPosition = 0
    this.bounceSfx = new AudioSource()
    this.transform = { position: new Vector3(0, 0, 0) }
  }

  private Start() {
    this.bounceSfx = GetComponent<AudioSource>()
  }

  private Update() {
    const delta = Input.GetAxis(this.inputAxisName) * Time.deltaTime()
    this.yPosition = Mathf.Clamp(this.yPosition + delta, -1, 1)
    this.transform.position = new Vector3(
      this.transform.position.x,
      this.yPosition * this.positionMultiplier,
      this.transform.position.z,
    )
  }

  private OnTriggerEnter(other: Collider) {
    this.bounceSfx.Play()
  }
}
