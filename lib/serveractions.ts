export interface QueryResponseType {
  basvuruId: string;
  basvuruTarihi: string;
  adUnvan: string;
  ad: string;
  soyad: string;
  anaAdi: string;
  babaAdi: string;
  durum: number;
  tarih: string;
  tcYabKimlikNo: string;
  cmId: string;
  dogumTarihi: string;
  ucret: string;
  sirketAdres: string;
  sektor: string;
  uyruk: string;
  gorev: string;
  calismaIzniTuru: string;
  izinBasTarihi: string;
  izinBitTarihi: string;
  verilisTarihi: string;
  izinTuru: string;
  sonlandirmaTarihi: string;
  izingecerlilikdurum: string;
  fotograf: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serhListesi: any[]; // Bu alanın tipi daha spesifik olarak belirlenebilir
}

export interface QueryResponseTypeExemption {
  success: boolean;
  message: string;
  data: {
    fotograf: string;
    ad: string;
    soyad: string;
    anaAdi: string;
    babaAdi: string;
    uyruk: string;
    dogumTarihi: string;
    ykn: string;
    belgeNo: string;
    muafiyetTuru: string;
    baslangicTarihi: string;
    bitisTarihi: string;
    sonlandirmaTarihi: string;
    gecerlilikDurumu: string;
    isyeriUnvani: string;
    calismaAdresi: string;
    meslek: string;
  };
}

export const getWorkPermit = async (
  basvuruSecimi: string,
  belgeNo: string,
  yabanciKimlikNo: string
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/work-permit?basvuruSecimi=${basvuruSecimi}&belgeNo=${belgeNo}&yabanciKimlikNo=${yabanciKimlikNo}`
    );

    if (!response.ok) {
      return { success: false, message: "Sorgulama sonucu kayıt bulunamadı." };
    }

    const data = await response.json();
    return { success: true, data: data as QueryResponseType };
  } catch (error) {
    return {
      success: false,
      message: `Sorgulama sırasında bir hata oluştu: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
    };
  }
};
