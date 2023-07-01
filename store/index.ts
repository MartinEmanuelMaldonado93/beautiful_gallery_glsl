import { create } from "zustand";

type props = {
  name_photo: string;
  index: number;
  profession?: string;
  isClicked?: boolean;
};
type NameStore = props & {
  setNamePhoto: ({ name_photo, index, profession }: props) => void;
};
export const useNameStore = create<NameStore>()((set) => ({
  name_photo: "",
  index: 0,
  profession: undefined,
  isClicked: false,
  setNamePhoto: ({ name_photo, index, profession, isClicked }: props) =>
    set(() => ({ name_photo, index, profession, isClicked })),
}));

type activeStore = {
  activeFullPhoto: boolean;
  setActiveFullPhoto: (activeFullPhoto: boolean) => void;
};
export const useActiveStore = create<activeStore>()((set) => ({
  activeFullPhoto: false,
  setActiveFullPhoto: (activeFullPhoto : boolean) =>
    set(() => ({ activeFullPhoto })),
}));
