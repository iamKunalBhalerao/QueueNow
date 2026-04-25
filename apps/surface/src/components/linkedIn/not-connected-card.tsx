import { LinkedinIcon } from "lucide-react";

export function NotConnectedCard() {
  const handleConnect = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/linkedin/setup`;
  };

  return (
    <div className="rounded-xl border p-8 text-center space-y-4">
      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
        <LinkedinIcon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-medium">Connect your LinkedIn account</p>
        <p className="text-sm text-muted-foreground mt-1">
          Connect once and we&apos;ll securely store access so you can schedule posts
          anytime.
        </p>
      </div>
      <button
        onClick={handleConnect}
        className="inline-flex items-center gap-2 bg-[#0A66C2] text-white text-sm font-medium px-5 py-2.5 rounded-lg"
      >
        <LinkedinIcon className="w-4 h-4 fill-white" />
        Connect LinkedIn
      </button>
      <p className="text-xs text-muted-foreground">
        Permissions requested:{" "}
        {["openid", "profile", "email", "w_member_social"].map((s) => (
          <span
            key={s}
            className="inline-block mx-0.5 px-2 py-0.5 bg-muted rounded-full"
          >
            {s}
          </span>
        ))}
      </p>
    </div>
  );
}
