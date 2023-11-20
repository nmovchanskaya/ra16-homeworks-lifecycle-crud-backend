import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

const notes = [
  {
    "id": 1,
    "content": "First Note"
  },
  {
    "id": 2,
    "content": "Sec Note"
  }
];
let nextId = 3;

app.get("/notes", (req, res) => {
  res.send(JSON.stringify(notes));
});

app.post("/notes", (req, res) => {
  notes.push({ ...req.body, id: nextId++ });
  res.send(JSON.stringify(notes));
});

app.delete("/notes/:id", (req, res) => {
  const noteId = Number(req.params.id);
  const index = notes.findIndex((o) => o.id === noteId);
  if (index !== -1) {
    notes.splice(index, 1);
  }
  res.send(JSON.stringify(notes));
});

const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));
