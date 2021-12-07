import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";

export const customTheme = deepMerge(grommet, {
  global: {
    breakpoints: {
      xsmall: {
        value: 400,
      },
    },
    colors: {
      active: "light-5",
      placeholder: "dark-1",
    },
    elevation: {
      light: {
        small: "0 0 1px 0 rgba(0, 0, 0, 0.40), 0 1px 2px 0 rgba(0,0,0,0.40)",
        medium: "0 0 2px 0 rgba(0,0,0,0.40), 0 2px 4px 0 rgba(0,0,0,0.40)",
        large: "0 0 1px 0 rgba(0,0,0,0.40), 0 4px 8px 0 rgba(0,0,0,0.40)",
        xlarge: "0 0 1px 0 rgba(0,0,0,0.40), 0 8px 16px 0 rgba(0,0,0,0.40)",
      },
    },
    font: {
      size: "16px",
      height: "20px",
    },
    input: {
      weight: 100,
    },
    size: {
      avatar: "36px",
      sidebar: "60px",
    },
  },
  heading: {
    extend: () => `margin-top: 12px; margin-bottom: 12px;`,
  },
  paragraph: {
    extend: () => `font-weight: 300; margin-top: 0;`,
    xxlarge: {
      size: "28px",
    },
    medium: {
      size: "16px",
      height: "20px",
    },
    large: {
      size: "20px",
      height: "24px",
    },
  },
  textInput: {
    placeholder: {
      extend: () => `color: #44444`,
    },
  },
  icon: {
    size: {
      medium: "18px",
    },
  },
  button: {
    color: "white",
  },
});
