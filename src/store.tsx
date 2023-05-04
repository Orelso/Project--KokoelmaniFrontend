import { atom } from "jotai";
import type { AnyCard } from "./types";
// import type { YuGiOhCard } from "./types";

export const searchResultsAtom = atom<AnyCard[]>([] as AnyCard[]);
// export const searchResultsYuGiOh = atom<YuGiOhCard[]>([]);
