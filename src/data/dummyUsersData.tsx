interface User {
  username: string;
  id: number;
  email: string;
  password: string;
}

export const users: User[] = [
  {
    username: "Andrzej",
    id: 1,
    email: "andrzejkukuryk@gmail.com",
    password: "mocnehaslo",
  },
  {
    username: "Natalia",
    id: 2,
    email: "nellyanna88@gmail.com",
    password: "pastabook",
  },
];
