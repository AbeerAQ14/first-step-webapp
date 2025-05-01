import Team from "@/components/dashboard/team/Team";
import { Button } from "@/components/ui/button";

export interface TeamMember {
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
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "معلمة روضة",
        name: "أمينة سالم",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "مساعدة معلمة",
        name: "ليان خالد",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "مشرفة أطفال",
        name: "سمر عبد الله",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "مشرفة نظافة",
        name: "نجلاء حسين",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "اختصاصية نفسية",
        name: "هبة منصور",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "أخصائية تغذية",
        name: "رنا العتيبي",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "مديرة الروضة",
        name: "دعاء الزهراني",
      },
      {
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
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "معلمة روضة",
        name: "أمينة سالم",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "مساعدة معلمة",
        name: "ليان خالد",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "مشرفة أطفال",
        name: "سمر عبد الله",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "مشرفة نظافة",
        name: "نجلاء حسين",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "اختصاصية نفسية",
        name: "هبة منصور",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "أخصائية تغذية",
        name: "رنا العتيبي",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "مديرة الروضة",
        name: "دعاء الزهراني",
      },
      {
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

            <Button size={"sm"} variant={"outline"}>
              إضافة فرد
            </Button>
          </div>

          <Team members={branch.team} />
        </div>
      ))}
    </div>
  );
}
