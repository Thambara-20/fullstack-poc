// app/layout.tsx
"use client";
import Providers from "./providers";

import { ReactNode } from "react";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer position="top-right" autoClose={3000} />

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
