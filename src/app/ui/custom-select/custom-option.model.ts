export interface Icon {
  component: string;
  position: string;
}

export interface CustomOption {
  title: string;
  isLabel: boolean;
  value: any;
  disable?: boolean;
  icon?: Icon;
}

