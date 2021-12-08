import React, { useState, useEffect } from "react";
import { Box, Text, Heading, Select, Button, Spinner } from "grommet";
import { Menu } from "grommet-icons";

import { AppHeader } from "../components/dashboard";
import LineGraph from "../components/dashboard/LineGraph";
import { axiosInstance } from "../apiClient/client";

const getEthnicity = (ethnicity) => {
  switch (ethnicity) {
    case "Black":
      return "('B')";
    case "Asian":
      return "('C','D','F','J','K','L','V','Z')";
    case "Guamanian/Hawaiian/Pacific Islander/Samoan":
      return "('G','U','P','S')";
    case "Hispanic/Latin/Mexican":
      return "('H')";
    case "American Indian/Alaskan Native":
      return "('I')";
    case "Other":
      return "('O')";
    case "White":
      return "('W')";
    default:
      return null;
  }
};

const getCrimeCodes = (crimeCodes) => {
  switch (crimeCodes) {
    case "Sexual Crimes":
      return ["121", "122", "810"];
    case "Crimes related to homicide, manslaughter":
      return ["110", "113"];
    case "Crimes related to robbery, theft":
      return ["210", "220", "310", "320"];
    case "Crimes against children":
      return ["235", "237", "627", "760"];

    default:
      return null;
  }
};

const Query3 = () => {
  const [ethnicity, setEthnicity] = useState("White");
  const [crimeCodes, setCrimeCodes] = useState("Sexual Crimes");
  const [loader, setLoader] = useState(false);
  const [premiseDesc, setPremiseDesc] = useState();
  const [labels, setLabels] = useState();
  const [yaxisData1, setYaxisData1] = useState();

  const getData = (ethnicity, crimeCodes) => {
    setLoader(true);

    axiosInstance
      .post("/query3", {
        ethnicity: ethnicity,
        crime_codes: crimeCodes,
      })
      .then((resp) => {
        const queryData = resp.data;
        const label = queryData.map((el) => el.time_hour);
        const yaxis = queryData.map((el) => el.no_of_incidents);
        const title = queryData[0].premise_desc;
        setLabels(label);
        setYaxisData1(yaxis);
        setPremiseDesc(title);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  };

  const onSubmitHandle = () => {
    const eth = getEthnicity(ethnicity);
    const crime = getCrimeCodes(crimeCodes);
    getData(eth, crime);
  };

  useEffect(() => {
    getData(getEthnicity("White"), getCrimeCodes("Sexual Crimes"));
  }, []);

  return (
    <Box fill background="light-3">
      <AppHeader appName="Query3" appIcon={<Menu />} />
      <Box flex overflow="auto" gap="medium" pad="medium">
        <Box flex={false} direction="row-responsive" wrap>
          <Box gap="large" flex="grow" margin="medium">
            {loader ? (
              <Box
                round
                pad="medium"
                align="center"
                background="white"
                width="44rem"
              >
                <Spinner size="large" />
              </Box>
            ) : (
              yaxisData1 &&
              labels && (
                <LineGraph
                  text="In which premises have women of a certain ethnicity become the victim of certain types of crimes the most and what is the hourly distribution of those incidents."
                  xLabel="Hours"
                  yLabel="No. of incidents"
                  titleText={premiseDesc}
                  labels={labels}
                  label1={premiseDesc}
                  yaxisData1={yaxisData1}
                />
              )
            )}
          </Box>
          <Box flex="grow" margin="medium">
            <Box direction="column" gap="large">
              <Box round pad="medium" direction="column" background="white">
                <Box gap="small">
                  <Heading level="2" margin="none" size="small">
                    Select Ethnicity
                  </Heading>
                  <Box direction="row" justify="between">
                    <Select
                      options={[
                        "White",
                        "Black",
                        "Asian",
                        "Hispanic/Latin/Mexican",
                        "American Indian/Alaskan Native",
                        "Guamanian/Hawaiian/Pacific Islander/Samoan",
                        "Other",
                      ]}
                      value={ethnicity}
                      onChange={({ option }) => setEthnicity(option)}
                    />
                  </Box>
                  <Box direction="row" justify="between">
                    <Select
                      options={[
                        "Sexual Crimes",
                        "Crimes related to homicide, manslaughter",
                        "Crimes related to robbery, theft",
                        "Crimes against children",
                      ]}
                      value={crimeCodes}
                      onChange={({ option }) => setCrimeCodes(option)}
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

export default Query3;
