import { Grimpan } from './grimpan/abstract.js'
import { ChromeGrimpan } from './grimpan/chrome.js'
import { IEGrimpan } from './grimpan/ie.js'
import { ChromeGrimpanMenu } from './grimpan-menu/chrome.js'
import { IEGrimpanMenu } from './grimpan-menu/ie.js'
import { ChromeGrimpanHistory } from './grimpan-history/chrome.js'
import { IEGrimpanHistory } from './grimpan-history/ie.js'

export abstract class AbstractGrimpanFactory {
  static createGrimpan() {
    throw new Error('하위 클래스에서 구현하셔야 합니다.')
  }
  static createGrimpanMenu(grimpan: Grimpan, dom: HTMLElement) {
    throw new Error('하위 클래스에서 구현하셔야 합니다.')
  }
  static createGrimpanHistory(grimpan: Grimpan) {
    throw new Error('하위 클래스에서 구현하셔야 합니다.')
  }
}

export class ChromeGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return ChromeGrimpan.getInstance()
  }
  static override createGrimpanMenu(grimpan: ChromeGrimpan, dom: HTMLElement) {
    return ChromeGrimpanMenu.getInstance(grimpan, dom)
  }
  static override createGrimpanHistory(grimpan: ChromeGrimpan) {
    return ChromeGrimpanHistory.getInstance(grimpan)
  }
}

export class IEGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return IEGrimpan.getInstance()
  }
  static override createGrimpanMenu(grimpan: IEGrimpan, dom: HTMLElement) {
    return IEGrimpanMenu.getInstance(grimpan, dom)
  }
  static override createGrimpanHistory(grimpan: IEGrimpan) {
    return IEGrimpanHistory.getInstance(grimpan)
  }
}
