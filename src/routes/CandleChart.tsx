import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

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
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 300,
              toolbar: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#4c91da",
                  downward: "#ed79ca",
                },
              },
            },

            xaxis: {
              type: "datetime",
              labels: { show: true },
              axisTicks: { show: false },
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
