# 👻 Bit-Ghost
  
> **TypeScript** [Coinpaprika Api](https://coinpaprika.com/ko/api/)를 이용하여 만든 암호화폐 차트 앱 입니다.<br/>
**React-Router-Dom**을 이용하여 탭 마다 다른 화면이 보일 수 있도록 구현하였고, [Apex-Chart](https://apexcharts.com/)를 이용하여 선형 차트와 캔들 차트를 구현하였습니다.<br/>
또한 **React-Hemel-Async**를 이용하여 페이지를 이동할 때 Title에 페이지의 이름이 나타날 수 있도록 구현하였고, **React-Recoil**로 전체 페이지에서 Dark/Light 테마의 상태를 받아올 수 있도록 구현하였습니다.<br/>


<br/>
<br/>

## 📌 배포 사이트
<div align="center">   
  
<br/>    
<a href="https://jeongmmin.github.io/bit-ghost/" target="_blank"><img src="https://img.shields.io/badge/ Bit Ghost 앱-9b68f2?style=flat-square&logo=Ghostery&logoColor=white"/></a>
<br/>    
(ctrl + click시 새창열기 가능)    
      

<!-- [🔗 Bit-Ghost 앱](https://jeongmmin.github.io/bit-ghost/) -->

  
</div>

<br/>
<br/>

## 📅 프로젝트 기간
<br/>    

> **2022.04.05 - 2022.04.10**
<br/>
<br/>



## 📝 Skill & Preview
<br/>
<br/>
<p align="center">
<img src="https://img.shields.io/badge/Styled Component-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> &nbsp 
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> &nbsp
<img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=React Router&logoColor=white"/> &nbsp 
<img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square&logo=React Query&logoColor=white"/> &nbsp
<br/>
<br/>
<img src="https://img.shields.io/badge/React Helmet-whitesmoke?style=flat-square&logo=React&logoColor=61DAFB"/> &nbsp
<img src="https://img.shields.io/badge/CoinPaprika Api-whitesmoke?style=flat-square&logo=C&logoColor=CC0000"/> &nbsp
<img src="https://img.shields.io/badge/ApexChart-whitesmoke?style=flat-square&logo=Academia&logoColor=18BFFF"/> &nbsp

<br/>
<br/>
<p align="center">
<img src="https://user-images.githubusercontent.com/82005305/162579417-dca8e850-cf96-4d54-a8d5-b2b9d21c60bd.gif">
</p> 



<br/>
<br/>

## ⚠ Installation

### **앱 실행**

```
"npm run start"
```

### **배포**

```jsx
"npm run build"
```   


### Typescript

```jsx
 "typescript": "^4.6.3"
```   


### react-router-dom & React-Query

```jsx
 "react-router-dom": "^6.3.0",
 "react-query": "^3.34.19",
```   


### styled-components

```jsx
"styled-components": "^5.3.5"
```   


### React-helmet-async, Apexcharts, Recoil

```jsx
 "apexcharts": "^3.35.0",
 
 "react-helmet-async": "^1.2.3",
 
 "recoil": "^0.6.1",
 "recoil-persist": "^4.1.0",
```


<br/>
<br/>

## 🔍 기능설명

### 1. Nav
- Home 버튼 : 어느 페이지에서나 Home 화면으로 이동할 수 있습니다.
- Temem 토글 버튼 : Dark / Light 모드를 변경할 수 있습니다.

### 2. 메인페이지

- 각 코인의 탭에 마우스를 올리면 글자의 색이 변합니다.
- 클릭 시 코인 정보가 있는 페이지로 이동할 수 있습니다.
- 창이 스크롤 되면 다른 화폐들의 목록이 계속 로드됩니다.


### 3. 코인 정보 창

- 클릭한 코인의 정보가 로드됩니다. (ex. 실시간 시세, 시총, 거래량...)
- 가운데 코인 정보가 적힌 탭이 있고 스크롤 하면 다음 내용을 볼 수 있습니다.
- Chart / Candle / Price 탭을 클릭 시 각 페이지가 로드됩니다.


### 4. 차트

- 각 탭을 클릭 시 Line형과 Candle형 2가지의 형태로 볼 수 있습니다. 
- 마우스를 hover 하면 날짜와 시세를 확인 할 수 있습니다.

### 5. Price

- 하루의 시가, 고가, 저가, 종가를 확인할 수 있습니다.(달러 기준)
- 시간 별 가격의 변동률을 확인 할 수 있습니다.
 


