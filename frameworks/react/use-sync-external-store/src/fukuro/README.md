## useSyncExternalStore와 Context API를 사용하여 라이브러리 형태의 상태관리 시스템 만들기

# fukuro 소개

袋 (ふくろ, fukuro): 전통적인 일본어로 “주머니” 또는 “가방”을 뜻하는 단어입니다.

# 목표

- 인터페이스를 미리 정의하지 않아도 타입 안정성이 보장되는 형태로 만든다.
- 최대한 심플한 형태로 전역상태 스토어를 만들 수 있어야 한다.
- Middleware 지원
  - persist 구현 : localStorage, sessionStorage, IndexedDB, Cookie와 동기화 되는 기능을 구현한다.
  - history(undo/redo) 구현 : 상태 변경 이력을 저장하고 복원할 수 있는 기능을 구현한다.
  - subscription 구현 : 상태 변경을 구독할 수 있는 기능을 구현한다.
- Devtools 지원 : React Query Devtools와 흡사한 인터페이스를 제공한다.

## 기본 사용 방법

```ts
const mono = createMono({
  count: 0,
})
```

```tsx
function App() {
  const [count, setCount] = useMono(mono)
}
```

## setter 정의 버전

```ts
const fukuro = createFukuro(mono, set => ({
  increment: (value: number) => {
    set(prev => prev + value)
  },
  decrement: (value: number) => {
    set(prev => prev - value)
  },
}))
```

```tsx
function App() {
  const { count, increment, decrement } = useFukuro(fukuro)
}
```
