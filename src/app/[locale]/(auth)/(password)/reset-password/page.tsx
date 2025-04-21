import { Metadata } from "next";
import ResetPassword from "../_components/ResetPassword";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParameters = await searchParams;

  const email =
    typeof searchParameters.email === "string" ? searchParameters.email : "";

  return (
    <>
      <ResetPassword email={email} />
    </>
  );
}
