import createApp from "./app";

async function main(): Promise<void> {
  const app = createApp();
  const port = 3000;

  app.listen(port, () => {
    console.log(`🚀 Server listening at http://localhost:${port}`);
  });
}

void main();
