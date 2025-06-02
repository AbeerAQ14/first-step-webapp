import { columns, Report } from "@/components/tables/data/parent-reports";
import { DataTable } from "@/components/tables/DataTable";

const parentsData: Report[] = [
  {
    id: 1,
    childName: "سارة أحمد",
    nurseryName: "حضانة الأمل",
    reportDate: "5 / 5 / 2025",
  },
  {
    id: 2,
    childName: "علي محمد",
    nurseryName: "حضانة المستقبل",
    reportDate: "6 / 5 / 2025",
  },
  {
    id: 3,
    childName: "ليلى خالد",
    nurseryName: "روضة البراعم",
    reportDate: "7 / 5 / 2025",
  },
  {
    id: 4,
    childName: "ياسين عمرو",
    nurseryName: "روضة النهضة",
    reportDate: "8 / 5 / 2025",
  },
  {
    id: 5,
    childName: "مريم سامي",
    nurseryName: "حضانة الهدى",
    reportDate: "9 / 5 / 2025",
  },
  {
    id: 6,
    childName: "آدم رامي",
    nurseryName: "روضة الجيل الجديد",
    reportDate: "10 / 5 / 2025",
  },
  {
    id: 7,
    childName: "نور حسان",
    nurseryName: "حضانة النجوم",
    reportDate: "11 / 5 / 2025",
  },
  {
    id: 8,
    childName: "هدى عصام",
    nurseryName: "روضة السلام",
    reportDate: "12 / 5 / 2025",
  },
  {
    id: 9,
    childName: "يوسف زياد",
    nurseryName: "حضانة النمو",
    reportDate: "13 / 5 / 2025",
  },
  {
    id: 10,
    childName: "ملك هاني",
    nurseryName: "روضة الغد",
    reportDate: "14 / 5 / 2025",
  },
  {
    id: 11,
    childName: "رنا فهد",
    nurseryName: "حضانة الزهور",
    reportDate: "15 / 5 / 2025",
  },
  {
    id: 12,
    childName: "جواد عماد",
    nurseryName: "روضة التفوق",
    reportDate: "16 / 5 / 2025",
  },
  {
    id: 13,
    childName: "جنى حسام",
    nurseryName: "حضانة البسمة",
    reportDate: "17 / 5 / 2025",
  },
  {
    id: 14,
    childName: "أمير عدنان",
    nurseryName: "روضة الربيع",
    reportDate: "18 / 5 / 2025",
  },
  {
    id: 15,
    childName: "دانا كمال",
    nurseryName: "حضانة الأصدقاء",
    reportDate: "19 / 5 / 2025",
  },
  {
    id: 16,
    childName: "عبدالله عادل",
    nurseryName: "روضة الإشراق",
    reportDate: "20 / 5 / 2025",
  },
  {
    id: 17,
    childName: "ريم تامر",
    nurseryName: "حضانة المعرفة",
    reportDate: "21 / 5 / 2025",
  },
  {
    id: 18,
    childName: "حسن وائل",
    nurseryName: "روضة الأحلام",
    reportDate: "22 / 5 / 2025",
  },
  {
    id: 19,
    childName: "لينا عمار",
    nurseryName: "حضانة الأمان",
    reportDate: "23 / 5 / 2025",
  },
  {
    id: 20,
    childName: "كريم ماهر",
    nurseryName: "روضة الشروق",
    reportDate: "24 / 5 / 2025",
  },
];

export default function DailyReports() {
  return (
    <div className="lg:p-4 space-y-1">
      <p className="heading-4 text-primary text-center">التقارير اليومية</p>

      <DataTable columns={columns} data={parentsData} />
    </div>
  );
}
