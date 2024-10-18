import React from "react";
import { ImageResponse } from "next/og";

import { Montserrat } from "next/font/google";

export const size = { width: 1200, height: 600 };
export const contentType = "image/png";
export const runtime = "edge";

const font = Montserrat({ subsets: ["latin"] });

type ImageElementProps = {
  title: string;
};

const ImageElement: React.FC<ImageElementProps> = ({ title }) => (
  <div
    className={font.className}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      backgroundColor: "#b88db5",
      width: "100%",
      height: "100%",
      color: "#fff",
      fontSize: "2rem",
      fontWeight: "bold",
    }}
  >
    <h1>{title}</h1>
  </div>
);
type ImageProps = {
  params: {
    lang: string;
  };
};

const Image = async ({}: ImageProps) => {
  return new ImageResponse(<ImageElement title={`Prático`} />, {
    emoji: "twemoji",
  });
};

export default Image;
