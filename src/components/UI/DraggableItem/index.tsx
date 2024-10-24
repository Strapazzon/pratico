import React from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";

interface DraggableItemProps {
  id: string;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}

const Wrapper = styled.div`
  padding: "var(--space-2) var(--space-3)";
  &.dragging {
    opacity: 0.5;
  }
`;

export const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  children,
  index,
  moveItem,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "ITEM",
    hover(item: { id: number; index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = React.useRef<HTMLDivElement>(null);
  drag(drop(ref));

  return (
    <Wrapper ref={ref} className={isDragging ? "dragging" : ""}>
      {children}
    </Wrapper>
  );
};
