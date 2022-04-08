import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atom';

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart() {

  const isDark = useRecoilValue(isDarkAtom)

  const { coinId } = useOutletContext<ChartProps>();

  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const todayDataArr =
    data?.map((data) => ({
      x: data.time_close,
      y: [
        data.open.toFixed(2),
        data.high.toFixed(2),
        data.low.toFixed(2),
        data.close.toFixed(2),
      ],
    })) ?? [];

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: todayDataArr,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 300,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            plotOptions: {
              bar : {
                columnWidth: '150%',
              },
              candlestick: {
                colors: {
                  upward: "#ff7f7f",
                  downward: "#43b4ff",
                },
              },
            },

            xaxis: {
              type: "datetime",
              labels: { show: false },
              axisTicks: { show: false },
              tickPlacement: "between",
              axisBorder: { show: false },
            },
            yaxis: {
              labels: {
                show: false,
                formatter: function (val, index) {
                  return `$ ${val
                    .toFixed(3)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
