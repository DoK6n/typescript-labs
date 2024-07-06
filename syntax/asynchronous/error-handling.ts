// 비동기 함수 에러처리 동작 방식

// 에러를 발생시키는 비동기 함수
async function asyncErrFn() {
  throw new Error('에러 발생')
}

// 아래와 같이 await나 .catch없이 try catch해서 에러 잡지 못하는 함수는 (catchAsync/catchPromise)와 같이 고차함수를 통해 에러를 잡아줘야 한다.
async function catchAsync(fn) {
  try {
    await fn()
  } catch (e) {
    console.log('catchAsyncFn')
  }
}

async function catchPromise(fn) {
  fn().catch(e => console.log('catchPromiseFn'))
}

// try 블럭에서 함수 내에서 에러를 발생시키는 비동기 함수를 호출할 때, await나 .catch 없이 호출할 경우 에러를 catch하지 못한다.
async function apiCallTryCatchNoAwait() {
  try {
    return asyncErrFn()
  } catch (e) {
    console.log('Error in apiCallTryCatchNoAwait')
  }
}

catchAsync(apiCallTryCatchNoAwait)
catchPromise(apiCallTryCatchNoAwait)
apiCallTryCatchNoAwait()
