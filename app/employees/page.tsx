import Breadcrumb from "@/components/Common/Breadcrumb";
import EmployeeNotify from "@/components/Employees/EmployeeNotify";

const EmployeesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Daftar Pegawai & Pencapaian" description="Harap ingatkan pegawai dengan target dibawah 50%." />

      <EmployeeNotify />
    </>
  );
};

export default EmployeesPage;
