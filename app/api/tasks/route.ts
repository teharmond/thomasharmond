import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../convex/_generated/api';
import { TaskStatus } from '../../(os)/tasks/status-select';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized: Missing or invalid Authorization header" },
      { status: 401 }
    );
  }

  const token = authHeader.substring(7);
  const expectedToken = process.env.THOMAS_API_KEY;
  
  if (token !== expectedToken) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json(
        { error: "Bad Request: title is required" },
        { status: 400 }
      );
    }

    if (!body.userId) {
      return NextResponse.json(
        { error: "Bad Request: userId is required" },
        { status: 400 }
      );
    }

    const taskData: { 
      text: string; 
      userId: string; 
      status?: TaskStatus;
      priority?: "low" | "medium" | "high" | "urgent";
      description?: string;
      dueDate?: string;
    } = {
      text: body.title,
      userId: body.userId,
    };

    if (body.status) {
      taskData.status = body.status;
    }
    if (body.priority) {
      taskData.priority = body.priority;
    }
    if (body.description) {
      taskData.description = body.description;
    }
    if (body.dueDate) {
      taskData.dueDate = body.dueDate;
    }

    const taskId = await convex.mutation(api.tasks.createTaskWithApiKey, taskData);

    return NextResponse.json({
      success: true,
      taskId,
      message: "Task created successfully"
    }, { status: 201 });

  } catch (error) {
    console.error("Failed to create task:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to create task"
    }, { status: 500 });
  }
}