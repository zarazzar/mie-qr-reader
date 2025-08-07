import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Cek Produk",
    path: "/product",
    newTab: false,
  },
  {
    id: 3,
    title: "Daftar Karyawan",
    path: "/employees",
    newTab: false,
  },

  // {
  //   id: 2,
  //   title: "Cek Produk",
  //   path: "/about",
  //   newTab: false,
  // },
  // {
  //   id: 3,
  //   title: "Daftar Karyawan",
  //   path: "/contact",
  //   newTab: false,
  // },
];
export default menuData;
