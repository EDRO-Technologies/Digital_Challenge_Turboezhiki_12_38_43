import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles/index.css";
import "./assets/polonium.css";
import App from "./App.tsx";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
