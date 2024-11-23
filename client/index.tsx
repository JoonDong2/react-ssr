import React, { Suspense } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "../src/App";
import AppWrapper from "../src/AppWrapper";

const root = document.getElementById("root")!;

hydrateRoot(
  root,
  <AppWrapper>
    <Suspense fallback="loadding..">
      <App
        queryKey={
          globalThis.window
            ? new URLSearchParams(globalThis.window.location.search).get("key")
            : undefined
        }
      />
    </Suspense>
  </AppWrapper>
);
