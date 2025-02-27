"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { useUrlSearchParams } from "use-url-search-params";
import { format } from "date-fns";

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
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  QueryResponseType,
  QueryResponseTypeExemption,
} from "@/lib/serveractions";
import axios from "axios";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import WorkPermitInfo from "@/components/appcomponents/WorkPermitInfo";
import WorkPermitExemption from "@/components/appcomponents/WorkPermitExemption";

export default function Page() {
  const [params] = useUrlSearchParams();
  const [belgeNoControl, setBelgeNoControl] = useState(false);
  const [workPermitExemptionData,setWorkPermitExemptionData] = useState< QueryResponseTypeExemption | null>(null);
  const [data, setData] = useState<
    QueryResponseType  | null
  >(null);
  const [hasResult, setHasResult] = useState(false);
  const [basvuruSecimi, setBasvuruSecimi] = useState<string>("");
  const [belgeNo, setBelgeNo] = useState("");
  const [yabanciKimlikNo, setYabanciKimlikNo] = useState("");
  const [captchaIsOk, setCaptchaIsOk] = useState(false);
  const [recaptchaToken, setCaptchaToken] = useState<string | null>(null);

  useEffect(() => {
    setBasvuruSecimi(
      (params.basvuruSecim || params.basvuruSecimi || "").toString()
    );
    setBelgeNo((params.belgeNo || params.basvuruNo || "").toString());
    setYabanciKimlikNo((params.yabanciKimlikNo || "").toString());
  }, [params]);

  const disabledBasvuruNoList = ["1", "2", "6"];
  const captchaRef = useRef(null);
  const clearForm = () => {
    setBasvuruSecimi("");
    setBelgeNo("");
    setYabanciKimlikNo("");
    setCaptchaIsOk(false);
    if (captchaRef.current) {
      captchaRef.current.reset();
    }

    setCaptchaToken(null);
    setData(null);
    setWorkPermitExemptionData(null)
    setHasResult(false); //burayı false yap
    setBelgeNoControl(false);
  };

  const handleSelectChange = (name) => {
    setBasvuruSecimi(name);
    if (disabledBasvuruNoList.includes(name)) {
      console.log("belgeno disabled true yapılıyor", basvuruSecimi);
      setBelgeNoControl(true);
    } else {
      setBelgeNoControl(false);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === "belgeNo") {
      setBelgeNo(value);
    } else if (name === "yabanciKimlikNo") {
      setYabanciKimlikNo(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (basvuruSecimi === "5") {
      axios
        .get(
          `https://emuafiyetapi.csgb.gov.tr/verifyExemption?belgeNo=${belgeNo}&ykn=${yabanciKimlikNo}`
        )
        .then((response) => {
          if (!response.data.data) {
            console.log("Kayıt bulunamadı."); //toast yap
          } else {
            console.log("Kayıt bulundu."); //toast yap
            console.log(response.data.data)
            setWorkPermitExemptionData(response.data.data as QueryResponseTypeExemption);
            setHasResult(true);
          }
        });
    }

    // try {
    //   const response = await axios.get(
    //     `${process.env
    //       .NEXT_PUBLIC_REMOTE_SERVER!}/api/izinSorgula/basvuruDTO?basvuruSecimi=${basvuruSecimi}&belgeNo=${belgeNo}&yabanciKimlikNo=${yabanciKimlikNo}&recaptchaToken=${recaptchaToken}`
    //   );

    //   if (!response.data) {
    //     throw new Error("Veri alınamadı");
    //   }

    //   setData(response.data);
    //   setHasResult(true);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleCatpchaChange = (token: string | null) => {
    if (token) {
      setCaptchaToken(token);
      setCaptchaIsOk(true);
    }
  };

  function handleExpired() {
    setCaptchaIsOk(false);
  }

  return (
    <>
      {!hasResult && (
        <div className="flex  w-full items-center justify-center p-6 md:p-10 ">
          <div className="w-full max-w-sm  shadow-lg ">
            <div className={cn("flex flex-col gap-6 ")}>
              <Card className="bg-[#F5F5F5]">
                <CardHeader>
                  <CardDescription className="text-center font-semibold text-black ">
                    Yabancıların Çalışma İzni, Çalışma İzni Muafiyeti ve Turkuaz
                    Kart Bilgisi Sorgulama Sistemi
                  </CardDescription>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="basvuruSecimi">Başvuru Türü</Label>
                        <Select
                          key={basvuruSecimi.toString()}
                          onValueChange={handleSelectChange}
                          name="basvuruSecimi"
                          value={basvuruSecimi.toString()}
                          required
                        >
                          <SelectTrigger className="bg-white text-left  flex items-center h-9 w-full  rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ">
                            <SelectValue
                              className="text-left"
                              placeholder="İzin Türü Seçiniz"
                            />
                          </SelectTrigger>

                          <SelectContent className="!bg-white">
                            <SelectItem value="0">
                              Çalışma İzni - e-İzin
                            </SelectItem>
                            <SelectItem value="5">
                              Çalışma İzni Muafiyeti - e-Muafiyet
                            </SelectItem>
                            <SelectItem value="2">Serbest Bölge</SelectItem>
                            <SelectItem value="1">
                              GK/UK - Mevsimlik Tarım ve Hayvancılık Muafiyeti
                            </SelectItem>
                            <SelectItem value="4">Turkuaz Kart</SelectItem>
                            <SelectItem value="6">
                              Muafiyet Bilgi Formu
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="yabanciKimlikNo">
                            Yabancı Kimlik / Referans Numarası
                          </Label>
                        </div>
                        <Input
                          className="bg-white"
                          value={yabanciKimlikNo}
                          name="yabanciKimlikNo"
                          type="text"
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="belgeNo">Başvuru Numarası</Label>
                        </div>
                        <Input
                          disabled={belgeNoControl}
                          className="bg-white"
                          value={belgeNo}
                          name="belgeNo"
                          type="text"
                          required={!belgeNoControl}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-center">
                          <ReCAPTCHA
                            className="transform scale-110"
                            ref={captchaRef}
                            sitekey={
                              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!
                            }
                            onChange={handleCatpchaChange}
                            onExpired={handleExpired}
                          />
                        </div>
                      </div>
                      <Separator />
                      <Button
                        disabled={!captchaIsOk}
                        type="submit"
                        className="w-full"
                      >
                        Sorgula
                      </Button>
                      <Button
                        onClick={() => clearForm()}
                        type="reset"
                        variant="outline"
                        className="w-full"
                      >
                        Temizle
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {data && !belgeNoControl  && 
        <div className=" min-h-screen bg-white p-4 md:p-8 gap-5">
          <div className="mx-auto max-w-4xl">
            <Button
              onClick={() => {
                setHasResult(false);
                clearForm();
              }}
              variant="ghost"
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Yeni Sorgulama
            </Button>
          </div>
          <WorkPermitInfo data={data as QueryResponseType} />
        </div>
      }

      {workPermitExemptionData && !belgeNoControl && 
        <div className=" min-h-screen bg-white p-4 md:p-8 gap-5">
          <div className="mx-auto max-w-4xl">
            <Button
              onClick={() => {
                setHasResult(false);
                clearForm();
              }}
              variant="ghost"
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Yeni Sorgulama
            </Button>
          </div>
          <WorkPermitExemption data={workPermitExemptionData as QueryResponseTypeExemption} />
        </div>
      }
      {/* <div className=" min-h-screen bg-white p-4 md:p-8 gap-5">
        <div className="mx-auto max-w-4xl">
          <Button
            onClick={() => {
              setHasResult(true);
              clearForm();
            }}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Yeni Sorgulama
          </Button>
        </div>

        <Card className="mx-auto max-w-4xl overflow-hidden bg-[#F5F5F5] shadow-lg">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6 items-center md:items-start md:flex-row">
              <div className="shrink-0">
                <Image
                  src="data:image/png;base64,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"
                  alt="Profile"
                  width={120}
                  height={120}
                  className="rounded-lg"
                />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-center md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">ELAMAN ISHENGAZIEV</h1>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-semibold text-black">
                        Yabancı Kimlik Numarası :
                      </span>{" "}
                      98044116610
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground place-items-end md:place-items-start">
                  <div className="col-span-1 grid grid-cols-1 gap-2 md:grid-cols-2 ">
                    <div className="col-span-2">
                      <span className="font-semibold text-black">
                        Doğum Tarihi :
                      </span>
                      18.07.1999
                    </div>
                    <div className="col-span-2">
                      <span className="font-semibold text-black">Uyruk :</span>{" "}
                      Kırgızistan
                    </div>
                  </div>
                  <div className="col-span-1 grid grid-cols-1 gap-2 md:grid-cols-2">
                    <div className="col-span-2">
                      <span className="font-semibold text-black">
                        Baba Adı :
                      </span>{" "}
                      ILICHBEK
                    </div>
                    <div className="col-span-2">
                      <span className="font-semibold text-black">
                        Ana Adı :
                      </span>{" "}
                      ELMIRA
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mx-auto max-w-4xl overflow-hidden bg-[#F5F5F5] shadow-lg mt-5">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Çalışma İzni Bilgileri
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="mt-5">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Çalışma İzni Türü</div>
                <div>Süreli</div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Veriliş Tarihi</div>
                <div>19.04.2024 </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">İzin Başlangıç Tarihi</div>
                <div>19.04.2024</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">İzin Bitiş Tarihi</div>
                <div>18.04.2025 </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">İzin Sonlandırma Tarihi</div>
                <div>19.11.2024 </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">İzin Geçerlilik Durum</div>
                <div className=" text-[#DC0D15]">İzin sonlandırılmıştır</div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">İşyeri Unvanı</div>
                <div>UTE HOLDİNG ANONİM ŞİRKETİ</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Yabancının Çalışma Adresi</div>
                <div>
                  BELEK Mah. İSKELE CADDESİ [ 10 / Z01 ] SERİK / ANTALYA
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Görev</div>
                <div>Servis Elemanı(Garson)</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Maaş</div>
                <div>20002.50 ₺</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Şerhler</div>
                <div>Şerh bulunmamaktadır</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}
    </>
  );
}
