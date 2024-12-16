import ChromeGrimpan from './chrome-grimpan.js'
import IEGrimpan from './ie-grimpan.js'

function grimpanFactory(type: 'ie' | 'chrome' | 'safari') {
  if (type === 'ie') {
    return IEGrimpan.getInstance()
  } else if (type === 'chrome') {
    return ChromeGrimpan.getInstance()
    // } else if (type === 'safari') {
    // return SafariGrimpan.getInstance()
  } else {
    throw new Error('Invalid grimpan type')
  }
}

function main() {
  const chromeGrimpan = grimpanFactory('chrome')
  const ieGrimpan = grimpanFactory('ie')
  // const safariGrimpan = grimpanFactory('safari')
}

main()

export {}
