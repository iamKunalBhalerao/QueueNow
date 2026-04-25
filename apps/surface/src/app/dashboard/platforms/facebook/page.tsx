import PlatformConnectCard from "@/components/platform-connect-card";

export default function Facebook() {
  return (
    <>
      <PlatformConnectCard
        redirectUrl={`${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`}
        platformName="Facebook - COMMING SOON"
        description="Sync your Facebook profile to enhance your social network"
        bannerSrc="/twitter-image.png"
        // onConnect={() => console.log("Connecting to Facebook...")}
      />
    </>
  );
}
