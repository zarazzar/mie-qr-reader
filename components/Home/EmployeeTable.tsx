"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from "recharts";
import SectionTitle from "../Common/SectionTitle";

interface Karyawan {
  id: number;
  nama: string;
  target: number;
  output: number;
  percent?: number;
}

const EmployeeChart = () => {
  const [data, setData] = useState<Karyawan[]>([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        const withPercent = json.map((item: Karyawan) => ({
          ...item,
          percent: Number(((item.output / item.target) * 100).toFixed(2)),
        }));

        withPercent.sort((a, b) => b.percent! - a.percent!);
        setData(withPercent);
      });
  }, []);

  return (
    <section id="employees" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="w-full px-4 py-5">
          <SectionTitle title="Dashboard" paragraph="Lihat data & grafik pencapaian pegawai berdasarkan urutan target yang dicapai." center width="665px" />

          <div className="max-h-80 overflow-y-auto">
            <table className="divide-gray-600 min-w-full divide-y bg-[#0e1132] text-white">
              <thead className="bg-[#0c0f2e]">
                <tr>
                  <th className="text-gray-300 px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">ID. Pegawai</th>
                  <th className="text-gray-300 px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">Nama</th>
                  <th className="text-gray-300 px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">Target</th>
                  <th className="text-gray-300 px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">Output</th>
                  <th className="text-gray-300 px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">Pencapaian</th>
                </tr>
              </thead>
              <tbody className="divide-gray-700 divide-y">
                {data.map((item, index) => (
                  <tr key={index} className="transition hover:bg-[#1a1e3f]">
                    <td className="px-4 py-2 text-xs">{item.id}</td>
                    <td className="px-4 py-2 text-xs">{item.nama}</td>
                    <td className="px-4 py-2 text-xs">{item.target.toLocaleString()}</td>
                    <td className="px-4 py-2 text-xs">{item.output.toLocaleString()}</td>
                    <td className={`px-4 py-2 text-xs font-semibold ${item.percent! >= 100 ? "text-green-400" : item.percent! >= 80 ? "text-yellow-400" : "text-red-400"}`}>{item.percent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="w-full px-4 py-5">
          <h3 className="text-gray-800 mb-6 text-center text-2xl font-bold">Grafik Pencapaian Karyawan</h3>

          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={data} margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 120]} unit="%" />
                <YAxis dataKey="nama" type="category" />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="percent">
                  {data.map((entry, index) => {
                    let fillColor = "#f6ab3bff"; // biru default (50–80%)

                    if (entry.percent < 50) {
                      fillColor = "#ff2f2fff"; // merah
                    } else if (entry.percent > 80) {
                      fillColor = "#10B981"; // hijau
                    }

                    return <Cell key={`cell-${index}`} fill={fillColor} />;
                  })}
                  <LabelList dataKey="percent" position="right" formatter={(val) => `${val}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-gray-400 mt-6 text-center text-sm">
              kirim notifikasi email ke pegawai yang memiliki pencapaian kurang dari 50% {" "}
              <a href="/employees" className="text-blue-500 hover:text-blue-400 underline transition">
                Klik di sini
              </a>{" "}
              untuk melanjutkan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeChart;
