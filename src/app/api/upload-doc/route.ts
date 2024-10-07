import { NextRequest, NextResponse } from 'next/server';
import { createFolderIfNotExists, uploadFileToGoogleDrive } from '../../../lib/googleDrive';
import { sendNotificationEmail } from '../../../lib/sendEmail';

export async function POST(req: NextRequest) {
    try {
        const contentType = req.headers.get('content-type');
        if (!contentType?.includes('multipart/form-data')) {
            return NextResponse.json(
                { error: 'Invalid Content-Type. Expected multipart/form-data.' },
                { status: 400 }
            );
        }

        const formData = await req.formData();
        const userName = formData.get('userName')?.toString();

        if (!userName) {
            return NextResponse.json(
                { error: 'Missing user name in request body.' },
                { status: 400 }
            );
        }

        const parentFolderId = process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID;
        if (!parentFolderId) {
            return NextResponse.json(
                { error: 'Google Drive parent folder ID is not defined.' },
                { status: 500 }
            );
        }

        const userFolderId = await createFolderIfNotExists(userName, parentFolderId);

        const files: Array<{ originalname: string; mimetype: string; buffer: Buffer }> = [];
        for (const value of formData.values()) {
            if (value instanceof File) {
                const buffer = Buffer.from(await value.arrayBuffer());
                files.push({ originalname: value.name, mimetype: value.type, buffer });
            }
        }

        if (files.length === 0) {
            return NextResponse.json(
                { error: 'No files were uploaded.' },
                { status: 400 }
            );
        }

        const uploadedFileIds = await Promise.all(
            files.map(file => uploadFileToGoogleDrive(file, userFolderId))
        );

        const emailText = `A new document has been uploaded by ${userName} for visa processing. Document IDs: ${uploadedFileIds.join(', ')}.`;

        await sendNotificationEmail(
            process.env.OWNER_EMAIL!,
            'New Document Submission for Visa Processing',
            emailText,
            files.map(file => ({ filename: file.originalname, content: file.buffer }))
        );

        return NextResponse.json({ message: 'Files uploaded and email sent successfully.' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: `Error processing the request: ${error.message}` }, { status: 500 });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};
