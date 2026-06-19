"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Crop as CropIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Crop State
  const [imgSrc, setImgSrc] = useState("");
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); 
      setCompletedCrop(undefined);
      
      const file = e.target.files[0];
      
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file.");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB.");
        return;
      }
      
      setError("");
      
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });
      reader.readAsDataURL(file);
      
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const cancelCrop = () => {
    setImgSrc("");
    setCrop(undefined);
    setCompletedCrop(undefined);
  };

  const uploadCroppedImage = async () => {
    setLoading(true);
    const sourceImageSrc = imgSrc; // Keep a reference
    setImgSrc(""); // Close modal immediately
    
    try {
      let fileToUpload: Blob;

      if (completedCrop && completedCrop.width > 0 && completedCrop.height > 0 && imgRef.current) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = imgRef.current;
  
        if (!ctx) throw new Error("No 2d context");
  
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
  
        canvas.width = completedCrop.width * scaleX;
        canvas.height = completedCrop.height * scaleY;
  
        ctx.drawImage(
          image,
          completedCrop.x * scaleX,
          completedCrop.y * scaleY,
          completedCrop.width * scaleX,
          completedCrop.height * scaleY,
          0,
          0,
          completedCrop.width * scaleX,
          completedCrop.height * scaleY
        );
  
        fileToUpload = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error("Canvas is empty"));
              return;
            }
            resolve(blob);
          }, "image/jpeg", 0.95);
        });
      } else {
        // Upload original if no crop box was drawn
        const res = await fetch(sourceImageSrc);
        fileToUpload = await res.blob();
      }

      const formData = new FormData();
      formData.append("file", fileToUpload, "cropped.jpg");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err: any) {
      console.error("[ImageUpload] Error:", err);
      setError(err.message || "Failed to upload image.");
    } finally {
      setLoading(false);
      setCompletedCrop(undefined);
    }
  };

  const removeImage = () => {
    onChange("");
  };

  return (
    <div className={className}>
      <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 p-6 text-center transition hover:bg-muted/50">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={loading}
        />

        {value ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border">
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-white shadow-lg transition hover:bg-destructive/80"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center py-4 w-full"
          >
            {loading ? (
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
            ) : (
              <Upload className="h-10 w-10 text-muted-foreground" />
            )}
            <p className="mt-2 text-sm font-medium">
              {loading ? "Uploading..." : "Click or drag image to upload"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              PNG, JPG, JPEG or WEBP up to 5MB
            </p>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-xs font-medium text-destructive">{error}</p>}

      {/* Crop Modal */}
      <AnimatePresence>
        {!!imgSrc && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-deep-black/80 backdrop-blur-sm"
              onClick={cancelCrop}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed left-1/2 top-1/2 z-[101] w-[min(90vw,800px)] max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <CropIcon size={18} /> Crop Image
                </h3>
                <button onClick={cancelCrop} className="p-1 rounded-md hover:bg-muted text-muted-foreground">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-auto bg-deep-black/50 rounded-xl flex items-center justify-center p-4">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  className="max-h-[60vh]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    className="max-h-[60vh] w-auto object-contain"
                  />
                </ReactCrop>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={cancelCrop}>
                  Cancel
                </Button>
                <Button onClick={uploadCroppedImage} disabled={loading}>
                  {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                  Confirm & Upload
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}