import PlatformConnectCard from "@/components/platform-connect-card";

export default function Twitter() {
  return (
    <>
      <PlatformConnectCard
        platformName="Twitter - COMMING SOON"
        redirectUrl={`${process.env.NEXT_PUBLIC_API_URL}/auth/twitter`}
        description="Sync your Twitter profile to enhance your social network"
        bannerSrc="/twitter-image.png"
        // onConnect={() => console.log("Connecting to Twitter...")}
      />
    </>
  );
}
