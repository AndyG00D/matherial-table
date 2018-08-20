
export interface Name {
  first: string;
  last: string;
}

export interface Product {
  id: number;
  guid: string;
  isActive: boolean,
  balance?: string;
  picture?: string;
  age?: number;
  eyeColor?: string;
  name: Name;
  company?: string;
  email: string;
  phone?: string;
  address?: string;
  about?: string;
  registered: string;
  latitude: string;
  longitude: string;
  tags?: string[];
}

export interface ProductsWithCount {
  data: Product[];
  count: number;
}

export interface FilterParams {
  first?: string;
  isActive?: string;
}
