import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fetchCoins } from "../api";

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

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const CoinsList = styled.ul`
  
`;

const Coin = styled.h1`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  animation: ${ShowAnimation} 0.2s linear ;

  a {
    display: flex;
    padding: 20px;
    transition: color 0.2s ease-in;
    align-items: center;
  }

  p {
    font-size: 18px;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.div`
  display: block;
  text-align: center;
`;

const Img = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 20px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

// interface PriceData {
//   id: string;
//   name: string;
//   symbol: string;
//   rank: number;
//   circulating_supply: number;
//   total_supply: number;
//   max_supply: number;
//   beta_value: number;
//   first_data_at: string;
//   last_updated: string;
//   quotes: {
//     USD: {
//       ath_date: string;
//       ath_price: number;
//       market_cap: number;
//       market_cap_change_24h: number;
//       percent_change_1h: number;
//       percent_change_1y: number;
//       percent_change_6h: number;
//       percent_change_7d: number;
//       percent_change_12h: number;
//       percent_change_15m: number;
//       percent_change_24h: number;
//       percent_change_30d: number;
//       percent_change_30m: number;
//       percent_from_price_ath: number;
//       price: number;
//       volume_24h: number;
//       volume_24h_change_24h: number;
//     };
//   };
// }

function Coins() {
  // const { coinId } = useParams();
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  // const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
  //   ["tickers", coinId],
  //   () => fetchCoinTickers(coinId!),
  //   {
  //     // refetchInterval : 5000,
  //   }
  // );
  // const BaseUrl : any = tickersData?.quotes.USD;

  const loading = isLoading || undefined;

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>👻 BitGoast</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>👻 BitGhost</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 200).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={`/${coin.id}`}
                state={{ name: coin.name, rank: coin.rank }}
              >
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                ></Img>
                <p>{coin.name} &rarr;</p>
              </Link>
              <div></div>
            </Coin>
          ))}
          {/* <div>
            <span>percent_change_15m</span>
            <span>{`${tickersData?.quotes.USD.percent_change_15m} %`}</span>
          </div> */}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
