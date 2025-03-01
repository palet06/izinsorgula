import Image from "next/image";
import {
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useIntl } from "react-intl";

export function Footer() {
  const { formatMessage,locale } = useIntl();

  return (
    <footer className="border-t bg-[#F5F5F5] border-slate-300">
      <div className="mx-auto px-4 md:px-8 py-8 max-w-7xl ">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {/* Logo ve Kurum Bilgisi */}
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-3">
              <Image
                src="/csgb.svg"
                alt="T.C. Çalışma ve Sosyal Güvenlik Bakanlığı"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <span className="text-sm text-center font-semibold text-[#DC0D15]">
                {formatMessage({ id: "footer.ministry" })}
              </span>
            </div>
            <p className="text-sm text-center text-slate-600">
              {formatMessage({ id: "footer.address" })}
            </p>
          </div>

          {/* Hızlı Erişim */}
          <div className="grid grid-cols-3 w-full gap-8 md:col-span-2 md:grid-cols-3">
            <div className="space-y-4  ">
              <h3 className="text-[#DC0D15]/85 ">
                {formatMessage({ id: "footer.quickAccess" })}
              </h3>
              <ul className="space-y-2 text-sm  ">
                <li>
                  <a
                  
                    href={`${locale === "tr" ? "https://www.csgb.gov.tr/uigm/tr" : "https://www.csgb.gov.tr/uigm/en"}`}
                    
                    target="_blank"
                    className="text-slate-600 hover:text-slate-800"
                  >
                    {formatMessage({ id: "footer.homepage" })}
                  </a>
                </li>

                <li>
                  <a
                    href="https://kms.kaysis.gov.tr/Home/kurum/24304011?AspxAutoDetectCookieSupport=1"
                    target="_blank"
                    className="text-slate-600 hover:text-slate-800"
                  >
                    {formatMessage({ id: "footer.legislation" })}
                  </a>
                </li>
                <li>
                  <a
                    href={`${locale === "tr" ? "https://www.csgb.gov.tr/uigm/tr/yayin-ve-%C4%B1statistik/%C4%B1statistikler":"https://www.csgb.gov.tr/uigm/en/publication-and-statistics/statistics"}`}
                    
                    target="_blank"
                    className="text-slate-600 hover:text-slate-800"
                  >
                    {formatMessage({ id: "footer.publications" })}
                  </a>
                </li>
                <li>
                  <a
                    href={`${locale === "tr"?"https://www.csgb.gov.tr/uigm/tr/%C4%B1letisim":"https://www.csgb.gov.tr/uigm/en/communication"}`}
                    
                    target="_blank"
                    className="text-slate-600 hover:text-slate-800"
                  >
                    {formatMessage({ id: "footer.contact" })}
                  </a>
                </li>
              </ul>
            </div>

            {/* İletişim */}
            <div className="space-y-4 ">
              <h3 className=" text-[#DC0D15]/85">
                {formatMessage({ id: "footer.contact" })}
              </h3>
              <ul className="space-y-2 text-sm ">
                <li className="flex items-center gap-2 text-slate-600">
                  <Phone className="h-4 w-4" />
                  <span>+90 (312) 296 60 00</span>
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <Mail className="h-4 w-4" />
                  <span>info@csgb.gov.tr</span>
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <MapPin className="h-4 w-4" />
                  <span>Çankaya/ANKARA</span>
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <Globe className="h-4 w-4" />
                  <span>www.csgb.gov.tr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4 flex flex-col">
              <h3 className="text-[#DC0D15]/85">
                {formatMessage({ id: "footer.social" })}
              </h3>
              <div className="flex gap-2 text-white">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-600 hover:bg-slate-300"
                >
                  <Link href="https://x.com/csgb_uigm" target="_blank">
                    <FaXTwitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-600 hover:bg-slate-300"
                >
                  <Link
                    href="https://www.facebook.com/csgb.gov.tr"
                    target="_blank"
                  >
                    <Facebook className="h-4 w-4" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-600 hover:bg-slate-300"
                >
                  <Link
                    href="https://www.instagram.com/csgb_uigm"
                    target="_blank"
                  >
                    <Instagram className="h-4 w-4" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-600 hover:bg-slate-300"
                >
                  <Link
                    href="https://www.youtube.com/channel/UCjG12ECuhvrQwIIBYJshRwA"
                    target="_blank"
                  >
                    <Youtube className="h-4 w-4" />
                    <span className="sr-only">Youtube</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
