import Scan from "@/components/Product/scan";
import Breadcrumb from "@/components/Common/Breadcrumb";

const AboutPage = () => {
  return (
    <>
      <Breadcrumb pageName="Cek Produk" description="Mohon izinkan Akses kamera untuk menggunakan fitur scan produk." />
      <Scan />
    </>
  );
};

export default AboutPage;
