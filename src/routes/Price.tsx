import { HTMLAttributes } from "react";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled, { keyframes } from "styled-components";
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

interface IItemProps extends HTMLAttributes<HTMLDivElement> {
  isNegative: boolean;
}

interface PriceData {
  total_supply: number;
  max_supply: number;
  circulating_supply: number;
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
    // KRW: {
    //   price: number;
    //   volume_24h: number;
    //   volume_24h_change_24h: number;
    //   market_cap: number;
    //   market_cap_change_24h: number;
    //   percent_change_15m: number;
    //   percent_change_30m: number;
    //   percent_change_1h: number;
    //   percent_change_6h: number;
    //   percent_change_12h: number;
    //   percent_change_24h: number;
    //   percent_change_7d: number;
    //   percent_change_30d: number;
    //   percent_change_1y: number;
    //   ath_price: number;
    //   ath_date: string ;
    //   percent_from_price_ath: number;
    // };
  };
}

const ShowAnimation = keyframes`
  0% {
    transform: translateY(-1px);
    opacity: 0;
  }
  50% {
    transform: translateY(-10px);
    opacity: 0;
  }
  100% {
    transform: none;
    opacity: 1;
  }
`;

const Overview = styled.div`
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const OverviewItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  justify-content: space-between;
  padding: 10px 0;
  h3 {
    color: ${(props) => props.theme.priceTitleColor};
  }
`;

const RowOverviewItem = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 20px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  animation: ${ShowAnimation} 0.4s linear;
  span:first-child {
    font-size: 14px;
    text-transform: uppercase;
    color: ${(props) => props.theme.priceTitleColor};
  }
  span:last-child {
    font-size: 14px;
    text-transform: uppercase;
  }
`;

const PriceValue = styled.span<IItemProps>`
  color: ${(props) =>
    props.isNegative ? props.theme.downwardColor : props.theme.upwardColor};
  /* color: ${(props) => (props.isNegative ? "#8c8989" : "#ff5778")}; */
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

  const loading = isLoading || tickersLoading;

  const todayObj: any = data ? data[0] : {};

  const BaseUrl: any = tickersData?.quotes.USD;

  function checkBoolean(value: number) {
    if (Math.sign(value) === -1) {
      return true;
    } else {
      return false;
    }
  }

  // console.log(Math.sign(BaseUrl.percent_change_15m))

  return (
    <div>
      {loading ? (
        "Price Loading..."
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <h3>시가</h3>
              <span>{`$ ${todayObj.open.toFixed(3)}`}</span>
              <h3>고가</h3>
              <span>{`$ ${todayObj.high.toFixed(3)}`}</span>
            </OverviewItem>
            <OverviewItem>
              <h3>저가</h3>
              <span>{`$ ${todayObj.low.toFixed(3)}`}</span>
              <h3>종가</h3>
              <span>{`$ ${todayObj.close.toFixed(3)}`}</span>
            </OverviewItem>
          </Overview>

          <RowOverviewItem>
            <span>시총</span>
            <span>{`$ ${BaseUrl.market_cap
              .toFixed(3)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>현재 유통량</span>
            <span>{`${tickersData?.circulating_supply
              .toFixed(3)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>총 유통량</span>
            <span>
              {tickersData?.total_supply
                .toFixed(3)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>15 mimute</span>
            <PriceValue
              isNegative={checkBoolean(BaseUrl.percent_change_15m)}
            >{`${BaseUrl.percent_change_15m} %`}</PriceValue>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>30 mimute</span>
            <PriceValue
              isNegative={checkBoolean(BaseUrl.percent_change_30m)}
            >{`${BaseUrl.percent_change_30m} %`}</PriceValue>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>1 hour</span>
            <PriceValue
              isNegative={checkBoolean(BaseUrl.percent_change_1h)}
            >{`${BaseUrl.percent_change_1h} %`}</PriceValue>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>12 hour</span>
            <PriceValue
              isNegative={checkBoolean(BaseUrl.percent_change_12h)}
            >{`${BaseUrl.percent_change_12h} %`}</PriceValue>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>24 hour</span>
            <PriceValue
              isNegative={checkBoolean(Math.sign(BaseUrl.percent_change_24h))}
            >{`${BaseUrl.percent_change_24h} %`}</PriceValue>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>지난 24시간 거래 변동률</span>
            <PriceValue
              isNegative={checkBoolean(BaseUrl.volume_24h_change_24h)}
            >{`${BaseUrl.volume_24h_change_24h} %`}</PriceValue>
          </RowOverviewItem>
          <RowOverviewItem>
            <span>시총 가격 변동률</span>
            <PriceValue
              isNegative={checkBoolean(BaseUrl.market_cap_change_24h)}
            >{`${BaseUrl.market_cap_change_24h} %`}</PriceValue>
          </RowOverviewItem>
        </>
      )}
    </div>
  );
}

export default Price;
