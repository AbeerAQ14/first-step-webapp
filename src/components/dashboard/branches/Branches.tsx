import BranchCard from "./BranchCard";

const Branches = ({
  noEdit,
  baseUrl,
}: {
  noEdit: boolean;
  baseUrl: string;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {Array(5)
        .fill(1)
        .map((_, index) => (
          <BranchCard noEdit={noEdit} baseUrl={baseUrl} key={index} />
        ))}
    </div>
  );
};

export default Branches;
