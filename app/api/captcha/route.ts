
import axios from "axios";

export async function POST(request: Request) {
  const data = await request.json()
  const { token } = data;
  
  if (!token) {
    return new Response(JSON.stringify({ message: "Token bulunamadı" }), {
      status: 405,
    });
  }

  try {
    const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SITE_KEY}&response=${token}`,
      );

      if (response.data.success) {
        return new Response(JSON.stringify({ message: "Success" }), {
          status: 200,
        });
      } else {
        return new Response(JSON.stringify({ message: "Doğrulanırken hata oluştu" }), {
          status: 405,
        });
      }
    
  } catch (error) {
    console.log(error);
  }
  
  return new Response(JSON.stringify({ message: "Server hatası. Doğrulanamadı" }), {
    status: 500,
  });
}
