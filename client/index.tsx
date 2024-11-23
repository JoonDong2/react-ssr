import React, { Suspense } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "../src/App";
import { SuspenderProvider } from "../src/suspender";

const root = document.getElementById("root")!;

hydrateRoot(
  root,
  <SuspenderProvider>
    <Suspense fallback="loadding..">
      <App
        queryKey={
          globalThis.window
            ? new URLSearchParams(globalThis.window.location.search).get("key")
            : undefined
        }
      />
    </Suspense>
  </SuspenderProvider>
);
