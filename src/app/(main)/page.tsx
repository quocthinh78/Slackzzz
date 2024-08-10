import { redirect } from "next/navigation";
import { getUserData } from "@/actions/get-user-data";

export default async function Home() {
  const userData = await getUserData();

  if (!userData) return redirect("/auth");
  const userWorkSpaceId = userData?.workspaces?.[0];
  if (!userWorkSpaceId) return redirect("/create-workspace");
  if (userWorkSpaceId) return redirect(`/workspace/${userWorkSpaceId}`);
}
