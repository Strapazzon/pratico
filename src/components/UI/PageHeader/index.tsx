import { Flex, Heading } from "@radix-ui/themes";
import React from "react";
import styled from "styled-components";

const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-background);
  z-index: 20;
  gap: var(--space-2);
  padding: var(--space-2) 0;
`;

type PageHeaderProps = {
  children?: React.ReactNode;
  title?: string;
  icon?: React.ReactElement;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  children,
  title,
  icon,
}) => {
  return (
    <Header>
      <Flex gap="2">
        {icon}
        <Heading size="6">{title}</Heading>
      </Flex>
      {children}
    </Header>
  );
};
