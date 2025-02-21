import { ReactElement } from "react";

export interface Settings {
  title: string;
  active: boolean;
}

export interface CreateAction {
  active: boolean;
  link: string;
  type?: "MODAL" | "LINK";
  component?: any;
  title?: string;
  key?: string;
}

export interface ActionsTypes {
  name?: string;
  type?: "LINK" | "MODAL" | "";
  icon?: any | null;
  link?: any;
  component?: any;
  key: string;
}

export interface Actions {
  active: boolean;
  actions?: ActionsTypes[];
}

export interface Image {
  active: boolean;
  inObjectKey?: string;
  imageDataKey: string;
}

interface uniqueKey {
  key: string;
  value: string;
}

interface colorDependency {
  id: string | number;
  name: any;
  color: any;
}
interface colColor {
  col_key: string;
  active: boolean;
  actionComponent?: any | null;
  col_dependency: colorDependency[];
}

interface extraOptions {
  colColor?: colColor;
}

export interface TableOptions {
  image?: Image;
  rowUniqueKey?: uniqueKey;
  search: boolean;
  select: boolean;
  saveData: boolean;
  pagination: boolean;
  sort: boolean;
  settings: Settings;
  create: CreateAction;
  uniqueKey?: string;
  actions: Actions;
  extraOptions?: extraOptions;
}
