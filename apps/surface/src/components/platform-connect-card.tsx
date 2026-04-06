import Image from "next/image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import Link from "next/link";

interface PlatformConnectCardProps {
  platformName: string;
  description: string;
  bannerSrc: string;
  redirectUrl: string;
  onConnect?: () => void;
}

export default function PlatformConnectCard({
  platformName,
  description,
  bannerSrc,
  redirectUrl,
  onConnect,
}: PlatformConnectCardProps) {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-lg bg-white">
          <div className="relative w-full h-48 md:h-64">
            <Image
              src={bannerSrc}
              alt={`${platformName} Banner`}
              fill
              className="object-cover rounded-b-lg shadow-lg"
              priority
            />
          </div>
          <div className="p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Connect to {platformName}
            </h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              {description}
            </p>
            <Link href={redirectUrl}>
              <MagneticButton
                size={"lg"}
                className="bg-blue-600 hover:bg-blue-500"
                onClick={onConnect}
              >
                Connect {platformName}
              </MagneticButton>
            </Link>
          </div>
          <div className="border-t border-gray-200"></div>
          <div className="px-6 md:px-8 py-4 bg-gray-50">
            <p className="text-xs md:text-sm text-gray-500">
              We request access to your {platformName} account to enhance your
              experience. Your data is secure and will only be used as described
              in our privacy policy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
