import PlatformConnectCard from "@/components/platform-connect-card";

export default function Twitter() {
  return (
    <>
      <PlatformConnectCard
        platformName="Twitter"
        description="Sync your Twitter profile to enhance your social network"
        bannerSrc="/twitter-banner.jpg"
        onConnect={() => console.log("Connecting to Twitter...")}
      />
    </>
  );
}
