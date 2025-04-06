import { Metadata } from "next";
import { SignUp } from "./_components/SignUp";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <>
      <SignUp />
    </>
  );
}
