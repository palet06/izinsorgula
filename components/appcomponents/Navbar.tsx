"use client"



import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-[#F5F5F5] border-slate-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          
          <Image src={"/logo.svg"} alt="UIGM Logo" width={48} height={48} />
          <span className="font-semibold text-sm uppercase text-[#DC0D15]">Uluslararası İşgücü <br /> Genel Müdürlüğü</span>
        </div>

     
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent text-[#DC0D15]">
            <span className="text-xl ">🇹🇷</span>
            
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center gap-2">
              <span className="text-xl">🇹🇷</span>
              <span>Türkçe</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <span className="text-xl">🇬🇧</span>
              <span>English</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

