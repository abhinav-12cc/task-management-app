import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function PUT(
  request: Request,
  { params }: Params
): Promise<NextResponse> {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { title, description, status } = await request.json();
  const userId = (session.user as any).id || (session as any).token?.sub;
  const task = await Task.findOne({ _id: params.id, user: userId });
  if (!task) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  await task.save();
  return NextResponse.json({ task });
}

export async function DELETE(
  request: Request,
  { params }: Params
): Promise<NextResponse> {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = (session.user as any).id || (session as any).token?.sub;
  const task = await Task.findOneAndDelete({ _id: params.id, user: userId });
  if (!task) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Task deleted" });
}
