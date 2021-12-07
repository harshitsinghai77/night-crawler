import React from "react";
import { Box, Heading } from "grommet";
import { BarGraph } from "../graphs";

const Graph1 = ({
  text,
  labels,
  yaxisData,
  xLabel,
  yLabel,
  legends,
  ...rest
}) => (
  <Box round pad="medium" direction="column" background="white">
    <Heading level="4" margin="none">
      {text}
    </Heading>
    <BarGraph
      labels={labels}
      yaxisData={yaxisData}
      xLabel={xLabel}
      yLabel={yLabel}
      legends={legends}
      {...rest}
    />
  </Box>
);
export default Graph1;
