import { Profile, TokenInfo } from "@/types/linkedin.types";
import { useMemo } from "react";
import DisconnectCard from "./disconnect-card";

export default function ConnectedCard({
  profile,
  token,
}: {
  profile: Profile;
  token: TokenInfo;
}) {
  const daysLeft = useMemo(() => {
    return Math.ceil(
      (new Date(token.expiresAt).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24),
    );
  }, [token.expiresAt]);

  const barColor =
    token.percentRemaining > 30
      ? "bg-green-500"
      : token.percentRemaining > 10
        ? "bg-amber-500"
        : "bg-red-500";

  return (
    <>
      {/* Profile card */}
      <div className="rounded-xl border p-5 space-y-4">
        <div className="flex items-center gap-3">
          <img
            src={profile.avatarUrl || "/default-avatar.png"}
            alt={profile.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{profile.name}</p>
            {/* {profile.headline && (
              <p className="text-sm text-muted-foreground truncate">
                {profile.headline}
              </p>
            )} */}
          </div>
          <span className="text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
            Connected
          </span>
        </div>
      </div>

      {/* Token health card */}
      <div className="rounded-xl border p-5 space-y-3">
        <p className="text-sm font-medium">Access token</p>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Expires in</span>
          <span className="font-medium">{daysLeft} days</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${barColor}`}
            style={{ width: `${token.percentRemaining}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          {/* <span>
            Connected {new Date(token.connectedAt).toLocaleDateString()}
          </span> */}
          <span>Expires {new Date(token.expiresAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Disconnect */}
      <DisconnectCard />
    </>
  );
}
