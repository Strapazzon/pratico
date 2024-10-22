"use client";
import React from "react";
import { DashBoardDropdownMenu } from "@components/DashBoardDropdownMenu";
import { ProfileMenu } from "@components/ProfileMenu";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: var(--color-background);
  z-index: 10;
  padding: var(--space-2) 0;
`;

export const DashboardHeader: React.FC = () => {
  return (
    <Wrapper>
      <DashBoardDropdownMenu />
      <ProfileMenu />
    </Wrapper>
  );
};
