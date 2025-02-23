"use client";

import ReCAPTCHA from "react-google-recaptcha";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SelectTrigger } from "@radix-ui/react-select";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const [basvuruSecimi, setBasvuruSecimi] = useState("");
  const [belgeNo, setBelgeNo] = useState("");
  const [yabanciKimlikNo, setYabanciKimlikNo] = useState("");
  const [captcha, setCaptcha] = useState(false);

  const captchaRef = useRef(null);

  const handleSelectChange = (name: string) => {
    setBasvuruSecimi(name);
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === "belgeNo") {
      setBelgeNo(value);
    } else if (name === "yabanciKimlikNo") {
      setYabanciKimlikNo(value);
    }
  };

  const handleCaptchaChange = async (token) => {
    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=6Lfnmd8qAAAAAMTBzN7bf4JZi2N8gFZFRQxyHY4W&response=${token}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          method: "POST",
        }
      );
      const responseJson = await response.json();
      if (responseJson.success) {
        console.log(captcha);
        setCaptcha(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   try {
  //     const response = await fetch("/api/")

  //   } catch (error) {

  //   }
  // }

  return (
    <div className="flex  w-full items-center justify-center p-6 md:p-10 ">
      <div className="w-full max-w-sm  shadow-lg ">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardDescription className="text-center font-semibold text-[#DC0D15]">
                Yabancıların Çalışma İzni, Çalışma İzni Muafiyeti ve Turkuaz
                Kart Bilgisi Sorgulama Sistemi
              </CardDescription>
              <Separator />
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Başvuru Türü</Label>
                    <Select
                      onValueChange={handleSelectChange}
                      name="basvuruSecimi"
                    >
                      <SelectTrigger className="flex items-center h-9 w-full  rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ">
                        <SelectValue placeholder="Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Çalışma İzni - e-İzin</SelectItem>
                        <SelectItem value="2">
                          Çalışma İzni Muafiyeti - e-Muafiyet
                        </SelectItem>
                        <SelectItem value="3">Turkuaz Kart</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="yabanciKimlikNo">
                        Yabancı Kimlik / Referans Numarası
                      </Label>
                    </div>
                    <Input name="yabanciKimlikNo" type="text" required />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="belgeNo">Başvuru Numarası</Label>
                    </div>
                    <Input name="belgeNo" type="text" required />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-center">
                      <ReCAPTCHA
                        className="transform scale-110"
                        ref={captchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        onChange={handleCaptchaChange}
                      />
                    </div>
                  </div>
                  <Separator />
                  <Button type="submit" className="w-full">
                    Sorgula
                  </Button>
                  <Button type="reset" variant="outline" className="w-full">
                    Temizle
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    // <div className="min-h-screen bg-indigo-200">
    //   <div className="grid place-items-center bg-[#F5F5F5] py-14 gap-5">
    //     <div className="relative">
    //       <div className="isolate aspect-video w-[25rem] sm:w-[35rem] md:w-[50rem] lg:w-[65rem] rounded-xl bg-white shadow-lg ring-1 ring-black/5">
    //         <h1 className="text-base  text-[#DC0D15] p-2 text-center font-semibold">
    //           Yabancıların Çalışma İzni, Çalışma İzni Muafiyeti ve Turkuaz Kart
    //           Bilgisi Sorgulama Sistemi
    //         </h1>
    //         <Separator />
    //         <div className=" w-full rounded-lg py-3 " />

    //         <form className="flex flex-col md:px-24 px-8 py-2 gap-3">
    //           <div className="flex flex-col  md:flex-row md:items-center md:justify-between gap-2  items-start ">
    //             <Label className="font-medium text-base pl-3">
    //               Başvuru Türü
    //             </Label>
    //             <Select onValueChange={handleSelectChange} name="basvuruSecimi">
    //               <SelectTrigger className="flex items-center h-9 w-full md:w-[300px] lg:w-[500px] rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
    //                 <SelectValue placeholder="Seçin" />
    //               </SelectTrigger>
    //               <SelectContent>
    //                 <SelectItem value="1">Çalışma İzni - e-İzin</SelectItem>
    //                 <SelectItem value="2">
    //                   Çalışma İzni Muafiyeti - e-Muafiyet
    //                 </SelectItem>
    //                 <SelectItem value="3">Turkuaz Kart</SelectItem>
    //               </SelectContent>
    //             </Select>
    //           </div>
    //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2  items-start">
    //             <Label className="font-medium text-base pl-3">
    //               Yabancı Kimlik / Referans Numarası
    //             </Label>
    //             <Input
    //               onChange={handleChange}
    //               name="yabanciKimlikNo"
    //               className="md:w-[300px] lg:w-[500px]"
    //             />
    //           </div>
    //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2  items-start">
    //             <Label className="font-medium text-base pl-3">
    //               Başvuru Numarası
    //             </Label>
    //             <Input
    //               onChange={handleChange}
    //               name="belgeNo"
    //               className="md:w-[300px] lg:w-[500px]"
    //             />
    //           </div>
    //           <div className="flex items-center justify-center ">
    //             <ReCAPTCHA
    //             className="transform scale-110"

    //               ref={captchaRef}
    //               sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
    //               onChange={handleCaptchaChange}
    //             />
    //           </div>

    //           <div className="flex flex-col md:flex-row justify-between md:w-[300px] lg:w-[500px] md:mx-[308px] lg:mx-[350px] gap-3">
    //             <Button
    //               type="submit"
    //               disabled={!captcha}
    //               variant="outline"
    //               className="w-full md:w-36 lg:w-56"
    //             >
    //               Sorgula
    //             </Button>
    //             <Button
    //               type="reset"
    //               variant="secondary"
    //               className="w-full md:w-36 lg:w-56"
    //             >
    //               Temizle
    //             </Button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
