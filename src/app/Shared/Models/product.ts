export interface Product {
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface ProductWithKey extends Product {
  key: string;
}
