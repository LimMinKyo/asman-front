export const Unit = {
  KRW: 'KRW',
  USD: 'USD',
} as const;
export type Unit = (typeof Unit)[keyof typeof Unit];
