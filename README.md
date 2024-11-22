# REACT-STREAMING-SSR

`renderToPipeableStream`으로 스트리밍 SSR 구현

## 설명

https://joondong.tistory.com/204

## test

### 1. 서버 실행 (localhost:3000)

```
npm i && npm run dev
```

### 2. 접속

`key` 쿼리 파라미터 필요

```
localhost:3000?key=1
```

### 3. 결과

#### 3-1. fallback 표시

서버에서 `header`, `Suspense` 부분(주석 + `fallback`으로 랜더링), `footer`를 스트림으로 전송

#### 3-2. 3초 후 데이터 표시 (dehydrated 상태)

서버에서 `Suspense` 부분만 실제 데이터로 교체하는 스크립트 코드를 **동일한 연결에서 스트림으로 전송**

**클라이언트 사이드에서 Promise를 다시 던지지 않기 위해** `Suspender` 정보를 **동일한 연결에서 스트림을 전송**

### 3-3. 클릭 가능 (hydrated 상태)

클라이언트 사이드에서 hydration 수행

텍스트 클릭하면 alert 표시

> 3-2와 3-3은 사용자가 시간적 차이를 느낄 수 없다.

### 4. 재접속

서버에 캐시를 사용하여 서버 사이드에서 즉시 랜더링 후 스트림으로 전송

이때 캐시 데이터까지 스트림으로 전송

`key: 1` 즉시 표시

클라이언트 사이드에서 즉시 hydration을 진행하여 텍스트 바로 클릭 가능
