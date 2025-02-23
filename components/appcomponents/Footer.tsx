import Image from "next/image"
import { Facebook, Globe, Instagram, Mail, MapPin, Phone, Twitter, TwitterIcon, X, XIcon, Youtube } from "lucide-react"
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-[#DC0D15]">
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
              <span className="text-sm text-center font-semibold text-white">T.C. Çalışma ve Sosyal Güvenlik Bakanlığı</span>
            </div>
            <p className="text-sm text-center text-white">
              Emek Mahallesi, 17. Cadde No:13
              <br />
              06490 Çankaya/ANKARA
            </p>
          </div>

          {/* Hızlı Erişim */}
          <div className="grid grid-cols-3 w-full gap-8 md:col-span-2 md:grid-cols-3">

          <div className="space-y-4  ">
         
            <h3 className="font-semibold text-slate-300">Hızlı Erişim</h3>
            <ul className="space-y-2 text-sm  ">
              <li>
                <a href="https://www.csgb.gov.tr/uigm/tr" target="_blank" className="text-white hover:text-slate-300">
                  Ana Sayfa
                </a>
              </li>
              
              <li>
                <a href="https://kms.kaysis.gov.tr/Home/kurum/24304011?AspxAutoDetectCookieSupport=1" target="_blank" className="text-white hover:text-slate-300">
                  Mevzuat
                </a>
              </li>
              <li>
                <a href="https://www.csgb.gov.tr/uigm/tr/yayin-ve-%C4%B1statistik/%C4%B1statistikler" target="_blank" className="text-white hover:text-slate-300">
                  Yayınlar
                </a>
              </li>
              <li>
                <a href="https://www.csgb.gov.tr/uigm/tr/%C4%B1letisim" target="_blank" className="text-white hover:text-slate-300">
                  İletişim
                </a>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div className="space-y-4 ">
            <h3 className="font-semibold text-slate-300">İletişim</h3>
            <ul className="space-y-2 text-sm ">
              <li className="flex items-center gap-2 text-white">
                <Phone className="h-4 w-4" />
                <span>+90 (312) 296 60 00</span>
              </li>
              <li className="flex items-center gap-2 text-white">
                <Mail className="h-4 w-4" />
                <span>info@csgb.gov.tr</span>
              </li>
              <li className="flex items-center gap-2 text-white">
                <MapPin className="h-4 w-4" />
                <span>Çankaya/ANKARA</span>
              </li>
              <li className="flex items-center gap-2 text-white">
                <Globe className="h-4 w-4" />
                <span>www.csgb.gov.tr</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4 flex flex-col">
            <h3 className="font-semibold text-slate-300">Sosyal Medya</h3>
            <div className="flex gap-2 text-white">
             
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-300">
                <Link href="https://x.com/csgb_uigm" target="_blank">
                <FaXTwitter  className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-300">
                <Link href="https://www.facebook.com/csgb.gov.tr" target="_blank">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-300">
                <Link href="https://www.instagram.com/csgb_uigm" target="_blank">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-300">
                <Link href="https://www.youtube.com/channel/UCjG12ECuhvrQwIIBYJshRwA" target="_blank">
                <Youtube className="h-4 w-4" />
                <span className="sr-only">Youtube</span>
                </Link>
              </Button>
              
              
            </div>
          </div>

          </div>

          {/* Sosyal Medya */}
          
        </div>

        <Separator className="my-8" />

        {/* Alt Bilgi */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-white md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} T.C. Çalışma ve Sosyal Güvenlik Bakanlığı. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">
              Gizlilik Politikası
            </a>
            <a href="#" className="hover:text-slate-300">
              Kullanım Şartları
            </a>
            <a href="#" className="hover:text-slate-300">
              Site Haritası
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

