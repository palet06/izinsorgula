import { QueryResponseTypeExemption } from "@/lib/serveractions";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { format } from "date-fns";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useIntl } from "react-intl";

const WorkPermitExemption = ({
  data,
}: {
  data: QueryResponseTypeExemption;
}) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <Card className="mx-auto max-w-4xl overflow-hidden bg-[#F5F5F5] shadow-lg">
        <div className="p-6 md:p-8">
          {/* Header Section */}
          <div className="flex flex-col gap-6 items-center md:items-start md:flex-row">
            <div className="shrink-0">
              <Image
                src={
                  data.data.fotograf
                    ? `data:image/jpeg;base64,${data.data.fotograf}`
                    : "avatar.svg"
                }
                alt="Profile"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">
                    {data.data.ad} {data.data.soyad}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    <span className="font-semibold text-black">
                      {formatMessage({ id: "kisi.yabTcNo"})} :
                    </span>{" "}
                    {data.data.ykn}
                  </p>
                </div>
              </div>
              <Separator />

              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground place-items-end md:place-items-start">
                <div className="col-span-1 grid grid-cols-1 gap-2 md:grid-cols-2 ">
                  <div className="col-span-2">
                    <span className="font-semibold text-black">
                      
                      {formatMessage({ id: "kisi.dogumTarihi"})} :
                      
                    </span>
                    {(data.data.dogumTarihi &&
                      format(data.data.dogumTarihi, "dd.MM.yyyy")) ||
                      "-"}
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-black">{formatMessage({ id: "kisi.uyruk"})} :</span>{" "}
                    {data.data.uyruk}
                  </div>
                </div>
                <div className="col-span-1 grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div className="col-span-2">
                    <span className="font-semibold text-black">{formatMessage({ id: "kisi.babaAd"})} :</span>{" "}
                    {data.data.babaAdi}
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-black">{formatMessage({ id: "kisi.anneAd"})} :</span>{" "}
                    {data.data.anaAdi}
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
           {formatMessage({ id: "calismaIzniMuafiyetiBilgileri"})} 
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="mt-5">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">{formatMessage({ id: "sorgu.belgeNo"})}</div>
              <div>{data.data.belgeNo || "-"}</div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">{formatMessage({ id: "muafiyet.workPermitExemptionType"})}</div>
              <div>{data.data.muafiyetTuru || "-"}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">{formatMessage({ id: "muafiyet.startDate"})}</div>
              <div>
                {(data.data.baslangicTarihi &&
                  format(data.data.baslangicTarihi, "dd.MM.yyyy")) ||
                  "-"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">{formatMessage({ id: "muafiyet.endDate"})}</div>
              <div>
                {(data.data.bitisTarihi && format(data.data.bitisTarihi, "dd.MM.yyyy")) ||
                  "-"}{" "}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">{formatMessage({ id: "muafiyet.terminationDate"})}</div>
              <div>
                {(data.data.sonlandirmaTarihi &&
                  format(data.data.sonlandirmaTarihi, "dd.MM.yyyy")) ||
                  "-"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">{formatMessage({ id: "muafiyet.validityState"})}</div>
              <div>{data.data.gecerlilikDurumu}</div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">{formatMessage({ id: "izin.companyTitle"})}</div>
              <div>{data.data.isyeriUnvani || "-"}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">{formatMessage({ id: "izin.workingAddress"})}</div>
              <div>{data.data.calismaAdresi || "-"}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">{formatMessage({ id: "izin.position"})}</div>
              <div>{data.data.meslek || "-"}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default WorkPermitExemption;
