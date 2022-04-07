import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers, fetchCoinToday } from "../api";

interface ChartProps {
  coinId: string;
}

interface IHistoricalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface PriceData {
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Overview = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  /* flex-direction: row; */
  align-items: center;
  font-size: 10px;
  font-weight: 400;
  justify-content: space-between;
  /* span {
      border-right: 1px solid white;
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  } */
  h3 {
    color: #c776ed;
  }
`;

const RowOverviewItem = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 10px;
`;

function Price() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["today", coinId],
    () => fetchCoinToday(coinId)
  );

  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 1000,
    }
  );

  console.log(data);

  const todayObj: any = data ? data[0] : {};

  const BaseUrl: any = tickersData?.quotes.USD;

  return (
    <div>
      {isLoading ? (
        "Price Loading..."
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <h3>시가</h3>
              <span>{`$ ${todayObj.open.toFixed(3)}`}</span>
              <h3>고가</h3>
              <span>{`$ ${todayObj.high.toFixed(3)}`}</span>
              <h3>저가</h3>
              <span>{`$ ${todayObj.low.toFixed(3)}`}</span>
              <h3>종가</h3>
              <span>{`$ ${todayObj.close.toFixed(3)}`}</span>
            </OverviewItem>
          </Overview>
          <RowOverviewItem>
            <span>15 mimute</span>
            <span>{`${BaseUrl.percent_change_15m} %`}</span>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>30 mimute</span>
            <span>{`${BaseUrl.percent_change_30m} %`}</span>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>1 hour</span>
            <span>{`${BaseUrl.percent_change_1h} %`}</span>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>12 hour</span>
            <span>{`${BaseUrl.percent_change_12h} %`}</span>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>24 hour</span>
            <span>{`${BaseUrl.percent_change_24h} %`}</span>
          </RowOverviewItem>
        </>
      )}
    </div>
  );
}

export default Price;

// time_open: string;
//   time_close: string;
//   open: number;
//   high: number;
//   low: number;
//   close: number;
//   volume: number;
//   market_cap: number;
