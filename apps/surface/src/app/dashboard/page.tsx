import { PrimaryFlowButton } from "@/components/flow-button";
import { CopyPlus } from "lucide-react";
import Link from "next/link";

export default function DashBoardOverview() {
  return (
    <>
      <div className="w-full bg-background flex flex-col">
        <Link href="/post/create-post" className="absolute right-4 top-4">
          <PrimaryFlowButton className="absolute right-4 top-4">
            Create Post <CopyPlus />
          </PrimaryFlowButton>
        </Link>
        Dashboard Home
      </div>
    </>
  );
}
