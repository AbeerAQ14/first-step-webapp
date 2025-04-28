import { TeamMember } from "@/app/[locale]/dashboard/center/team/page";
import { TeamCard } from "./TeamCard";

const Team = ({ members }: { members: TeamMember[] }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-x-4 gap-y-5.5">
      {members.map((member, index) => (
        <TeamCard key={index} {...member} />
      ))}
    </div>
  );
};

export default Team;
