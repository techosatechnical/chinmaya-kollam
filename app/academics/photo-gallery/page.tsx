import { TenantPageShell } from "@/components/TenantPageShell";
import { PhotoGalleryClient } from "@/components/pages/PhotoGalleryClient";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolAlbums } from "@/lib/data/school-repository";

export default async function PhotoGalleryPage() {
  const school = await requireActiveSchool();
  const photos = await getSchoolAlbums(school.id);

  return (
    <TenantPageShell school={school}>
      <PhotoGalleryClient schoolName={school.name} photos={photos} />
    </TenantPageShell>
  );
}
