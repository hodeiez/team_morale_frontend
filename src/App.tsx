import { Grommet } from "grommet";
import "./App.css";
import { AuthProvider } from "./commons/auth/AuthContext";
import BaseRoutes from "./commons/router";
const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
    colors: {
      focus: "accent-4",
      background: "#f0dcc9",
    },
  },
};

function App() {
  return (
    <AuthProvider>
      <Grommet theme={theme} full>
        <BaseRoutes />
        {/*   <HomePage /> */}
      </Grommet>
    </AuthProvider>
  );
}

export default App;
