import React from "react";
import { useDrag, useDrop } from "react-dnd";

interface DraggableItemProps {
  id: string;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}

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
  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }}>
      {children}
    </div>
  );
};
