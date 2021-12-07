import React, { useState, useEffect } from "react";
import { Box, Text, Heading, Stack, RangeSelector, Button } from "grommet";
import { Menu } from "grommet-icons";

import { AppHeader } from "../components/dashboard";
import BarGraph from "../components/dashboard/BarGraph";
import { axiosInstance } from "../apiClient/client";

const Query5 = () => {
  const [range, setRange] = useState([2012, 2017]);
  const [labels, setLabels] = useState();
  const [yaxisData, setYaxisData] = useState();

  const getData = (year_range) => {
    axiosInstance
      .post("/query5", {
        year_range: year_range,
      })
      .then((res) => {
        const queryData = res.data;
        const labels = queryData.map((el) => el.calender_year);
        const yaxis = queryData.map((el) => el.maletofemaleratio);
        setLabels(labels);
        setYaxisData(yaxis);
      })
      .catch((err) => console.log(err));
  };

  const onSubmitHandle = () => {
    const year_range = `${range[0]} AND ${range[1]}`;
    getData(year_range);
  };

  useEffect(() => {
    getData("2012 AND 2017");
  }, []);

  return (
    <Box fill background="light-3">
      <AppHeader appName="Query5" appIcon={<Menu />} />
      <Box flex overflow="auto" gap="medium" pad="medium">
        <Box flex={false} direction="row-responsive" wrap>
          <Box gap="large" flex="grow" margin="medium">
            {yaxisData && labels && (
              <BarGraph
                text="Find the growth in crime rate over num (defined by user) years till 2019"
                labels={labels}
                yaxisData={yaxisData}
                xLabel="Year"
                yLabel="Ration (per 100 males)"
                ticks={{
                  suggestedMin: 60,
                  suggestedMax: 120,
                }}
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
                        {[
                          2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
                          2019,
                        ].map((value) => (
                          <Box key={value} pad="small" border={false}>
                            <Text style={{ fontFamily: "monospace" }}>
                              {value}
                            </Text>
                          </Box>
                        ))}
                      </Box>
                      <RangeSelector
                        direction="horizontal"
                        invert={false}
                        min={2010}
                        max={2019}
                        size="full"
                        round="small"
                        values={range}
                        onChange={(values) => setRange(values)}
                      />
                    </Stack>
                  </Box>
                  <Box direction="row" justify="start">
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

export default Query5;
