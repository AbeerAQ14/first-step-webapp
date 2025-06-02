import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface FilterButtonsProps {
  selected: string;
  onSelect: (label: string) => void;
}

const filters: { title: string; value: string }[] = [
  {
    title: "all",
    value: "",
  },
  {
    title: "0-3",
    value: "0-3",
  },
  {
    title: "3-6",
    value: "3-6",
  },
  {
    title: "disabled",
    value: "disabled",
  },
];

const FilterButtons: React.FC<FilterButtonsProps> = ({
  selected,
  onSelect,
}) => {
  const t = useTranslations("nurseries.filters");

  return (
    <div className="flex flex-wrap justify-center gap-2 my-4">
      {filters.map((label) => (
        <Button
          key={label.value}
          size={"sm"}
          variant={"outline"}
          onClick={() => onSelect(label.value)}
          className={`transition-all ${
            selected === label.value
              ? "!bg-primary text-white border-primary hover:!bg-primary"
              : "!border-light-gray text-mid-gray"
          }`}
        >
          {t(label.title)}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;
