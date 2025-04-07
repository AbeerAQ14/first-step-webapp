import { Metadata } from "next";
import SendOTP from "../_components/SendOTP";

export const metadata: Metadata = {
  title: "OTP Verification",
};

export default function OTPVerificationPage() {
  return (
    <>
      <SendOTP />
    </>
  );
}
