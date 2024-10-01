import { Doc, Id } from "../../convex/_generated/dataModel";

interface MessageProps {
  key: Id<"messages">;
  id: Id<"messages">;
  authorImage: string;
  authorName: string;
  isAuthor: boolean;
  reactions: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">;
    }
  >;
  body: Doc<"messages">["body"];
  image: string | null | undefined;
  updatedAt: Doc<"messages">["updatedAt"];
  createdAt: Doc<"messages">["_creationTime"];
  isEditing: boolean;
  setEditingId: (id: Id<"messages"> | null) => void;
  isCompact: boolean;
  hideThreadButton?: boolean;
  threadCount?: number;
  threadImage?: string;
  threadTimestamp?: number;
}

export const Message = ({
  key,
  id,
  authorImage,
  authorName = "Member",
  isAuthor,
  reactions,
  body,
  image,
  updatedAt,
  createdAt,
  isEditing,
  setEditing,
  isCompact,
  hideThreadButton,
  threadCount,
  threadImage,
  threadTimestamp,
}: MessageProps) => {
  return <div className="">{JSON.stringify(body)}</div>;
};
