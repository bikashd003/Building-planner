import React, { useRef, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Arrow,
  Circle,
  Layer,
  Line,
  Rect,
  Stage,
  Transformer,
} from "react-konva";
import { ACTIONS } from "../Constant/Constant";
import { PlannerContext } from "../Context/PlannerContext";
const DrawingArea = () => {
  const {
    stageRef,
    rectangles,
    setRectangles,
    circles,
    setCircles,
    lines,
    setLines,
    arrows,
    setArrows,
    scribbles,
    setScribbles,
    action,
    strokeColor,
    selectedShape,
    setSelectedShape,
    transformerRef
  } = useContext(PlannerContext);

  const isPaining = useRef();
  const currentShapeId = useRef();

  const isDraggable = action === ACTIONS.SELECT;

  function onPointerDown() {
    if (action === ACTIONS.SELECT) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = uuidv4();

    currentShapeId.current = id;
    isPaining.current = true;

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((rectangles) => [
          ...rectangles,
          {
            id,
            x,
            y,
            height: 20,
            width: 20,
          },
        ]);
        break;
      case ACTIONS.CIRCLE:
        setCircles((circles) => [
          ...circles,
          {
            id,
            x,
            y,
            radius: 20,
          },
        ]);
        break;
      case ACTIONS.ARROW:
        setArrows((arrows) => [
          ...arrows,
          {
            id,
            points: [x, y, x + 20, y + 20],
          },
        ]);
      case ACTIONS.LINE:
        setLines((lines) => [
          ...lines,
          {
            id,
            points: [x, y],
          },
        ]);
        break;
      case ACTIONS.SCRIBBLE:
        setScribbles((scribbles) => [
          ...scribbles,
          {
            id,
            points: [x, y],
          },
        ]);
        break;
    }
  }
  function onPointerMove() {
    if (action === ACTIONS.SELECT || !isPaining.current) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((rectangles) =>
          rectangles.map((rectangle) => {
            if (rectangle.id === currentShapeId.current) {
              return {
                ...rectangle,
                width: x - rectangle.x,
                height: y - rectangle.y,
              };
            }
            return rectangle;
          })
        );
        break;
      case ACTIONS.CIRCLE:
        setCircles((circles) =>
          circles.map((circle) => {
            if (circle.id === currentShapeId.current) {
              return {
                ...circle,
                radius: ((y - circle.y) ** 2 + (x - circle.x) ** 2) ** 0.5,
              };
            }
            return circle;
          })
        );
        break;
      case ACTIONS.ARROW:
        setArrows((arrows) =>
          arrows.map((arrow) => {
            if (arrow.id === currentShapeId.current) {
              return {
                ...arrow,
                points: [arrow.points[0], arrow.points[1], x, y],
              };
            }
            return arrow;
          })
        );
        break;
      case ACTIONS.LINE:
        setLines((lines) =>
          lines.map((line) => {
            if (line.id === currentShapeId.current) {
              return {
                ...line,
                points: [line.points[0], line.points[1], x, y],
              };
            }
            return line;
          })
        );
        break;
      case ACTIONS.SCRIBBLE:
        setScribbles((scribbles) =>
          scribbles.map((scribble) => {
            if (scribble.id === currentShapeId.current) {
              return {
                ...scribble,
                points: [...scribble.points, x, y],
              };
            }
            return scribble;
          })
        );
        
    }
  }

  function onPointerUp() {
    isPaining.current = false;
  }
  function onClick(e) {
    if (action !== ACTIONS.SELECT) return;
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
    setSelectedShape(target);
    console.log(target.attrs.points);
  }

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <Layer>
        <Rect
          x={0}
          y={0}
          height={window.innerHeight}
          width={window.innerWidth}
          fill="#ffffff"
          id="bg"
          onClick={() => {
            transformerRef.current.nodes([]);
          }}
        />

        {rectangles.map((rectangle) => (
          <Rect
            key={rectangle.id}
            x={rectangle.x}
            y={rectangle.y}
            stroke={strokeColor}
            strokeWidth={2}
            height={rectangle.height}
            width={rectangle.width}
            draggable={isDraggable}
            onClick={onClick}
          />
        ))}

        {circles.map((circle) => (
          <Circle
            key={circle.id}
            radius={circle.radius}
            x={circle.x}
            y={circle.y}
            stroke={strokeColor}
            strokeWidth={2}
            draggable={isDraggable}
            onClick={onClick}
          />
        ))}
        {arrows.map((arrow) => (
          <Arrow
            key={arrow.id}
            points={arrow.points}
            stroke={strokeColor}
            strokeWidth={2}
            draggable={isDraggable}
            onClick={onClick}
          />
        ))}

        {lines.map((lines) => (
          <Line
            key={lines.id}
            lineCap="round"
            lineJoin="round"
            points={lines.points}
            stroke={strokeColor}
            strokeWidth={2}
            draggable={isDraggable}
            onClick={onClick}
          />
        ))}
        
        {scribbles.map((scribble) => (
          <Line
            key={scribble.id}
            lineCap="round"
            lineJoin="round"
            points={scribble.points}
            stroke={strokeColor}
            strokeWidth={2}
            draggable={isDraggable}
            onClick={onClick}
          />
        ))}

        <Transformer ref={transformerRef} />
      </Layer>
    </Stage>
  );
};

export default DrawingArea;
