import ChildCard from "./ChildCard";

const Children = ({
  noEdit,
  baseUrl,
  absoluteBaseUrl,
}: {
  noEdit?: boolean;
  baseUrl?: string;
  absoluteBaseUrl?: string;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {Array(2)
        .fill(1)
        .map((_, index) => (
          <ChildCard
            noEdit={noEdit}
            baseUrl={baseUrl}
            absoluteBaseUrl={absoluteBaseUrl}
            key={index}
          />
        ))}
    </div>
  );
};

export default Children;
