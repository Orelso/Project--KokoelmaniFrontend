import { atom } from "jotai";
import type { MTGCard } from "./types";

export const searchResultsAtom = atom<MTGCard[]>([]);
