import { type RefObject, useState, useCallback } from "react";
import { triggerDownload } from "../utils/download";

type CopyStatus = "idle" | "copied" | "error";

function getSvgElement(ref: RefObject<HTMLDivElement | null>): SVGSVGElement | null {
  return ref.current?.querySelector("svg") ?? null;
}

function serializeSvg(svg: SVGSVGElement, size?: number): string {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  if (!clone.getAttribute("xmlns")) {
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  }
  if (size) {
    clone.setAttribute("width", String(size));
    clone.setAttribute("height", String(size));
  }
  return new XMLSerializer().serializeToString(clone);
}

function svgToCanvas(svgString: string, size: number): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, size, size);
      resolve(canvas);
    };
    img.onerror = reject;
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
  });
}

export function useQrExport(svgContainerRef: RefObject<HTMLDivElement | null>) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  const downloadSvg = useCallback(() => {
    const svg = getSvgElement(svgContainerRef);
    if (!svg) return;
    const svgString = serializeSvg(svg);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    triggerDownload(blob, "qrcode.svg");
  }, [svgContainerRef]);

  const downloadPng = useCallback(async (size: number) => {
    const svg = getSvgElement(svgContainerRef);
    if (!svg) return;
    const svgString = serializeSvg(svg, size);
    const canvas = await svgToCanvas(svgString, size);
    canvas.toBlob((blob) => {
      if (blob) triggerDownload(blob, `qrcode-${size}px.png`);
    }, "image/png");
  }, [svgContainerRef]);

  const copyToClipboard = useCallback(async () => {
    const svg = getSvgElement(svgContainerRef);
    if (!svg) return;
    const svgString = serializeSvg(svg, 1024);
    try {
      const canvas = await svgToCanvas(svgString, 1024);
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed to create blob"))), "image/png");
      });
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopyStatus("copied");
    } catch {
      try {
        const svg = getSvgElement(svgContainerRef);
        if (!svg) return;
        const canvas = await svgToCanvas(serializeSvg(svg, 1024), 512);
        await navigator.clipboard.writeText(canvas.toDataURL("image/png"));
        setCopyStatus("copied");
      } catch {
        setCopyStatus("error");
      }
    }
    setTimeout(() => setCopyStatus("idle"), 2000);
  }, [svgContainerRef]);

  return { downloadSvg, downloadPng, copyToClipboard, copyStatus };
}
