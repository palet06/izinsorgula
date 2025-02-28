import { QueryResponseTypeExemption } from "@/lib/serveractions";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { format } from "date-fns";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const WorkPermitExemption = ({
  data,
}: {
  data: QueryResponseTypeExemption;
}) => {
  return (
    <>
      <Card className="mx-auto max-w-4xl overflow-hidden bg-[#F5F5F5] shadow-lg">
        <div className="p-6 md:p-8">
          {/* Header Section */}
          <div className="flex flex-col gap-6 items-center md:items-start md:flex-row">
            <div className="shrink-0">
              <Image
                src={
                  data.fotograf
                    ? `data:image/jpeg;base64,${data.fotograf}`
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
                    {data.ad} {data.soyad}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    <span className="font-semibold text-black">
                      Yabancı Kimlik Numarası :
                    </span>{" "}
                    {data.ykn}
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
                    {(data.dogumTarihi &&
                      format(data.dogumTarihi, "dd.MM.yyyy")) ||
                      "-"}
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-black">Uyruk :</span>{" "}
                    {data.uyruk}
                  </div>
                </div>
                <div className="col-span-1 grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div className="col-span-2">
                    <span className="font-semibold text-black">Baba Adı :</span>{" "}
                    {data.babaAdi}
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-black">Ana Adı :</span>{" "}
                    {data.anaAdi}
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
            Çalışma İzni Muafiyeti Bilgileri
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="mt-5">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Başvuru Numarası</div>
              <div>{data.belgeNo || "-"}</div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Muafiyet Türü</div>
              <div>{data.muafiyetTuru || "-"}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Başlangıç Tarihi</div>
              <div>
                {(data.baslangicTarihi &&
                  format(data.baslangicTarihi, "dd.MM.yyyy")) ||
                  "-"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Bitiş Tarihi</div>
              <div>
                {(data.bitisTarihi && format(data.bitisTarihi, "dd.MM.yyyy")) ||
                  "-"}{" "}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Sonlandırma Tarihi</div>
              <div>
                {(data.sonlandirmaTarihi &&
                  format(data.sonlandirmaTarihi, "dd.MM.yyyy")) ||
                  "-"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Geçerlilik Durumu</div>
              <div>{data.gecerlilikDurumu}</div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">İşyeri Unvanı</div>
              <div>{data.isyeriUnvani || "-"}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Yabancının Çalışma Adresi</div>
              <div>{data.calismaAdresi || "-"}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Görev</div>
              <div>{data.meslek || "-"}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default WorkPermitExemption;
