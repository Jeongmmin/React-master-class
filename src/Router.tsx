import { BrowserRouter, Routes, Route } from "react-router-dom";
import LineChart from "./routes/LineChart";
import CandleChart from "./routes/CandleChart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

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
  );
}

export default Router;
