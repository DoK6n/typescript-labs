abstract class DataProcesser {
  process(data: string): void {
    this.loadData(data)
    if (!this.isValidData(data)) {
      throw new Error('Invalid data. processing aborted.')
    }
    this.processData(data)
    this.saveData(data)
  }

  protected abstract loadData(data: string): void
  protected abstract isValidData(data: string): boolean
  protected abstract processData(data: string): void
  protected abstract saveData(data: string): void
}

class JSONDataProcesser extends DataProcesser {
  protected override loadData(data: string): void {
    console.log('Loading JSON data...', data)
  }

  protected override isValidData(data: string): boolean {
    try {
      JSON.parse(data)
      return true
    } catch (e) {
      return false
    }
  }

  protected override processData(data: string): void {
    console.log('Processing JSON data', data)
  }

  protected override saveData(data: string): void {
    console.log('Saving JSON data to database', data)
  }
}

class CSVDataProcesser extends DataProcesser {
  protected override loadData(data: string): void {
    console.log('Loading CSV data...', data)
  }

  protected override isValidData(data: string): boolean {
    return data
      .trim()
      .split('\n')
      .every(line => line.split(',').length > 1)
  }

  protected override processData(data: string): void {
    console.log('Processing CSV data', data)
  }

  protected override saveData(data: string): void {
    console.log('Saving CSV data to database', data)
  }
}

// run
const csvProcesser = new CSVDataProcesser()
csvProcesser.process('name,age\nJohn,20\nJane,21')

console.log()

const jsonProcesser = new JSONDataProcesser()
jsonProcesser.process('{"name": "John", "age": 20}')
