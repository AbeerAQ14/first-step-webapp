import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";

const NavbarButton = () => {
  const tBtns = useTranslations("navbar.buttons");

  return (
    <Button size={"sm"} asChild>
      {1 === 1 ? (
        <Link href="/sign-in" className="inline-block">
          <span className="font-normal text-xs">
            {tBtns("already-have-account")}
          </span>
          <span>{tBtns("sign-in")}</span>
        </Link>
      ) : (
        <Link href="/sign-up" className="inline-block">
          {tBtns("sign-up")}
        </Link>
      )}
    </Button>
  );
};

export default NavbarButton;
