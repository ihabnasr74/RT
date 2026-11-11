export interface BilingualHeading {
  ar: string;
  en: string;
}

export interface CoreValueItem {
  ar: string;
  en: string;
}

export interface ServiceStepItem {
  number: number;
  bodyAr: string;
  bodyEn: string;
}

export interface ContactChannelItem {
  label: string;
  value: string;
  href: string;
}

export const PORTFOLIO_CONTENT = {
  logoPath: './logo.png',
  logoAlt: 'Ruwad Al Tamayuz Translation Services',
  header: {
    ar: 'رواد التميّز لخدمات الترجمة',
    enLine1: 'Rowad Al Tamayuz',
    enLine2: 'Translation Services',
  },
  companyProfile: {
    heading: {
      ar: 'الملف التعريفي',
      en: 'Company Profile',
    },
    paragraphsAr: [
      'تُعد شركة رواد التميّز لخدمات الترجمة من إحدى الشركات الرائدة والموثوقة لتقديم الحلول والخدمات اللغوية المتبادلة بدقةٍ متناهية وسياق احترفي. نفخر بتلبية متطلبات القطاعات التجارية والقانونية والطبية والحكومية، إلى جانب القطاعات الأخرى.',
      'تضم شركتنا نُخبة من المترجمين المعتمدين والخبراء اللغويين، وذلك لضمان مطابقة المستندات المُترجمة لأعلى المعايير التنظيمية والمهنية على الصعيدين المحلي والدولي.',
    ],
    paragraphsEn: [
      'Rowad Al-Tamayuz Translation Services Company is one of the leading and most trusted providers of language solutions and services, delivered with the utmost accuracy and professionalism. We take pride in meeting the needs of the business, legal, medical, and government sectors, as well as other sectors.',
      'Our company brings together a select group of certified translators and language experts to ensure that translated documents meet the highest regulatory and professional standards, both locally and internationally.',
    ],
  },
  coreValues: {
    heading: {
      ar: 'قيَمنا الجوهرية',
      en: 'Our Core Values',
    },
    items: [
      {
        ar: 'الدقة اللغوية والتقنية المثالية',
        en: 'Exemplary linguistic and technical accuracy',
      },
      {
        ar: 'السرية التامة وحماية خصوصية البيانات والمستندات',
        en: 'Complete confidentiality and protection of data and document privacy',
      },
      {
        ar: 'الالتزام الدقيق بمواعيد التسليم المحددة',
        en: 'Strict adherence to specified deadlines',
      },
      {
        ar: 'المثلث الذهبي الذي يُميّزنا عن غيرنا في ال :[الجودة والدقة والإتقان]',
        en: '[Quality, Precision, and Craftsmanship]: The “Golden Triangle” that sets us apart from others in the industry.',
      },
    ] as CoreValueItem[],
  },
  specializedServices: {
    heading: {
      ar: 'خدماتنا المتخصصة',
      en: 'Our Specialized Services',
    },
    group1: {
      number: 1,
      titleAr: 'خدمات الترجمة',
      titleEn: 'Translation Services',
      itemsAr: [
        'الترجمة القانونية',
        'الترجمة التجارية',
        'الترجمة التقنية',
        'الترجمة المتخصصة، وتشمل: [ترجمة البحوث الأكاديمية والجامعية والمواد الإعلامية والمحتوى التسويقي مع التدقيق والتحرير الشاملين بمهنية ودقة وإتقان]',
      ],
      itemsEn: [
        'Legal Translation',
        'Commercial Translation',
        'Technical Translation',
        'Specialized Translation, including: [Translation of academic and university research, media materials, and marketing content, with comprehensive proofreading and editing performed professionally, accurately, and with precision]',
      ],
    },
    group2: {
      number: 2,
      titleAr: 'خدماتنا الأخرى',
      titleEn: 'Other Services',
      itemsAr: [
        'خدمات الترجمة القانونية لجميع الوثائق من الإنجليزية إلى العربية والعكس، وللغات أخرى حسب الطلب',
        'تأسيس الأعمال والشركات',
        'صياغة العقود والاتفاقيات ومذكرات التفاهم',
        'عقود التأسيس والملاحق، وما إلى ذلك',
        'خدمات الكاتب العدل',
        'خدمات محاكم دبي والنيابة العامة',
        'خدمات اعتماد الشهادات الجامعية',
        'خدمات الطباعة',
        'خدمات تمثيل العلاقات العامة',
        'خدمات التصديق',
      ],
      itemsEn: [
        'Legal Translation',
        'Legal translation services for all documents English to Arabic and vice versa and other languages if required.',
        'Business Setup and Company formation.',
        'Drafting contracts, agreements, and memoranda of understanding (MoU)',
        'Notary Public Services',
        'Dubai Courts and Public Prosecution Services',
        'Degree Recognition Serviced',
        'Printing services',
        'Public Relations Representative Services',
        'Attestation Services',
      ],
    },
  },
  transactionsProcessing: {
    heading: {
      ar: 'تخليص المعاملات',
      en: 'Transactions Processing',
    },
  },
  serviceRequestProcess: {
    heading: {
      ar: 'إجراءات طلب الترجمة',
      en: 'Translation Request Process',
    },
    steps: [
      {
        number: 1,
        bodyAr: 'أرسل المستند إلينا عبر الواتساب أو البريد الإلكتروني',
        bodyEn: 'Share your document with us via: WhatsApp, Email',
      },
      {
        number: 2,
        bodyAr: 'نقوم بالرد سريعًا لتأكيد استلام المستند المطلوب ترجمته',
        bodyEn:
          'We respond promptly, acknowledging the receipt of the document required to be translated.',
      },
      {
        number: 3,
        bodyAr:
          'نقوم بمراجعة المستند وتحديد اللغة المطلوبة للترجمة، والمدة الزمنية اللازمة للتنفيذ، والتكلفة، ثم نبدأ عملية الترجمة وفقًا لما تم الاتفاق عليه',
        bodyEn:
          'We evaluate the document, determine the target language, turnaround time, and cost, and commence the translation process as agreed.',
      },
      {
        number: 4,
        bodyAr: 'يتم سداد قيمة الخدمة عن طريق التحويل البنكي',
        bodyEn: 'Payment is made through bank transfer',
      },
      {
        number: 5,
        bodyAr:
          'يتم إرسال المستند المُترجم إما عبر البريد الإلكتروني أو الواتساب، وفقًا لما يناسب العميل',
        bodyEn:
          'Translated document shall be sent either through email or WhatsApp, as per the client convenient.',
      },
      {
        number: 6,
        bodyAr: 'يستلم العميل المستند المُترجم بصيغة PDF او مستند Word',
        bodyEn: 'Client shall receive the translated document in PDF or Word Document format',
      },
    ] as ServiceStepItem[],
  },
  communicationChannels: {
    heading: {
      ar: 'قنوات التواصل',
      en: 'Communication Channels',
    },
    leadAr: 'بإمكانكم التواصل معنا عبر قنوات التواصل التالية',
    leadEn: 'You may reach us through the following communication channels:',
    channels: [
      {
        label: 'Email',
        value: 'Sami.legal@outlook.com',
        href: 'mailto:Sami.legal@outlook.com',
      },
      {
        label: 'Whatsapp',
        value: '+971 50 509 5759',
        href: 'https://wa.me/971505095759',
      },
      {
        label: 'Hotline',
        value: '+971 50 509 5759',
        href: 'tel:+971505095759',
      },
    ] as ContactChannelItem[],
  },
} as const;

export function clamp01(val: number): number {
  if (val <= 0) return 0;
  if (val >= 1) return 1;
  return val;
}

export function computeScrollProgress(scrollY: number, maxScroll: number): number {
  if (maxScroll <= 0) return 0;
  return clamp01(scrollY / maxScroll);
}

export function computeLogoDockState(scrollY: number, threshold = 240): {
  progress: number;
  isDocked: boolean;
  scale: number;
  translateY: number;
} {
  const progress = clamp01(scrollY / threshold);
  // Smooth ease-out curve
  const eased = 1 - Math.pow(1 - progress, 3);
  return {
    progress: eased,
    isDocked: progress >= 0.85,
    scale: 1 - eased * 0.62,
    translateY: -eased * 118,
  };
}

export function computeParallaxOffset(
  elementCenterOffset: number,
  speed: number,
  viewportWidth: number,
  reducedMotion: boolean
): number {
  if (reducedMotion) return 0;
  const responsiveFactor = viewportWidth < 768 ? 0.35 : viewportWidth < 1024 ? 0.65 : 1;
  return Number((elementCenterOffset * speed * responsiveFactor).toFixed(2));
}
