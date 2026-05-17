import { useMemo, useRef, useState } from "react";
import UrlInput from "./components/UrlInput";
import QrPreview from "./components/QrPreview";
import ActionBar from "./components/ActionBar";
import { useQrExport } from "./hooks/useQrExport";
import { detectLocale, getMessages } from "./i18n";
import "./App.css";

const DEFAULT_URL = "https://jonghoonpark.com";

export default function App() {
  const t = useMemo(() => getMessages(detectLocale()), []);
  const [url, setUrl] = useState(DEFAULT_URL);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const { downloadSvg, downloadPng, copyToClipboard, copyStatus } = useQrExport(svgContainerRef);

  return (
    <main className="container">
      <h1>{t.title}</h1>
      <p className="subtitle">{t.footer}</p>
      <UrlInput url={url} onUrlChange={setUrl} placeholder={t.placeholder} />
      <QrPreview url={url} svgContainerRef={svgContainerRef} placeholder={t.qrPlaceholder} />
      <ActionBar
        disabled={!url}
        onDownloadSvg={downloadSvg}
        onDownloadPng={downloadPng}
        onCopy={copyToClipboard}
        copyStatus={copyStatus}
        t={t}
      />
      <footer className="footer">
        <a href="https://github.com/dev-jonghoonpark" target="_blank" rel="noopener noreferrer" className="github-link">
          GitHub @dev-jonghoonpark
        </a>
      </footer>
    </main>
  );
}
