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
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      // יצירת פורמט שה-Apps Script יודע לקרוא
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("role", formData.role);
      formDataObj.append("school", formData.school);
      formDataObj.append("contact", formData.contact);

      await fetch(SCRIPT_URL, {
        method: "POST",
        body: formDataObj,
        mode: "no-cors" // חשוב כדי למנוע בעיות CORS
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
      title: "מבוא לעולם ה-AI והדיאלוג החדש",
      value: "בניית הבנה יסודית של עולם ה-AI, הפגת חששות ויצירת דיאלוג ראשוני פורה מול מודלי השפה של גוגל. דיון בהזדמנויות ובמגבלות הטכנולוגיה בעשייה הפדגוגית.",
      deliverable: "התנסות אישית ראשונית ויצירת מודעות בקרב הצוות לאפשרויות היישום בכיתה.",
    },
    {
      id: 2,
      title: "צלילה לעומק עם מודלי Gemini (LLM)",
      value: "היכרות מעמיקה עם מודל ה-LLM של גוגל (Gemini) ולמידת העקרונות לתקשורת נכונה ואפקטיבית לצורך ייעול משימות שוטפות כמו ניסוח מיילים, סיכום פרוטוקולים והכנת מענים להורים.",
      deliverable: "התקנת סביבת עבודה אישית ותרגול פתרון בעיות ניהוליות יומיומיות.",
    },
    {
      id: 3,
      title: "הנדסת פרומפטים מתקדמת (Prompt Engineering)",
      value: "מעבר משיח חובבני לכתיבה מקצועית ושיטתית של הנחיות. המורים ילמדו את \"נוסחאות הפרומפט\" שחוסכות זמן ומפיקות תוצרים פדגוגיים מדויקים ואיכותיים בהרבה.",
      deliverable: "בניית בנק פרומפטים אישי לצוות ההוראה מותאם למקצועות הלימוד השונים.",
    },
    {
      id: 4,
      title: "עוברים למקצוענים: Google AI Studio ו-NotebookLM",
      value: "שימוש בכלים אסטרטגיים לטווח ארוך. מעבר מעשי לעבודה עם Google AI Studio וסביבת NotebookLM כדי להעלות סילבוסים, ספרי לימוד ותוכניות עבודה של משרד החינוך ולעבוד מולם באופן מבוקר ובטוח, ללא המצאת נתונים.",
      deliverable: "בניית סביבת למידה אישית ומאובטחת לכל מורה המבוססת על חומרי הלימוד הרשמיים שלו.",
    },
    {
      id: 5,
      title: "אומנות ה-System Instructions ובניית Gems אישיים",
      value: "למידת הדרך להגדיר למודל את תפקידו המדויק ואת מגבלותיו באמצעות System Instructions, ופיתוח סוכני Gems אישיים קבועים (לדוגמה: \"סוכן לבניית מערכי שיעור מותאמים אישית\", או \"סוכן למשוב פדגוגי מעצים\" הזמין בלחיצת כפתור).",
      deliverable: "יצירת Gems אישיים קבועים השמורים בסביבת העבודה של המורה וחוסכים לו שעות עבודה שבועיות.",
    },
    {
      id: 6,
      title: "שילוב מדיה חזותית בעיצוב Canva",
      value: "הפיכת הטקסט למדיה מרתקת. למידה מעשית של כלי העיצוב הפופולרי Canva כדי לייצר מצגות דינמיות, כרזות, חומרי לימוד ועזרים חזותיים מרהיבים שיוצרים חיבור רגשי ואסתטי אצל התלמידים.",
      deliverable: "יצירת חבילת חומרי למידה מעוצבים ומותאמים אישית לשנת הלימודים.",
    },
    {
      id: 7,
      title: "פיתוח פרויקטים ואינטגרציה בשטח",
      value: "מפגש עבודה מעשי שכולו מוקדש ליישום, הטמעה ובדיקה בשטח של עוזרי ההוראה, ה-Gems וסביבות ה-NotebookLM שפותחו. ליווי צמוד של המנחה כדי לוודא שכל הפתרונות מותאמים לצרכי המורים ורמת הכיתות שלהם.",
      deliverable: "פרויקט פועל ומנוסה המוכן להפעלה ישירה מול תלמידים או הנהלה.",
    },
    {
      id: 8,
      title: "אתיקה חינוכית, סיכום והצגת תוצרים",
      value: "מפגש שיא שבו הצוות מציג את עוזרי ההוראה החדשים שלו. בנוסף, נגבש יחד קוד אתי בית-ספרי שישמש מצפן מוסדי לעבודה נכונה, שמירה על אבטחת מידע ופרטיות בהמשך הדרך.",
      deliverable: "מסמך קוד אתי מוסדי מוכן להפצה לצוות ולהורים, ותערוכת תוצרים בית-ספרית.",
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
                  setFormData({ name: "", role: "", school: "", contact: "" });
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

                    {/* Contact phone/email */}
                    <div className="space-y-1">
                      <label htmlFor="form_contact" className="text-xs font-bold text-slate-700 block">טלפון / אימייל ליצירת קשר *</label>
                      <input 
                        type="text"
                        id="form_contact"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="כיצד נוכל לחזור אליך?"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
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
                    פרטי ההתקשרות התקבלו בהצלחה. נחזור אליכם בהקדם לטלפון / אימייל: {formData.contact}
                  </p>
                  
                  <button 
                    onClick={() => {
                      setIsContactOpen(false);
                      setIsSubmitted(false);
                      setFormData({ name: "", role: "", school: "", contact: "" });
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
                  הדיאלוג הדיגיטלי: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">מובילים את החדשנות</span> בבית הספר שלך
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
                תוכנית פיתוח מקצועי פורצת דרך לצוותי חינוך והנהלה, המתמקדת באקו-סיסטם המתקדם של Google: פיתוח ב- <strong className="text-indigo-600 font-bold bg-indigo-50/50 px-1 py-0.5 rounded">Google AI Studio</strong>, עבודה מחקרית עם סביבת <strong class="text-indigo-600 font-bold bg-indigo-50/50 px-1 py-0.5 rounded">NotebookLM</strong>, בניית סוכני בינה מלאכותית מותאמים אישית (<strong class="text-indigo-600 font-bold bg-indigo-50/50 px-1 py-0.5 rounded">Gems</strong>), לצד שילוב כלי העזר <strong class="text-indigo-600 font-bold bg-indigo-50/50 px-1 py-0.5 rounded">Canva</strong>.
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

          <div className="grid md:grid-cols-3 gap-6" id="pain_points_grid">
            
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-rose-100 transition-all duration-300 flex flex-col justify-between" id="pain_card_1">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Flame className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">עומס אדמיניסטרטיבי ושחיקת מורים</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  המורים קורסים תחת הררי משימות. התוכנית מעניקה להם פתרונות אוטומציה ובניית עוזרי Gems קבועים שיבצעו עבורם משימות כתיבה, תכנון ומעקב שוטף, ויפנו להם שעות עבודה יקרות בשבוע.
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
                <h4 className="text-lg font-bold text-slate-900">חשש מהזיות AI ופער דיגיטלי</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  מורים חוששים שבינה מלאכותית תמציא עובדות לא נכונות. שילוב סביבת **NotebookLM** של גוגל מאפשר להם לעבוד בצורה מבוקרת ומדויקת אך ורק על בסיס קבצים, סילבוסים וספרי לימוד מאושרים.
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
                <h4 className="text-lg font-bold text-slate-900">אבטחת מידע ואתיקה מוסדית</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  עבודה עם כלים לא מאושרים מסכנת את פרטיות התלמידים. אנו עובדים עם הסביבות המאובטחות של Google ומגבשים יחד קוד אתי בית-ספרי שישמור על הפרטיות בהתאם להנחיות המשרד.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-amber-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                <span>שמירה קפדנית על פרטיות ואתיקה מקצועית</span>
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
          <div className="max-w-4xl mx-auto bg-amber-50 rounded-2xl p-5 md:p-6 border border-amber-200 flex gap-4 items-start" id="flexibility_box">
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

    </div>
  );
}
