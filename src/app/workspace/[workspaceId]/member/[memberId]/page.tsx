"use client";

import { toast } from "sonner";
import { AlertTriangle, Loader } from "lucide-react";
import { useEffect, useState } from "react";

import { Id } from "../../../../../../convex/_generated/dataModel";

import { useCreateOrGetConversation } from "@/features/conversations/api/use-create-or-get-conversation";

import { useMemberId } from "@/hooks/use-member-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const MemberIdPage = () => {
  const memberId = useMemberId();
  const workspaceId = useWorkspaceId();

  const [conversationId, setConversationId] =
    useState<Id<"conversations"> | null>(null);

  const { mutate, isPending } = useCreateOrGetConversation();

  useEffect(() => {
    console.log(memberId);
    mutate(
      { memberId, workspaceId },
      {
        onSuccess(data) {
          setConversationId(data);
        },
        onError() {
          toast.error("Failed to create or get conversation");
        },
      }
    );
  }, [mutate, workspaceId, memberId]);

  if (isPending) {
    return (
      <div className="h-full  flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!conversationId) {
    return (
      <div
        className="h-full flex-col gap-y-2
       flex items-center justify-center"
      >
        <AlertTriangle className="size-6  text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Conversation not found
        </span>
      </div>
    );
  }

  return <div className="">{conversationId}</div>;
};

export default MemberIdPage;
