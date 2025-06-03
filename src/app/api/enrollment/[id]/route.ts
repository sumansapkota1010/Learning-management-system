import {
  changeEnrollmentStatus,
  deleteEnrollment,
  fetchSingleEnrollment,
} from "../enrollment.controller";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  return fetchSingleEnrollment(req, id);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  return deleteEnrollment(req, id);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  return changeEnrollmentStatus(req, id);
}
