import { type RefObject } from "react";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  url: string;
  svgContainerRef: RefObject<HTMLDivElement | null>;
  placeholder: string;
}

export default function QrPreview({ url, svgContainerRef, placeholder }: Props) {
  return (
    <div className="qr-preview" ref={svgContainerRef}>
      {url ? (
        <QRCodeSVG value={url} size={256} level="M" marginSize={2} />
      ) : (
        <div className="qr-placeholder">{placeholder}</div>
      )}
    </div>
  );
}
