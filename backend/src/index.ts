import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import { Results, results } from "./interfaces/Results";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/results", (req: Request, res: Response) => {
  res.json(results);
});

app.post("/results", (req: Request, res: Response) => {
  const newResults: Results = {
    id: Math.random().toString(36).substring(7),
    twoMonths: req.body?.twoMonths,
    discipline: req.body?.discipline,
    note: req.body?.note,
    createIn: new Date(),
    reloadIn: new Date(),
  };

  const resultExist = results.find((result) => {
    result.twoMonths === newResults.twoMonths &&
      result.discipline === newResults.discipline;
  });

  if (resultExist) {
    res.status(400).json({
      error: "Já existe um resultado para esta disciplina no bimestre.",
    });
  } else {
    if (newResults.note >= 0 || newResults.note <= 10) {
      results.push(newResults);
      res.status(201).json(newResults);
    } else {
      res
        .status(400)
        .json({ error: "A nota deve estar no intervalo de 0 a 10." });
    }
  }
});

app.delete("/results:id", (req: Request, res: Response) => {
  const index = results.findIndex((result) => result.id === req.params.id);

  if (index !== -1) {
    results.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(400).json({ error: "Resultado não encontrado." });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
