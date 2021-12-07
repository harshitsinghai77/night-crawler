import React from "react";
import { Box, Text, Heading } from "grommet";
import { StatusBadge } from "./StatusBadge";
import { BarGraph } from "../graphs";

const statusColors = {
  Off: "status-critical",
  Suspended: "status-warning",
  On: "status-ok",
};

const queryData = [
  {
    calender_year: 2011,
    yearly_growth: 62.5,
    crime_desc: "VIOLATION OF RESTRAINING ORDER",
  },
  {
    calender_year: 2012,
    yearly_growth: 140,
    crime_desc: "CHILD NEGLECT (SEE 300 W.I.C.)",
  },
  {
    calender_year: 2013,
    yearly_growth: 37.5,
    crime_desc: "THEFT FROM MOTOR VEHICLE - GRAND ($400 AND OVER)",
  },
  {
    calender_year: 2014,
    yearly_growth: 91.43,
    crime_desc: "RAPE, FORCIBLE",
  },
  {
    calender_year: 2015,
    yearly_growth: 414.29,
    crime_desc: "INTIMATE PARTNER - AGGRAVATED ASSAULT",
  },
  {
    calender_year: 2016,
    yearly_growth: 149.35,
    crime_desc: "BIKE - STOLEN",
  },
  {
    calender_year: 2017,
    yearly_growth: 90.91,
    crime_desc: "BURGLARY, ATTEMPTED",
  },
  {
    calender_year: 2018,
    yearly_growth: 117.39,
    crime_desc: "SEXUAL PENETRATION W/FOREIGN OBJECT",
  },
  {
    calender_year: 2019,
    yearly_growth: 155,
    crime_desc: "BUNCO, GRAND THEFT",
  },
];

export const VirtualMachinesCard = ({ data, ...rest }) => (
  <Box round pad="medium" direction="column" background="white" {...rest}>
    <Heading level="2" margin="none" size="small">
      {data.name}
    </Heading>
    <Text size="90px" weight="bold">
      {data.count}
    </Text>
    <BarGraph queryData={queryData} />
    <Box gap="medium" pad={{ vertical: "small" }}>
      {["On", "Suspended", "Off"].map((status) => (
        <Box direction="row" align="center" key={status}>
          <StatusBadge size="xlarge" background={statusColors[status]} />
          <Box pad="xsmall">
            <Text size="small" color="dark-1" margin={{ left: "xsmall" }}>
              {status} ({data[status]})
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);
