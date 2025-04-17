import { Metadata } from "next";
import SignUpWrapper from "./_components/SignUpWrapper";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <>
      <SignUpWrapper />
    </>
  );
}
