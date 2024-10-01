export type Nullable<T> = T | null | undefined;

declare global {
    type Nullable<T> = T | null | undefined;
}