export type CardItem = {
  title: string;
  copy: string;
};

export type ProductItem = CardItem & {
  tags: string[];
};

export type StatItem = {
  value: string;
  label: string;
};
