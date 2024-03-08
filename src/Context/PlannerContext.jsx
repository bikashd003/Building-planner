import React, { useRef, useState, createContext } from "react";
import { ACTIONS } from "../Constant/Constant";

const PlannerContext = createContext();

const PlannerProvider = ({ children }) => {
  const [action, setAction] = useState(ACTIONS.SELECT);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [selectedShape, setSelectedShape] = useState(null);
  const stageRef = useRef();
  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [lines, setLines] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [scribbles, setScribbles] = useState([]);


  const transformerRef = useRef();

  return (
    <PlannerContext.Provider
      value={{
        action,
        setAction,
        strokeColor,
        setStrokeColor,
        selectedShape,
        setSelectedShape,
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
        transformerRef
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
};

export { PlannerContext, PlannerProvider };
