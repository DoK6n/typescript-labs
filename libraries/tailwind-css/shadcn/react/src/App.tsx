import { Button } from '~/shared/ui'

function App() {
  return (
    <div className='yesflex-col yesgap-4 yesflex'>
      <div className='yesflex yesflex-row yesgap-2 yesm-6'>
        <Button variant={'default'}>버튼</Button>
        <Button variant={'destructive'}>버튼</Button>
        <Button variant={'outline'}>버튼</Button>
        <Button variant={'secondary'}>버튼</Button>
        <Button variant={'ghost'}>버튼</Button>
        <Button variant={'link'}>버튼</Button>
      </div>
      <div className='yesflex yesflex-row yesgap-2 yesm-6'>
        <Button variant={'default'} size={'sm'}>
          버튼
        </Button>
        <Button variant={'destructive'} size={'sm'}>
          버튼
        </Button>
        <Button variant={'outline'} size={'sm'}>
          버튼
        </Button>
        <Button variant={'secondary'} size={'sm'}>
          버튼
        </Button>
        <Button variant={'ghost'} size={'sm'}>
          버튼
        </Button>
        <Button variant={'link'}>버튼</Button>
      </div>
    </div>
  )
}

export default App
