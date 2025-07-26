import { useState } from "react";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  fallback = "https://via.placeholder.com/400x300?text=Image+Not+Found", 
  ...props 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
}
