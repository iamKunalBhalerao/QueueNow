"use client";

import ConnectedCard from "@/components/linkedIn/connected-card";
import ExpiredCard from "@/components/linkedIn/expired-card";
import { NotConnectedCard } from "@/components/linkedIn/not-connected-card";
import { PageShell } from "@/components/pageShell";
import { Skeleton } from "@/components/ui/skeleton";
import { getLinkedInStatus } from "@/lib/api";
import { LinkedInStatus } from "@/types/linkedin.types";
import { useEffect, useState } from "react";

export default function LinkedIn() {
  const [data, setData] = useState<LinkedInStatus>({ status: "loading" });

  async function fetchLinkedInStatus(setData: (data: LinkedInStatus) => void) {
    const data = await getLinkedInStatus();
    setData(data as LinkedInStatus);
  }

  useEffect(() => {
    fetchLinkedInStatus(setData);
  }, []);

  if (data.status === "loading") {
    return (
      <>
        <PageShell title="LinkedIn">
          <Skeleton className="h-64 mt-4" />
          <Skeleton className="h-12 mt-4" />
        </PageShell>
      </>
    );
  }

  return (
    <>
      <PageShell>
        {data.status === "not_connected" && <NotConnectedCard />}
        {data.status === "expired" && <ExpiredCard {...data} />}
        {data.status === "connected" && <ConnectedCard {...data} />}
      </PageShell>
      {/* <PlatformConnectCard
        platformName="LinkedIn"
        description="Connect once and we'll securely store your access so you can schedule posts without logging in every time."
        bannerSrc="/linkedin-banner.jpg"
        redirectUrl={`${process.env.NEXT_PUBLIC_API_URL}/auth/linkedin`}
      /> */}
    </>
  );
}
