"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
// const bodyParser = require("body-parser");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
var TwoMonths;
(function (TwoMonths) {
    TwoMonths["FIRST"] = "PRIMEIRO";
    TwoMonths["SECOND"] = "SEGUNDO";
    TwoMonths["THIRD"] = "TERCEIRO";
    TwoMonths["FOURTH"] = "QUARTO";
})(TwoMonths || (TwoMonths = {}));
var Discipline;
(function (Discipline) {
    Discipline["BIOLOGY"] = "Biologia";
    Discipline["ART"] = "Artes";
    Discipline["GEOGRAPHY"] = "Geografia";
    Discipline["SOCIOLOGY"] = "Sociologia";
})(Discipline || (Discipline = {}));
const results = [];
app.get("/results", (req, res) => {
    res.json(results);
});
app.post("/results", (req, res) => {
    var _a, _b, _c;
    const newResults = {
        id: Math.random().toString(36).substring(7),
        twoMonths: (_a = req.body) === null || _a === void 0 ? void 0 : _a.twoMonths,
        discipline: (_b = req.body) === null || _b === void 0 ? void 0 : _b.discipline,
        note: (_c = req.body) === null || _c === void 0 ? void 0 : _c.note,
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
    }
    else {
        if (newResults.note >= 0 && newResults.note <= 10) {
            results.push(newResults);
            res.status(201).json(newResults);
        }
        else {
            res
                .status(400)
                .json({ error: "A nota deve estar no intervalo de 0 a 10." });
        }
    }
});
app.delete("/results:id", (req, res) => {
    const index = results.findIndex((result) => result.id === req.params.id);
    if (index !== -1) {
        results.splice(index, 1);
        res.sendStatus(204);
    }
    else {
        res.status(400).json({ error: "Resultado não encontrado." });
    }
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
