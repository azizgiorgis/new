exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*", // ya da sadece "https://www.hozeproject.com"
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "OK",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: "Method Not Allowed",
    };
  }

  try {
    const data = JSON.parse(event.body);

    // Buraya form verisini işleme kodunu koyabilirsin (örnek: e-posta gönderme, webhook, vb.)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Form başarıyla alındı" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Sunucu hatası" }),
    };
  }
};
