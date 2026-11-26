import { TenantPageShell } from "@/components/TenantPageShell";
import { VideoGalleryClient } from "@/components/pages/VideoGalleryClient";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolVideos } from "@/lib/data/school-repository";

export default async function VideoGalleryPage() {
  const school = await requireActiveSchool();
  const videos = await getSchoolVideos(school.id);

  return (
    <TenantPageShell school={school}>
      <VideoGalleryClient schoolName={school.name} videos={videos} />
    </TenantPageShell>
  );
}
