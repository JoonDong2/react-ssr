import React, { Suspense } from "react";
import path from "path";
import fs from "fs";
import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import App from "../src/App";
import { Suspender } from "../src/suspender";
import { Writable } from "stream";

const app = express();

const template = fs.readFileSync(path.resolve("./src/index.html"), "utf-8");
const [header, footer] = template.split("{{CONTENTS}}");

app.use(express.static("build/client"));

app.get("/", (req, res) => {
  const key = String(req.query.key);
  const { pipe } = renderToPipeableStream(
    <Suspense fallback="loading...">
      <App queryKey={key} />
    </Suspense>,
    {
      onShellReady() {
        res.write(header);
        const passThough = new Writable({
          write(chunk, encodong, callback) {
            res.write(chunk);
            callback();
          },
          final(callback) {
            // 추가 데이터
            const stringifiedSuspenderCache = JSON.stringify(
              Suspender.values()
            );
            res.write(
              `\n<script>window.__SUSPENDER_CACHE__=${stringifiedSuspenderCache}</script>`
            );
            res.end();
            callback();
          },
        });
        pipe(passThough);

        res.write(footer);
      },
    }
  );
});

app.listen(3000, () => {
  console.log("server start !");
});
