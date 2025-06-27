// TODO: remove padding on svg
import Image from "next/image";

import logo from "@/images/pieczatka.png";

export function LogoIcon() {
  return <Image src={logo} alt="Logo" width={100} height={100} className="h-24 w-24" />;
}
