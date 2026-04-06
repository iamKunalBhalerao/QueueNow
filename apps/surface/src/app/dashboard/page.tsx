import { PrimaryFlowButton } from "@/components/flow-button";
import { CopyPlus } from "lucide-react";

export default function DashBoardOverview() {
  return (
    <>
      <div className="w-full bg-background flex flex-col">
        <PrimaryFlowButton className="absolute right-4 top-4">
          Create Post <CopyPlus />
        </PrimaryFlowButton>
        Dashboard Home
      </div>
    </>
  );
}
