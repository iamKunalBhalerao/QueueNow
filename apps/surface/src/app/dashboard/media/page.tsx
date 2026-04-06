// import UploadMedia from "@/components/Upload-media";

import AllMedia from "@/components/all-media";
import { UploadMedia } from "@/components/Upload-media";

export default function Media() {
  return (
    <>
      <div className="w-full p-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Media Gallery
          </h1>
          <p className="text-slate-600 mb-6">Manage your media files</p>

          <div className="w-full border-t border-slate-300 my-8" />
          <UploadMedia />
          <div className="w-full border-t border-slate-300 my-8" />
          <AllMedia />
        </div>
      </div>
    </>
  );
}
