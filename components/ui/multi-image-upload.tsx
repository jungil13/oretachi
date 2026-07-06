"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  className?: string;
}

export function MultiImageUpload({ value, onChange, className }: MultiImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLoading(true);
      setError("");

      const newUrls: string[] = [];
      const files = Array.from(e.target.files);

      try {
        for (const file of files) {
          if (!file.type.startsWith("image/")) {
            setError("Some files were not images and were skipped.");
            continue;
          }

          if (file.size > 5 * 1024 * 1024) {
            setError("Some files exceeded the 5MB limit and were skipped.");
            continue;
          }

          const formData = new FormData();
          formData.append("file", file, file.name);

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            throw new Error(`Failed to upload ${file.name}`);
          }

          const data = await res.json();
          if (data.url) {
            newUrls.push(data.url);
          }
        }
        
        if (newUrls.length > 0) {
          onChange([...value, ...newUrls]);
        }
      } catch (err: any) {
        console.error("[MultiImageUpload] Error:", err);
        setError(err.message || "Failed to upload images.");
      } finally {
        setLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (indexToRemove: number) => {
    onChange(value.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className={className}>
      <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 p-6 text-center transition hover:bg-muted/50 min-h-[200px]">
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={loading}
        />

        <div
          onClick={() => !loading && fileInputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center py-4 w-full"
        >
          {loading ? (
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
          ) : (
            <Upload className="h-10 w-10 text-muted-foreground" />
          )}
          <p className="mt-2 text-sm font-medium">
            {loading ? "Uploading..." : "Click or drag images to upload"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            PNG, JPG, JPEG or WEBP up to 5MB (Multiple allowed)
          </p>
        </div>
      </div>

      {error && <p className="mt-2 text-xs font-medium text-destructive">{error}</p>}

      {value.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {value.map((url, idx) => (
            <div key={idx} className="relative aspect-square overflow-hidden rounded-xl border">
              <Image
                src={url}
                alt={`Uploaded image ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-white shadow-lg transition hover:bg-destructive/80"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
