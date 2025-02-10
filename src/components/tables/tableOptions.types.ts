export interface FilterOptions {
  active: boolean;
  filterBy: string[];
}

export interface Settings {
  title: string;
  active: boolean;
}

export interface CreateAction {
  active: boolean;
  link: string;
}

export interface ActionsTypes {
  name?: string;
  type?: "LINK" | "MODAL";
  icon?: any | null;
  link?: any;
  component?: any;
  key: string;
}

export interface Actions {
  active: boolean;
  actions?: ActionsTypes[];
  edit?: string;
  remove?: boolean;
}

export interface Image {
  active: boolean;
  inObjectKey?: string;
  imageDataKey: string;
}

export interface TableOptions {
  image?: Image;
  search: boolean;
  select: boolean;
  filter: FilterOptions;
  saveData: boolean;
  pagination: boolean;
  sort: boolean;
  settings: Settings;
  create: CreateAction;
  uniqueKey?: string;
  actions: Actions;
}
