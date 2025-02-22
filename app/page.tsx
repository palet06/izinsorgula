"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { SelectTrigger } from "@radix-ui/react-select";

export default function Page() {
  return (
    <div className="min-h-screen bg-indigo-200">
      <div className="grid place-items-center bg-[#F5F5F5] py-14 gap-5">
        <div className="relative">
          <div className="isolate aspect-video w-[25rem] rounded-xl bg-white shadow-lg ring-1 ring-black/5">
            <h1 className="text-sm text-[#DC0D15] p-2 text-center font-semibold">
              Yabancıların Çalışma İzni,Çalışma İzni Muafiyeti ve Turkuaz Kart
              Bilgisi Sorgulama Sistemi
            </h1>
            <Separator />
            <div className=" w-full rounded-lg py-3 " />
            {/* <Table>
              <TableBody>
                <TableRow >
                  <TableCell>Başvuru Türü</TableCell>
                  <TableCell>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Çalışma İzni - e-İzin</SelectItem>
                        <SelectItem value="dark">Çalışma İzni Muafiyeti - e-Muafiyet</SelectItem>
                        <SelectItem value="system">Turkuaz Kart</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Yabancı Kimlik / Referans Numarası</TableCell>
                  <TableCell>John</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Başvuru Numarası</TableCell>
                  <TableCell>Doe</TableCell>
                </TableRow>
              </TableBody>
            </Table> */}
            <div className="flex flex-col px-2 py-2 gap-3">
              <div className="flex flex-col gap-2  items-start">
                <Label>Başvuru Türü</Label>
                <Select >
                      <SelectTrigger className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" >
                        <SelectValue placeholder="Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Çalışma İzni - e-İzin</SelectItem>
                        <SelectItem value="dark">Çalışma İzni Muafiyeti - e-Muafiyet</SelectItem>
                        <SelectItem value="system">Turkuaz Kart</SelectItem>
                      </SelectContent>
                    </Select>
              </div>
              <div className="flex flex-col gap-2  items-start">
                <Label>Yabancı Kimlik Numarası</Label>
                <Input />
              </div>
              <div className="flex flex-col gap-2  items-start">
                <Label>Başvuru Numarası</Label>
                <Input />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
