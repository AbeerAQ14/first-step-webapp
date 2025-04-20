"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "../search/SearchBar";
import FilterButtons from "../search/FilterButtons";
import NurseryCard from "./NurseryCard";
import { CenterRegisterPayload } from "@/types";

const mockNurseries = [
  { name: "روضة الأمل", type: "مركز" },
  { name: "حضانة السعادة", type: "حضانة" },
  { name: "أكاديمية النجوم", type: "مركز" },
  { name: "براعم الغد", type: "حضانة" },
];

const Nurseries = ({
  nurseries,
  query,
  filter,
}: {
  nurseries: CenterRegisterPayload[];
  query: string;
  filter: string;
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedFilter, setSelectedFilter] = useState(filter);

  // Update URL when search or filter changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("query", searchQuery);
    if (selectedFilter) params.set("filter", selectedFilter);
    router.push(`/nurseries?${params.toString()}`, { scroll: false });
  }, [searchQuery, selectedFilter]);

  // Filter data
  const filteredNurseries = nurseries.filter((nursery) => {
    const matchesQuery = nursery.nursery_name
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase());
    const matchesFilter = selectedFilter
      ? nursery.accepted_ages.includes(selectedFilter)
      : true;
    return matchesQuery && matchesFilter;
  });

  return (
    <section className="container mx-auto px-4">
      <div>
        <SearchBar
          placeholder="ابحث عن المركز أو الحضانة"
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>
      <FilterButtons selected={selectedFilter} onSelect={setSelectedFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredNurseries.map((nursery, index) => (
          <NurseryCard nursery={nursery} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Nurseries;
