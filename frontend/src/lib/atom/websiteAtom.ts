import { IWebsite } from "@/types/types";
import { atom } from "recoil";

export const websitesAtom = atom<IWebsite[]>({
  key: "websitesAtom",
  default: [],
});
