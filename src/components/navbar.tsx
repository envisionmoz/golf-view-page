
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LangButton from "./langbutton";
import ReserveButton from "./reservebutton"
import "../css/app.css";

function navbar() {
  const t = useTranslations("Navbar");
  return (
    <nav>
      <Link href={"/"}>
        <Image
          src="/images/logo.png"
          alt="logo"
          width={119}
          height={84}
        ></Image>
      </Link>
      <ul>
        <li>
          <Link href={"/"}>{t("opcao1")}</Link>
        </li>
        <li>
        <Link href={"/"}>{t("opcao2")}</Link>
        </li>
        <li>
        <Link href={"/"}>{t("opcao3")}</Link>
        </li>
        <li>
        <Link href={"/"}>{t("opcao4")}</Link>
        </li>
      </ul>
      <div className="nav-buttons">
<ReserveButton/>
      <LangButton/>
      </div>
    </nav>
  );
}

export default navbar;
