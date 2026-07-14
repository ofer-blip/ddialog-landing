import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Printer, 
  CheckCircle, 
  ChevronDown, 
  Clock, 
  GraduationCap, 
  Flame, 
  BrainCircuit, 
  ShieldAlert, 
  BookOpen, 
  PiggyBank, 
  Phone, 
  Mail, 
  Award, 
  Copy, 
  Sparkle, 
  Check, 
  User, 
  Search, 
  Layers,
  X,
  Send
} from "lucide-react";

interface SessionInfo {
  id: number;
  title: string;
  value: string;
  deliverable: string;
}

export default function App() {
  const [openSessions, setOpenSessions] = useState<Record<number, boolean>>({
    1: true, // Session 1 open by default
  });
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    school: "",
    contact: "",
    email: "",
    track: "מסלול ב': מודל קפסולה",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Chatbot states
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "model"; parts: { text: string }[] }[]
  >([
    {
      role: "model",
      parts: [
        {
          text: 'שלום! אני העוזר הדיגיטלי של תוכנית "הדיאלוג הדיגיטלי" (גפ"ן 64342). אשמח לענות לכם על כל שאלה לגבי המפגשים, התכנים והערך של התוכנית לבית הספר שלכם. במה אוכל לעזור?'
        }
      ]
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isChatFloatingOpen, setIsChatFloatingOpen] = useState(false);

  const quickQuestions = [
    "איך זה חוסך זמן למורים?",
    "מה לומדים במפגשים?",
    "האם צריך לשלם על מנויים?",
    "כיצד התוכנית מאושרת בגפ\"ן?"
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isChatLoading) return;

    const userMessage = { role: "user" as const, parts: [{ text: textToSend }] };
    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);
    setChatInput("");
    setIsChatLoading(true);

    try {
      let fetchUrl = "/.netlify/functions/chat";
      let bodyData: any = { messages: updatedMessages.map(m => ({ role: m.role, parts: m.parts })) };
      let headersData: any = { "Content-Type": "application/json" };

      // Fallback for local development if VITE_GEMINI_API_KEY is defined in .env.local
      const localKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (import.meta.env.DEV && localKey) {
        fetchUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${localKey}`;
        bodyData = {
          contents: updatedMessages.map(m => ({
            role: m.role === "model" ? "model" : "user",
            parts: m.parts
          })),
          systemInstruction: {
            parts: [
              {
                text: `אתה עוזר דיגיטלי חכם בשם "הדיאלוג הדיגיטלי" עבור התוכנית של עופר קאופמן (מענה גפ"ן מספר 64342 - מסלול ירוק).
תפקידך לענות למנהלי בתי ספר וצוותי חינוך על שאלות לגבי התוכנית, הסילבוס, והערך הפדגוגי והניהולי שלה.
ענה תמיד בעברית מקצועית, נעימה, מכבדת ומאוד שיווקית.

מידע על התוכנית:
- שם התוכנית: הדיאלוג הדיגיטלי - בינה מלאכותית לצוותי חינוך (מספר מענה 64342 במסלול הירוק בגפ"ן).
- מפתחי ומנחי התוכנית: עופר קאופמן וצוות המומחים לפדגוגיה דיגיטלית. עופר הוא מהנדס מהטכניון ומומחה בהטמעת בינות מלאכותיות במערכות חינוך.
- הבטחה שיווקית: תוכנית מעשית להטמעת AI שחוסכת למורים שעות עבודה שבועיות רבות ומפנה להם זמן יקר. במקום להיאבק בניירת, הצוות לומד "לרקוד עם המכונה".
- התאמה לחינוך מיוחד ושילוב: התוכנית מציעה התאמה ייחודית ומלאה לחינוך מיוחד, עם דגש על יצירת עוזרי הוראה לכתיבת יעדי תל"א (תכנית לימודים אישית) באופן מהיר ומבוקר, פישוט לשוני של חומרים והנגשת תכני לימוד.
- טכנולוגיות מובילות בתוכנית: Google AI Studio, NotebookLM, Gems (עוזרים אישיים קבועים) ו-Canva.
- היקף התוכנית: 8 מפגשים חווייתיים ויישומיים.
- כל מורה יוצא מהתוכנית עם עוזרי הוראה דיגיטליים קבועים משלו, השמורים בסביבת העבודה שלו ללא צורך במנויים בתשלום (מבוסס על הגרסאות החינמיות והרחבות ביותר של גוגל).

רשימת המפגשים:
1. מבוא לעולם ה-AI והדיאלוג החדש: מפיגים את החששות.
2. חוסכים זמן ביומיום: עבודה חכמה עם Gemini (LLM) לניסוח מיילים, סיכומים וכד'.
3. נוסחאות קיצור הדרך: הנדסת פרומפטים (Prompt Engineering) ייעודית למורים לייצור מבחנים ומערכי שיעור.
4. עובדים ללא הזיות: מחקר עם NotebookLM ו-Google AI Studio מעל ספרי הלימוד הרשמיים.
5. בניית העוזרים האישיים הקבועים שלכם (Gems) - עוזר כתיבה פדגוגי, עוזר מחוונים, ועוזרי תל"א דיפרנציאליים לחינוך מיוחד.
6. הופכים טקסט לחוויה חזותית: עיצוב מצגות וחומרים ב-Canva.
7. מביאים את זה לשטח: אינטגרציה ובדיקות של העוזרים בכיתות.
8. שומרים על הכללים: אתיקה חינוכית, קוד אתי בית-ספרי ותערוכת תוצרים.

הנחיות חשובות לבוט:
1. אם שואלים לגבי מחיר או פרטי התקשרות אישיים שאינם באתר, הפנה אותם באדיבות להשאיר פרטים בטופס יצירת הקשר באתר או ליצור קשר עם עופר קאופמן בטלפון 052-6947202 או מייל saritofer.k@gmail.com.
2. תמוך והדגש את הערך המוסף העצום של התוכנית לחינוך מיוחד, במיוחד בהקשר של כתיבת תל"א ופישוט תכנים, במידה והנושא עולה.
3. אל תמציא פרטים על התוכנית שאינם מופיעים כאן. אם אינך יודע משהו, ענה בנימוס והצע להם לתאם שיחת ייעוץ אישית עם עופר.`
              }
            ]
          }
        };
      }

      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: headersData,
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();
      let replyText = "";
      
      if (import.meta.env.DEV && localKey) {
        replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "סליחה, משהו השתבש בעיבוד התשובה.";
      } else {
        replyText = data.reply || "סליחה, משהו השתבש בעיבוד התשובה.";
      }

      setChatMessages((prev) => [...prev, { role: "model" as const, parts: [{ text: replyText }] }]);
    } catch (error) {
      console.error("Chatbot API error:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "model" as const,
          parts: [{ text: "סליחה, אירעה שגיאה בחיבור לעוזר הדיגיטלי. אנא נסה שנית מאוחר יותר." }]
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };
/*
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };
*/
const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // זה ה-URL שקיבלת מה-Deploy של ה-Apps Script
   const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwidxZytHsZTDRJ-AHzu5bA6_B0CMzMnJ8uB0XfCUJjzkS-kgiM9hPSXyGB7ObP8hciZw/exec"; 

    try {
      // שימוש ב-URLSearchParams כדי לשלוח כ-application/x-www-form-urlencoded
      // זו השיטה היחידה שבה Google Apps Script (doPost) יודע לקרוא את הפרטים בצורה אמינה
      const searchParams = new URLSearchParams();
      searchParams.append("name", formData.name);
      searchParams.append("role", formData.role);
      searchParams.append("school", formData.school);
      searchParams.append("contact", formData.contact);
      searchParams.append("email", formData.email); 
      searchParams.append("track", formData.track);
      searchParams.append("notes", formData.notes);
      searchParams.append("formType", "מורחב");

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // חשוב למניעת בעיות CORS בדפדפן
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: searchParams.toString()
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("שגיאה בשליחת הטופס:", error);
      alert("משהו השתבש, אנא נסה שוב.");
    }
  };
  const sessions: SessionInfo[] = [
    {
      id: 1,
      title: "מבוא לעולם ה-AI והדיאלוג החדש: מפיגים את החששות",
      value: "בניית הבנה יסודית של עולם ה-AI, הפגת חששות ויצירת דיאלוג ראשוני פורה מול מודלי השפה של גוגל. נבין כיצד ה-AI יכול להפוך משותף מאיים לעוזר יומיומי נאמן, ונדון בהזדמנויות ובמגבלות הטכנולוגיה בעשייה הפדגוגית.",
      deliverable: "הפגת החשש הראשוני בקרב הצוות, יצירת תודעת יעילות ומעבר מיידי להתנסות אישית ראשונה בכיתה.",
    },
    {
      id: 2,
      title: "חוסכים זמן ביומיום: עבודה חכמה עם מודלי Gemini (LLM)",
      value: "היכרות מעמיקה עם מודל ה-LLM של גוגל (Gemini) ולמידת העקרונות לתקשורת אפקטיבית. נתרגל ייעול משימות שוטפות שלוקחות שעות: ניסוח מיילים רגישים להורים, סיכום פרוטוקולים ארוכים ויצירת מענים מהירים ומקצועיים.",
      deliverable: "התקנת סביבת עבודה אישית פועלת ופתרון מעשי של 3 משימות ניהוליות יומיומיות של המורה בשטח.",
    },
    {
      id: 3,
      title: "נוסחאות קיצור הדרך: הנדסת פרומפטים (Prompt Engineering) למורים",
      value: "מעבר משיח חובבני של ניסוי וטעייה לכתיבה מקצועית ושיטתית של הנחיות. המורים ילמדו את 'נוסחאות הפרומפט' המדויקות שמפיקות תוצרים פדגוגיים מרהיבים, מבחנים ממוקדים ומערכי שיעור מותאמים בשבריר מהזמן.",
      deliverable: "בנק פרומפטים מותאם אישית לכל מורה, מוכן לשימוש מיידי במקצוע ההוראה שלו.",
    },
    {
      id: 4,
      title: "עובדים ללא הזיות: מחקר עם NotebookLM ו-Google AI Studio",
      value: "מעבר מעשי לעבודה עם Google AI Studio וסביבת NotebookLM כדי להעלות סילבוסים, ספרי לימוד ותוכניות עבודה של משרד החינוך. המורים ילמדו לעבוד מול חומרי הלימוד הרשמיים שלהם באופן מבוקר ובטוח, ללא המצאת נתונים (Hallucinations).",
      deliverable: "הקמת סביבת מחקר וסיכום אישית ומאובטחת לכל מורה, המבוססת על חומרי הלימוד הרשמיים שלו.",
    },
    {
      id: 5,
      title: "בניית העוזרים האישיים הקבועים שלכם (Custom Gems)",
      value: "למידת הדרך להגדיר למודל את תפקידו המדויק ואת מגבלותיו באמצעות System Instructions, ופיתוח סוכני Gems אישיים קבועים (כמו: 'עוזר לכתיבת יעדי תל\"א מותאמים אישית לחינוך מיוחד', 'סוכן לבניית מערכי שיעור דיפרנציאליים', או 'סוכן למשוב פדגוגי מעצים').",
      deliverable: "יצירת Gems אישיים קבועים (כולל עוזר תל\"א אישי ומאובטח) השמורים בסביבת העבודה של המורה וחוסכים לו שעות עבודה שבועיות רבות.",
    },
    {
      id: 6,
      title: "הופכים טקסט לחוויה חזותית: עיצוב ב-Canva",
      value: "הפיכת רעיונות ומערכי שיעור יבשים למדיה מרתקת. למידה מעשית של כלי העיצוב הפופולרי Canva כדי לייצר מצגות דינמיות, כרזות, עזרים חזותיים וחומרי לימוד מרהיבים שיוצרים חיבור רגשי ואסתטי חזק אצל התלמידים.",
      deliverable: "יצירת חבילת חומרי למידה מעוצבים ומותאמים אישית לפתיחת שנת הלימודים הבאה.",
    },
    {
      id: 7,
      title: "מביאים את זה לשטח: אינטגרציה ובדיקות בכיתות",
      value: "מפגש עבודה מעשי שכולו מוקדש ליישום, הטמעה ובדיקה בשטח של עוזרי ההוראה, ה-Gems וסביבות ה-NotebookLM שפותחו. ליווי צמוד של המנחה כדי לוודא שכל הפתרונות מותאמים לצרכי המורים ורמת הכיתות שלהם.",
      deliverable: "פרויקט פועל ומנוסה המוכן להפעלה ישירה מול תלמידים או הנהלה בשבועות הראשונים של השנה.",
    },
    {
      id: 8,
      title: "שומרים על הכללים: אתיקה חינוכית ותערוכת תוצרים",
      value: "מפגש שיא שבו הצוות מציג את עוזרי ההוראה החדשים שלו. בנוסף, נגבש יחד קוד אתי בית-ספרי שישמש מצפן מוסדי לעבודה נכונה, שמירה על אבטחת מידע, פרטיות התלמידים וזכויות יוצרים בהתאם להנחיות המשרד.",
      deliverable: "מסמך קוד אתי מוסדי מוכן להפצה לצוות ולהורים, ותערוכת תוצרים בית-ספרית מעוררת השראה.",
    },
  ];

  const toggleSession = (id: number) => {
    setOpenSessions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded = sessions.reduce((acc, curr) => {
      acc[curr.id] = true;
      return acc;
    }, {} as Record<number, boolean>);
    setOpenSessions(allExpanded);
  };

  const collapseAll = () => {
    setOpenSessions({});
  };

  const handleCopyLink = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => {
      setCopiedText(null);
    }, 2500);
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans antialiased text-right" dir="rtl" id="app_root">
      
      {/* Toast Notification for copying */}
      <AnimatePresence>
        {copiedText && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            style={{ left: "50%" }}
            className="fixed bottom-6 z-50 bg-slate-900 border border-slate-700 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm no-print"
            id="toast_copied"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>הועתק: {copiedText}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm no-print flex items-center justify-center p-4" id="contact_modal_overlay">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative text-right"
              id="contact_modal_content"
              dir="rtl"
            >
              {/* Close button */}
              <button 
                type="button"
                onClick={() => {
                  setIsContactOpen(false);
                  setIsSubmitted(false);
                  setFormData({ name: "", role: "", school: "", contact: "", email: "", track: "מסלול ב': מודל קפסולה", notes: "" });
                }}
                className="absolute top-4 left-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                id="close_contact_modal_btn"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="text-center space-y-1.5 pb-2 border-b border-slate-100">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">
                      ✉️
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900">צור קשר והתאמה אישית</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      נשמח להתאים את התוכנית עבור בית הספר שלכם. מלאו את הפרטים ונחזור אליכם בהקדם!
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label htmlFor="form_name" className="text-xs font-bold text-slate-700 block">שם מלא *</label>
                      <input 
                        type="text"
                        id="form_name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="ישראל ישראלי"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                      />
                    </div>

                    {/* Role */}
                    <div className="space-y-1">
                      <label htmlFor="form_role" className="text-xs font-bold text-slate-700 block">תפקיד *</label>
                      <input 
                        type="text"
                        id="form_role"
                        required
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="מנהל/ת בית ספר, רכז/ת פדגוגי וכד'"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                      />
                    </div>

                    {/* School Name */}
                    <div className="space-y-1">
                      <label htmlFor="form_school" className="text-xs font-bold text-slate-700 block">שם מוסד / בית ספר *</label>
                      <input 
                        type="text"
                        id="form_school"
                        required
                        value={formData.school}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                        placeholder="שם בית הספר או הארגון"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                      />
                    </div>

                    {/* Contact phone */}
                    <div className="space-y-1">
                      <label htmlFor="form_contact" className="text-xs font-bold text-slate-700 block">טלפון ליצירת קשר *</label>
                      <input 
                        type="text"
                        id="form_contact"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="לדוגמה: 050-1234567"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label htmlFor="form_email" className="text-xs font-bold text-slate-700 block">אימייל</label>
                      <input 
                        type="email"
                        id="form_email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                      />
                    </div>

                    {/* Preferred Track selection */}
                    <div className="space-y-1">
                      <label htmlFor="form_track" className="text-xs font-bold text-slate-700 block">מסלול מועדף *</label>
                      <select 
                        id="form_track"
                        required
                        value={formData.track}
                        onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none bg-white"
                      >
                        <option value="מסלול א': הרצאת השראה וחשיפה">מסלול א': הרצאת השראה וחשיפה (חד-פעמי)</option>
                        <option value="מסלול ב': מודל קפסולה">מסלול ב': מודל קפסולה (פיילוט של 8 מפגשים)</option>
                        <option value="מסלול ג': ארכיטקטורה וליווי שנתי">מסלול ג': ארכיטקטורה וליווי שנתי (הטמעה מלאה)</option>
                      </select>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1">
                      <label htmlFor="form_notes" className="text-xs font-bold text-slate-700 block">הערות ובקשות מיוחדות</label>
                      <textarea 
                        id="form_notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="ספרו לנו על צרכים מיוחדים של בית הספר שלכם..."
                        rows={3}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none resize-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-xl transition cursor-pointer active:scale-98 shadow-md flex items-center justify-center gap-2"
                    id="submit_contact_form"
                  >
                    <Send className="w-4 h-4 shrink-0" />
                    <span>שלח פנייה</span>
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="text-center py-6 space-y-4"
                  id="success_contact_view"
                >
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold animate-bounce">
                    ✓
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">הפנייה נשלחה בהצלחה!</h3>
                  <p className="text-slate-600 text-sm max-w-xs mx-auto leading-relaxed">
                    תודה, <strong>{formData.name}</strong> ({formData.role} במוסד {formData.school}).
                    <br />
                    פרטי ההתקשרות והבחירה ב<strong>{formData.track}</strong> התקבלו בהצלחה.
                    <br />
                    נחזור אליכם בהקדם לטלפון: {formData.contact} {formData.email && `או לאימייל: ${formData.email}`}
                  </p>
                  
                  <button 
                    onClick={() => {
                      setIsContactOpen(false);
                      setIsSubmitted(false);
                      setFormData({ name: "", role: "", school: "", contact: "", email: "", track: "מסלול ב': מודל קפסולה", notes: "" });
                    }}
                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer active:scale-95"
                    id="close_success_modal_btn"
                  >
                    סגור
                  </button>
                </motion.div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm no-print" id="app_header">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            {/* SVG Logo */}
            <div className="w-10 h-10 flex-shrink-0" id="header_logo">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-sm transition-all duration-300 hover:rotate-6">
                <defs>
                  <linearGradient id="nav-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a73e8" />
                    <stop offset="60%" stopColor="#7d2ae8" />
                    <stop offset="100%" stopColor="#00c4cc" />
                  </linearGradient>
                </defs>
                <path d="M17 11C11.48 11 7 15.48 7 21C7 23.87 8.2 26.45 10.14 28.28L9.04 33.78C8.9 34.43 9.57 34.98 10.19 34.69L15.77 32.1C16.17 32.16 16.58 32.2 17 32.2C22.52 32.2 27 27.72 27 22.2C27 16.68 22.52 11 17 11Z" fill="url(#nav-logo-grad)" opacity="0.8"/>
                <path d="M31 15C25.48 15 21 19.48 21 25C21 25.42 21.03 25.83 21.1 26.23L18.51 31.81C18.22 32.43 18.77 33.1 19.42 32.96L24.92 31.86C26.75 33.8 29.33 35 32.2 35C37.72 35 42.2 30.52 42.2 25C42.2 19.48 37.72 15 31 15Z" fill="url(#nav-logo-grad)"/>
                <path d="M29 21L30.1 23.9L33 25L30.1 26.1L29 29L27.9 26.1L25 25L27.9 23.9L29 21Z" fill="#ffffff" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight" id="header_title">הדיאלוג הדיגיטלי</h1>
              <p className="text-xs text-slate-500 font-medium" id="header_subtitle">מספר תוכנית גפ"ן: 64342 • מסלול ירוק</p>
            </div>
          </div>

          <div id="header_actions">
            <button 
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer transform active:scale-95"
              id="btn_print"
            >
              <Printer className="w-4 h-4" />
              <span>שמירה כ-PDF / הדפסה</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12" id="main_content">
        
        {/* Hero Section */}
        <section className="relative bg-white rounded-3xl p-6 md:p-12 border border-slate-100 shadow-sm overflow-hidden" id="hero_section">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full filter blur-3xl -z-10 opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full filter blur-3xl -z-10 opacity-70"></div>
          
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-8">
            <div className="flex-1 space-y-6">
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2.5 w-full overflow-hidden" id="hero_badges">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 break-words max-w-full">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  מאושר גפ"ן - מסלול ירוק
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 break-words max-w-full">
                  <Award className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  תת-סל: חדשנות ויזמות טכנולוגית
                </span>
              </div>
              
              {/* Main Headline & Logo */}
              <div className="flex flex-col-reverse md:flex-row md:items-start justify-between gap-6" id="hero_title_group">
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-[1.25]">
                  המורים שלך קורסים מהעומס? <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">הפוך את ה-AI לעוזר ההוראה</span> האישי שלהם
                </h2>
                
                {/* Embedded Big SVG Logo */}
                <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 bg-slate-50 p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-center cursor-pointer hover:scale-105 transition-transform" id="hero_logo">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-md">
                    <defs>
                      <linearGradient id="hero-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1a73e8" />
                        <stop offset="60%" stopColor="#7d2ae8" />
                        <stop offset="100%" stopColor="#00c4cc" />
                      </linearGradient>
                    </defs>
                    <path d="M17 11C11.48 11 7 15.48 7 21C7 23.87 8.2 26.45 10.14 28.28L9.04 33.78C8.9 34.43 9.57 34.98 10.19 34.69L15.77 32.1C16.17 32.16 16.58 32.2 17 32.2C22.52 32.2 27 27.72 27 22.2C27 16.68 22.52 11 17 11Z" fill="url(#hero-logo-grad)" opacity="0.8"/>
                    <path d="M31 15C25.48 15 21 19.48 21 25C21 25.42 21.03 25.83 21.1 26.23L18.51 31.81C18.22 32.43 18.77 33.1 19.42 32.96L24.92 31.86C26.75 33.8 29.33 35 32.2 35C37.72 35 42.2 30.52 42.2 25C42.2 19.48 37.72 15 31 15Z" fill="url(#hero-logo-grad)"/>
                    <path d="M29 21L30.1 23.9L33 25L30.1 26.1L29 29L27.9 26.1L25 25L27.9 23.9L29 21Z" fill="#ffffff"/>
                  </svg>
                </div>
              </div>

              {/* Subtitle description with key technologies highlighted */}
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl" id="hero_desc">
                תוכנית הטמעה מעשית (מספר 64342 בגפ"ן) שחוסכת למורים שעות עבודה שבועיות רבות ומפנה להם זמן יקר. במקום להיאבק בניירת, הצוות שלך ילמד <strong className="text-indigo-600 font-bold bg-indigo-50/50 px-1 py-0.5 rounded">לרקוד עם המכונה</strong> – לפתח סוכני AI מותאמים אישית (<strong className="text-indigo-600 font-bold bg-indigo-50/50 px-1 py-0.5 rounded">Gems</strong>) ב- <strong className="text-indigo-600 font-bold bg-indigo-50/50 px-1 py-0.5 rounded">Google AI Studio</strong> ולחקור באופן מאובטח ומבוקר מעל ספרי הלימוד הרשמיים בעזרת <strong className="text-indigo-600 font-bold bg-indigo-50/50 px-1 py-0.5 rounded">NotebookLM</strong>, לצד שילוב כלי העזר החזותיים של <strong className="text-indigo-600 font-bold bg-indigo-50/50 px-1 py-0.5 rounded">Canva</strong>.
              </p>

              {/* Stats/Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100" id="hero_stats">
                <div>
                  <p className="text-xs text-slate-400 font-semibold mb-1">מספר תוכנית בגפ"ן</p>
                  <p className="text-2xl font-bold text-slate-800 tracking-tight">64342</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold mb-1">היקף התוכנית</p>
                  <p className="text-2xl font-bold text-slate-800">8 מפגשים חווייתיים</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-xs text-slate-400 font-semibold mb-1">טכנולוגיות מובילות</p>
                  <p className="text-sm font-bold text-indigo-600 mt-1 leading-snug">Google AI Studio, NotebookLM, Gems & Canva</p>
                </div>
              </div>

            </div>

            {/* Visual Side Card */}
            <div className="w-full lg:w-80 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center space-y-5" id="hero_side_card">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-md border border-slate-100/80 transition-transform duration-300 hover:scale-105">
                  {/* Google Custom Style G */}
                  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.24 10.285V14.4h6.887c-.275 1.564-1.88 4.604-6.887 4.604-4.33 0-7.86-3.577-7.86-8s3.53-8 7.86-8c2.46 0 4.105 1.025 5.047 1.926l3.243-3.117C18.435 1.21 15.62 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.89 11.57-11.79 0-.79-.08-1.4-.19-1.925H12.24z"/>
                  </svg>
                </div>
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-md border border-slate-100/80 transition-transform duration-300 hover:scale-105">
                  {/* Canva Mini-Gradient Badge */}
                  <div className="w-10 h-10 rounded-lg canva-gradient flex items-center justify-center text-white font-extrabold text-xs tracking-tight">
                    Canva
                  </div>
                </div>
              </div>
              
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">אקו-סיסטם חינוכי מקיף</span>
                
                <div className="space-y-2.5">
                  <div className="bg-indigo-50/50 rounded-lg p-2 border border-indigo-100/50">
                    <p className="text-xs font-bold text-indigo-700">חדש! שילוב NotebookLM</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">למידה מבוססת חומרים רשמיים</p>
                  </div>
                  <div className="bg-purple-50/50 rounded-lg p-2 border border-purple-100/50">
                    <p className="text-xs font-bold text-purple-700">סוכני קצה ועוזרי Gems</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">כלים פדגוגיים מותאמים אישית</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Why / Pain Points Section */}
        <section className="space-y-8" id="pain_points_section">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">מדוע בתי הספר והרשויות חייבים את זה עכשיו?</h3>
            <p className="text-slate-500 text-sm md:text-base">תרגום של מטרות התוכנית לפתרונות אמיתיים לכאבים בוערים בשטח:</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" id="pain_points_grid">
            
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-rose-100 transition-all duration-300 flex flex-col justify-between" id="pain_card_1">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Flame className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">שחיקת מורים ועומס אדמיניסטרטיבי בלתי נסבל</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  מורים מקדישים שעות רבות בבית לבדיקת מבחנים, כתיבת מחוונים, מענה להורים ותכנון שיעורים. התוכנית מעניקה להם פתרונות אוטומציה ובניית עוזרי Gems קבועים שיבצעו עבורם משימות כתיבה ותכנון שוטפות, ויחזירו להם זמן יקר למנוחה ולפדגוגיה איכותית.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-rose-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                <span>מפנים זמן יקר • מייעלים את העבודה השוטפת</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 flex flex-col justify-between" id="pain_card_2">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">חשש מהזיות AI ופער דיגיטלי בצוות</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  מורים רבים חוששים שבינה מלאכותית תמציא עובדות לא נכונות או שהם יישארו מאחור. שילוב סביבת NotebookLM של גוגל מאפשר להם לעבוד בצורה מבוקרת ומדויקת אך ורק על בסיס קבצים, סילבוסים וספרי לימוד מאושרים – ללא שום הזיות AI.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-indigo-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></span>
                <span>מדע מדויק ויציב מבוסס חומרי לימוד רשמיים</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-100 transition-all duration-300 flex flex-col justify-between" id="pain_card_3">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">שמירה על אבטחת מידע ואתיקה מוסדית</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  שימוש בכלים לא מאושרים מסכן את פרטיות התלמידים והצוות. אנו מלמדים עבודה בתוך הסביבות המאובטחות והחינמיות של Google ומגבשים יחד קוד אתי בית-ספרי מוגדר, כדי לעבוד בראש שקט ובהתאם להנחיות המשרד.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-amber-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                <span>שמירה קפדנית על פרטיות ואתיקה מקצועית</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300 flex flex-col justify-between" id="pain_card_4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">העומס הכפול בחינוך המיוחד ובכתיבת תל"א</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  רכזי שילוב ומורי חינוך מיוחד קורסים תחת כתיבת תוכניות לימודים אישיות (תל"א) והנגשת חומרים. התוכנית כוללת התאמה ייחודית המאפשרת לצוות לבנות עוזרי Gems לכתיבת יעדי תל"א פדגוגיים מבוססי מטרות, פישוט טקסטים מהיר והתאמות נגישות דינמיות.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>הקלה ישירה על צוותי החינוך המיוחד והשילוב</span>
              </div>
            </div>

          </div>
        </section>

        {/* Collaboration Tracks Section */}
        <section className="space-y-8" id="collaboration_tracks_section">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">גמישות תקציבית ותפעולית</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">איך עובדים יחד? 3 מסלולי הטמעה בגפ"ן</h3>
            <p className="text-slate-500 text-sm md:text-base">
              התאמה מדויקת לצרכים, למבנה הארגוני ולתקציב של בית הספר שלכם:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6" id="collaboration_tracks_grid">
            
            {/* Track A */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between" id="track_card_1">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                  <Sparkle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase block mb-1">מפגש חד-פעמי</span>
                  <h4 className="text-xl font-extrabold text-slate-900">מסלול א': הרצאת השראה וחשיפה</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  סדנה או הרצאה ממוקדת לכלל צוות המורים והמחנכות בבית הספר. אידיאלי לפתיחת הראש, חשיפת הפוטנציאל הפדגוגי של ה-AI והפגת חששות ופחדים ראשוניים בקרב הצוות.
                </p>
              </div>
              <div className="mt-8 space-y-3">
                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex flex-col gap-1.5">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-700">✓ הרצאה מעוררת השראה</span>
                  <span className="flex items-center gap-1.5">✓ הפחתת חסמים ראשוניים בצוות</span>
                </div>
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="w-full py-2.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold rounded-xl border border-slate-150 hover:border-blue-200 transition cursor-pointer active:scale-98"
                >
                  לפרטים ותיאום מפגש
                </button>
              </div>
            </div>

            {/* Track B */}
            <div className="bg-white p-6 rounded-3xl border-2 border-indigo-600 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden" id="track_card_2">
              <div className="absolute top-0 left-0 bg-indigo-600 text-white px-3 py-1 rounded-br-2xl text-[10px] font-bold tracking-wider">
                המסלול המוביל
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase block mb-1">פיילוט צוות מוביל</span>
                  <h4 className="text-xl font-extrabold text-slate-900">מסלול ב': מודל קפסולה</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  השתלמות וליווי מעשי ממוקד מול "צוות חלוץ" (ההנהלה, רכזי תקשוב ומחנכות נבחרות) על בסיס תוכנית 8 המפגשים שלנו. פיצוח פרומפטים ובניית עוזרי Gems ייעודיים לבית הספר שלכם.
                </p>
              </div>
              <div className="mt-8 space-y-3">
                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex flex-col gap-1.5">
                  <span className="flex items-center gap-1.5 font-semibold text-indigo-750">✓ קורס הטמעה מקיף (8 מפגשים)</span>
                  <span className="flex items-center gap-1.5 font-semibold text-indigo-750">✓ יצירת מנהיגות טכנולוגית מוסדית</span>
                </div>
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition cursor-pointer active:scale-98"
                >
                  תיאום פיילוט קפסולה
                </button>
              </div>
            </div>

            {/* Track C */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between" id="track_card_3">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-purple-600 uppercase block mb-1">ליווי שנתי מקיף</span>
                  <h4 className="text-xl font-extrabold text-slate-900">מסלול ג': ארכיטקטורה פדגוגית</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  ליווי שנתי מתמשך לעיצוב והתאמה אישית (Customization) של כלי ה-AI למערכות הדאטה, לתרבות הארגונית ולמערכת הניהול הבית-ספרית שלכם (כמו אפסקול / צפונט) להבטחת רצף פדגוגי רב-שנתי.
                </p>
              </div>
              <div className="mt-8 space-y-3">
                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex flex-col gap-1.5">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-700">✓ ליווי שנתי צמוד של עופר וצוותו</span>
                  <span className="flex items-center gap-1.5 font-semibold text-slate-700">✓ אינטגרציה מול צפונט / אפסקול / Drive</span>
                </div>
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="w-full py-2.5 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 text-xs font-bold rounded-xl border border-slate-150 hover:border-purple-200 transition cursor-pointer active:scale-98"
                >
                  תיאום שיחת ייעוץ שנתי
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Deliverables & ROI (What do they get?) */}
        <section className="bg-indigo-950 text-white rounded-3xl p-6 md:p-12 relative overflow-hidden" id="deliverables_section">
          {/* Ambient light effects inside deep background */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-indigo-800 rounded-full opacity-30 filter blur-3xl"></div>
          <div className="absolute -left-16 -top-16 w-80 h-80 bg-blue-900 rounded-full opacity-30 filter blur-3xl"></div>
          
          <div className="relative z-10 space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-indigo-400 font-bold text-xs uppercase tracking-wider block">עובר לפעולה פרקטית</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">מה יוצא לבית הספר מזה? ערך מוחשי ומדיד</h3>
              <p className="text-indigo-200 text-sm md:text-base">לא נשארים בתיאוריה. מנהלים רואים תוצרים מוחשיים וכלכליים כבר במהלך התוכנית:</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8" id="deliverables_grid">
              
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/15 space-y-4 flex flex-col justify-between hover:bg-white/10 transition-colors duration-200">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-lg">01</div>
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                    סביבות מחקר וסוכני למידה לכל מורה
                  </h4>
                  <p className="text-sm text-indigo-100/90 leading-relaxed">
                    כל מורה בונה סביבת מחקר וסיכום אישית ב-**NotebookLM** המבוססת על תוכנית הלימודים שלו, לצד פיתוח **Gems מותאם אישית** ב-**Google AI Studio**. אלו עוזרי הוראה שמשרתים אותו קבוע ומוטמעים מיידית ביומיום הפדגוגי.
                  </p>
                </div>
                <div className="pt-3 text-xs font-semibold text-emerald-400">
                  ✔ תיוג והתאמה אישית מלאה
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/15 space-y-4 flex flex-col justify-between hover:bg-white/10 transition-colors duration-200">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-lg">02</div>
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <PiggyBank className="w-5 h-5 text-indigo-400" />
                    חיסכון תקציבי קבוע
                  </h4>
                  <p className="text-sm text-indigo-100/90 leading-relaxed">
                    אנו מקנים שימוש מושכל בסביבות עבודה ובכלים בעלי גרסאות חינמיות רחבות במיוחד (כמו Google AI Studio ,NotebookLM וגרסאות חינוכיות של Canva). דבר זה מבטיח יציבות והמשכיות פדגוגית מלאה ללא עלות נוספת לבית הספר.
                  </p>
                </div>
                <div className="pt-3 text-xs font-semibold text-emerald-400">
                  ✔ חיסכון קבוע בעלויות רישוי שנתיות
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Contact Trigger Button */}
        <div className="flex justify-center my-6 no-print" id="contact_trigger_above_syllabus_container">
          <button 
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:via-indigo-700 hover:to-indigo-800 text-white font-extrabold text-sm shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer group"
          >
            <Mail className="w-4 h-4 text-indigo-100 group-hover:scale-110 transition-transform" />
            <span>תיאום שיחת ייעוץ והתאמה אישית לבית הספר • צור קשר</span>
          </button>
        </div>

        {/* Learning Map - Syllabus Interactive Section */}
        <section className="space-y-8" id="syllabus_section">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">פילוח מתווה ההרצאות</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">מפת הלמידה: 8 מפגשים אסטרטגיים</h3>
              <p className="text-slate-500 text-sm">רצף למידה שימושי, מנוסח מנקודת מבט של הערך הפרקטי שהצוות שלכם יקבל בשטח:</p>
            </div>
            
            {/* Collapse/Expand All Helpers */}
            <div className="flex gap-2.5 no-print" id="syllabus_controls">
              <button 
                onClick={expandAll}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 active:scale-95 transition-all cursor-pointer"
              >
                הרחב הכל
              </button>
              <button 
                onClick={collapseAll}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
              >
                צמצם הכל
              </button>
            </div>
          </div>

          {/* Interactive Accordion Map */}
          <div className="space-y-4 max-w-4xl mx-auto" id="syllabus_accordion">
            {sessions.map((session) => {
              const isOpen = !!openSessions[session.id];
              return (
                <div 
                  key={session.id}
                  className={`bg-white rounded-2xl border transition-all duration-300 ${
                    isOpen ? "border-indigo-200 ring-4 ring-indigo-50/50 shadow-md" : "border-slate-100 shadow-sm hover:border-slate-300"
                  }`}
                  id={`session_card_${session.id}`}
                >
                  {/* Summary/Header row */}
                  <button 
                    onClick={() => toggleSession(session.id)}
                    className="w-full p-4 md:p-5 text-right flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer rounded-2xl focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`w-8 h-8 rounded-full font-bold text-sm flex items-center justify-center transition-colors ${
                        isOpen ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-700"
                      }`}>
                        {session.id}
                      </span>
                      <span className="font-bold text-slate-900 text-sm md:text-base">{session.title}</span>
                    </div>
                    
                    {/* Toggle Indicator Arrow */}
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 transform accordion-icon ${
                      isOpen ? "rotate-180 text-indigo-600" : ""
                    }`} />
                  </button>

                  {/* Body Content with Print Support */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: isOpen ? "auto" : 0, 
                      opacity: isOpen ? 1 : 0 
                    }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden accordion-content print:!block print:!h-auto print:!opacity-100"
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-slate-50 space-y-4 bg-slate-50/20">
                      
                      {/* Inner info grid */}
                      <div className="grid md:grid-cols-12 gap-3 pt-2 text-sm leading-relaxed text-slate-700">
                        <div className="md:col-span-3 text-slate-500 font-bold flex items-center gap-1.5 md:flex-col md:items-start md:gap-1">
                          <span className="inline-block bg-slate-100 text-slate-700 p-1 rounded">💼</span>
                          <span>הערך הפרקטי לצוות: </span>
                        </div>
                        <div className="md:col-span-9 bg-white p-3.5 rounded-xl border border-slate-100">
                          <p className="text-slate-600 font-medium">{session.value}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-12 gap-3 text-sm leading-relaxed text-slate-700">
                        <div className="md:col-span-3 text-indigo-600 font-bold flex items-center gap-1.5 md:flex-col md:items-start md:gap-1">
                          <span className="inline-block bg-indigo-50 text-indigo-700 p-1 rounded">✨</span>
                          <span>תוצר המפגש: </span>
                        </div>
                        <div className="md:col-span-9 bg-indigo-50/30 p-3.5 rounded-xl border border-indigo-100/50">
                          <p className="text-indigo-950 font-bold">{session.deliverable}</p>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Flexibility Info Box */}
          <div className="max-w-4xl mx-auto space-y-4" id="info_boxes_container">
            <div className="bg-amber-50 rounded-2xl p-5 md:p-6 border border-amber-200 flex gap-4 items-start" id="flexibility_box">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-xl font-bold shrink-0">
                💡
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-base md:text-lg">גמישות פדגוגית מוחלטת בהתאמה אליך</h5>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed mt-1.5">
                  אנו מבינים שלכל בית ספר אפיון, ערכים וחזון ייחודי משלו. התוכנית מתאפיינת בגמישות מלאה – ניתן להתאים את הדגשים, קצב הלמידה והתכנים המעשיים כך שישתלבו בצורה הרמונית עם רוח בית הספר והמטרות השנתיות שאת/ה כמנהל/ת מציב/ה.
                </p>
              </div>
            </div>

            {/* Special Ed / IEP Box */}
            <div className="bg-emerald-50 rounded-2xl p-5 md:p-6 border border-emerald-200 flex gap-4 items-start" id="special_ed_box">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xl font-bold shrink-0">
                🌟
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-base md:text-lg">התאמה מיוחדת לחינוך מיוחד, כיתות שילוב וכתיבת תל"א</h5>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed mt-1.5">
                  בתי ספר רבים משלבים בתוכנית סדנאות ייעודיות לצוותי חינוך מיוחד ומתי"א. אנו מתמקדים בהפחתת העומס הבירוקרטי באמצעות בניית מודלים מותאמים לכתיבה יעילה ובטוחה של יעדי תוכניות לימודים אישיות (תל"א), פישוט והנגשת טקסטים, ופיתוח עזרים חזותיים מותאמים ללמידה מונגשת.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ / Chatbot Section */}
        <section className="space-y-8 max-w-4xl mx-auto" id="faq_section">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">התנסות מעשית בבינה מלאכותית</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">יש לכם שאלות? שאלו את העוזר הדיגיטלי שלנו</h3>
            <p className="text-slate-500 text-sm md:text-base">
              במקום לקרוא שאלות ותשובות יבשות, אתם מוזמנים להתנסות בבוט ה-AI של התוכנית. הוא עונה על הכל:
            </p>
          </div>

          {/* Inline Chat Container */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden flex flex-col h-[500px]" id="inline_chat_container">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 p-4 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base animate-pulse">🤖</div>
                <div>
                  <h4 className="font-bold text-sm">העוזר הדיגיטלי - הדיאלוג הדיגיטלי</h4>
                  <p className="text-[10px] text-indigo-100">מחובר ומנוהל ב-Netlify Functions מאובטח</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs text-indigo-100 font-bold">פעיל</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 flex flex-col" id="inline_chat_messages">
              {chatMessages.map((msg, index) => {
                const isUser = msg.role === "user";
                return (
                  <div 
                    key={index}
                    className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-2.5`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-sm shrink-0">🤖</div>
                    )}
                    <div className={`p-3.5 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                      isUser 
                        ? "bg-indigo-600 text-white rounded-tl-none font-medium shadow-sm" 
                        : "bg-white text-slate-800 border border-slate-100 rounded-tr-none shadow-sm"
                    }`}>
                      <p className="whitespace-pre-line">{msg.parts[0].text}</p>
                    </div>
                  </div>
                );
              })}
              {isChatLoading && (
                <div className="flex justify-start items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-sm">🤖</div>
                  <div className="bg-white border border-slate-100 p-3.5 rounded-2xl rounded-tr-none shadow-sm flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions Chips */}
            <div className="p-3 bg-white border-t border-slate-100 flex flex-wrap gap-2 overflow-x-auto shrink-0">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isChatLoading}
                  className="px-3 py-1.5 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 border border-indigo-100/50 rounded-full text-xs font-bold transition cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (chatInput.trim()) {
                  handleSendMessage(chatInput);
                }
              }}
              className="p-3 bg-white border-t border-slate-100 flex gap-2 shrink-0"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={isChatLoading}
                placeholder={isChatLoading ? "העוזר הדיגיטלי כותב תשובה..." : "הקלידו שאלה פה (למשל: כמה מפגשים יש?)..."}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none disabled:bg-slate-50 disabled:text-slate-400"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isChatLoading}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition cursor-pointer active:scale-95 disabled:opacity-50 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </section>

        {/* Contact Trigger Button */}
        <div className="flex justify-center my-6 no-print" id="contact_trigger_above_developers_container">
          <button 
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:via-indigo-700 hover:to-indigo-800 text-white font-extrabold text-sm shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer group"
          >
            <Mail className="w-4 h-4 text-indigo-100 group-hover:scale-110 transition-transform" />
            <span>תיאום שיחת ייעוץ והתאמה אישית לבית הספר • צור קשר</span>
          </button>
        </div>

        {/* Instructor & Contact Detail */}
        <section className="border-t border-slate-200 pt-10" id="contact_section">
          <div className="bg-white rounded-3xl p-6 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-50 rounded-br-3xl -z-10 opacity-60"></div>
            
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-5">
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">מפתחי ומנחי התוכנית</span>
                  <h4 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                    עופר קאופמן וצוות המומחים לפדגוגיה דיגיטלית
                  </h4>
                </div>
                
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  מהנדס (הטכניון), מרצה ומומחה בהטמעת טכנולוגיות AI וסוכנים חכמים במערכות חינוך וניהול. מביא איתו ניסיון עשיר, פרקטי ונגיש בשטח בליווי צוותי חינוך ורשויות מקומיות לעולם הטכנולוגי החדש, תוך הבנה עמוקה של צרכי מנהלים ומורים.
                </p>

                {/* Direct Action badged communication list */}
                <div className="flex flex-wrap gap-3.5 pt-2" id="contact_badges">
                  
                  {/* Phone dial connection */}
                  <a 
                    href="tel:052-6947202" 
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition duration-150"
                  >
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span className="font-semibold">052-6947202</span>
                  </a>

                  {/* Mail to response */}
                  <a 
                    href="mailto:saritofer.k@gmail.com" 
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition duration-150"
                  >
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span className="font-semibold">saritofer.k@gmail.com</span>
                  </a>

                  {/* Program Number */}
                  <div 
                    className="inline-flex items-center justify-between gap-3 px-4 py-2 text-sm text-indigo-800 bg-indigo-50/50 rounded-xl border border-indigo-100"
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-indigo-500" />
                      <span className="font-semibold">תוכנית גפ"ן 64342</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Interaction Fast-Contact sidebar / CTA */}
              <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4" id="instructor_cta">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">תיאום שיחת ייעוץ</span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  הנחה וליווי מלא להתאמת התוכנית ביעילות לבית ספרכם, החל מתהליך האישור ועד להטמעה בשטח.
                </p>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleCopyLink("0526947202", "טלפון נייד")}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white text-xs font-bold text-slate-800 rounded-xl border border-slate-150 hover:bg-indigo-50/20 hover:border-indigo-200 transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">📞 העתק טלפון נייד</span>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button 
                    onClick={() => handleCopyLink("saritofer.k@gmail.com", "כתובת דואר אלקטרוני")}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white text-xs font-bold text-slate-800 rounded-xl border border-slate-150 hover:bg-indigo-50/20 hover:border-indigo-200 transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2 font-sans">✉️ העתק אימייל</span>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 mt-16 border-t border-slate-800 no-print" id="app_footer_section">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-slate-800/60 px-3 py-1 rounded-full text-xs text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>עודכן לשנת 2026</span>
          </div>
          <p className="text-sm">הדיאלוג הדיגיטלי (מספר תוכנית בגפ"ן: 64342) • מפתח ומנחה שותף: עופר קאופמן</p>
          <p className="text-xs text-slate-600">כל הזכויות שמורות © 2026. עיצוב ופיתוח כלים פדגוגיים מתקדמים.</p>
        </div>
      </footer>

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 left-6 z-50 no-print font-sans" id="floating_chatbot_widget" dir="rtl">
        <AnimatePresence>
          {isChatFloatingOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl border border-slate-150 shadow-2xl overflow-hidden flex flex-col w-[350px] md:w-[385px] h-[500px] mb-4 origin-bottom-left"
              id="floating_chat_card"
            >
              {/* Floating Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 p-4 text-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base">🤖</div>
                  <div>
                    <h4 className="font-bold text-sm">העוזר הדיגיטלי</h4>
                    <p className="text-[10px] text-indigo-100">שאלות ותשובות גפ"ן 64342</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatFloatingOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 flex flex-col" id="floating_chat_messages">
                {chatMessages.map((msg, index) => {
                  const isUser = msg.role === "user";
                  return (
                    <div 
                      key={index}
                      className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-2`}
                    >
                      {!isUser && (
                        <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs shrink-0">🤖</div>
                      )}
                      <div className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                        isUser 
                          ? "bg-indigo-600 text-white rounded-tl-none font-medium shadow-sm" 
                          : "bg-white text-slate-800 border border-slate-100 rounded-tr-none shadow-sm"
                      }`}>
                        <p className="whitespace-pre-line">{msg.parts[0].text}</p>
                      </div>
                    </div>
                  );
                })}
                {isChatLoading && (
                  <div className="flex justify-start items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs">🤖</div>
                    <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tr-none shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Questions Chips */}
              <div className="p-2.5 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto shrink-0 select-none">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    disabled={isChatLoading}
                    className="px-2.5 py-1.5 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 border border-indigo-100/50 rounded-full text-[10px] font-bold transition cursor-pointer active:scale-95 disabled:opacity-50 whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (chatInput.trim()) {
                    handleSendMessage(chatInput);
                  }
                }}
                className="p-3 bg-white border-t border-slate-100 flex gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={isChatLoading}
                  placeholder="הקלד/י שאלה פה..."
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none disabled:bg-slate-50"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition cursor-pointer active:scale-95 disabled:opacity-50 flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Bubble Button */}
        <button
          onClick={() => setIsChatFloatingOpen(!isChatFloatingOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:via-indigo-700 hover:to-indigo-800 text-white shadow-2xl hover:shadow-indigo-300 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center relative group border-0 outline-none"
          id="floating_chat_bubble_btn"
        >
          {isChatFloatingOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-ping"></span>
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></span>
              <span className="text-xl">🤖</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
