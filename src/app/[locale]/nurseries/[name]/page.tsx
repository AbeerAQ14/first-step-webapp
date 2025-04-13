import Branches from "@/components/general/nurseries/Branches";
import Header from "@/components/general/nurseries/Header";
import { slugToReadableName } from "@/lib/utils";

export default async function NurseryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const readableName = slugToReadableName(name);

  return (
    <div>
      <Header name={readableName} />
      <Branches />
    </div>
  );
}
