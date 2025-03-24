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

export interface createGamesByCategories {
  category_type: string | number;
  game_id: string | number;
}
export interface updateGameType {
  game_id: string | number;
  new_category_type: string | number;
}

export interface transactionsTypes {
  id: string | number;
  amount: string | number;
  user_id: string | number;
  currency: string;
  card_date: string;
  update_at: string;
  created_at: string;
  type: string;
  status: string;
}

export interface UpdateSwiper {
  link: string;
  img: string;
  published: boolean;
}
