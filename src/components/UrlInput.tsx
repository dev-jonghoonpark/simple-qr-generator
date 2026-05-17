interface Props {
  url: string;
  onUrlChange: (url: string) => void;
  placeholder: string;
}

export default function UrlInput({ url, onUrlChange, placeholder }: Props) {
  return (
    <div className="url-input">
      <input
        type="url"
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder={placeholder}
        autoFocus
      />
    </div>
  );
}
