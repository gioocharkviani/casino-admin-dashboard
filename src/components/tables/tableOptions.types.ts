// tableOptions.types.ts

export interface FilterOptions {
  active: boolean;
  filterBy: string[]; // Adjust the type if filterBy can be other types
}

export interface TrClickAction {
  active: boolean;
  link: string;
  component: any; // Adjust type based on expected component type
}

export interface Settings {
  title: string;
  active: boolean;
}

export interface CreateAction {
  active: boolean;
  link: string;
}

export interface Actions {
  active: boolean;
  edit: string;
  remove: boolean;
}

export interface TableOptions {
  search: boolean;
  select: boolean;
  filter: FilterOptions;
  saveData: boolean;
  pagination: boolean;
  sort: boolean;
  trclickaction: TrClickAction;
  settings: Settings;
  create: CreateAction;
  actions: Actions;
}
