import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { appName } from "./util/utils.ts";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

document.title = appName;
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Provide the client to your App */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
