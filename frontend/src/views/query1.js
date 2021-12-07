import React, { useState, useEffect } from "react";
import { Box, Button, Heading, Select, Text } from "grommet";
import { Menu } from "grommet-icons";

import { AppHeader } from "../components/dashboard";
import BarGraph from "../components/dashboard/BarGraph";
import { axiosInstance } from "../apiClient/client";

const getAreaCode = (areaName) => {
  switch (areaName) {
    case "Central":
      return "1";
    case "Rampart":
      return "2";
    case "Southwest":
      return "3";
    case "Hollenbeck":
      return "4";
    case "Harbor":
      return "5";
    case "Hollywood":
      return "6";
    case "Wilshire":
      return "7";
    case "West LA":
      return "8";
    case "Van Nuys":
      return "9";
    case "77th Street":
      return "12";
    case "Northeast":
      return "11";
    default:
      return 0;
    // code block
  }
};

const Query1 = () => {
  const [selected, setSelected] = useState("Central");
  const [labels, setLabels] = useState();
  const [totalRows, setTotalRows] = useState();
  const [legends, setLegends] = useState();
  const [yaxisData, setYaxisData] = useState();

  const getData = (areaCode) => {
    axiosInstance
      .post("/query1", {
        area_code: areaCode,
      })
      .then((res) => {
        if (!res) return;
        const queryData = res.data;
        const labels = queryData.map((el) => el.calender_year);
        const crime_desc = queryData.map((el) => el.crime_desc);
        const yaxisData = queryData.map((el) => el.yearly_growth);
        setLabels(labels);
        setLegends(crime_desc);
        setYaxisData(yaxisData);
      })
      .catch((err) => console.log(err));
  };

  const onSelectChange = ({ option }) => {
    setSelected(option);
    const areaCode = getAreaCode(option);
    getData(areaCode);
  };

  const onCount = () => {
    axiosInstance
      .get("/get-incident-rows")
      .then((res) => {
        if (!res) return;
        const queryData = res.data;
        setTotalRows(queryData.count);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData(1);
  }, []);

  return (
    <Box fill background="light-3">
      <AppHeader appName="Query1" appIcon={<Menu />} />
      <Box flex overflow="auto" gap="medium" pad="medium">
        <Box flex={false} direction="row-responsive" wrap>
          <Box gap="large" flex="grow" margin="medium">
            {yaxisData && labels && (
              <BarGraph
                text="Find the crime against women which had the highest growth rate from the previous year in a particular district for every year"
                labels={labels}
                yaxisData={yaxisData}
                legends={legends}
                xLabel="Years"
                yLabel="Growth Rate (%)"
              />
            )}
          </Box>
          <Box flex="grow" margin="medium">
            <Box direction="column" gap="large">
              <Box round pad="medium" direction="column" background="white">
                <Box gap="small">
                  <Heading level="2" margin="none" size="small">
                    Select Area Code
                  </Heading>
                  <Box direction="row" justify="between">
                    <Select
                      options={[
                        "Central",
                        "Rampart",
                        "Southwest",
                        "Hollenbeck",
                        "Harbor",
                        "Hollywood",
                        "Wilshire",
                        "West LA",
                        "Van Nuys",
                        "77th Street",
                        "Northeast",
                      ]}
                      value={selected}
                      onChange={onSelectChange}
                    />
                  </Box>
                </Box>
              </Box>
              <Box round pad="medium" direction="column" background="white">
                <Box direction="row" gap="medium" justify="start">
                  <Heading level="4" margin="none" size="small">
                    Total Rows in Dataset {totalRows}
                  </Heading>
                  {!totalRows && (
                    <Button
                      label="Get Count"
                      size="small"
                      primary
                      onClick={onCount}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Query1;
