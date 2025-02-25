type UserType = {
  id: string;
  fullName: string;
  email: string;
  imageUrl: string;
};

type SignUpType = {
  fullName: string;
  email: string;
  password: string;
};

type SignInType = {
  email: string;
  password: string;
};

export type { UserType, SignInType, SignUpType };
