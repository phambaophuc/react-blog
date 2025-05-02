type SignUpType = {
  displayName: string;
  email: string;
  password: string;
};

type SignInType = {
  email: string;
  password: string;
};

export type { SignInType, SignUpType };
