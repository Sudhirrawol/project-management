// npm i -D @vitejs/plugin-react add react specific support to vite

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
