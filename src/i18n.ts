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
