import React from "react";
import Emoji from "react-emoji-render";
import { EmojioneV4 } from "react-emoji-render";
import styled from "styled-components";

const StyledEmoji = styled(Emoji)`
  span {
    margin: 0px !important;
  }
`;

export const getEmoji = name => {
  return isAppleProduct() ? (
    <StyledEmoji text={name} />
  ) : (
    <EmojioneV4 size={128} text={name} />
  );
};

export const isAppleProduct = () => {
  return navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i);
};
