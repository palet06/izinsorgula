import { Separator } from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import Image from "next/image";
import { QueryResponseType } from "@/lib/serveractions";

const WorkPermitInfo = ({data}:{data:QueryResponseType}) => {
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
                    {data.tcYabKimlikNo}
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
            Çalışma İzni Bilgileri
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="mt-5">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Çalışma İzni Türü</div>
              <div>{data.izinTuru || "-"}</div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Veriliş Tarihi</div>
              <div>
                {(data.verilisTarihi &&
                  format(data.verilisTarihi, "dd.MM.yyyy")) ||
                  "-"}{" "}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">İzin Başlangıç Tarihi</div>
              <div>
                {(data.izinBasTarihi &&
                  format(data.izinBasTarihi, "dd.MM.yyyy")) ||
                  "-"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">İzin Bitiş Tarihi</div>
              <div>
                {(data.izinBitTarihi &&
                  format(data.izinBitTarihi, "dd.MM.yyyy")) ||
                  "-"}{" "}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">İzin Sonlandırma Tarihi</div>
              <div>
                {(data.sonlandirmaTarihi &&
                  format(data.sonlandirmaTarihi, "dd.MM.yyyy")) ||
                  "-"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">İzin Geçerlilik Durum</div>
              <div
                className={`${
                  data.izingecerlilikdurum.includes("Değerlendirme") &&
                  "text-yellow-700"
                } ${
                  data.izingecerlilikdurum.includes("Sonlan") &&
                  "text-[#DC0D15]"
                }`}
              >
                {data.izingecerlilikdurum}
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">İşyeri Unvanı</div>
              <div>{data.adUnvan || "-"}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Yabancının Çalışma Adresi</div>
              <div>{data.sirketAdres || "-"}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Görev</div>
              <div>{data.gorev || "-"}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Maaş</div>
              <div>{(data.ucret && data.ucret) || "-"}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Şerhler</div>
              <div>
                {(data.serhListesi.length > 0 && (
                  <ul>
                    {data.serhListesi.map((serh, i) => (
                      <li key={i}>{serh}</li>
                    ))}
                  </ul>
                )) ||
                  "-"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default WorkPermitInfo;
