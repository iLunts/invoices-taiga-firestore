export class Menu {
  name: string;
  url: string;
  icon: string;
  type: MenuType;
  disabled?: boolean;
}

export type MenuType = 'divider' | 'menu';
