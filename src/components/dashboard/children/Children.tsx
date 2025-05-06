import ChildCard from "./ChildCard";

const Children = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array(2)
        .fill(1)
        .map((_, index) => (
          <ChildCard key={index} />
        ))}
    </div>
  );
};

export default Children;
