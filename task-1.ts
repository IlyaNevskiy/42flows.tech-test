type User = {
  id: string;
  name: string;
  posts: Post[];
};

type Post = {
  id: string;
  text: string;
  user: User;
};

type Select<T> = {
  [P in keyof T]?: T[P] extends object
    ? Select<T[P] extends any[] ? T[P][0] : T[P]>
    : boolean;
};

const userSelect: Select<User> = {
  id: true,
  name: true,
  posts: {
    text: true,
  },
};

const postSelect: Select<Post> = {
  id: true,
  text: true,
  user: {
    id: true,
    name: true,
  },
};
