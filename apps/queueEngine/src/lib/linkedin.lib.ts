import axios from "axios";

export async function uploadImageToLinkedIn(
  imageKitUrl: string,
  accessToken: string,
  personUrn: string,
) {
  // Register the upload
  const registerBody = {
    registerUploadRequest: {
      recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
      owner: personUrn,
      serviceRelationships: [
        {
          relationshipType: "OWNER",
          identifier: "urn:li:userGeneratedContent",
        },
      ],
    },
  };

  const registration = await axios.post(
    "https://api.linkedin.com/v2/assets?action=registerUpload",
    registerBody,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );

  const uploadUrl =
    registration.data.value.uploadMechanism[
      "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
    ].uploadUrl;
  const assetUrn = registration.data.value.asset;

  // Download from ImageKit and Upload to LinkedIn
  const imageResponse = await axios.get(imageKitUrl, {
    responseType: "arraybuffer",
  });

  await axios.post(uploadUrl, imageResponse.data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "image/jpeg", // Or detect type dynamically
    },
  });

  return assetUrn;
}
