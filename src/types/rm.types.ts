// Character types: Defines the shape of the Rick and Morty character data
export interface RMCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export interface RMApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface RMApiResponse {
  info: RMApiInfo;
  results: RMCharacter[];
}

export interface UseRMListState {
  characters: RMCharacter[];
  info: RMApiInfo | null;
  loading: boolean;
  error: string | null;
  page: number;
  setPage: (page: number) => void;
  reload: () => void;
}

export interface CharacterCardProps {
  character: RMCharacter | null;
  isLoading?: boolean;
  onClick?: () => void;
}

export type SortOrder = "asc" | "desc" | "none";

export interface OrderControlProps {
  sortOrder: SortOrder;
  onChange: (nextOrder: SortOrder) => void;
}