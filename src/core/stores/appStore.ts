import { AppStoreState } from 'types';
import create from 'zustand/vanilla';

export const cmaStore = create<AppStoreState>(set => ({
  sdk: undefined,
  cma: undefined,
  setCma: cma => set({ cma }),
}));

export const { getState, setState, subscribe, destroy } = cmaStore;
