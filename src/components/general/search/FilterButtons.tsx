import { Button } from "@/components/ui/button";

interface FilterButtonsProps {
  selected: string;
  onSelect: (label: string) => void;
}

const filters: { title: string; value: string }[] = [
  {
    title: "الكل",
    value: "",
  },
  {
    title: "حضانات من 0 إلى 3 سنوات",
    value: "0-3",
  },
  {
    title: "حضانات من 3 إلى 6 سنوات",
    value: "3-6",
  },
  {
    title: "حضانات الاحتياجات الخاصة",
    value: "disabled",
  },
];

const FilterButtons: React.FC<FilterButtonsProps> = ({
  selected,
  onSelect,
}) => {
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
          {label.title}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;
