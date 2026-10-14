# סטטוס פרויקט (Current Status) - אתר הדיאלוג הדיגיטלי (ddialog.co.il)

*מסמך זה מהווה את מקור האמת האחד (Single Source of Truth) לגבי מצב הפרויקט, הארכיטקטורה, המוצרים המקושרים ותהליך הפריסה.*

---

## 1. פרטי המערכת וכתובות חיות (Live System)
* **כתובת רשמית באוויר (Production URL):** [https://ddialog.co.il](https://ddialog.co.il)
* **אירוח ופריסה (Hosting):** Netlify Edge
* **מאגר קוד (GitHub Repository):** `ofer-blip/ddialog-landing` (ענף מרכזי: `main`)
* **תעודת אבטחה (SSL):** תעודת SSL מנוהלת ומאובטחת של Netlify עם אכיפת HTTPS.

---

## 2. אודות האתר והייעוד המרכזי
האתר הרשמי של "הדיאלוג הדיגיטלי" (תוכנית גפ"ן מספר **64342**, מסלול ירוק - חדשנות ויזמות פדגוגית).  
האתר מציג את מעטפת הפתרונות הפדגוגיים מבוססי AI לבתי ספר, הנהלות וצוותי הוראה, ומאפשר התנסות חיה בכלים וסוכני תוכן שפותחו יחד עם צוותי השטח, לצד טופס יצירת קשר והזמנת תוכנית מותאמת.

---

## 3. ארכיטקטורה וטכנולוגיות (Tech Stack)
* **Framework:** React 19 (SPA מבוסס Vite).
* **Build Tool:** Vite 6 (`@vitejs/plugin-react`).
* **עיצוב וסגנון:** Tailwind CSS v4 (`@tailwindcss/vite`).
* **אייקונים ואנימציות:** `lucide-react`, `motion`.
* **Serverless Backend:** Netlify Functions (בתיקיית `netlify/functions`) לקליטת פניות וטפסי לידים.

---

## 4. מיפוי קבצים עיקריים (Directory Structure)
```
├── src/
│   ├── App.tsx          # הקומפוננטה המרכזית – כוללת את כל מקטעי הדף, הכרטיסים והטפסים
│   ├── main.tsx         # נקודת כניסה של React
│   └── index.css        # הגדרות Tailwind והתאמות RTL
├── public/
│   ├── showcase-tla.png    # צילום מסך עדכני ומעוצב של אפליקציית תל"א (tala.ddialog.co.il)
│   ├── showcase-shiraz.png # צילום מסך של סוכן שיראז
│   ├── showcase-gem.png    # צילום מסך של ה-Gem הייעודי
│   └── favicon / icons     # נכסים גרפיים נוספים
├── netlify.toml         # הגדרות בנייה (npm run build) ותיקיית פרסום dist
└── package.json         # תלויות וסקריפטים
```

---

## 5. אזור הדוגמאות והכלים (Showcase Grid)
בלוק הכלים הפדגוגיים (`src/App.tsx`) כולל קישורים ישירים לכלי העבודה החיים:

1. **אפליקציה פדגוגית לתל"א (TLA Roadmap):**
   * **קישור חי:** [https://tala.ddialog.co.il/](https://tala.ddialog.co.il/)
   * **כפתור פעולה:** "כניסה לאפליקציה והתנסות בדמו" (נפתח בלשונית חדשה).
   * **תמונת תצוגה:** `public/showcase-tla.png` (יחס 16:9 עדכני, כולל את באנר ההדגמה ושלבי העבודה המודרניים).
2. **סוכן תוכן ומערכי שיעור (מודל שיראז):**
   * **קישור חי:** [https://shiraz.ddialog.co.il/?v=1](https://shiraz.ddialog.co.il/?v=1)
   * **כפתור פעולה:** "פתיחת הסוכן בדפדפן".
   * **תמונת תצוגה:** `public/showcase-shiraz.png`.
3. **עוזר Gems ייעודי ב-Gemini:**
   * **קישור חי:** סביבת Gemini ייעודית מותאמת אישית.
   * **תמונת תצוגה:** `public/showcase-gem.png`.

---

## 6. תהליך פריסה ועדכון (Deployment Workflow)
1. **עריכת קוד:** ביצוע שינויים בקבצי `src/` או הוספת נכסים ל-`public/`.
2. **בדיקת תקינות:**
   ```bash
   npm run build
   ```
3. **שמירה ופרסום:**
   ```bash
   git add .
   git commit -m "Your update description"
   git push origin main
   ```
4. **עדכון אוטומטי:** Netlify מושך את השינויים מ-`main` ומבצע Deploy לאתר [https://ddialog.co.il](https://ddialog.co.il) תוך שניות ספורות.
