import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProjectApp from "./App";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import QueryProvider from "./Providers/QueryProvider.js";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryProvider>
        <Provider store={store}>
          <ProjectApp accessToken={null} />
        </Provider>
      </QueryProvider>
    </ErrorBoundary>
  </StrictMode>,
);
