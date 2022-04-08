import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

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
`;

const CoinsList = styled.ul``;

const Coin = styled.h1`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;

  a {
    display: flex;
    padding: 20px;
    transition: color 0.2s ease-in;
    align-items: center;
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
  width: 35px;
  height: 35px;
  margin-right: 10px;
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

interface IRouterProps {
  toggleDark: ()=> void;
}


// interface PriceData {
//   quotes: {
//     USD: {
//       percent_change_15m: number;
//       price: number;
//     };
//   };
// }

function Coins({ toggleDark }: IRouterProps) {
  // const { coinId } = useParams();
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  // const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
  //   ["tickers", coinId],
  //   () => fetchCoinTickers(coinId!),
  //   {
  //     // refetchInterval : 5000,
  //   }
  //   );
  // const BaseUrl : any = tickersData?.quotes.USD;
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
      {isLoading ? (
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
                {coin.name} &rarr;
              </Link>
              <div></div>
            </Coin>
          ))}
          {/* {isLoading ? (
        "Price Loading..."
      ) : (
        <div><span>percent_change_15m</span>
            <span>{`${BaseUrl.percent_change_15m} %`}</span></div>
      )} */}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
