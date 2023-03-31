import { atom } from "jotai";
import type { AnyCard, MTGCard } from "./types";
// import type { YuGiOhCard } from "./types";

export const searchResultsAtom = atom<AnyCard[]>([]);
// export const searchResultsYuGiOh = atom<YuGiOhCard[]>([]);
