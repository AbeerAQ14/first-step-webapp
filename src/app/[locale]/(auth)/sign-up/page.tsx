import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <>
      <div className="py-40 flex items-center justify-center gap-x-2.5">
        <Button size={"lg"} asChild>
          <Link href="/sign-up/parent" className="">
            Sign up as a parent
          </Link>
        </Button>
        <Button size={"lg"} asChild>
          <Link href="/sign-up/center" className="">
            Sign up as a center
          </Link>
        </Button>
      </div>
    </>
  );
}
