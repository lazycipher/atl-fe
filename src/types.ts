export type User = {
  id: string;
  name: string;
};

export type Post = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  content: string;
  reactions?: {
    likes?: number;
    comments?: number;
    shares?: number;
  };
  emoji?: string;
};

