import { Bar, Line } from "react-chartjs-2";
import { Box, Text } from "grommet";

import { StatusBadge } from "../dashboard/StatusBadge";

const backgroundColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 205, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(201, 203, 207, 0.2)",
  "rgba(225, 223, 107, 0.2)",
  "rgba(118, 203, 110, 0.2)",
];

const defaultOptions = {
  responsive: true,
  legend: {
    display: false,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const BarGraph = ({
  labels,
  yaxisData,
  xLabel,
  yLabel,
  legends,
  ...rest
}) => {
  // calender_year, yearly_growth
  const data = {
    labels,
    datasets: [
      {
        data: yaxisData,
        backgroundColor: backgroundColor,
      },
    ],
  };

  const options = {
    ...defaultOptions,
    scales: {
      xAxes: [
        {
          scaleLabel: {
            labelString: xLabel,
            display: true,
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            labelString: yLabel,
            display: true,
          },
          ...rest,
        },
      ],
    },
  };

  return (
    <>
      <Bar data={data} options={options} />
      <Box gap="medium" pad={{ vertical: "small" }}>
        {legends &&
          labels.map((status, index) => (
            <Box direction="row" align="center" key={status}>
              <StatusBadge size="xlarge" background={backgroundColor[index]} />
              <Box pad="xsmall">
                <Text size="small" color="dark-1" margin={{ left: "xsmall" }}>
                  {status} - {legends[index]}
                </Text>
              </Box>
            </Box>
          ))}
      </Box>
    </>
  );
};

export const LineGraph = ({
  labels,
  yaxisData1,
  label1,
  titleText,
  xLabel,
  yLabel,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: label1,
        data: yaxisData1,
        fill: false,
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgb(255,99,132)",
      },
    ],
  };

  const options = {
    ...defaultOptions,
    legend: {
      display: true,
    },
    scales: {
      x: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return "$" + value;
          },
        },
      },
      xAxes: [
        {
          scaleLabel: {
            labelString: xLabel,
            display: true,
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            labelString: yLabel,
            display: true,
          },
        },
      ],
    },
  };

  return <Line options={options} data={data} />;
};

export const MultiLineGraph = ({
  labels,
  yaxisData1,
  yaxisData2,
  label1,
  label2,
  xLabel,
  yLabel,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: label1,
        data: yaxisData1,
        fill: false,
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgb(255,99,132)",
      },
      {
        label: label2,
        data: yaxisData2,
        fill: false,
        borderColor: "rgb(54,162,235)",
        backgroundColor: "rgb(54,162,235)",
      },
    ],
  };

  const options = {
    ...defaultOptions,
    legend: {
      display: true,
    },
    scales: {
      x: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return "$" + value;
          },
        },
      },
      xAxes: [
        {
          scaleLabel: {
            labelString: xLabel,
            display: true,
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            labelString: yLabel,
            display: true,
          },
        },
      ],
    },
  };

  return <Line options={options} data={data} />;
};
