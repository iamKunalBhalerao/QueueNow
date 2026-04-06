import { Profile } from "@/types/linkedin.types";
import { LinkedinIcon } from "lucide-react";

export default function ExpiredCard({ profile, expiredAt }: { profile: Profile; expiredAt: string }) {
  return (
    <>
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        Your LinkedIn access expired on{" "}
        {new Date(expiredAt).toLocaleDateString()}. Scheduled posts are paused
        until you reconnect.
      </div>

      <div className="rounded-xl border p-5 space-y-4">
        <div className="flex items-center gap-3">
          <img
            src={profile.avatarUrl || "/default-avatar.png"}
            alt={profile.name}
            className="w-12 h-12 rounded-full opacity-50"
          />
          <div className="flex-1">
            <p className="font-medium">{profile.name}</p>
          </div>
          <span className="text-xs font-medium text-red-700 bg-red-50 px-2.5 py-1 rounded-full">
            Disconnected
          </span>
        </div>
        <button
          onClick={() =>
            (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/linkedin`)
          }
          className="w-full flex items-center justify-center gap-2 bg-[#0A66C2] text-white text-sm font-medium px-5 py-2.5 rounded-lg"
        >
          <LinkedinIcon className="w-4 h-4 fill-white" />
          Reconnect LinkedIn
        </button>
      </div>
    </>
  );
}
