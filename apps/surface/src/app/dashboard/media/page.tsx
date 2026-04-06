// import UploadMedia from "@/components/Upload-media";

import { UploadMedia } from "@/components/Upload-media";

export default function Media() {
  return (
    <>
      <div className="w-full p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Media Gallery
          </h1>
          <p className="text-slate-600 mb-12">Manage your media files</p>

          <hr className="my-8 border-slate-300" />

          <UploadMedia />
        </div>
      </div>
    </>
  );
}
