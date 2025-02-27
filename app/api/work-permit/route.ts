import axios from 'axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { basvuruSecimi, belgeNo, yabanciKimlikNo, recaptchaToken } = data;
 
    console.log(basvuruSecimi,belgeNo,yabanciKimlikNo,recaptchaToken)

  if (!basvuruSecimi || !belgeNo || !yabanciKimlikNo) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `http://10.0.81.8:8282/api/izinSorgula/basvuruDTO?basvuruSecimi=${basvuruSecimi}&belgeNo=${belgeNo}&yabanciKimlikNo=${yabanciKimlikNo}&recaptchaToken=${recaptchaToken}`,
     
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
