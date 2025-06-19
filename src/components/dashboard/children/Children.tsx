// "use client";

// <<<<<<< omnia
// =======
// import { adminService } from "@/services/dashboardApi";
// >>>>>>> amr
// import ChildCard from "./ChildCard";
// import { useQuery } from "@tanstack/react-query";
// import { parentService } from "@/services/dashboardApi";
// import { Child } from "@/types";
// import ChildrenSkeleton from "./ChildrenSkeleton";

// interface Child {
//   id: number;
//   child_name: string;
//   birthday_date: string;
//   gender: string;
//   user: {
//     name: string;
//   };
//   disease_details: Array<{
//     disease_name: string;
//     medicament: string;
//     emergency: string;
//   }>;
//   allergies: Array<{
//     id: number;
//     name: string;
//     allergy_causes: string[];
//     allergy_emergency: string;
//   }>;
//   authorized_people: Array<{
//     id: number;
//     name: string;
//     cin: string;
//   }>;
// }

// const Children = ({
//   noEdit,
//   baseUrl,
//   absoluteBaseUrl,
//   childrenData,
// }: {
//   noEdit?: boolean;
//   baseUrl?: string;
//   absoluteBaseUrl?: string;
//   childrenData?: { userName: string; children: Child[] };
// }) => {
// <<<<<<< omnia
//   const { data: children = [], isLoading } = useQuery<Child[]>({
//     queryKey: ["parent-children"],
//     queryFn: parentService.getParentChildren,
//   });

//   if (isLoading) {
//     return <ChildrenSkeleton />;
// =======
//   const { data, isLoading } = useQuery<Child[]>({
//     queryKey: ["children"],
//     queryFn: adminService.getChildren,
//     enabled: !childrenData,
//   });

//   const childrenToRender = childrenData?.children || data;

//   if (!childrenToRender && isLoading) {
//     return <div>Loading...</div>;
// >>>>>>> amr
//   }

//   return (
//     <div className="flex flex-col gap-4">
// <<<<<<< omnia
//       {children.map((child) => (
//         <ChildCard
//           key={child.id}
//           child={child}
// =======
//       {childrenToRender?.map((child) => (
//         <ChildCard
//           key={child.id}
//           id={child.id}
//           name={child.child_name}
//           birthday={child.birthday_date}
//           gender={child.gender}
//           userName={childrenData?.userName || child.user.name}
//           disease_details={child.disease_details}
//           allergies={child.allergies}
//           authorized_people={child.authorized_people}
// >>>>>>> amr
//           noEdit={noEdit}
//           baseUrl={baseUrl}
//           absoluteBaseUrl={absoluteBaseUrl}
//         />
//       ))}
//     </div>
//   );
// };

// export default Children;
