interface WorkspaceIdProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdPage = ({ params }: WorkspaceIdProps) => {
  return <div className="">Id: {params.workspaceId}</div>;
};

export default WorkspaceIdPage;
