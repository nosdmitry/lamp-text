export enum ELetterType {
  WIDE = "wide",
  SHORT = "short",
  REGULAR = "regular",
}

export interface ILetter {
  type: ELetterType;
  name: string;
  position: IActivePosition[];
}

export interface IDictionary {
  [keyof: string]: ILetter;
}

export interface IActivePosition {
  x: number;
  y: number;
}
