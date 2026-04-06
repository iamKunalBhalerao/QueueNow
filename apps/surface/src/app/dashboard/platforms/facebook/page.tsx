import PlatformConnectCard from "@/components/platform-connect-card";

export default function Facebook() {
  return (
    <>
          <PlatformConnectCard
            platformName="Facebook"
            description="Sync your Facebook profile to enhance your social network"
            bannerSrc="/facebook-banner.jpg"
            onConnect={() => console.log("Connecting to Facebook...")}
          />
    </>
  )
}
