# Dependency Inversion Principle (의존역전원칙)

- 소프트웨어 모듈들을 분리하는 특정 형식
- 상위(High-level) 모듈은 하위(Low-level) 모듈의 것을 직접 가져오면 안됨
  - 둘 다 추상화(abstraction)에 의존해야 함
- 추상화는 세부 사항에 의존해서는 안됨
  - 세부사항이 추상화에 의존해야 함
- 클래스가 다른 클래스와 관계가 있으면 안됨
  - 클래스가 다른 클래스의 작동 방식을 많이 알고 있으면 안됨
  - 종속성(dependency) 또는 결합(coupling) 발생
  - 종속성은 어느 잠재적인 위험
