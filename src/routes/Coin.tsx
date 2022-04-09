import { useQuery } from "react-query";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { HTMLAttributes } from "react";
// import LineChart from './LineChart';


const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  /* height: 80vh; */
`;


const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  a {
    font-size: 40px;
  }
  h1 {
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px 20px;
  border-radius: 10px;
  line-height: 1.2;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
    color: ${(props) => props.theme.priceTitleColor};
  }
`;

const PriceValue = styled.span<IItemProps>`
  color: ${(props) => (props.isNegative ? props.theme.downwardColor : props.theme.upwardColor)};
`;

const Description = styled(Overview)`
  margin: 20px 0px;
  padding: 10px;
  line-height: 1.4;
  height: 10vh;
  overflow: auto;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  :hover {
    background-color: rgba(156, 136, 255, 0.5);
    color: whitesmoke;
    transition: 0.6s;
    a {
      color: ${(props) => props.theme.textColor};
    }
  }
  a {
    display: block;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
    padding: 10px;
    :hover {
      color: ${(props) => props.theme.textColor};
    }
  }
`;

const Loader = styled.div`
  display: block;
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface RouterState {
  state: {
    name: string;
  };
}

interface IItemProps extends HTMLAttributes<HTMLDivElement> {
  isNegative: boolean;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
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

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as RouterState;
  const priceMatch = useMatch("/:coinId/price");
  const LineChartMatch = useMatch("/:coinId/line-chart");
  const CandleChartMatch = useMatch("/:coinId/candle-chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 1000,
    }
  );

  function checkBoolean(value: number) {
    if (Math.sign(value) === -1) {
      return true;
    } else {
      return false;
    }
  }

  const BaseUrl: any = tickersData?.quotes.USD;

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>
          <Img
            src={`https://cryptocurrencyliveprices.com/img/${coinId}.png`}
          ></Img>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>순위 🏆</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>전일 대비</span>
              <PriceValue
                isNegative={checkBoolean(BaseUrl.percent_change_15m)}
              >{`${BaseUrl.percent_change_15m} %`}</PriceValue>
            </OverviewItem>
          </Overview>
          {/* <LineChart></LineChart> */}
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>현재 시세</span>
              <span>
                {`$ ${BaseUrl.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>거래량 (24h)</span>
              <span>
                {BaseUrl.volume_24h
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </OverviewItem>
          </Overview>

          {/* chart & price tab */}
          <Tabs>
            <Tab isActive={LineChartMatch !== null}>
              <Link to={`/${coinId}/line-chart`}>Chart</Link>
            </Tab>
            <Tab isActive={CandleChartMatch !== null}>
              <Link to={`/${coinId}/candle-chart`}>Candle</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  );
}

export default Coin;
