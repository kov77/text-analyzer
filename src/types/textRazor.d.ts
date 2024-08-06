export interface Entity {
  id: number;
  matchingTokens: number[];
  entityId: string;
  freebaseTypes: string[];
  confidenceScore: number;
  wikiLink: string;
  matchedText: string;
  freebaseId: string;
  relevanceScore: number;
  entityEnglishId: string;
  startingPos: number;
  endingPos: number;
  wikidataId: string;
  type?: string[];
  crunchbaseId?: string;
  permid?: string;
}

export interface TextRazorResponse {
  language: string;
  languageIsReliable: boolean;
  entities: Entity[];
}

export interface TextRazorApiResponse {
  response: TextRazorResponse;
  time: number;
  ok: boolean;
}
