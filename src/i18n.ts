const messages = {
  ko: {
    title: "Simple QR Generator",
    subtitle: "URL을 입력하면 즉시 QR 코드를 생성합니다",
    placeholder: "https://example.com",
    qrPlaceholder: "URL을 입력하세요",
    download: "다운로드",
    copy: "복사 (PNG 1024px)",
    copied: "복사됨!",
    failed: "실패",
    footer: "완전 무료 · 광고 없음 · 회원가입 불필요",
    qrColor: "QR 색상",
    bgColor: "배경 색상",
    featuresTitle: "주요 기능",
    featuresDesc: "Simple QR Generator는 URL을 입력하면 즉시 고품질 QR 코드를 생성하는 무료 온라인 도구입니다. 별도의 회원가입이나 소프트웨어 설치 없이 웹 브라우저에서 바로 사용할 수 있습니다.",
    feature1: "실시간 QR 코드 생성 — URL을 입력하는 즉시 QR 코드가 생성됩니다.",
    feature2: "다양한 다운로드 옵션 — SVG 벡터 형식 또는 PNG(128, 256, 512, 1024px) 래스터 형식으로 다운로드할 수 있습니다.",
    feature3: "클립보드 복사 — 생성된 QR 코드를 클릭 한 번으로 클립보드에 복사하여 바로 붙여넣기할 수 있습니다.",
    feature4: "색상 커스터마이징 — QR 코드와 배경의 색상 및 투명도를 자유롭게 조절하여 브랜드에 맞는 QR 코드를 만들 수 있습니다.",
    howToTitle: "사용 방법",
    howTo1: "위 입력란에 QR 코드로 변환할 URL을 입력하세요.",
    howTo2: "QR 코드가 자동으로 생성됩니다. 필요시 색상과 투명도를 조정하세요.",
    howTo3: "SVG 또는 원하는 크기의 PNG로 다운로드하거나, 클립보드에 복사하세요.",
    faqTitle: "자주 묻는 질문",
    faq1Q: "이 QR 생성기는 정말 무료인가요?",
    faq1A: "네, 완전히 무료입니다. 광고도 없고 회원가입도 필요하지 않습니다. 모든 QR 코드 생성은 브라우저에서 처리되므로 서버에 데이터가 전송되지 않습니다.",
    faq2Q: "생성된 QR 코드에 유효기간이 있나요?",
    faq2A: "아니요, QR 코드 자체에는 유효기간이 없습니다. QR 코드는 입력한 URL을 인코딩한 이미지이므로, 해당 URL이 유효한 한 QR 코드도 계속 작동합니다.",
    faq3Q: "SVG와 PNG 중 어떤 형식을 선택해야 하나요?",
    faq3A: "인쇄물이나 크기 조절이 필요한 경우 SVG를 추천합니다. SVG는 벡터 형식이라 어떤 크기로 확대해도 깨지지 않습니다. 웹이나 메신저에서 사용할 경우 PNG가 호환성이 좋습니다.",
  },
  en: {
    title: "Simple QR Generator",
    subtitle: "Enter a URL to instantly generate a QR code",
    placeholder: "https://example.com",
    qrPlaceholder: "Enter a URL",
    download: "Download",
    copy: "Copy (PNG 1024px)",
    copied: "Copied!",
    failed: "Failed",
    footer: "100% Free · No Ads · No Sign-up",
    qrColor: "QR Color",
    bgColor: "Background",
    featuresTitle: "Features",
    featuresDesc: "Simple QR Generator is a free online tool that instantly creates high-quality QR codes from any URL. No sign-up or software installation required — use it directly in your web browser.",
    feature1: "Real-time QR generation — QR codes are generated instantly as you type.",
    feature2: "Multiple download options — Download as SVG vector or PNG raster (128, 256, 512, 1024px).",
    feature3: "Clipboard copy — Copy the generated QR code to your clipboard with one click for easy pasting.",
    feature4: "Color customization — Adjust the QR code and background colors with opacity controls to match your brand.",
    howToTitle: "How to Use",
    howTo1: "Enter the URL you want to convert into a QR code in the input field above.",
    howTo2: "The QR code is generated automatically. Adjust colors and opacity if needed.",
    howTo3: "Download as SVG or your preferred PNG size, or copy to clipboard.",
    faqTitle: "FAQ",
    faq1Q: "Is this QR generator really free?",
    faq1A: "Yes, it is completely free. No ads, no sign-up required. All QR code generation happens in your browser, so no data is sent to any server.",
    faq2Q: "Do generated QR codes expire?",
    faq2A: "No, QR codes do not have an expiration date. A QR code is simply an encoded image of the URL you entered — it will continue to work as long as the URL is valid.",
    faq3Q: "Should I choose SVG or PNG format?",
    faq3A: "Use SVG for print materials or when you need to resize — it scales without quality loss. Use PNG for web or messaging apps where compatibility matters.",
  },
} as const;

export type Locale = keyof typeof messages;
export type Messages = (typeof messages)[Locale];

export function detectLocale(): Locale {
  const lang = navigator.language;
  return lang.startsWith("ko") ? "ko" : "en";
}

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
