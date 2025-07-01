interface TeamMember {
  name: string;
  role: string;
  image?: string;
  isSkeleton?: boolean;
}

interface TeamProps {
  members: TeamMember[];
}

const Team = ({ members }: TeamProps) => (
  <section className="mt-20 mb-10">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-[#47B881] mb-8">
      فريق حضانة الأمل
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
      {members.map((member, idx) => (
        <div key={idx} className="flex flex-col items-center">
          {member.isSkeleton ? (
            <div className="rounded-2xl w-40 h-44 mb-2 bg-gray-200 animate-pulse" />
          ) : (
            <img
              src={member.image}
              alt={member.name}
              className="rounded-2xl object-cover w-40 h-44 mb-2"
            />
          )}
          <div className="text-[#22336C] font-bold">{member.name}</div>
          <div className="text-gray-500 text-sm">{member.role}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Team;
