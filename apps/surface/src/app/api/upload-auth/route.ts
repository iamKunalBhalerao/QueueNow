import { getUploadAuthParams } from "@imagekit/next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/is-authenticated`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: `accessToken=${accessToken}`,
        },
        withCredentials: true,
      },
    );

    if (response.status !== 200) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch {
    return Response.json({ error: "Authentication failed" }, { status: 401 });
  }

  const { token, expire, signature } = getUploadAuthParams({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  });

  return Response.json({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
}
