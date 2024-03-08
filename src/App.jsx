import DrawingArea from "./Components/DrawingArea";
import Toolbar from "./Components/Toolbar";
import { PlannerProvider } from "./Context/PlannerContext"; 

const App = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <PlannerProvider>
        <Toolbar />
        <DrawingArea />
      </PlannerProvider>
    </div>
  );
};

export default App;

