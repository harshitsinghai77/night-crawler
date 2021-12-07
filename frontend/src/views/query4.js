import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  Select,
  Stack,
  RangeSelector,
  Button,
} from "grommet";
import { Menu } from "grommet-icons";

import { AppHeader } from "../components/dashboard";
import BarGraph from "../components/dashboard/BarGraph";
import { axiosInstance } from "../apiClient/client";

const Query4 = () => {
  const [range, setRange] = useState([30, 50]);
  const [selected, setSelected] = useState("2016");
  const [labels, setLabels] = useState();
  const [yaxisData, setYaxisData] = useState();

  const getData = (age_range, year) => {
    axiosInstance
      .post("/query4", {
        age_range: age_range,
        year: year,
      })
      .then((res) => {
        const queryData = res.data;
        const labels = queryData.map((el) => el.area_name);
        const yaxis = queryData.map((el) => el.growth_percentage);
        setLabels(labels);
        setYaxisData(yaxis);
      })
      .catch((err) => console.log(err));
  };

  const onSubmitHandle = () => {
    const age_range = `${range[0]} AND ${range[1]}`;
    const year = selected;
    getData(age_range, year);
  };

  useEffect(() => {
    getData("30 AND 50", "2016");
  }, []);

  return (
    <Box fill background="light-3">
      <AppHeader appName="Query4" appIcon={<Menu />} />
      <Box flex overflow="auto" gap="medium" pad="medium">
        <Box flex={false} direction="row-responsive" wrap>
          <Box gap="large" flex="grow" margin="medium">
            {yaxisData && labels && (
              <BarGraph
                text="Find the growth in crime rate over num (defined by user) years till 2019"
                labels={labels}
                yaxisData={yaxisData}
                xLabel="District"
                yLabel="Growth Rate (%)"
              />
            )}
          </Box>
          <Box flex="grow" margin="medium">
            <Box direction="column" gap="large">
              <Box round pad="medium" direction="column" background="white">
                <Box gap="small">
                  <Heading level="4" margin="none" size="small">
                    Age range: {range[0]} - {range[1]}
                  </Heading>
                  <Box direction="row" justify="between">
                    <Stack>
                      <Box direction="row" justify="between">
                        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
                          (value) => (
                            <Box key={value} pad="small" border={false}>
                              <Text style={{ fontFamily: "monospace" }}>
                                {value}
                              </Text>
                            </Box>
                          )
                        )}
                      </Box>
                      <RangeSelector
                        direction="horizontal"
                        invert={false}
                        min={0}
                        max={100}
                        size="full"
                        round="small"
                        values={range}
                        onChange={(values) => {
                          setRange(values);
                        }}
                      />
                    </Stack>
                  </Box>
                  <Heading level="4" margin="none" size="small">
                    Select Year
                  </Heading>
                  <Box direction="row" justify="between">
                    <Select
                      options={[
                        "2010",
                        "2011",
                        "2012",
                        "2013",
                        "2014",
                        "2015",
                        "2016",
                        "2017",
                        "2018",
                      ]}
                      value={selected}
                      onChange={({ option }) => setSelected(option)}
                    />
                  </Box>
                  <Box direction="row" justify="end">
                    <Button label="Submit" primary onClick={onSubmitHandle} />
                  </Box>

                  <Text color="gray"> </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Query4;
