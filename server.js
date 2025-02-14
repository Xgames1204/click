import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const adapter = new JSONFile("db.json");
const db = new Low(adapter);

await db.read();
db.data ||= { score: 0 };
await db.write();

app.get("/score", async (req, res) => {
  await db.read();
  res.json({ score: db.data.score });
});

app.post("/increment", async (req, res) => {
  await db.read();
  db.data.score += 1;
  await db.write();
  res.json({ score: db.data.score });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
