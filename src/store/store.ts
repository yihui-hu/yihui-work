import { atom } from "nanostores";

const selectedWorks = atom<string>("all");
const selectedTag = atom<string>("all");
const selectedWorkItem = atom<string>("none");

export { selectedWorks, selectedTag, selectedWorkItem };
