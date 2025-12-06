export interface Client {
  name: string;
  clientType: string;
}

export interface Product {
  name: string;
  value: number;
  status: "Ativo" | "Inativo";
}

export interface CapturedPhrase {
  phrase: string;
  serviceDate: string;
}

export interface AppAction {
  action: string;
  pageTime?: string;
  accessed: string;
}

export interface Score {
  level: string;
  value: number;
}

export interface SmartClassification {
  segment: string;
  lifeTimeValue: number;
  churnProbability: number;
  expansionScore: Score;
  retetionScore: Score;
}

export interface Suggestion {
  offer: string;
  value: number;
  conversionProbability: number;
  reasonsWhy: string[];
}

export interface SuggestionsIA {
  NBO: Suggestion;
  NBA: Suggestion;
  NBX: Suggestion;
}

export interface View360Response {
  client: Client;
  produtos: Product[];
  profile: string[];
  capturedPhrases: CapturedPhrase[];
  appActions: AppAction[];
  smartClassification: SmartClassification;
  sugestionsIA: SuggestionsIA;
}

export type View360Data = View360Response;
