import Image from "next/image";

import logo from "@/images/logo-stamp.png";

export function LogoIcon() {
  return <Image src={logo} alt="Logo" width={100} height={100} className="h-20 w-20 lg:h-24 lg:w-24" />;
}
