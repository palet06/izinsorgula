"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { useUrlSearchParams } from "use-url-search-params";
import { useIntl } from "react-intl";
import { toast } from "sonner";

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
} from "@/components/ui/card";
import {
  QueryResponseType,
  QueryResponseTypeExemption,
} from "@/lib/serveractions";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import WorkPermitInfo from "@/components/appcomponents/WorkPermitInfo";
import WorkPermitExemption from "@/components/appcomponents/WorkPermitExemption";

export default function Page() {
  const { formatMessage } = useIntl();
  const [params] = useUrlSearchParams();
  const [belgeNoControl, setBelgeNoControl] = useState(false);
  const [workPermitExemptionData, setWorkPermitExemptionData] =
    useState<QueryResponseTypeExemption | null>(null);
  const [data, setData] = useState<QueryResponseType | null>(null);
  const [hasResult, setHasResult] = useState(false);
  const [basvuruSecimi, setBasvuruSecimi] = useState<string>("");
  const [belgeNo, setBelgeNo] = useState("");
  const [yabanciKimlikNo, setYabanciKimlikNo] = useState("");
  const [captchaIsOk, setCaptchaIsOk] = useState(false);
  const [recaptchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(Math.random());

  useEffect(() => {
    setBasvuruSecimi(
      (params.basvuruSecim || params.basvuruSecimi || "").toString()
    );
    setBelgeNo((params.belgeNo || params.basvuruNo || "").toString());
    setYabanciKimlikNo((params.yabanciKimlikNo || "").toString());
    setCaptchaKey(Math.random());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, formatMessage({ id: "recaptcha.lang" })]);

  const disabledBasvuruNoList = ["1"];
  const captchaRef = useRef<ReCAPTCHA | null>(null);

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
    setWorkPermitExemptionData(null);
    setHasResult(false); //burayı false yap
    setBelgeNoControl(false);
  };

  const handleSelectChange = (name: string) => {
    setBasvuruSecimi(name);
    if (disabledBasvuruNoList.includes(name)) {
      setBelgeNoControl(true);
    } else {
      setBelgeNoControl(false);
    }
  };

  const handleChange = ({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) => {
    if (name === "belgeNo") {
      setBelgeNo(value);
    } else if (name === "yabanciKimlikNo") {
      setYabanciKimlikNo(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!basvuruSecimi) {
      toast(formatMessage({ id: "error.message.basvurutur" }), {
        position: "top-center",
        style: { color: "red", justifyContent: "center" },
      });
      return;
    }
    if (basvuruSecimi === "5") {
      axios
        .get(
          `https://emuafiyetapi.csgb.gov.tr/verifyExemption?belgeNo=${belgeNo}&ykn=${yabanciKimlikNo}`
        )
        .then((response) => {
          if (!response.data.data) {
            toast(formatMessage({ id: "error.message.kayitbulunamadi" }), {
              position: "top-center",
              style: { color: "red", justifyContent: "center" },
            });
          } else {
            toast(formatMessage({ id: "error.message.kayitbulundu" }), {
              position: "top-center",
              duration: 1500,
              style: { color: "green", justifyContent: "center" },
              onAutoClose: () => {
                setWorkPermitExemptionData(
                  response.data as QueryResponseTypeExemption
                );
                setHasResult(true);
              },
            });
            console.log(response.data);
          }
        });
    } else if (basvuruSecimi === "6") {
      try {
        const response = await axios.get(
          `https://emuafiyetapi.csgb.gov.tr/verifyMb?belgeNo=${belgeNo}&ykn=${yabanciKimlikNo}`
        );

        if (!response.data.data) {
          toast(formatMessage({ id: "error.message.kayitbulunamadi" }), {
            position: "top-center",
            style: { color: "red", justifyContent: "center" },
          });
          return;
        }

        toast(formatMessage({ id: "error.message.kayitbulundu" }), {
          position: "top-center",
          duration: 1500,
          style: { color: "green", justifyContent: "center" },
          onAutoClose: () => {
            setWorkPermitExemptionData(
              response.data as QueryResponseTypeExemption
            );
            setHasResult(true);
          },
        });

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.get(
          `${process.env
            .NEXT_PUBLIC_REMOTE_SERVER!}/api/izinSorgula/basvuruDTO?basvuruSecimi=${basvuruSecimi}&belgeNo=${belgeNo}&yabanciKimlikNo=${yabanciKimlikNo}&recaptchaToken=${recaptchaToken}`
        );

        if (!response.data) {
          toast(formatMessage({ id: "error.message.kayitbulunamadi" }), {
            position: "top-center",
            style: { color: "red", justifyContent: "center" },
          });
          return;
        }

        toast(formatMessage({ id: "error.message.kayitbulundu" }), {
          position: "top-center",
          duration: 1500,
          style: { color: "green", justifyContent: "center" },
          onAutoClose: () => {
            setData(response.data as QueryResponseType);
            setHasResult(true);
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCatpchaChange = (token: string | null) => {
    if (token) {
      setCaptchaToken(token);

      setCaptchaIsOk(true);
    }
  };

  function handleExpired() {
    setCaptchaIsOk(false);
    setBelgeNoControl(true);
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
                    {formatMessage({ id: "site.name" })}
                  </CardDescription>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="basvuruSecimi">
                          {formatMessage({ id: "sorgu.basvuruTuruSecim" })}
                        </Label>
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
                              placeholder={formatMessage({
                                id: "sorgu.application.type",
                              })}
                            />
                          </SelectTrigger>

                          <SelectContent className="!bg-white">
                            <SelectItem value="0">
                              {formatMessage({ id: "sorgu.tur.calismaIzin" })}
                            </SelectItem>
                            <SelectItem value="5">
                              {formatMessage({ id: "sorgu.tur.emuafiyet" })}
                            </SelectItem>

                            <SelectItem value="2">
                              {formatMessage({
                                id: "sorgu.tur.serbestBolgeIzin",
                              })}
                            </SelectItem>
                            <SelectItem value="1">
                              {formatMessage({
                                id: "sorgu.tur.mevsimlikMuafiyet",
                              })}
                            </SelectItem>
                            <SelectItem value="4">
                              {formatMessage({ id: "sorgu.tur.turkuaz" })}
                            </SelectItem>
                            <SelectItem value="6">
                              {formatMessage({
                                id: "sorgu.tur.muafiyetBilgiFormu",
                              })}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="yabanciKimlikNo">
                            {formatMessage({ id: "sorgu.yknRefNo" })}
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
                          <Label htmlFor="belgeNo">
                            {formatMessage({ id: "sorgu.belgeNo" })}
                          </Label>
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
                            key={captchaKey}
                            className="transform scale-110"
                            hl={formatMessage({ id: "recaptcha.lang" })}
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
                        {formatMessage({ id: "sorgu.searchButton" })}
                      </Button>
                      <Button
                        onClick={() => clearForm()}
                        type="reset"
                        variant="outline"
                        className="w-full"
                      >
                        {formatMessage({ id: "sorgu.resetButton" })}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {data && (
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
              {formatMessage({ id: "button.yenisorgu" })}
            </Button>
          </div>
          <WorkPermitInfo data={data as QueryResponseType} />
        </div>
      )}

      {workPermitExemptionData && (
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
              {formatMessage({ id: "button.yenisorgu" })}
            </Button>
          </div>
          <WorkPermitExemption
            data={workPermitExemptionData as QueryResponseTypeExemption}
          />
        </div>
      )}
    </>
  );
}
