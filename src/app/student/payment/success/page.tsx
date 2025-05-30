"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    const pidx = searchParams.get("pidx");

    if (pidx) {
      fetch(`/api/verify-payment/${pidx}`)
        .then((res) => res.json())
        .then((data) => {
          setMessage(data.message || "Verified successfully");
        })
        .catch(() => setMessage("Payment verification failed."));
    } else {
      setMessage("Invalid or missing pidx.");
    }
  }, []);

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">{message}</h1>
    </div>
  );
}
