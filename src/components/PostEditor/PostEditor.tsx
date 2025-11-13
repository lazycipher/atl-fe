import { type FormEvent, useState } from "react";
import { toast } from "react-toastify";
import {
  TbBold,
  TbCode,
  TbItalic,
  TbList,
  TbListNumbers,
  TbMoodSmile,
  TbPlus,
  TbQuote,
  TbTrash,
  TbUnderline,
  TbVideo,
} from "react-icons/tb";
import { Button } from "../Button/Button";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { RiMicLine } from "react-icons/ri";

type PostEditorProps = {
  onSubmit: (content: string) => void;
  disabled?: boolean;
  onRequireAuth: () => void;
};

export const PostEditor = ({
  onSubmit,
  disabled = false,
  onRequireAuth,
}: PostEditorProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (disabled) {
      onRequireAuth();
      return;
    }

    const value = content.trim();
    if (!value) {
      return;
    }

    onSubmit(value);
    setContent("");
  };

  const handleAuxAction = () => {
    toast.info("Function not implemented");
  };

  return (
    <div className="bg-gray-100 p-2 rounded-3xl mb-4">
      <form
        className="flex flex-col bg-white rounded-3xl border border-gray-300"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between px-4 pt-4">
          <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
            <select className="border border-slate-300/50 rounded-xl cursor-pointer p-2 bg-white">
              <option>Paragraph</option>
            </select>
            <Button
              type="button"
              variant="toolbar-white"
              onClick={handleAuxAction}
            >
              <TbBold />
            </Button>
            <Button type="button" onClick={handleAuxAction}>
              <TbItalic />
            </Button>
            <Button type="button" onClick={handleAuxAction}>
              <TbUnderline />
            </Button>
            <div className="border-l border-gray-300 h-full" />
            <Button type="button" onClick={handleAuxAction}>
              <TbList />
            </Button>
            <Button type="button" onClick={handleAuxAction}>
              <TbListNumbers />
            </Button>
            <div className="border-l border-gray-300 h-full" />
            <Button type="button" onClick={handleAuxAction}>
              <TbQuote />
            </Button>
            <Button type="button" onClick={handleAuxAction}>
              <TbCode />
            </Button>
          </div>
          <div className="flex items-center gap-3 bg-red-100 rounded-xl p-1">
            <Button
              type="button"
              onClick={handleAuxAction}
              className="bg-transparent"
            >
              <TbTrash className="text-red-500" />
            </Button>
          </div>
        </div>

        <div className="flex gap-4 px-4 mt-2">
          <Button type="button" variant="icon" onClick={handleAuxAction}>
            <TbMoodSmile className="text-2xl" />
          </Button>
          <textarea
            className="flex-1 mt-2 border-none bg-transparent resize-none text-base leading-normal text-slate-900 placeholder:text-slate-400 focus:outline-none"
            placeholder="How are you feeling today?"
            value={content}
            onChange={(event) => !disabled && setContent(event.target.value)}
            rows={6}
            onFocus={() => {
              if (disabled) {
                onRequireAuth();
              }
            }}
          />
        </div>

        <div className="flex items-center justify-between border-t border-gray-300 pt-2 p-4">
          <div className="flex gap-2.5">
            <Button type="button" onClick={handleAuxAction}>
              <TbPlus />
            </Button>
            <Button
              type="button"
              variant="toolbar-white"
              className="shadow-none! border-0"
              onClick={handleAuxAction}
            >
              <RiMicLine />
            </Button>
            <Button
              type="button"
              variant="toolbar-white"
              className="shadow-none! border-0"
              onClick={handleAuxAction}
            >
              <TbVideo />
            </Button>
          </div>
          <Button
            type="submit"
            variant="icon"
            disabled={disabled || !content.trim()}
          >
            <PiPaperPlaneRightFill size={25} className="text-indigo-600" />
          </Button>
        </div>
      </form>
    </div>
  );
};
