import { SelectedContentType } from 'types';
import create from 'zustand';

export interface ConfigState {
  selectedContentTypes: SelectedContentType[];
  selectedSpaces: string[];
  spaceOrder: string[];
  algoliaApiKey: string;
  algoliaId: string;
  algoliaIndexName: string;
  setContentTypes: (ct: SelectedContentType[]) => void;
  setSelectedSpaces: (spaces: string[]) => void;
  addContentType: (ct: SelectedContentType) => void;
  removeContentType: (foundIndex: number) => void;
  toggleSpaceIds: (spaceId: string) => void;
  setSpaceOrder: (spaceIds: string[]) => void;
}

const useConfigStore = create<ConfigState>()(set => ({
  selectedContentTypes: [] as SelectedContentType[],
  selectedSpaces: [],
  spaceOrder: [],
  algoliaApiKey: '',
  algoliaId: '',
  algoliaIndexName: '',
  addContentType: (ct: SelectedContentType) =>
    set(state => ({
      selectedContentTypes: [...state.selectedContentTypes, ...[ct]],
    })),
  removeContentType: (foundIndex: number) =>
    set(state => ({
      selectedContentTypes: state.selectedContentTypes.filter(
        (current, index) => index !== foundIndex
      ),
    })),
  toggleSpaceIds: (spaceId: string) =>
    set(state => {
      const spaceIndex = state.selectedSpaces.indexOf(spaceId);
      let updatedSpaces;

      if (spaceIndex > -1) {
        updatedSpaces = state.selectedSpaces.filter((item, index) => index !== spaceIndex);
      } else {
        updatedSpaces = [...state.selectedSpaces, ...[spaceId]];
      }
      return {
        selectedSpaces: updatedSpaces,
      };
    }),
  setContentTypes: (cts: SelectedContentType[]) => set(state => ({ selectedContentTypes: cts })),
  setSelectedSpaces: (spaceIds: string[]) => set(state => ({ selectedSpaces: spaceIds })),
  setSpaceOrder: (spaceIds: string[]) => set(state => ({ spaceOrder: spaceIds })),
}));

export default useConfigStore;
