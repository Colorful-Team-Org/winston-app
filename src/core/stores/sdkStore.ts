import { SdkState } from 'types';
import create from 'zustand/vanilla';

export const sdkStore = create<SdkState>(set => ({
  sdk: undefined,
  setSdk: sdk => set({ sdk }),
}));
