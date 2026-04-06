import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

const authenticator = async () => {
  try {
    const response = await fetch("/api/upload-auth");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token, publicKey } = data;
    return { signature, expire, token, publicKey };
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error("Authentication request failed");
  }
};

export const handleUpload = async (
  fileInputRef: React.RefObject<HTMLInputElement | null>,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
) => {
  const abortController = new AbortController();
  const fileInput = fileInputRef.current;
  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    alert("Please select a file to upload");
    return;
  }

  const file = fileInput.files[0];

  let authParams;
  try {
    authParams = await authenticator();
  } catch (authError) {
    console.error("Failed to authenticate for upload:", authError);
    return;
  }
  const { signature, expire, token, publicKey } = authParams;

  try {
    const uploadResponse = await upload({
      expire,
      token,
      signature,
      publicKey,
      file,
      fileName: file.name,
      onProgress: (event: { loaded: number; total: number }) => {
        setProgress((event.loaded / event.total) * 100);
      },
      abortSignal: abortController.signal,
    });
    console.log("Upload response:", uploadResponse);
    return uploadResponse;
  } catch (error) {
    // Handle specific error types provided by the ImageKit SDK.
    if (error instanceof ImageKitAbortError) {
      console.error("Upload aborted:", error.reason);
    } else if (error instanceof ImageKitInvalidRequestError) {
      console.error("Invalid request:", error.message);
    } else if (error instanceof ImageKitUploadNetworkError) {
      console.error("Network error:", error.message);
    } else if (error instanceof ImageKitServerError) {
      console.error("Server error:", error.message);
    } else {
      console.error("Upload error:", error);
    }
  }
};
