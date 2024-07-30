abstract class Beverage {
  prepareRecipe() {
    this.boilWater()
    this.brew()
    this.pourInCup()
    this.addCondiments()
  }

  boilWater() {
    console.log('Boiling water')
  }

  pourInCup() {
    console.log('Pouring into cup')
  }

  abstract brew(): void
  abstract addCondiments(): void
}

// implements abstract class

class Tea extends Beverage {
  brew() {
    console.log('Steeping the tea')
  }

  addCondiments() {
    console.log('Adding lemon')
  }
}

class Coffee extends Beverage {
  brew() {
    console.log('Dripping coffee through filter')
  }

  addCondiments() {
    console.log('Adding sugar and milk')
  }
}

// run
const tea = new Tea()
const coffee = new Coffee()

console.log('\nMaking tea...')
tea.prepareRecipe()

console.log('\nMaking coffee...')
coffee.prepareRecipe()
