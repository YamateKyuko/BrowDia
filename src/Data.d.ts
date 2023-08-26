import { template } from "./Entity/Entity";

declare module './Data.json' {
  const value: template;
  export = value;
}