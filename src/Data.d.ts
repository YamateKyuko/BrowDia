import { template } from "./Infrastructure/Repository/UseCase/Presentation/Entity/Entity";

declare module './Data.json' {
  const value: template;
  export = value;
}