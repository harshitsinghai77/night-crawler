import React from "react";
import { Box, Heading } from "grommet";
import { LineGraph, MultiLineGraph } from "../graphs";

const Graph2 = ({ text, multiline = false, ...rest }) => (
  <Box round pad="medium" direction="column" background="white" {...rest}>
    <Heading level="4" margin="none">
      {text}
    </Heading>
    {multiline ? <MultiLineGraph {...rest} /> : <LineGraph {...rest} />}
  </Box>
);
export default Graph2;
