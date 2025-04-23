import BranchCard from "./BranchCard";

const Branches = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array(5)
        .fill(1)
        .map((_, index) => (
          <BranchCard key={index} />
        ))}
    </div>
  );
};

export default Branches;
