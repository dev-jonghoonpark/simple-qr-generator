import { useMemo, useRef, useState } from "react";
import UrlInput from "./components/UrlInput";
import QrPreview from "./components/QrPreview";
import ActionBar from "./components/ActionBar";
import { useQrExport } from "./hooks/useQrExport";
import { detectLocale, getMessages } from "./i18n";
import "./App.css";

const DEFAULT_URL = "https://jonghoonpark.com";

function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${opacity / 100})`;
}

export default function App() {
  const t = useMemo(() => getMessages(detectLocale()), []);
  const [url, setUrl] = useState(DEFAULT_URL);
  const [fgColor, setFgColor] = useState("#000000");
  const [fgOpacity, setFgOpacity] = useState(100);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgOpacity, setBgOpacity] = useState(100);
  const fgRgba = useMemo(() => hexToRgba(fgColor, fgOpacity), [fgColor, fgOpacity]);
  const bgRgba = useMemo(() => hexToRgba(bgColor, bgOpacity), [bgColor, bgOpacity]);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const { downloadSvg, downloadPng, copyToClipboard, copyStatus } = useQrExport(svgContainerRef);

  return (
    <main className="container">
      <h1>{t.title}</h1>
      <p className="subtitle">{t.footer}</p>
      <UrlInput url={url} onUrlChange={setUrl} placeholder={t.placeholder} />
      <QrPreview url={url} svgContainerRef={svgContainerRef} placeholder={t.qrPlaceholder} fgColor={fgRgba} bgColor={bgRgba} />
      <div className="color-pickers">
        <div className="color-picker-row">
          <label className="color-picker-label">
            <span>{t.qrColor}</span>
            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
          </label>
          <label className="opacity-label">
            <input type="range" min={0} max={100} value={fgOpacity} onChange={(e) => setFgOpacity(Number(e.target.value))} />
            <span className="opacity-value">{fgOpacity}%</span>
          </label>
        </div>
        <div className="color-picker-row">
          <label className="color-picker-label">
            <span>{t.bgColor}</span>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          </label>
          <label className="opacity-label">
            <input type="range" min={0} max={100} value={bgOpacity} onChange={(e) => setBgOpacity(Number(e.target.value))} />
            <span className="opacity-value">{bgOpacity}%</span>
          </label>
        </div>
      </div>
      <ActionBar
        disabled={!url}
        onDownloadSvg={downloadSvg}
        onDownloadPng={downloadPng}
        onCopy={copyToClipboard}
        copyStatus={copyStatus}
        t={t}
      />
      <footer className="footer">
        <a href="https://github.com/dev-jonghoonpark/simple-qr-generator" target="_blank" rel="noopener noreferrer" className="github-link">
          GitHub @dev-jonghoonpark
        </a>
      </footer>
    </main>
  );
}
