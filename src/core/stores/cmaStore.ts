import { CmaClientState } from 'types';
import create from 'zustand/vanilla';

export const cmaStore = create<CmaClientState>(set => ({
  cma: undefined,
  setCma: cma => set({ cma }),
}));

export const { getState, setState, subscribe, destroy } = cmaStore;
