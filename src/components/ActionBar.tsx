import type { Messages } from "../i18n";

type CopyStatus = "idle" | "copied" | "error";

const PNG_SIZES = [128, 256, 512, 1024] as const;

interface Props {
  disabled: boolean;
  onDownloadSvg: () => void;
  onDownloadPng: (size: number) => void;
  onCopy: () => void;
  copyStatus: CopyStatus;
  t: Messages;
}

export default function ActionBar({ disabled, onDownloadSvg, onDownloadPng, onCopy, copyStatus, t }: Props) {
  const copyLabel = copyStatus === "copied" ? t.copied : copyStatus === "error" ? t.failed : t.copy;

  return (
    <div className="action-bar">
      <div className="action-group">
        <span className="action-label">{t.download}</span>
        <div className="action-buttons">
          <button disabled={disabled} onClick={onDownloadSvg}>SVG</button>
          {PNG_SIZES.map((size) => (
            <button key={size} disabled={disabled} onClick={() => onDownloadPng(size)}>
              PNG {size}
            </button>
          ))}
        </div>
      </div>
      <button className="copy-btn" disabled={disabled} onClick={onCopy}>
        {copyLabel}
      </button>
    </div>
  );
}
