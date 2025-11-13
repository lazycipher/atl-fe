import { useState } from "react";
import { toast } from "react-toastify";
import { PageLayout } from "../components/Layout/PageLayout";
import { PostEditor } from "../components/PostEditor/PostEditor";
import { PostCard } from "../components/PostCard/PostCard";
import { samplePosts } from "../data/samplePosts";
import type { Post, User } from "../types";
import { generateId } from "../utils/generateId";
import { emojis } from "../data/dummyEmoji";

type FeedPageProps = {
  currentUser: User | null;
  onRequireAuth: (mode: "sign-in" | "sign-up") => void;
  onLogout: () => void;
};

export const FeedPage = ({
  currentUser,
  onRequireAuth,
  onLogout,
}: FeedPageProps) => {
  const [posts, setPosts] = useState<Post[]>(samplePosts);

  const handleLogout = () => {
    onLogout();
    toast.info("Logged out successfully");
  };

  const handlePublish = (content: string) => {
    if (!currentUser) {
      onRequireAuth("sign-in");
      return;
    }

    const newPost: Post = {
      id: generateId(),
      author: {
        name: currentUser.name,
        avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
          currentUser.name
        )}`,
      },
      createdAt: "Just now",
      content,
      reactions: {
        likes: 0,
        comments: 0,
        shares: 0,
      },
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    };

    setPosts((prev) => [newPost, ...prev]);
    toast.success("Post published successfully!");
  };

  const handleRequireAuth = (mode?: "sign-in" | "sign-up") => {
    onRequireAuth(mode ?? "sign-in");
  };

  return (
    <PageLayout
      currentUser={currentUser}
      showAuthLink={!currentUser}
      loginHref="/sign-in"
      onLogout={handleLogout}
    >
      <div className="flex flex-col pb-4">
        <PostEditor
          disabled={!currentUser}
          onRequireAuth={() => handleRequireAuth("sign-in")}
          onSubmit={handlePublish}
        />

        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onInteract={() => {
                if (!currentUser) {
                  handleRequireAuth();
                } else {
                  toast.info("Feature not implemented");
                }
              }}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
