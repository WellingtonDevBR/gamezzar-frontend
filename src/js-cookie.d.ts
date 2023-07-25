declare module "js-cookie" {
  export function get(key: string): string | undefined;
  export function set(key: string, value: string, options?: object): void;
  export function remove(key: string, options?: object): void;
}
