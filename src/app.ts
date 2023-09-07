import express, { type Express, type Request, type Response } from "express";

import printHelloWorld from "./nested/nested";

function main(): void {
  printHelloWorld();
}

function createApp(): Express {
  const app = express();

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  return app;
}

export default createApp;
export { main };
