export type MantraLine = {
  line: string;
  indent: number;
};

export type Mantra = MantraLine[];

export type RenderLineInfo = {
  line: string;
  indent: number;
  startIndex: number;
  endIndex: number;
};

export type MantraPageItem = {
  id: string;
  pageNumber: number;
  title?: string;
  mantra: Mantra;
};
