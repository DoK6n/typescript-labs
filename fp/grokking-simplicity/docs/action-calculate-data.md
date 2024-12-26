
## 부를 때 조심해야 하는 코드를 구분합니다.

```js - 부르는 시점이나 횟수에 의존하는 액션 함수

sendEmail(to, from, subject, body)
saveUserDB(user)
getCuttentTime()
```

--------------------------------------

```js - 부르는 시점이나 횟수가 중요하지 않은 코드

const user = {
  firstName: 'Eric',
  lastName: 'Normand'
}
sum(numbers)
string_length(str)
[1, 10, 2, 45, 3, 98]
```

-----------------------------------------------------------------------------------------------------------------------------

## 실행하는 코드와 그렇지 않은 코드를 구분합니다.


```js - [액션] 부르는 시점에 의존

sendEmail(to, from, subject, body)
saveUserDB(user)
getCuttentTime()
```

--------------------------------------

```js - [계산] 입력값을 계산해 출력하는 것

sum(numbers)
string_length(str)
```

--------------------------------------

```js - [데이터] 이벤트에 대한 사실을 기록한 것

const user = {
  firstName: 'Eric',
  lastName: 'Normand'
}
[1, 10, 2, 45, 3, 98]
```
