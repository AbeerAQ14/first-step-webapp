import { Button } from "@/components/ui/button";

type TabOption<T> = {
  value: T;
  label: string;
};

interface TabsProps<T> {
  options: TabOption<T>[];
  activeTab: T;
  setActiveTab: (value: T) => void;
}

export function Tabs<T extends string>({
  options,
  activeTab,
  setActiveTab,
}: TabsProps<T>) {
  return (
    <div className="flex justify-center gap-5 lg:gap-x-10">
      {options.map((tab) => (
        <Button
          key={tab.value}
          variant="outline"
          size="sm"
          onClick={() => setActiveTab(tab.value)}
          className={`${
            activeTab === tab.value
              ? "text-primary border-primary"
              : "!text-mid-gray !border-light-gray"
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
