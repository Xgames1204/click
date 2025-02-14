const express = require("express");
const cors = require("cors");
const { Low, JSONFile } = require("lowdb");

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

const adapter = new JSONFile("db.json");
const db = new Low(adapter);

// Инициализация базы данных
async function initDB() {
    await db.read();
    db.data ||= { score: 0 };
    await db.write();
}
initDB();

// Получить текущий счёт
app.get("/score", async (req, res) => {
    await db.read();
    res.json({ score: db.data.score });
});

// Увеличить счёт
app.post("/increment", async (req, res) => {
    await db.read();
    db.data.score += 1;
    await db.write();
    res.json({ score: db.data.score });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
