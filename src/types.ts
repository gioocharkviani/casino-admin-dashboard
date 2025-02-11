export interface GameForCategoryGame {
  basicRTP: string;
  bonus_buy: number;
  category: string;
  demo: number;
  device: string;
  id: number;
  img: string;
  img_provider: string;
  img_vertical: string;
  is_favorite: boolean;
  name: string;
  providerId: number;
  type: string;
  type_id: number;
}

export interface DashboardGames {
  category_id: number;
  position: number;
  game: GameForCategoryGame;
}
