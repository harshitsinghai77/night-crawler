import React from "react";
import { Anchor, Box, ResponsiveContext, Text } from "grommet";
import { data } from "./data";
import styled from "styled-components";

const StyledAnchor = styled(Anchor)`
  font-weight: 200;
`;

const getContent = () => {
  return data.map((item, index) => (
    <Box gap="medium" key={index + item[0]}>
      <Text weight="bold" size="small">
        {item[0]}
      </Text>
      <StyledAnchor href="/" size="small" color="black">
        {item[1]}
      </StyledAnchor>
      <StyledAnchor href="/" size="small" color="black">
        {item[2]}
      </StyledAnchor>
      <StyledAnchor href="/" size="small" color="black">
        {item[3]}
      </StyledAnchor>
    </Box>
  ));
};

const FooterContent = () => (
  <ResponsiveContext.Consumer>
    {size => (
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
