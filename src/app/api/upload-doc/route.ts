import { NextRequest, NextResponse } from "next/server";
import {
  createFolderIfNotExists,
  uploadFileToGoogleDrive,
} from "../../../lib/googleDrive";
import { sendNotificationEmail } from "../../../lib/sendEmail";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type");
    if (!contentType?.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid Content-Type. Expected multipart/form-data." },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const country = formData.get("country") as string;
    const visaType = formData.get("visaType") as string;
    const userEmail = formData.get("email") as string;
    const phoneNumber = formData.get("phoneNumber") as string;

    const userName = `${firstName} ${lastName}`;

    if (!userName) {
      return NextResponse.json(
        { error: "Missing user name in request body." },
        { status: 400 }
      );
    }

    const parentFolderId = process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID;
    if (!parentFolderId) {
      return NextResponse.json(
        { error: "Google Drive parent folder ID is not defined." },
        { status: 500 }
      );
    }

    const userFolderId = await createFolderIfNotExists(
      userName,
      parentFolderId
    );

    const files: Array<{
      originalname: string;
      mimetype: string;
      buffer: Buffer;
    }> = [];
    for (const value of formData.values()) {
      if (value instanceof File) {
        const buffer = Buffer.from(await value.arrayBuffer());
        files.push({ originalname: value.name, mimetype: value.type, buffer });
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No files were uploaded." },
        { status: 400 }
      );
    }

    await Promise.all(
      files.map((file) => uploadFileToGoogleDrive(file, userFolderId))
    );

    const emailHtml = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Visa Application Notification</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f8f9fa;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            border-radius: 8px;
                            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                            overflow: hidden;
                        }
                        .header {
                            background-color: #007bff;
                            color: white;
                            padding: 20px;
                            text-align: center;
                        }
                        .content {
                            padding: 20px;
                            line-height: 1.6;
                        }
                        .footer {
                            background-color: #f1f1f1;
                            text-align: center;
                            padding: 10px;
                            font-size: 0.9em;
                            color: #555;
                        }
                        .important {
                            font-weight: bold;
                            color: #007bff;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>New Visa Application Submission</h2>
                        </div>
                        <div class="content">
                            <p>Dear Team,</p>
                            <p>A new application has been submitted for a visa. Below are the details:</p>
                            <p><span class="important">Visa Type:</span> ${visaType}</p>
                            <p><span class="important">Country:</span> ${country}</p>
                            <p><span class="important">Full Name:</span> ${userName}</p>
                            <p><span class="important">Email:</span> ${userEmail}</p>
                            <p><span class="important">Phone Number:</span> ${phoneNumber}</p>
                            <p>Please review the attached documents for further details.</p>
                        </div>
                        <div class="footer">
                            <p>Thank you,</p>
                            <p>Your Visa Application Team</p>
                        </div>
                    </div>
                </body>
                </html>
        `;

    try {
      await sendNotificationEmail(
        [userEmail, process.env.OWNER_EMAIL!],
        `Document Submission for Visa: ${visaType} Country: ${country} By: ${userName}`,
        emailHtml,
        files.map((file) => ({
          filename: file.originalname,
          content: file.buffer,
        }))
      );
    } catch (ex: any) {}

    return NextResponse.json(
      { message: "Files uploaded and email sent successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: `Error processing the request: ${error.message}` },
      { status: 500 }
    );
  }
}
