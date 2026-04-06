"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Upload, ArrowUpRightIcon } from "lucide-react";
import {
  CraftButton,
  CraftButtonIcon,
  CraftButtonLabel,
} from "./ui/craft-button";

interface MediaUploadProps {
  onMediaSelect?: (file: File) => void;
}

export function UploadMedia({ onMediaSelect }: MediaUploadProps) {
  const [media, setMedia] = useState<{
    file: File;
    preview: string;
    type: "image" | "video";
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  const ACCEPTED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "video/mp4",
    "video/webm",
    "video/quicktime",
  ];

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, error: "File exceeds 50MB limit" };
    }
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return { valid: false, error: "Unsupported file type" };
    }
    return { valid: true };
  };

  const handleFileChange = (file: File) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error || "Invalid file");
      return;
    }

    const isVideo = file.type.startsWith("video/");
    const reader = new FileReader();

    reader.onload = (e) => {
      setMedia({
        file,
        preview: e.target?.result as string,
        type: isVideo ? "video" : "image",
      });
      setError(null);
      onMediaSelect?.(file);
    };

    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleRemove = () => {
    setMedia(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === "Enter" || e.key === " ") && !media) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      data-testid="media-upload-container"
    >
      <motion.div
        layout
        className="flex gap-0"
        initial={false}
        animate={{
          width: media ? "auto" : "auto",
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        {/* Upload Zone */}
        <motion.div layout className="flex-shrink-0" data-testid="upload-zone">
          <motion.div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label="Upload media file"
            className={`
              relative w-80 h-80 rounded-lg border-2 border-dashed
              flex flex-col items-center justify-center cursor-pointer
              transition-colors duration-200
              ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground"
              }
              ${media ? "hidden opacity-0 absolute pointer-events-none" : ""}
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              opacity: media ? 0 : 1,
              pointerEvents: media ? "none" : "auto",
            }}
            transition={{ duration: 0.2 }}
            data-testid="upload-area"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex flex-col items-center gap-3"
            >
              <Upload
                size={40}
                className="text-muted-foreground"
                data-testid="upload-icon"
              />
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  Upload media
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Drag & drop or click
                </p>
              </div>
              <div className="text-xs text-muted-foreground mt-2">Max 50MB</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Preview Pane */}
        <AnimatePresence>
          {media && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="overflow-hidden"
              data-testid="preview-pane"
            >
              <motion.div
                className="w-80 h-80 rounded-lg border border-border bg-card flex flex-col"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {/* Preview Content */}
                <div className="flex-1 relative overflow-hidden rounded-t-lg bg-muted">
                  {media.type === "image" ? (
                    <img
                      src={media.preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      data-testid="preview-image"
                    />
                  ) : (
                    <video
                      src={media.preview}
                      className="w-full h-full object-cover"
                      data-testid="preview-video"
                    />
                  )}
                </div>

                {/* File Info */}
                <motion.div
                  className="p-4 border-t border-border flex flex-col gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {media.file.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(media.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  {/* Upload Button */}
                  <CraftButton>
                    <CraftButtonLabel>Click me</CraftButtonLabel>
                    <CraftButtonIcon>
                      <ArrowUpRightIcon className="size-3 stroke-2 transition-transform duration-500 group-hover:rotate-45" />
                    </CraftButtonIcon>
                  </CraftButton>
                  {/* Remove Button */}
                  <motion.button
                    onClick={handleRemove}
                    className={`
                      w-full px-3 py-2 rounded-md text-sm font-medium
                      flex items-center justify-center gap-2
                      bg-destructive/10 text-destructive
                      hover:bg-destructive/20 transition-colors
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-testid="remove-button"
                    aria-label="Remove media"
                  >
                    <X size={16} />
                    Remove
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-destructive/10 text-destructive px-4 py-2 rounded-md text-sm"
              data-testid="error-message"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleInputChange}
        className="hidden"
        data-testid="file-input"
        aria-hidden="true"
      />
    </motion.div>
  );
}

// import { handleUpload } from "@/lib/upload-imagekit";
// import { useRef, useState } from "react";

// export default function UploadMedia() {
//   const [progress, setProgress] = useState(0);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleFileUpload = async () => {
//     const file = fileInputRef.current?.files?.[0] || null;
//     setSelectedFile(file);

//     const data = await handleUpload(fileInputRef, setProgress);

//     console.log(data);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center gap-6 p-8 rounded-lg border border-gray-200 bg-linear-to-br from-blue-50 to-indigo-50 shadow-md">
//       <h2 className="text-2xl font-bold text-gray-800">Upload Media</h2>

//       <label className="flex items-center justify-center w-full px-6 py-8 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-100 transition-colors bg-white">
//         <span className="text-gray-600 font-medium">
//           Click to select a file
//         </span>
//         <input
//           type="file"
//           ref={fileInputRef}
//           className="hidden"
//           accept="image/*,video/*"
//         />
//       </label>

//       {selectedFile && (
//         <div className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200">
//           <p className="text-sm text-gray-600 mb-2">
//             <span className="font-semibold">Selected file:</span>{" "}
//             {selectedFile.name}
//           </p>
//           <p className="text-xs text-gray-500 mb-3">
//             Size: {(selectedFile.size / 1024).toFixed(2)} KB
//           </p>
//           {selectedFile.type.startsWith("image/") && (
//             <img
//               src={URL.createObjectURL(selectedFile)}
//               alt="Preview"
//               className="w-full h-full object-cover rounded-lg"
//             />
//           )}
//         </div>
//       )}

//       <button
//         type="button"
//         onClick={handleFileUpload}
//         className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
//       >
//         Upload file
//       </button>

//       <div className="w-full">
//         <div className="flex justify-between mb-2">
//           <span className="text-sm font-medium text-gray-700">
//             Upload progress
//           </span>
//           <span className="text-sm font-medium text-blue-600">
//             {Math.round(progress)}%
//           </span>
//         </div>
//         <progress
//           value={progress}
//           max={100}
//           className="w-full h-2 rounded-full overflow-hidden bg-gray-200 appearance-none"
//           style={{
//             background: `linear(to right, rgb(37, 99, 235) ${progress}%, rgb(229, 231, 235) ${progress}%)`,
//           }}
//         />
//       </div>
//     </div>
//   );
// }
