export interface ResponseList<T> {
  data: T[];
  metadata: {
    total: number;
  };
}

export interface ResponseItem<T> {
  data: Partial<T>;
}
