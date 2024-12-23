interface Cloneable {
  clone(): Cloneable
}

export class HistoryStack extends Array implements Cloneable {
  clone(): HistoryStack {
    return this.slice() as HistoryStack
  }
}
