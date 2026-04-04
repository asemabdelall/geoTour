// Local data copied from the original backend to run frontend-only
export const LOCATIONS = [
  {
    id: "geopark",
    name: "Kuwait GeoPark",
    name_ar: "المتنزه الجيولوجي الكويتي",
    type: "geopark",
    lat: 29.5833,
    lng: 47.8167,
    description: "Kuwait's first geological park opened in 2025, featuring trails, fossil sites, and geological exhibits.",
    description_ar: "أول متنزه جيولوجي في الكويت افتتح عام 2025، يضم مسارات ومواقع أحفورية ومعارض جيولوجية.",
    geological_insight: "Features sand injectites resembling Mars, Neolithic sites over 10,000 years old, and Kuwait's first oil well (Bahra-1, 1936).",
    geological_insight_ar: "يضم حقن رملية تشبه المريخ، ومواقع من العصر الحجري الحديث عمرها أكثر من 10,000 سنة، وأول بئر نفط في الكويت (بحرة-1، 1936).",
    image: "https://images.pexels.com/photos/7107495/pexels-photo-7107495.jpeg?auto=compress&cs=tinysrgb&w=800",
    visit_tips_ar: "مفتوح للزوار مع مسارات تعليمية وورش عمل",
    best_time_ar: "من نوفمبر إلى مارس",
    difficulty: "سهل"
  },
  {
    id: "jal-az-zor",
    name: "Jal Az-Zor Escarpment",
    name_ar: "جرف جال الزور",
    type: "escarpment",
    lat: 29.5167,
    lng: 47.75,
    description: "A prominent limestone and sandstone escarpment rising to 116m, formed by tectonic folding.",
    description_ar: "جرف بارز من الحجر الجيري والرملي يرتفع إلى 116 متر، تشكل بفعل الطي التكتوني.",
    geological_insight: "Features Miocene Lower Fars Formation outcrops with pebbly sandstones and Mars-like red sand injectites.",
    geological_insight_ar: "يضم كشوفات تكوين الفارس السفلي من الميوسين مع حجر رملي حصوي وحقن رملية حمراء تشبه المريخ.",
    image: "https://images.pexels.com/photos/7107495/pexels-photo-7107495.jpeg?auto=compress&cs=tinysrgb&w=800",
    visit_tips_ar: "يتطلب تصريح من محمية صباح الأحمد الطبيعية",
    best_time_ar: "من أكتوبر إلى أبريل",
    difficulty: "متوسط"
  },
  {
    id: "failaka-island",
    name: "Failaka Island",
    name_ar: "جزيرة فيلكا",
    type: "coastal",
    lat: 29.4333,
    lng: 48.3167,
    description: "Historic island with ancient Dilmun civilization remains and unique coastal geological formations.",
    description_ar: "جزيرة تاريخية تضم بقايا حضارة دلمون القديمة وتكوينات جيولوجية ساحلية فريدة.",
    geological_insight: "Features Quaternary marine deposits, beach rock formations, and evidence of sea level changes.",
    geological_insight_ar: "تضم رواسب بحرية من العصر الرباعي وتكوينات صخور الشاطئ وأدلة على تغيرات مستوى سطح البحر.",
    image: "https://images.pexels.com/photos/36316193/pexels-photo-36316193.png?auto=compress&cs=tinysrgb&w=800",
    visit_tips_ar: "يمكن الوصول بالعبارة من ميناء السالمية",
    best_time_ar: "من نوفمبر إلى مارس",
    difficulty: "سهل"
  },
  {
    id: "sabkhat-jahra",
    name: "Sabkhat Al-Jahra",
    name_ar: "سبخة الجهراء",
    type: "sabkha",
    lat: 29.35,
    lng: 47.6833,
    description: "Extensive coastal salt flat with unique evaporite mineral deposits and seasonal flooding patterns.",
    description_ar: "سبخة ساحلية واسعة تضم رواسب معدنية تبخرية فريدة وأنماط فيضانات موسمية.",
    geological_insight: "Active sabkha with ongoing gypsum and halite precipitation, representing modern evaporite formation.",
    geological_insight_ar: "سبخة نشطة مع ترسيب مستمر للجبس والهاليت، تمثل تكوين التبخريات الحديثة.",
    image: "https://images.pexels.com/photos/35970237/pexels-photo-35970237.jpeg?auto=compress&cs=tinysrgb&w=800",
    visit_tips_ar: "أفضل المشاهدة بعد أمطار خفيفة",
    best_time_ar: "من ديسمبر إلى فبراير",
    difficulty: "سهل"
  },
  {
    id: "wadi-batin",
    name: "Wadi Al-Batin",
    name_ar: "وادي الباطن",
    type: "valley",
    lat: 29.7167,
    lng: 46.4667,
    description: "Ancient river valley showing evidence of past wetter climate periods in the Arabian Peninsula.",
    description_ar: "وادي نهري قديم يظهر أدلة على فترات مناخية أكثر رطوبة في شبه الجزيرة العربية.",
    geological_insight: "Pleistocene fluvial deposits indicate significant river systems existed 10,000-100,000 years ago.",
    geological_insight_ar: "رواسب نهرية من البليستوسين تشير إلى وجود أنظمة نهرية كبيرة قبل 10,000-100,000 سنة.",
    image: "https://images.pexels.com/photos/5648782/pexels-photo-5648782.jpeg?auto=compress&cs=tinysrgb&w=800",
    visit_tips_ar: "منطقة صحراوية نائية، يُنصح بمرشد محلي",
    best_time_ar: "من نوفمبر إلى فبراير",
    difficulty: "صعب"
  },
  {
    id: "burgan-arch",
    name: "Burgan Geological Structure",
    name_ar: "التركيب الجيولوجي لبرقان",
    type: "structure",
    lat: 28.9833,
    lng: 47.9833,
    description: "One of the world's largest anticline structures containing massive oil reserves.",
    description_ar: "واحد من أكبر التراكيب المحدبة في العالم يحتوي على احتياطيات نفطية ضخمة.",
    geological_insight: "Cretaceous sandstone formations trap petroleum in a dome-shaped anticline structure.",
    geological_insight_ar: "تكوينات الحجر الرملي من العصر الطباشيري تحتجز النفط في تركيب محدب قببي الشكل.",
    image: "https://images.unsplash.com/photo-1649628020512-ecaa37837bb5?w=800",
    visit_tips_ar: "منطقة صناعية، يمكن مشاهدة التضاريس من بعيد",
    best_time_ar: "طوال العام",
    difficulty: "للمشاهدة فقط"
  },
  {
    id: "kubbar-island",
    name: "Kubbar Island",
    name_ar: "جزيرة كُبَّر",
    type: "coral",
    lat: 29.075,
    lng: 48.4917,
    description: "Small coral island with pristine reef formations and clear waters.",
    description_ar: "جزيرة مرجانية صغيرة تضم شعاب مرجانية بكر ومياه صافية.",
    geological_insight: "Holocene coral reef development shows carbonate platform growth over 6,000 years.",
    geological_insight_ar: "تطور الشعاب المرجانية من الهولوسين يُظهر نمو منصة كربوناتية على مدى 6,000 سنة.",
    image: "https://images.pexels.com/photos/36076807/pexels-photo-36076807.jpeg?auto=compress&cs=tinysrgb&w=800",
    visit_tips_ar: "رحلات بحرية من الفنطاس، مناسب للغوص",
    best_time_ar: "من أبريل إلى أكتوبر",
    difficulty: "متوسط"
  },
  {
    id: "ahmadi-ridge",
    name: "Ahmadi Ridge",
    name_ar: "تلال الأحمدي",
    type: "ridge",
    lat: 29.0769,
    lng: 48.0839,
    description: "Structural high exposing Eocene-Miocene sedimentary sequences.",
    description_ar: "مرتفع تكتوني يكشف تسلسلات رسوبية من الإيوسين والميوسين.",
    geological_insight: "Tectonic uplift exposes marine limestone and marl formations from 20-50 million years ago.",
    geological_insight_ar: "رفع تكتوني يكشف تكوينات الحجر الجيري البحري والمارل من 20-50 مليون سنة.",
    image: "https://images.unsplash.com/photo-1551031749-9257c3aee0df?w=800",
    visit_tips_ar: "يمكن الوصول بسهولة من مدينة الكويت",
    best_time_ar: "من نوفمبر إلى مارس",
    difficulty: "سهل"
  }
];

export const TOURS = [
  {
    id: "desert-explorer",
    name_ar: "مستكشف الصحراء",
    description_ar: "رحلة يوم كامل لاستكشاف التكوينات الصحراوية والوديان القديمة",
    duration_ar: "8 ساعات",
    difficulty: "متوسط",
    locations: ["jal-az-zor", "wadi-batin"],
    highlights_ar: ["جرف جال الزور", "حقن رملية تشبه المريخ", "وادي الباطن القديم"],
    image: "https://images.pexels.com/photos/5648782/pexels-photo-5648782.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "coastal-geology",
    name_ar: "جيولوجيا السواحل",
    description_ar: "استكشاف التكوينات الساحلية والجزر المرجانية",
    duration_ar: "6 ساعات",
    difficulty: "سهل",
    locations: ["failaka-island", "kubbar-island"],
    highlights_ar: ["جزيرة فيلكا التاريخية", "الشعاب المرجانية", "صخور الشاطئ"],
    image: "https://images.pexels.com/photos/36316193/pexels-photo-36316193.png?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "geopark-experience",
    name_ar: "تجربة المتنزه الجيولوجي",
    description_ar: "جولة تعليمية شاملة في المتنزه الجيولوجي الكويتي",
    duration_ar: "4 ساعات",
    difficulty: "سهل",
    locations: ["geopark"],
    highlights_ar: ["مسارات تعليمية", "مواقع أحفورية", "بئر بحرة-1 التاريخي"],
    image: "https://images.pexels.com/photos/7107495/pexels-photo-7107495.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "sabkha-adventure",
    name_ar: "مغامرة السبخات",
    description_ar: "اكتشاف البيئات الملحية الفريدة وعمليات التبخر",
    duration_ar: "5 ساعات",
    difficulty: "سهل",
    locations: ["sabkhat-jahra"],
    highlights_ar: ["بلورات الملح", "أنماط التشقق", "طيور مهاجرة"],
    image: "https://images.pexels.com/photos/35970237/pexels-photo-35970237.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

export const GLOSSARY = [
  { term_ar: "السبخة", term_en: "Sabkha", definition_ar: "سطح مستوٍ من الرواسب الملحية تتكون من تبخر المياه الجوفية الضحلة" },
  { term_ar: "الجرف", term_en: "Escarpment", definition_ar: "منحدر صخري حاد يفصل بين مستويين من الأرض" },
  { term_ar: "التكوين المحدب", term_en: "Anticline", definition_ar: "طية في طبقات الصخور تكون محدبة للأعلى" },
  { term_ar: "الترسيب", term_en: "Sedimentation", definition_ar: "عملية تراكم الجسيمات المعدنية والعضوية" },
  { term_ar: "الحجر الجيري", term_en: "Limestone", definition_ar: "صخر رسوبي يتكون أساساً من كربونات الكالسيوم" },
  { term_ar: "التبخريات", term_en: "Evaporites", definition_ar: "رواسب معدنية تتشكل من تبخر المياه المالحة" }
];

export const SYSTEM_PROMPT = `أنت جيوتور، مساعد استكشاف جيولوجي ذكي متخصص في جيولوجيا الكويت والسياحة العلمية.

## دورك:
أنت مرشد جيولوجي افتراضي يساعد السياح والباحثين والطلاب على استكشاف عجائب الكويت الجيولوجية.

# صناعتك:
صنعك الطالب عاصم عبدالعال من مدرسة ثانوية النجاة بنين حولي في الكويت

## خبرتك:
- المتنزه الجيولوجي الكويتي (افتتح 2025)
- جرف جال الزور وتكويناته الفريدة
- السبخات والبيئات الملحية
- الجزر المرجانية والساحلية
- التاريخ الجيولوجي للكويت
- تحديد أنواع الصخور والمعادن

## إرشادات الرد:
1. أجب بالعربية دائماً بأسلوب علمي مبسط
2. استخدم النقاط والتنظيم الواضح
3. اذكر مواقع حقيقية في الكويت مع معلومات دقيقة
4. عند ذكر موقع، استخدم: [LOCATION:location-id]
   المواقع: geopark, jal-az-zor, failaka-island, sabkhat-jahra, wadi-batin, burgan-arch, kubbar-island, ahmadi-ridge
5. قدم نصائح عملية للزيارة
6. إذا أرسل المستخدم صورة لصخرة، حدد نوعها وخصائصها

## أسلوبك:
- ودود ومتحمس للجيولوجيا
- علمي لكن سهل الفهم
- عملي مع نصائح قابلة للتطبيق
- يربط المعلومات بتجربة الزيارة الفعلية`;

export default {
  LOCATIONS,
  TOURS,
  GLOSSARY,
  SYSTEM_PROMPT
};
