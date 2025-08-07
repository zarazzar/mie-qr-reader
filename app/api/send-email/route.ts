import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { to, subject, body } = await req.json();
    console.log("Payload diterima:", { to, subject, body });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: to, // target email dari frontend
      subject: subject,
      text: body,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: "Email berhasil dikirim" });
  } catch (error: any) {
    console.error("Gagal kirim email:", error.message);
    return NextResponse.json({ success: false, message: "Gagal mengirim email" }, { status: 500 });
  }
}
