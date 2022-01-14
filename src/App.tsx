import { Grommet } from "grommet";
import * as I from "grommet-icons";
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
  checkBox: {
    hover: {
      border: {
        color: "status-warning",
      },
    },
    color: "status-warning",
    border: {
      color: "accent-4",
    },
    icons: {
      checked: () => <I.Trash color="red" size="20px" />,
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
