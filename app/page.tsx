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
} from "@/components/ui/card";
import { getWorkPermit, QueryResponseType } from "@/lib/serveractions";
import axios from "axios";
type ResponseType = {
  success: boolean;
  message?:string;
  data?:QueryResponseType;
}

export default function Page() {
  const [data, setData] = useState<QueryResponseType|null>(null);
  const [basvuruSecimi, setBasvuruSecimi] = useState("");
  const [belgeNo, setBelgeNo] = useState("");
  const [yabanciKimlikNo, setYabanciKimlikNo] = useState("");
  const [captchaIsOk, setCaptchaIsOk] = useState(false);
  const [recaptchaToken, setCaptchaToken] = useState<string | null>(null);
  console.log("gelen data",data)

  const authAxios = axios.create({
    baseURL: "https://izinsorgula.csgb.gov.tr", //YOUR_API_URL HERE
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://izinsorgula.csgb.gov.tr',
        'Referer':'https://izinsorgula.csgb.gov.tr',
        'Access-Control-Allow-Headers': 'access-control-allow-headers,access-control-allow-methods,access-control-allow-origin',
        
    },
});


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

  const handleCaptchaSubmission = async (token) => {
    setCaptchaToken(token);
    try {
      const response = await fetch("/api/captcha", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      if (response.status === 200) {
        setCaptchaIsOk(true);
        setCaptchaToken(token)
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // try {
    //   const response: ResponseType = await axios.get("/api/work-permit",{params:{basvuruSecimi,belgeNo,yabanciKimlikNo,recaptchaToken: recaptchaToken}});
      
    
    //   if (response.success) {
    //    setData(response.data!);
    //   }

    // } catch (error) {
    //   console.log(error)
    // }

    try {
      const response = await authAxios.get(
        `https://ecalismaizni.csgb.gov.tr/api/izinSorgula/basvuruDTO?basvuruSecimi=${basvuruSecimi}&belgeNo=${belgeNo}&yabanciKimlikNo=${yabanciKimlikNo}&recaptchaToken=${recaptchaToken}`,
       
      );
  
      if (!response.data) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.data.json();
      
    } catch (error) {
      
    }
  }



  const handleCatpchaChange = (token: string | null) => {
    
    
    handleCaptchaSubmission(token);
  };

  function handleExpired() {
    setCaptchaIsOk(false);
  }

  console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)

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
              <form onSubmit={handleSubmit}>
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
                        <SelectItem value="0">Çalışma İzni - e-İzin</SelectItem>
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
                    <Input name="yabanciKimlikNo" type="text" required onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="belgeNo">Başvuru Numarası</Label>
                    </div>
                    <Input name="belgeNo" type="text" required  onChange={handleChange}/>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-center">
                      <ReCAPTCHA
                        className="transform scale-110"
                        ref={captchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        onChange={handleCatpchaChange}
                        onExpired={handleExpired}
                      />
                    </div>
                  </div>
                  <Separator />
                  <Button  type="submit" className="w-full">
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
   
  );
}
