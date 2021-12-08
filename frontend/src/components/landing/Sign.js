import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Text } from "grommet";

class Sign extends Component {
  render() {
    return (
      <Box direction="row" width="large" justify="center">
        <Button onClick={() => {}}>
          <Box
            round="xlarge"
            background="accent-1"
            pad={{ vertical: "small", horizontal: "medium" }}
          >
            <Link to={"/query1"}>
              <Text size="small" color="brand" weight="bold" textAlign="center">
                Get Started
              </Text>
            </Link>
          </Box>
        </Button>
      </Box>
    );
  }
}

export { Sign };
