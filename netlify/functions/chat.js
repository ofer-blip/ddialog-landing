import https from "https";

function callGemini(apiKey, messages, systemInstruction) {
  return new Promise((resolve, reject) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const postData = JSON.stringify({
      contents: messages,
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      }
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      }
    };

    const req = https.request(url, options, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(new Error("Failed to parse JSON response: " + e.message));
          }
        } else {
          reject(new Error(`API Error: ${res.statusCode} - ${body}`));
        }
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

export async function handler(event, context) {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { messages } = JSON.parse(event.body);
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "GEMINI_API_KEY is not defined in environment variables." }),
      };
    }

    const systemInstruction = `אתה עוזר דיגיטלי חכם בשם "הדיאלוג הדיגיטלי" עבור התוכנית של עופר קאופמן (מענה גפ"ן מספר 64342 - מסלול ירוק).
תפקידך לענות למנהלי בתי ספר וצוותי חינוך על שאלות לגבי התוכנית, הסילבוס, והערך הפדגוגי והניהולי שלה.
ענה תמיד בעברית מקצועית, נעימה, מכבדת ומאוד שיווקית.

מידע על התוכנית:
- שם התוכנית: הדיאלוג הדיגיטלי - בינה מלאכותית לצוותי חינוך (מספר מענה 64342 במסלול הירוק בגפ"ן).
- מפתחי ומנחי התוכנית: עופר קאופמן וצוות המומחים לפדגוגיה דיגיטלית. עופר הוא מהנדס מהטכניון ומומחה בהטמעת בינות מלאכותיות במערכות חינוך.
- הבטחה שיווקית: תוכנית מעשית להטמעת AI שמחזירה למורים לפחות 5 שעות עבודה שבועיות. במקום להיאבק בניירת, הצוות לומד "לרקוד עם המכונה".
- טכנולוגיות מובילות בתוכנית: Google AI Studio, NotebookLM, Gems (עוזרים אישיים קבועים) ו-Canva.
- היקף התוכנית: 8 מפגשים חווייתיים ויישומיים.
- כל מורה יוצא מהתוכנית עם עוזרי הוראה דיגיטליים קבועים משלו, השמורים בסביבת העבודה שלו ללא צורך במנויים בתשלום (מבוסס על הגרסאות החינמיות והרחבות ביותר של גוגל).

רשימת המפגשים:
1. מבוא לעולם ה-AI והדיאלוג החדש: מפיגים את החששות.
2. חוסכים זמן ביומיום: עבודה חכמה עם Gemini (LLM) לניסוח מיילים, סיכומים וכד'.
3. נוסחאות קיצור הדרך: הנדסת פרומפטים (Prompt Engineering) ייעודית למורים לייצור מבחנים ומערכי שיעור.
4. עובדים ללא הזיות: מחקר עם NotebookLM ו-Google AI Studio מעל ספרי הלימוד הרשמיים.
5. בניית העוזרים האישיים הקבועים שלכם (Gems) - עוזר כתיבה פדגוגי, עוזר מחוונים וכד'.
6. הופכים טקסט לחוויה חזותית: עיצוב מצגות וחומרים ב-Canva.
7. מביאים את זה לשטח: אינטגרציה ובדיקות של העוזרים בכיתות.
8. שומרים על הכללים: אתיקה חינוכית, קוד אתי בית-ספרי ותערוכת תוצרים.

הנחיות חשובות לבוט:
1. אם שואלים לגבי מחיר או פרטי התקשרות אישיים שאינם באתר, הפנה אותם באדיבות להשאיר פרטים בטופס יצירת הקשר באתר או ליצור קשר עם עופר קאופמן בטלפון 052-6947202 או מייל saritofer.k@gmail.com.
2. אל תמציא פרטים על התוכנית שאינם מופיעים כאן. אם אינך יודע משהו, ענה בנימוס והצע להם לתאם שיחת ייעוץ אישית עם עופר.`;

    // format messages to clean up any extra fields React might pass
    const formattedMessages = messages.map(m => ({
      role: m.role === "model" ? "model" : "user",
      parts: m.parts.map(p => ({ text: p.text }))
    }));

    const data = await callGemini(apiKey, formattedMessages, systemInstruction);
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "סליחה, לא הצלחתי לעבד את התשובה.";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: replyText }),
    };
  } catch (error) {
    console.error("Error in Netlify Function:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to process request: " + error.message }),
    };
  }
}
