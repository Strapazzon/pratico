import React from "react";
import Texture from "./texture-background.svg";
import "./textureBackground.scss";

export const TextureBackground: React.FC = () => {
  return (
    <div className="texture-background">
      <Texture />
    </div>
  );
};
