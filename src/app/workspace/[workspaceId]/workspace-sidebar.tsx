import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-model";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizontal,
} from "lucide-react";
import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";
import { WorkspaceSection } from "./workspace-section";
import { UserItem } from "./user-item";
import { useChannelId } from "@/hooks/use-channel-id";
import { useMemberId } from "@/hooks/use-member-id";

export const WorkspaceSidebar = () => {
  const memberId = useMemberId();
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });
  const { data: members, isLoading: memberIsLoading } = useGetMembers({
    workspaceId,
  });

  if (workspaceLoading || memberLoading || channelsLoading || memberIsLoading) {
    return (
      <div className="flex flex-col bg-[#5e2c5f] h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5e2c5f] h-full items-center justify-center">
        <AlertTriangle className="size-5  text-white" />
        <p className="text-white text-sm">Workspace not fount</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-[#5e2c5f] h-full ">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem label="Drafts & Sent" icon={SendHorizontal} id="drafts" />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New Channel"
        onNew={member.role === "admin" ? () => setOpen(true) : undefined}
      >
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            icon={HashIcon}
            label={item.name}
            id={item._id}
            variant={channelId === item._id ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Messages"
        hint="New direct message"
        onNew={() => {}}
      >
        {members?.map((item) => (
          <UserItem
            label={item.user.name}
            image={item.user.image}
            id={item._id}
            key={item._id}
            variant={memberId === item._id ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};
