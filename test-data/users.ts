export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
} as const;

export const invalidLoginCases = [
  {
    name: 'missing username',
    username: '',
    password: users.standard.password,
    expectedError: 'Username is required',
  },
  {
    name: 'missing password',
    username: users.standard.username,
    password: '',
    expectedError: 'Password is required',
  },
  {
    name: 'invalid credentials',
    username: 'not_a_user',
    password: 'not_a_password',
    expectedError: 'Username and password do not match any user in this service',
  },
] as const;
