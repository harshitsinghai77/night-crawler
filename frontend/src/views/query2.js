import React, { useState, useEffect } from "react";
import { Box, Text, Heading, Select } from "grommet";
import { Menu } from "grommet-icons";

import { AppHeader } from "../components/dashboard";
import LineGraph from "../components/dashboard/LineGraph";
import { axiosInstance } from "../apiClient/client";

const getBureau = (bureau) => {
  switch (bureau) {
    case "Central":
      return ["Central", "Hollenbeck", "Newton", "Northeast", "Rampart"];
    case "Valley":
      return [
        "Devonshire",
        "Foothill",
        "Mission",
        "N Hollywood",
        "Topanga",
        "Van Nuys",
        "West Valley",
      ];
    case "South":
      return ["77th Street", "Harbor", "Southwest", "Southeast"];
    case "West":
      return ["Hollywood", "Pacific", "West LA", "Wilshire", "Olympic"];
    default:
      return null;
  }
};

const Query1 = () => {
  const [selected1, setSelected1] = useState("Central");
  const [selected2, setSelected2] = useState("Central");
  const [labels, setLabels] = useState();
  const [yaxisData1, setYaxisData1] = useState();
  const [yaxisData2, setYaxisData2] = useState();

  const getData = async (bureau) => {
    const queryData = await axiosInstance.post("/query2", {
      bureau: bureau,
    });
    return queryData;
  };

  const onSelectBureau1 = async ({ option }) => {
    setSelected1(option);
    const bureau = getBureau(option);
    const resp = await getData(bureau);
    if (!resp) return;
    const queryData = resp.data;
    const labels = queryData.map((el) => el.calender_year);
    const yaxisData = queryData.map((el) => el.arrest_percentage);
    setLabels(labels);
    setYaxisData1(yaxisData);
  };

  const onSelectBureau2 = async ({ option }) => {
    setSelected2(option);
    const bureau = getBureau(option);
    const resp = await getData(bureau);
    if (!resp) return;
    const queryData = resp.data;
    const labels = queryData.map((el) => el.calender_year);
    const yaxisData = queryData.map((el) => el.arrest_percentage);
    setLabels(labels);
    setYaxisData2(yaxisData);
  };

  useEffect(() => {
    onSelectBureau1({ option: "Central" });
    onSelectBureau2({ option: "West" });
  }, []);

  return (
    <Box fill background="light-3">
      <AppHeader appName="Query2" appIcon={<Menu />} />
      <Box flex overflow="auto" gap="medium" pad="medium">
        <Box flex={false} direction="row-responsive" wrap>
          <Box gap="large" flex="grow" margin="medium">
            {yaxisData1 && labels && (
              <LineGraph
                text="Calculate the arrest percentage for crimes against women made by a particular Bureau for each year."
                xLabel="Years"
                yLabel="Arrest Percentage"
                multiline={true}
                labels={labels}
                label1={selected1}
                label2={selected2}
                yaxisData1={yaxisData1}
                yaxisData2={yaxisData2}
              />
            )}
          </Box>
          <Box flex="grow" margin="medium">
            <Box direction="column" gap="large">
              <Box round pad="medium" direction="column" background="white">
                <Box gap="small">
                  <Heading level="2" margin="none" size="small">
                    Select Bureau
                  </Heading>
                  <Box direction="row" justify="between">
                    <Select
                      options={["Central", "Valley", "South", "West"]}
                      value={selected1}
                      onChange={onSelectBureau1}
                    />
                  </Box>
                  <Box direction="row" justify="between">
                    <Select
                      options={["Central", "Valley", "South", "West"]}
                      value={selected2}
                      onChange={onSelectBureau2}
                    />
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

export default Query1;
