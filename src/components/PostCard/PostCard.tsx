import { LuSend } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa";
import { TbHeart } from "react-icons/tb";
import type { Post } from "../../types";
import { Button } from "../Button/Button";

type PostCardProps = {
  post: Post;
  onInteract: () => void;
};

const reactionsToLabel = () => [
  { icon: <TbHeart />, label: "Like post" },
  { icon: <FaRegCommentDots />, label: "Comment on post" },
  { icon: <LuSend />, label: "Share post" },
];

export const PostCard = ({ post, onInteract }: PostCardProps) => {
  return (
    <div className="bg-gray-100 rounded-3xl p-2">
      <div className="bg-white rounded-3xl p-6 flex flex-col gap-4 border border-gray-300">
        <div className="flex gap-3.5">
          <img
            className="w-12 h-12 rounded-[18px] object-cover bg-slate-200"
            src={post.author.avatar}
            alt={`${post.author.name}'s avatar`}
          />
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-slate-900">
              {post.author.name}
            </span>
            <span className="text-[0.85rem] text-slate-400">
              {post.createdAt}
            </span>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-[30px] leading-none">
            {post.emoji}
          </div>
          <p className="text-sm text-slate-900 leading-relaxed">
            {post.content}
          </p>
        </div>
      </div>
      <div className="flex gap-2.5 pt-2">
        {reactionsToLabel().map(({ icon, label }, index) => (
          <Button
            key={index}
            type="button"
            variant="icon"
            onClick={onInteract}
            aria-label={label}
          >
            {icon}
          </Button>
        ))}
      </div>
    </div>
  );
};
