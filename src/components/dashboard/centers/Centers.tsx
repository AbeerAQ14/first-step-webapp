import CenterCard from "./CenterCard";

const Centers = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array(5)
        .fill(1)
        .map((_, index) => (
          <CenterCard key={index} />
        ))}
    </div>
  );
};

export default Centers;
