import ParentCard from "./ParentCard";

const Parents = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array(2)
        .fill(1)
        .map((_, index) => (
          <ParentCard key={index} />
        ))}
    </div>
  );
};

export default Parents;
