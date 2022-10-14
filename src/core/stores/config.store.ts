import create from 'zustand';
import { ContentTypeProps } from 'contentful-management';

export interface ConfigState {
  selectedContentTypes: ContentTypeProps[];
  selectedSpaces: string[];
  spaceOrder: string[];
  algoliaApiKey: string;
  algoliaId: string;
  algoliaIndexName: string;
  setContentTypes: (ct: ContentTypeProps[]) => void;
  setSelectedSpaces: (spaces: string[]) => void;
  addContentType: (ct: ContentTypeProps) => void;
  removeContentType: (foundIndex: number) => void;
  toggleSpaceIds: (spaceId: string) => void;
  setSpaceOrder: (spaceIds: string[]) => void;
}

const useConfigStore = create<ConfigState>()(set => ({
  selectedContentTypes: [] as ContentTypeProps[],
  selectedSpaces: [],
  spaceOrder: [],
  algoliaApiKey: '',
  algoliaId: '',
  algoliaIndexName: '',
  addContentType: (ct: ContentTypeProps) =>
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
  setContentTypes: (cts: ContentTypeProps[]) => set(state => ({ selectedContentTypes: cts })),
  setSelectedSpaces: (spaceIds: string[]) => set(state => ({ selectedSpaces: spaceIds })),
  setSpaceOrder: (spaceIds: string[]) => set(state => ({ spaceOrder: spaceIds })),
}));

export default useConfigStore;
