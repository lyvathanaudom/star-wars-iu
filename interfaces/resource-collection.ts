interface ResourceCollection<T> {
  list: T[];
  next: string | null;
  previous: string | null;
}

export type { ResourceCollection };
