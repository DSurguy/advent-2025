type PaperNode = {
  x: number;
  y: number;
  accessed: boolean;
  neighbors: Set<string>;
}