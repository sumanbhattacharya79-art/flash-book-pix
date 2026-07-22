import { createRoot } from "react-dom/client";
import { intentLM } from "intentlm-sdk";
import { intentLMConfig } from "../.intentlm.config";
import App from "./App.tsx";
import "./index.css";

intentLM.init(intentLMConfig);

createRoot(document.getElementById("root")!).render(<App />);
