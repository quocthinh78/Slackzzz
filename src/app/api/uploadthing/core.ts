import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { getUserData } from '@/actions/get-user-data';

const f = createUploadthing();

const currUser = async () => {
  const user = await getUserData();
  console.log("🚀 ~ currUser ~ user:", user)
  return { userId: user?.id };
};

export const ourFileRouter = {
  workspaceImage: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  })
    .middleware(() => currUser())
    .onUploadComplete(() => {
        console.log(123333)
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;