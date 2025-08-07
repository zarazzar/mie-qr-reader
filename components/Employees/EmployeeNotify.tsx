"use client";

import { useEffect, useState } from "react";

interface Karyawan {
  id: number;
  nama: string;
  target: number;
  output: number;
  percent?: number;
  email?: string;
}

const EmployeeNotify = () => {
  const [data, setData] = useState<Karyawan[]>([]);
  const [emailInputs, setEmailInputs] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        const withPercent = json.map((item: Karyawan) => ({
          ...item,
          percent: Number(((item.output / item.target) * 100).toFixed(2)),
        }));

        // Urutkan dari pencapaian terendah ke tertinggi
        withPercent.sort((a, b) => a.percent! - b.percent!);
        setData(withPercent);
      });
  }, []);

  const handleSendEmail = async (id: number, nama: string, percent: number) => {
    const email = emailInputs[id];
    if (!email) {
      alert("Silakan isi alamat email terlebih dahulu.");
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "[Peringatan Pencapaian Target]",
          body: `Halo ${nama}, pencapaian Anda saat ini adalah ${percent}%. Mohon tingkatkan terus targetnya! Semangat :D`,
        }),
      });

      if (response.ok) {
        alert(`Email berhasil dikirim ke ${email}`);
      } else {
        alert("Gagal mengirim email.");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat mengirim email.");
    }
  };

  return (
    <section id="employeeNotify" className="overflow-hidden">
      <div className="container">
        <div className="w-full px-4 py-5">
          <div className="max-h-96 overflow-y-auto rounded-md border shadow-lg">
            <table className="divide-gray-600 min-w-full divide-y bg-[#0e1132] text-sm text-white">
              <thead className="sticky top-0 bg-[#0c0f2e]">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">ID</th>
                  <th className="px-3 py-2 text-left font-semibold">Nama</th>
                  <th className="px-3 py-2 text-left font-semibold">Target</th>
                  <th className="px-3 py-2 text-left font-semibold">Output</th>
                  <th className="px-3 py-2 text-left font-semibold">Pencapaian</th>
                  <th className="px-3 py-2 text-left font-semibold">Email</th>
                  <th className="px-3 py-2 text-left font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-gray-700 divide-y">
                {data.map((item) => (
                  <tr key={item.id} className="transition hover:bg-[#1a1e3f]">
                    <td className="px-3 py-2">{item.id}</td>
                    <td className="px-3 py-2">{item.nama}</td>
                    <td className="px-3 py-2">{item.target}</td>
                    <td className="px-3 py-2">{item.output}</td>
                    <td className={`px-3 py-2 font-semibold ${item.percent! >= 80 ? "text-green-400" : item.percent! >= 50 ? "text-blue-400" : "text-red-400"}`}>{item.percent}%</td>
                    <td className="px-3 py-2">
                      {item.percent! < 50 ? (
                        <input
                          type="email"
                          placeholder="email@example.com"
                          className="border-gray-600 w-full rounded border bg-[#1a1e3f] p-1 text-xs text-white"
                          value={emailInputs[item.id] || ""}
                          onChange={(e) => setEmailInputs({ ...emailInputs, [item.id]: e.target.value })}
                        />
                      ) : (
                        <span className="text-gray-400 text-xs italic"> </span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {item.percent! < 50 ? (
                        <button className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium text-xs px-3 py-1 rounded shadow transition" onClick={() => handleSendEmail(item.id, item.nama, item.percent!)}>
                          Kirim Pengingat
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Target Tercapai</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeNotify;
