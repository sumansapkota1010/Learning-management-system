// src/app/api/verify-payment/[pidx]/route.ts

import { NextRequest } from "next/server";
import axios from "axios";
import connectDb from "@/database/connection";
import Payment from "@/database/models/payment.schema";

export async function GET(
  req: NextRequest,
  { params }: { params: { pidx: string } }
) {
  const { pidx } = await params;

  try {
    await connectDb();

    const response = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: "key  6a90fe9eb5534594a065022ee4ae2d67",
        },
      }
    );

    const { status } = response.data;

    const payment = await Payment.findOneAndUpdate(
      { pidx },
      { status },
      { new: true }
    );

    if (!payment) {
      return Response.json({ message: "Payment not found" }, { status: 404 });
    }

    return Response.json({
      message: `Payment ${status.toLowerCase()}`,
      payment,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return Response.json({ message: "Verification failed" }, { status: 500 });
  }
}
