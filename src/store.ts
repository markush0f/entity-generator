import { atom } from "nanostores";
import type IEntity from "./types/Entity.type";

export const entitySelected = atom<IEntity | null>(null);
