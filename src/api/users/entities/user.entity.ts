export const Provider = {
  LOCAL: 'LOCAL',
  KAKAO: 'KAKAO',
} as const;

export type Provider = (typeof Provider)[keyof typeof Provider];

export interface UserEntity {
  email: string;
  name: string;
  provider: Provider;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
