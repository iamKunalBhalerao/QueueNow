"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllPosts, handleApiError } from "@/lib/api";

type LinkedInPost = {
  id: string;
  postId: string;
  content: string;
  media: string[];
  url?: string | null;
};

type PostItem = {
  id: string;
  platform: "LINKEDIN" | "TWITTER" | string;
  status: string;
  createdAt: string;
  linkedInPost: LinkedInPost | null;
};

type PostResponse = {
  success: boolean;
  totalPosts: number;
  posts: PostItem[];
};

const PAGE_SIZE = 6;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));

const platformMeta = {
  LINKEDIN: {
    title: "LinkedIn",
    accent: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
    icon: <Linkedin className="h-4 w-4" />,
    label: "Professional update",
  },
  TWITTER: {
    title: "Twitter",
    accent: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
    icon: <Twitter className="h-4 w-4" />,
    label: "Quick status",
  },
};

export default function ShowAllPosts() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let mounted = true;

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = (await getAllPosts()) as PostResponse;
        if (mounted) {
          setPosts(response.posts ?? []);
        }
      } catch (err) {
        if (mounted) {
          setError(handleApiError(err));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));

  const currentPosts = useMemo(
    () => posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),

    [page, posts],
  );

  const handlePrevious = () => setPage((value) => Math.max(1, value - 1));
  const handleNext = () => setPage((value) => Math.min(totalPages, value + 1));

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-6 shadow-sm shadow-zinc-200/20 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80 dark:shadow-black/10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              All posts
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Activity feed
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Review your queued updates across platforms. LinkedIn posts get a
              polished business-style card, while Twitter posts appear in a
              crisp micro-update layout.
            </p>
          </div>

          <div className="grid gap-3 sm:auto-cols-fr sm:grid-flow-col sm:items-center">
            <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              {posts.length} total posts
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              page {page} of {totalPages}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950/60"
            >
              <div className="h-4 w-36 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-5 space-y-3">
                <div className="h-4 w-2/4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-5/6 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
          ))
        ) : error ? (
          <div className="rounded-3xl border border-rose-200/80 bg-rose-50/80 p-6 text-sm text-rose-800 dark:border-rose-700/30 dark:bg-rose-950/40 dark:text-rose-200">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-8 text-center text-sm text-slate-600 dark:border-slate-800/80 dark:bg-slate-950/60 dark:text-slate-300">
            No posts found yet. Publish or schedule a post to see it appear
            here.
          </div>
        ) : (
          currentPosts.map((post) => {
            const meta =
              platformMeta[post.platform as keyof typeof platformMeta] ??
              platformMeta.TWITTER;
            const content =
              post.linkedInPost?.content ||
              (post.platform === "TWITTER"
                ? "A Twitter post preview is not available yet."
                : "No content available for this post.");

            return (
              <article
                key={post.id}
                className="overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white/90 shadow-sm shadow-zinc-200/10 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-zinc-200/20 dark:border-zinc-800/80 dark:bg-zinc-950/80 dark:shadow-black/10"
              >
                <div className="flex flex-col gap-5 p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`grid h-12 w-12 place-items-center rounded-3xl border border-zinc-200/80 bg-white text-slate-900 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950 dark:text-slate-100 ${
                          post.platform === "LINKEDIN"
                            ? "text-sky-600"
                            : "text-sky-500"
                        }`}
                      >
                        {meta.icon}
                      </div>
                      <div>
                        <p className="text-base font-semibold text-slate-950 dark:text-white">
                          {meta.title}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {meta.label}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                        post.platform === "LINKEDIN"
                          ? "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-700/40 dark:bg-sky-950/30 dark:text-sky-300"
                          : "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-700/40 dark:bg-sky-950/30 dark:text-sky-300"
                      }`}
                    >
                      {post.platform === "LINKEDIN" ? "linkedin" : "twitter"}
                    </span>
                  </div>

                  <div className="grid gap-5 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-5 text-sm leading-7 text-slate-700 dark:border-slate-800/80 dark:bg-slate-950/70 dark:text-slate-200">
                    <p>{content}</p>

                    {post.platform === "LINKEDIN" && post.linkedInPost?.url ? (
                      <a
                        href={post.linkedInPost.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-sky-600 transition hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                      >
                        View post on LinkedIn
                      </a>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(post.createdAt)}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                        {post.status.toLowerCase()}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                        {post.platform === "LINKEDIN" ? "business" : "social"}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {posts.length > PAGE_SIZE && (
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing {currentPosts.length} of {posts.length} posts
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={page === 1}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={page === totalPages}
              className="gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
