import { Metadata } from "next";
import SendEmail from "../_components/SendEmail";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <SendEmail />
    </>
  );
}
