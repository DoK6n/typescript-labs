import ChromeGrimpan from './chrome-grimpan.js'
import IEGrimpan from './ie-grimpan.js'
import AbstractGrimpanFactory from './abstract-grimpan-factory.js'

class ChromeGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return ChromeGrimpan.getInstance()
  }
}

class IEGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return IEGrimpan.getInstance()
  }
}

// class SafariGrimpanFactory extends AbstractGrimpanFactory {
//   static override createGrimpan() {
//     return SafariGrimpan.getInstance()
//   }
// }

export function main() {
  const chromeGrimpan = ChromeGrimpanFactory.createGrimpan()
  const ieGrimpan = IEGrimpanFactory.createGrimpan()
  // const safariGrimpan = SafariGrimpanFactory.createGrimpan()
}

main()
