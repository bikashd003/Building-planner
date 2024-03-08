import { TbRectangle } from "react-icons/tb";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { GiArrowCursor } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa6";
import { ACTIONS } from "../Constant/Constant";
import { useContext } from "react";
import { AiOutlineLine } from "react-icons/ai";
import { PlannerContext } from "../Context/PlannerContext";
import { MdDelete } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";


const Toolbar = () => {
  const {stageRef,
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
    setAction,
    strokeColor,
    setStrokeColor,
    selectedShape,
    setSelectedShape,
    transformerRef,
  } = useContext(PlannerContext);
  const handleDelete = () => {
    if (selectedShape) {
      const updatedRectangles = rectangles.filter((rectangle) => {
        return (
          rectangle.x !== selectedShape.attrs.x ||
          rectangle.y !== selectedShape.attrs.y
        );
      });

      const updatedCircles = circles.filter((circle) => {
        return (
          circle.x !== selectedShape.attrs.x ||
          circle.y !== selectedShape.attrs.y
        );
      });

      const updatedLines = lines.filter((line) => {
        return (
          line.x !== selectedShape.attrs.x || line.y !== selectedShape.attrs.y
        );
      });

      const updatedArrows = arrows.filter((arrow) => {
        return (
          arrow.x !== selectedShape.attrs.x || arrow.y !== selectedShape.attrs.y
        );
      });

      const updatedScribbles = scribbles.filter((scribble) => {
        console.log(scribble.x)
        return (
          scribble.x !== selectedShape.attrs.x ||
          scribble.y !== selectedShape.attrs.y
        );
      });

      setRectangles(updatedRectangles);
      setCircles(updatedCircles);
      setLines(updatedLines);
      setArrows(updatedArrows);
      setScribbles(updatedScribbles);

      setSelectedShape(null);
      transformerRef.current.nodes([]);
    }
  };
  function handleExport() {
    const uri = stageRef.current.toDataURL();
    var link = document.createElement("a");
    link.download = "image.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="absolute top-0 z-10 w-full py-2 ">
      <div className="flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto border shadow-lg rounded-lg">
        <button
          className={
            action === ACTIONS.SELECT
              ? "bg-violet-300 p-1 rounded"
              : "p-1 hover:bg-violet-100 rounded"
          }
          onClick={() => setAction(ACTIONS.SELECT)}
        >
          <GiArrowCursor size={"2rem"} />
        </button>
        <button
          className={
            action === ACTIONS.RECTANGLE
              ? "bg-violet-300 p-1 rounded"
              : "p-1 hover:bg-violet-100 rounded"
          }
          onClick={() => setAction(ACTIONS.RECTANGLE)}
        >
          <TbRectangle size={"2rem"} />
        </button>
        <button
          className={
            action === ACTIONS.CIRCLE
              ? "bg-violet-300 p-1 rounded"
              : "p-1 hover:bg-violet-100 rounded"
          }
          onClick={() => setAction(ACTIONS.CIRCLE)}
        >
          <FaRegCircle size={"1.5rem"} />
        </button>
        <button
          className={
            action === ACTIONS.ARROW
              ? "bg-violet-300 p-1 rounded"
              : "p-1 hover:bg-violet-100 rounded"
          }
          onClick={() => setAction(ACTIONS.ARROW)}
        >
          <FaLongArrowAltRight size={"2rem"} />
        </button>
        <button
          className={
            action === ACTIONS.LINE
              ? "bg-violet-300 p-1 rounded"
              : "p-1 hover:bg-violet-100 rounded"
          }
          onClick={() => setAction(ACTIONS.LINE)}
        >
          <AiOutlineLine size={"1.5rem"} />
        </button>
        <button
          className={
            action === ACTIONS.SCRIBBLE
              ? "bg-violet-300 p-1 rounded"
              : "p-1 hover:bg-violet-100 rounded"
          }
          onClick={() => setAction(ACTIONS.SCRIBBLE)}
        >
          <LuPencil size={"1.5rem"} />
        </button>
  

        <button>
          <input
            className="w-6 h-6"
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
        </button>
        <button
          className="p-1 hover:bg-violet-100 rounded"
          onClick={handleDelete}
        >
          <MdDelete size={"1.5rem"} />
        </button>
        
        <button onClick={handleExport}>
              <IoMdDownload size={"1.5rem"} />
            </button>
      </div>
    </div>
  );
};

export default Toolbar;
