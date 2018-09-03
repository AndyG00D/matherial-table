export interface Icon {
  src: string;
  position: string;
}

export interface CustomOption {
  title: string;
  isLabel?: boolean;
  value: any;
  disabled?: boolean;
  icon?: Icon;
}

