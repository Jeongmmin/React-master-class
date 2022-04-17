import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";
import { ChartProps, IHistorical } from './CandleChart';



function LineChart() {
  const isDark = useRecoilValue(isDarkAtom);

  const { coinId } = useOutletContext<ChartProps>();

  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
  );

  
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => price.close) as number[],
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
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) => price.time_close) ?? [],
              tickPlacement: "between",
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
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
              axisBorder: { show: false },
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#3588fd"], stops: [0, 100] },
            },
            colors: ["#84eb6b"],
          }}
        />
      )}
    </div>
  );
}

export default LineChart;
