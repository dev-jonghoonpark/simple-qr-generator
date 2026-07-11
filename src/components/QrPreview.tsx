import { type RefObject } from "react";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  url: string;
  svgContainerRef: RefObject<HTMLDivElement | null>;
  placeholder: string;
  fgColor: string;
  bgColor: string;
}

export default function QrPreview({ url, svgContainerRef, placeholder, fgColor, bgColor }: Props) {
  return (
    <div className="qr-preview">
      <div className="qr-preview-inner" ref={svgContainerRef} style={{ background: bgColor }}>
        {url ? (
          <QRCodeSVG value={url} size={256} level="M" marginSize={0} fgColor={fgColor} bgColor={bgColor} />
        ) : (
          <div className="qr-placeholder">{placeholder}</div>
        )}
      </div>
    </div>
  );
}
