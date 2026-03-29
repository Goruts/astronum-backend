export type Result<T, E> =
  | { isOk: true; isErr: false; value: T }
  | { isOk: false; isErr: true; err: E };

export const Ok = <T, E = never>(value: T): Result<T, E> => {
  return {
    isErr: false,
    isOk: true,
    value,
  };
};

export const Err = <T = never, E = unknown>(err: E): Result<T, E> => {
  return {
    isErr: true,
    isOk: false,
    err,
  };
};
