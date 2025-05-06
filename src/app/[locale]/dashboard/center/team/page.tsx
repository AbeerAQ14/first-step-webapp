import Team from "@/components/dashboard/team/Team";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export interface TeamMember {
  id: string;
  imageUrl: string;
  role: string;
  name: string;
}

interface Branch {
  branchName: string;
  team: TeamMember[];
}

const branches: Branch[] = [
  {
    branchName: "فرع الرياض",
    team: [
      {
        id: "riyadh-1",
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "معلمة روضة",
        name: "أمينة سالم",
      },
      {
        id: "riyadh-2",
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "مساعدة معلمة",
        name: "ليان خالد",
      },
      {
        id: "riyadh-3",
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "مشرفة أطفال",
        name: "سمر عبد الله",
      },
      {
        id: "riyadh-4",
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "مشرفة نظافة",
        name: "نجلاء حسين",
      },
      {
        id: "riyadh-5",
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "اختصاصية نفسية",
        name: "هبة منصور",
      },
      {
        id: "riyadh-6",
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "أخصائية تغذية",
        name: "رنا العتيبي",
      },
      {
        id: "riyadh-7",
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "مديرة الروضة",
        name: "دعاء الزهراني",
      },
      {
        id: "riyadh-8",
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "محاسبة الروضة",
        name: "هند القحطاني",
      },
    ],
  },
  {
    branchName: "فرع جدة",
    team: [
      {
        id: "jeddah-1",
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "معلمة روضة",
        name: "أمينة سالم",
      },
      {
        id: "jeddah-2",
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "مساعدة معلمة",
        name: "ليان خالد",
      },
      {
        id: "jeddah-3",
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "مشرفة أطفال",
        name: "سمر عبد الله",
      },
      {
        id: "jeddah-4",
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "مشرفة نظافة",
        name: "نجلاء حسين",
      },
      {
        id: "jeddah-5",
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "اختصاصية نفسية",
        name: "هبة منصور",
      },
      {
        id: "jeddah-6",
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "أخصائية تغذية",
        name: "رنا العتيبي",
      },
      {
        id: "jeddah-7",
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "مديرة الروضة",
        name: "دعاء الزهراني",
      },
      {
        id: "jeddah-8",
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "محاسبة الروضة",
        name: "هند القحطاني",
      },
    ],
  },
];

export default async function CenterDashboardTeam() {
  return (
    <div className="flex flex-col gap-y-10">
      {branches.map((branch) => (
        <div key={branch.branchName}>
          <div className="mb-3.5 flex items-center justify-between">
            <h1 className="heading-4 font-medium text-primary">
              {branch.branchName}
            </h1>

            <Button asChild size={"sm"} variant={"outline"}>
              <Link href="team/add">إضافة فرد</Link>
            </Button>
          </div>

          <Team members={branch.team} />
        </div>
      ))}
    </div>
  );
}
