import { NextResponse, type NextRequest } from "next/server";
import { AdminAuthError, requireSchoolAdminFromRequest } from "@/lib/auth/admin-auth";
import { uploadSchoolMedia } from "@/lib/media/storage-adapter";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ schoolId: string }> }
) {
  try {
    const { schoolId } = await context.params;
    const { schoolId: validSchoolId } = await requireSchoolAdminFromRequest(request, schoolId);

    const formData = await request.formData();
    const file = formData.get("file");
    const folderRaw = formData.get("folder");
    const folder =
      folderRaw === "documents" || folderRaw === "logos" ? folderRaw : "images";

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file upload" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const result = await uploadSchoolMedia({
      schoolId: validSchoolId,
      folder,
      fileName: file.name,
      contentType: file.type,
      buffer: Buffer.from(arrayBuffer),
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 400 }
    );
  }
}
