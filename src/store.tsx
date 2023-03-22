import { atom } from "jotai";
import type { MTGCard } from "./types";
// import type { YuGiOhCard } from "./types";

export const searchResultsAtom = atom<MTGCard[]>([]);
// export const searchResultsYuGiOh = atom<YuGiOhCard[]>([]);
