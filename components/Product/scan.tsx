"use client";

import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

// Data Produk
const productData = {
  "1INDOMIE KARI100OKE": {
    nama: "Indomie Kari",
    berat: 100,
    status: "OKE",
  },
  "2INDOMIE SOTO500REJECT": {
    nama: "Indomie Soto",
    berat: 500,
    status: "REJECT",
  },
  "3INDOMIE GORENG600OKE": {
    nama: "Indomie Goreng",
    berat: 600,
    status: "OKE",
  },
  "4SARIMI400REJECT": {
    nama: "Sarimi",
    berat: 400,
    status: "REJECT",
  },
  "5SUPERMI200OKE": {
    nama: "Supermi",
    berat: 200,
    status: "OKE",
  },
};

const Scan = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  // Ambil data produk berdasarkan hasil scan
  const product = scanResult ? productData[scanResult] : null;

  useEffect(() => {
    if (!scanResult && !scannerRef.current) {
      const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);

      scanner.render(
        (result) => {
          setScanResult(result);
          scanner.clear().then(() => {
            scannerRef.current = null;
          });
        },
        (err) => {
          console.warn("Scan error", err);
        }
      );

      scannerRef.current = scanner;
    }
  }, [scanResult]);

  const handleRescan = async () => {
    if (scannerRef.current) {
      await scannerRef.current.clear();
      scannerRef.current = null;
    }

    const reader = document.getElementById("reader");
    if (reader) reader.innerHTML = "";

    setScanResult(null); // Reset dan aktifkan scanner ulang
  };

  return (
    <section className="bg-gray-50 overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-2 items-center border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="w-full px-4">
            <div className="wow fadeInUp" data-wow-delay=".2s">
              <div className="mt-2">
                <div className="relative z-10 mb-10 overflow-hidden rounded-md bg-primary bg-opacity-10 p-8 md:p-9 lg:p-8 xl:p-9">
                  {/* SCANNER ATAU HASIL */}
                  {!scanResult ? (
                    <div id="reader" className="mx-auto w-full max-w-md" />
                  ) : product ? (
                    <div className="text-center">
                      <h2 className="mb-4 text-xl font-bold">Detail Produk</h2>
                      <p className="text-lg">
                        <strong>Nama:</strong> {product.nama}
                      </p>
                      <p className="text-lg">
                        <strong>Berat:</strong> {product.berat} kg
                      </p>
                      <p className="text-lg">
                        <strong>Status:</strong> <span className={product.status === "OKE" ? "text-green-600" : "text-red-600"}>{product.status}</span>
                      </p>

                      <button onClick={handleRescan} className="bg-blue-600 hover:bg-blue-700 mt-6 rounded-md px-6 py-2 text-white transition">
                        Scan Ulang
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-red-500 text-lg">Data tidak ditemukan</p>
                      <button
                        onClick={handleRescan}
                        className="from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 group relative mt-6 inline-flex items-center justify-center rounded-md bg-gradient-to-r px-6 py-2 font-semibold text-white transition duration-300 ease-in-out hover:scale-105 focus:outline-none"
                      >
                        <svg className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M4 20l5-5m10-10l-5 5" />
                        </svg>
                        Scan Ulang
                      </button>
                    </div>
                  )}

                  {/* Background SVG (jika ada) */}
                  <span className="absolute left-0 top-0 z-[-1]">{/* svg kiri */}</span>
                  <span className="absolute right-0 bottom-0 z-[-1]">{/* svg kanan */}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scan;
