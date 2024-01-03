enum TwoMonths {
  FIRST = "PRIMEIRO",
  SECOND = "SEGUNDO",
  THIRD = "TERCEIRO",
  FOURTH = "QUARTO",
}

enum Discipline {
  BIOLOGY = "Biologia",
  ART = "Artes",
  GEOGRAPHY = "Geografia",
  SOCIOLOGY = "Sociologia",
}

interface Results {
  id: string;
  twoMonths: TwoMonths;
  discipline: Discipline;
  note: number;
  createIn: Date;
  reloadIn: Date;
}

const results: Results[] = [];

export { Results, results };
