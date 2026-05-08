"use client";

import React, { useRef, useState } from "react";
import { Twitter, Linkedin, Image as ImageIcon, Send } from "lucide-react";
import PostSchedulePicker from "./post-schedule-picker";
import postHandler from "@/handlers/post-handler";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter();

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [contentLength, setContentLength] = useState(0);
  const [platform, setPlatform] = useState<"twitter" | "linkedin">("linkedin");
  const [scheduledAt, setScheduledAt] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentLength(e.target.value.length);
  };

  const handlePost = async () => {
    const content = contentRef.current?.value.trim();
    if (!content) return;

    setIsLoading(true);
    try {
      const response = await postHandler(platform, {
        content,
        media: [], // Placeholder for media URLs
        scheduledAt: scheduledAt || new Date(),
      });

      if (!response.ok && response.success === false) {
        throw new Error(`Failed to post: ${response.statusText}`);
      }

      router.push("/dashboard/all-posts");

      contentRef.current!.value = "";
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl my-4 mx-auto overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm transition-all duration-300">
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Create Post
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Share your updates across platforms.
            </p>
          </div>
        </div>

        {/* Platform Selector */}
        <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg w-fit">
          <button
            onClick={() => setPlatform("linkedin")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              platform === "linkedin"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <Linkedin className="w-4 h-4 text-blue-600" />
            LinkedIn
          </button>
          <button
            onClick={() => setPlatform("twitter")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              platform === "twitter"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <Twitter className="w-4 h-4 text-sky-500" />
            Twitter / X
          </button>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <div className="relative group">
            <textarea
              ref={contentRef}
              onChange={
                platform === "twitter" ? handleContentChange : undefined
              }
              placeholder={
                platform === "twitter"
                  ? "What's happening?"
                  : "Share your professional update..."
              }
              className={`w-full p-4 text-base bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-500 focus:border-transparent outline-none transition-all resize-none placeholder:text-zinc-400 ${
                platform === "linkedin" ? "min-h-55" : "min-h-40"
              }`}
            />
            {platform === "twitter" && (
              <div
                className={`absolute bottom-3 right-3 text-[10px] font-bold ${
                  contentLength > 280 ? "text-red-500" : "text-zinc-400"
                }`}
              >
                {contentLength}/280
              </div>
            )}
          </div>

          {/* Media Upload Placeholder */}
          <div className="group relative flex items-center justify-center py-10 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-full group-hover:scale-110 transition-transform">
                <ImageIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              </div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Click to upload media
              </p>
            </div>
          </div>
        </div>

        <PostSchedulePicker setScheduledAt={setScheduledAt} />

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-900">
          <button
            onClick={() =>
              contentRef.current && (contentRef.current.value = "")
            }
            className="px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handlePost}
            disabled={
              isLoading ||
              !contentRef.current?.value.trim() ||
              (platform === "twitter" && contentLength > 280)
            }
            className="flex items-center gap-2 px-6 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white dark:border-zinc-900/30 dark:border-t-zinc-900 rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{isLoading ? "Posting..." : "Schedule Post"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
