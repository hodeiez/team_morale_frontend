import { Grommet } from "grommet";
import "./App.css";
import { HomePage } from "./pages/home/HomePage";
const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
    colors: {
      focus: "accent-4",
    },
  },
};

function App() {
  return (
    <Grommet theme={theme} full>
      <HomePage />
    </Grommet>
  );
}

export default App;
