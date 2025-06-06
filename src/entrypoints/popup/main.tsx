import "@/styles/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { MainContainer } from "@/components/main-container";
import AppWrapper from "./app-wrapper";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainContainer>
      <AppWrapper />
    </MainContainer>
  </React.StrictMode>
);
