import create from 'zustand';
import { ContentTypeProps } from 'contentful-management';

interface ConfigState {
  selectedContentTypes: ContentTypeProps[];
  selectedSpaces: string[];
  addContentType: (ct: ContentTypeProps) => void;
  removeContentType: (foundIndex: number) => void;
  toggleSpaceIds: (spaceId: string) => void;
}

const useConfigStore = create<ConfigState>()(set => ({
  selectedContentTypes: [] as ContentTypeProps[],
  selectedSpaces: [],
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
}));

export default useConfigStore;
