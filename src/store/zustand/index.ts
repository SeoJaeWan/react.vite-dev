import { create } from 'zustand';

interface ZustandState {
  isZustand: boolean;
  updateZustand: (isZustand: boolean) => void;
}

const useZustand = create<ZustandState>((set) => ({
  isZustand: false,

  updateZustand: (isZustand) => set({ isZustand }),
}));

export default useZustand;
