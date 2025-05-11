import ChildCard from "./ChildCard";

const Children = ({
  noEdit,
  baseUrl,
}: {
  noEdit?: boolean;
  baseUrl?: string;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {Array(2)
        .fill(1)
        .map((_, index) => (
          <ChildCard noEdit={noEdit} baseUrl={baseUrl} key={index} />
        ))}
    </div>
  );
};

export default Children;
