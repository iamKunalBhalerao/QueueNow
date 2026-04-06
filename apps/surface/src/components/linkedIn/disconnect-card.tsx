"use client";

import React, { useState } from "react";

export default function DisconnectCard() {
  const [confirming, setConfirming] = useState(false);

  const handleDisconnect = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/linkedin/disconnect`, {
      method: "POST",
      credentials: "include",
    });
    window.location.reload();
  };

  return (
    <div className="rounded-xl border p-5 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">Disconnect LinkedIn</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Removes access. Scheduled posts will be cancelled.
        </p>
      </div>
      {confirming ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setConfirming(false)}
            className="text-xs text-muted-foreground px-3 py-1.5 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleDisconnect}
            className="text-xs text-red-700 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg"
          >
            Yes, disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          className="text-sm text-red-600 border border-red-200 px-4 py-1.5 rounded-lg"
        >
          Disconnect
        </button>
      )}
    </div>
  );
}

// --- Loading skeleton ---
function Skeleton() {
  return (
    <div className="rounded-xl border p-5 space-y-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-muted" />
        <div className="space-y-2 flex-1">
          <div className="h-3.5 bg-muted rounded w-32" />
          <div className="h-3 bg-muted rounded w-48" />
        </div>
      </div>
      <div className="h-1.5 bg-muted rounded-full" />
    </div>
  );
}
