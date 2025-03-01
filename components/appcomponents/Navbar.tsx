"use client"
import Image from "next/image"
import LanguageSwitcher from "./LanguageSwitcher"
import { useIntl } from "react-intl";

export function Navbar({ onLanguageChange,locale }:{onLanguageChange:(newLocale:string)=>void,locale:string}) {
  const { formatMessage } = useIntl();

  return (
    <nav className="sticky top-0 z-50 border-b bg-[#F5F5F5] border-slate-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        
        <div className="flex items-center gap-2">
          
          <Image src={"/logo.svg"} alt="UIGM Logo" width={48} height={48} />
          <span className="font-semibold text-sm uppercase text-[#DC0D15]">{formatMessage({id:"common.uigmLong"})}</span>
        </div>

     
        <LanguageSwitcher onLanguageChange={onLanguageChange} locale={locale} />
      </div>
    </nav>
  )
}

