import { BrowserRouter, Routes, Route} from "react-router-dom"
import LineChart from './routes/LineChart'
import CandleChart from './routes/CandleChart'
import Coin from './routes/Coin'
import Coins from './routes/Coins'
import Price from './routes/Price'


function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId" element={<Coin />}>
          <Route path="line-chart" element={<LineChart />} />
          <Route path="candle-chart" element={<CandleChart />} />
          <Route path="price" element={<Price />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router


// React Router 5 -> 6에서 바뀐 점
// Switch컴포넌트 -> Routes컴포넌트로 변경
// exact삭제
// useHistory -> useNavigate
// useRoutes 등

// 1. 숫자 천 단위에 , 표시하는 방법
// <span>{priceInfo?.max_supply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span>

// 2. react-router-dom 6 ver 일 때 <Outlet /> 방법 쓰기
// - Router.tsx 에 부모 태그에 감싸서 넣기 
//  <Route path="/:coinId" element={<Coin />}>
//           <Route path="chart" element={<Chart />} />
//           <Route path="price" element={<Price />} />
// </Route>

// - Coin.tsx
//  </Overview>여기 밑에
//           <Outlet /> 넣기