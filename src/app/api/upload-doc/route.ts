import { NextRequest, NextResponse } from 'next/server';
import { createFolderIfNotExists, uploadFileToGoogleDrive } from '../../../lib/googleDrive';
import { sendNotificationEmail } from '../../../lib/sendEmail';
import { randomBytes } from 'node:crypto';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Operation timed out after ${ms / 1000} seconds`));
        }, ms);

        promise
            .then((result) => {
                clearTimeout(timer);
                resolve(result);
            })
            .catch((error) => {
                clearTimeout(timer);
                reject(error);
            });
    });
}

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
        const university = formData.get("university") as string;
        const message = formData.get("message") as string;
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

        const folderName = `${firstName} ${lastName ? lastName + ' - ' : ' - '}${userEmail ? userEmail : randomBytes(6).toString('hex')}`;

        const userFolderId = await createFolderIfNotExists(folderName, parentFolderId);

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

        // Set a timeout of 60 seconds (1 minutes) for the upload process
        const timeout = 60000;
        await withTimeout(
            Promise.all(
                files.map((file) => uploadFileToGoogleDrive(file, userFolderId))
            ),
            timeout
        );

        const emailHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Visa Application Notification</title>
            <style>
                body {
                    font-family: 'Montserrat', sans-serif;
                    background-color: #FDFCF9; /* primary-light */
                    color: #272424; /* dark-primary */
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 40px auto;
                    background-color: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
                    border: 1px solid #FAE6C0; /* primary-light-alt */
                }
                .header {
                    background-color: #E9B434; /* primary */
                    color: white;
                    text-align: center;
                    padding: 40px 20px;
                }
                .header h1 {
                    font-size: 52px;
                    line-height: 120%;
                    font-weight: 700;
                    margin: 0;
                    letter-spacing: -1px;
                }
                .content {
                    padding: 40px 30px;
                    background-color: #FEFBF5; /* footer-bg */
                    color: #272424; /* dark-primary */
                    font-size: 16px;
                    line-height: 150%;
                    text-align: left;
                }
                .content p {
                    margin-bottom: 20px;
                }
                .content .important {
                    font-weight: bold;
                    color: #F74C06; /* secondary */
                }
                .details {
                    background-color: #FAE6C0; /* primary-light-alt */
                    padding: 20px;
                    border-radius: 10px;
                    border: 1px solid #F7E5B8; /* primary-alt */
                    margin-bottom: 30px;
                }
                .details p {
                    margin: 8px 0;
                    font-size: 16px;
                    line-height: 1.6;
                }
                .details p span {
                    font-weight: 600;
                    color: #CF9B16; /* primary-dark */
                }
                .footer {
                    text-align: center;
                    background-color: #FFF6F3; /* secondary-light */
                    padding: 30px 20px;
                    color: #272424; /* dark-primary */
                    font-size: 14px;
                    line-height: 130%;
                }
                .footer p {
                    margin: 5px 0;
                }
                .footer .signature {
                    font-size: 18px;
                    font-weight: 600;
                    color: #272424;
                }
                .footer a {
                    color: #E9B434; /* primary */
                    text-decoration: none;
                    font-weight: 600;
                }
                /* Mobile responsiveness */
                @media (max-width: 640px) {
                    .header h1 {
                        font-size: 36px;
                    }
                    .content {
                        padding: 30px 20px;
                    }
                    .footer {
                        padding: 20px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Email Header -->
                <div class="header">
                    <h1>Visa Application</h1>
                </div>
                <!-- Email Content -->
                <div class="content">
                    <p>Dear Team,</p>
                    <p>We have received a new visa application with the following details:</p>
                    <div class="details">
                        <p><span>Visa Type:</span> ${visaType}</p>
                        <p><span>Desired University:</span> ${university}</p>
                        <p><span>Desired Country:</span> ${country}</p>
                        <p><span>Full Name:</span> ${userName}</p>
                        <p><span>Email:</span> ${userEmail}</p>
                        <p><span>Phone Number:</span> ${phoneNumber}</p>
                        <p><span>Message:</span> ${message}</p>
                    </div>
                    <p>Please review the attached documents for further details. We appreciate your prompt attention to this matter.</p>
                </div>
                <!-- Email Footer -->
                <div class="footer">
                    <p class="signature">Best regards,</p>
                    <p><strong>Visa Processing Team</strong></p>
                    <p>&copy; 2024 <a href="https://www.ferozvisaconsultancy.com">Feroz Visa Consultancy</a>. All Rights Reserved.</p>
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
        } catch (ex: any) { }

        return NextResponse.json(
            { message: "Files uploaded and email sent successfully." },
            { status: 200 }
        );
    } catch (error: any) {
        if (error.message.includes("timed out")) {
            return NextResponse.json(
                { error: "File upload process timed out. Please try again." },
                { status: 504 }
            );
        }

        return NextResponse.json(
            { error: `Error processing the request: ${error.message}` },
            { status: 500 }
        );
    }
}
