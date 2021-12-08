import React from "react";
import { Box, ResponsiveContext, Text } from "grommet";
import { data } from "./data";

const getContent = () => {
  return data.map((item, index) => (
    <Box gap="medium" key={index + item[0]}>
      <Text weight="bold" size="small">
        {item[0]}
      </Text>
    </Box>
  ));
};

const FooterContent = () => (
  <ResponsiveContext.Consumer>
    {(size) => (
      <Box
        direction="row"
        gap={size !== "xsmall" && size !== "small" ? "xlarge" : "small"}
      >
        {getContent()}
      </Box>
    )}
  </ResponsiveContext.Consumer>
);

export { FooterContent };
