import type { Post } from "../types";

export const samplePosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Theresa Webb",
      avatar: "https://i.pravatar.cc/88?img=5",
    },
    createdAt: "5 mins ago",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    reactions: {
      likes: 12,
      comments: 4,
      shares: 3,
    },
    emoji: "😊",
  },
  {
    id: "2",
    author: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/88?img=12",
    },
    createdAt: "12 mins ago",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    reactions: {
      likes: 20,
      comments: 7,
      shares: 1,
    },
    emoji: "🤔",
  },
  {
    id: "3",
    author: {
      name: "Jane Doe",
      avatar: "https://i.pravatar.cc/88?img=32",
    },
    createdAt: "25 mins ago",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    reactions: {
      likes: 8,
      comments: 2,
      shares: 0,
    },
    emoji: "👍",
  },
];
