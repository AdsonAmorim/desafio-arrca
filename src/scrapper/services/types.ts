export enum Selector {
  TITLE = "title",
  TYPE = "type",
  REVIEW_SUMMARY_QUANTITY = "reviewSummaryQuantity",
  ASSESTMENTS = "assestments",
}

export interface GetTextsResponse {
  id: string;
  content: HTMLDivElement;
}
