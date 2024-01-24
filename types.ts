export interface Question {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
}

export interface LeaderBoard {
  id: string;
  profile: string;
  name: string;
  point: number;
}