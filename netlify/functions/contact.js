// netlify/functions/contact.js

exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
    }
  
    try {
      const data = JSON.parse(event.body);
  
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Form başarıyla alındı!",
          received: data,
        }),
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "JSON çözümleme hatası",
          error: error.message,
        }),
      };
    }
  };
  