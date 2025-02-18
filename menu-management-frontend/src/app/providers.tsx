// app/providers.tsx
"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "../styles/globals.css";

export default function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
