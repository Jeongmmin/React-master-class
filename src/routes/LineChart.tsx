import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

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

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();

  const { isLoading, data } = useQuery<IHistoricalData[]>(
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
          // xaxis= {{
          //   type: 'category',
          //   categories: data?.map((price => price.time_close))??[],
          // }}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 300,
              toolbar: { 
                show: false,
              }
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              type: "datetime",
              // categories:
              //   data?.map((price) => truncate(price.time_close, 11)) ?? [],
              categories:
                data?.map((price) => price.time_close) ?? [],
              tickPlacement: "between",
              axisBorder: { show: false },
              axisTicks: { show: false },
              // labels: { show: true, rotate: 0, hideOverlappingLabels: true },
              labels: { show: false},
            },
            yaxis: {
              labels: { show: false, formatter: function(val, index) {
                return `$ ${val.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }},
            },
            fill: {
              type: 'gradient',
              // gradient: {
              //   shade: 'dark',
              //   gradientToColors: [ '#FDD835'],
              //   shadeIntensity: 1,
              //   type: 'horizontal',
              //   opacityFrom: 1,
              //   opacityTo: 1,
              //   stops: [0, 100, 100, 100]
              // },
              gradient: { gradientToColors: ["#3588fd"], stops: [0, 100] },
            },
            colors: ["#84eb6b"],
          }}
        />
      )}
    </div>
  );
}

export default Chart;
