import axios from 'axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const basvuruSecimi = searchParams.get('basvuruSecimi');
  const belgeNo = searchParams.get('belgeNo');
  const yabanciKimlikNo = searchParams.get('yabanciKimlikNo');
  const recaptchaToken = searchParams.get('recaptchaToken');

  if (!basvuruSecimi || !belgeNo || !yabanciKimlikNo) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://ecalismaizni.csgb.gov.tr/api/izinSorgula/basvuruDTO?basvuruSecimi=${basvuruSecimi}&belgeNo=${belgeNo}&yabanciKimlikNo=${yabanciKimlikNo}&recaptchaToken=${recaptchaToken}`,
     {baseURL:"https://izinsorgula.csgb.gov.tr/"}
    );

    if (!response.data) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.data.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
