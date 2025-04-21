import { Metadata } from "next";
import SendOTP from "../_components/SendOTP";

export const metadata: Metadata = {
  title: "OTP Verification",
};

export default async function OTPVerificationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParameters = await searchParams;

  const email =
    typeof searchParameters.email === "string" ? searchParameters.email : "";

  return (
    <>
      <SendOTP email={email} />
    </>
  );
}
