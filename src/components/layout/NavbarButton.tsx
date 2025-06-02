import { useTranslations } from "next-intl";
import { useAuthStore, useAuthToken } from "@/store/authStore";
import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";

const NavbarButton = () => {
  const token = useAuthToken();
  const authStore = useAuthStore();
  const tBtns = useTranslations("navbar.buttons");

  return (
    <Button size={"sm"} asChild>
      {1 === 1 ? (
        !token ? (
          <Link href="/sign-in" className="inline-block">
            <span className="font-normal text-xs">
              {tBtns("already-have-account")}
            </span>
            <span>{tBtns("sign-in")}</span>
          </Link>
        ) : (
          <span onClick={() => authStore.clearAuth()}>Logout</span>
        )
      ) : (
        <Link href="/sign-up" className="inline-block">
          {tBtns("sign-up")}
        </Link>
      )}
    </Button>
  );
};

export default NavbarButton;
