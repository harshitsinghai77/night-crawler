import React from "react";
import { Link } from "react-router-dom";
import { Box, DropButton, Text } from "grommet";
import { Down } from "grommet-icons";

export const AppHeader = ({ appName, appIcon, open }) => (
  <Box
    flex={false}
    tag="header"
    direction="row"
    background="white"
    align="center"
    justify="between"
    responsive={false}
  >
    <DropButton
      open={open}
      onClose={() => {}}
      dropContent={
        <Box pad="small">
          <Link to={"/query1"} style={{ textDecoration: "none" }}>
            <Text size="medium" margin="small">
              Query1
            </Text>
          </Link>
          <Link to={"/query2"} style={{ textDecoration: "none" }}>
            <Text size="medium" margin="small">
              Query2
            </Text>
          </Link>

          <Link to={"/query3"} style={{ textDecoration: "none" }}>
            <Text size="medium" margin="small">
              Query3
            </Text>
          </Link>

          <Link to={"/query4"} style={{ textDecoration: "none" }}>
            <Text size="medium" margin="small">
              Query4
            </Text>
          </Link>

          <Link to={"/query5"} style={{ textDecoration: "none" }}>
            <Text size="medium" margin="small">
              Query5
            </Text>
          </Link>
          {/* <Box direction="row" justify="between">
            <Text size="medium" margin="small">
              Query4
            </Text>
          </Box> */}
        </Box>
      }
    >
      <Box
        pad={{ horizontal: "medium", vertical: "small" }}
        responsive={false}
        direction="row"
        align="center"
        gap="small"
      >
        <Text>{appName}</Text>
        <Down color="brand" size="small" />
      </Box>
    </DropButton>
  </Box>
);
