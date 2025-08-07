import ScrollUp from "@/components/Common/ScrollUp";
import EmployeeTable from "@/components/Home/EmployeeTable";

import Features from "@/components/Features";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ScrollUp />

      <EmployeeTable />
    </>
  );
}
