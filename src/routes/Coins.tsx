import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fetchCoins } from "../api";

export const ShowAnimation = keyframes`
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

export const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const CoinsList = styled.ul``;

const Coin = styled.h1`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  animation: ${ShowAnimation} 0.2s linear;

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

export const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

export const Loader = styled.div`
  display: block;
  text-align: center;
`;

export const Img = styled.img`
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


function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);


  const loading = isLoading || undefined;

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>BitGoast</title>
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
                to={`/${coin.id}/line-chart`}
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
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
