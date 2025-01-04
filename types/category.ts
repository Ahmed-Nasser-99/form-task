export type Category = {
  id: number;
  name: string;
  description: string | null;
  image: string;
  slug: string;
  children: Category[] | null; 
  circle_icon: string;
  disable_shipping: number;
};

