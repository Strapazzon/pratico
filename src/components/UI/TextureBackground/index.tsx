import React from "react";
import Texture from "./texture-background.svg";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
  overflow: hidden;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const TextureBackground: React.FC = () => {
  return (
    <Wrapper>
      <Texture />
    </Wrapper>
  );
};
