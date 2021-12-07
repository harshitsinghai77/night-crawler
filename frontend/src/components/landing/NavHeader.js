import React from "react";
import { Anchor, Box, Text, ResponsiveContext } from "grommet";
import { Logo } from "./Logo";

const NavHeader = () => (
  <ResponsiveContext.Consumer>
    {(size) => (
      <Box
        direction="row"
        justify="between"
        alignSelf="center"
        gap="medium"
        pad={{ top: "large", horizontal: "xlarge" }}
      >
        <Anchor
          href="/"
          icon={<Logo />}
          color="black"
          label={
            size !== "xsmall" &&
            size !== "small" && <Text size="large">Night Crawler</Text>
          }
        />
      </Box>
    )}
  </ResponsiveContext.Consumer>
);

export { NavHeader };
