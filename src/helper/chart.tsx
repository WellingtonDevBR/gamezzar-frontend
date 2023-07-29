import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { ApexOptions } from "apexcharts";

const ChartContainer = styled.div`
  width: 320px;
  height: 200px;
`;

const data = {
  series: [
    {
      name: "Votes",
      data: [12, 19, 3, 5, 2, 3],
    },
  ],
  options: {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: ["January", "February", "March", "April", "May", "June"],
    },
    yaxis: {
      min: 0,
    },
  } as ApexOptions,
};

export function StyledChartComponent() {
  return (
    <ChartContainer>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="line"
        width={320}
        height={180}
      />
    </ChartContainer>
  );
}
