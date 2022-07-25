export type BaseState<T> = {
  value: T[];
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  error?: unknown;
}