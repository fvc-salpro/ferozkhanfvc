import { google } from 'googleapis';
import { Readable } from 'stream';
import path from 'path';

const SERVICE_ACCOUNT_FILE = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!);
const auth = new google.auth.GoogleAuth({
  credentials: SERVICE_ACCOUNT_FILE,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

interface FileUpload {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}

/**
 * Create a folder in Google Drive if it doesn't exist
 * @param folderName - Name of the folder to create.
 * @param parentFolderId - ID of the parent folder.
 * @returns The ID of the created or existing folder.
 */
export const createFolderIfNotExists = async (
  folderName: string,
  parentFolderId: string
): Promise<string> => {
  try {
    const response = await drive.files.list({
      q: `'${parentFolderId}' in parents and name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name)',
    });

    const folder = response.data.files?.find((file) => file.name === folderName);

    if (folder) {
      return folder.id!;
    }

    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId],
    };

    const folderResponse = await drive.files.create({
      requestBody: fileMetadata,
      fields: 'id',
    });

    return folderResponse.data.id!;
  } catch (error) {
    throw error;
  }
};

/**
 * Upload a file to Google Drive
 * @param file - The file object from multer.
 * @param folderId - The ID of the folder to upload the file into.
 * @returns The ID of the uploaded file.
 */
export const uploadFileToGoogleDrive = async (
  file: FileUpload,
  folderId: string
): Promise<string> => {
  try {
    const fileMetadata = {
      name: file.originalname,
      parents: [folderId],
    };

    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });

    return response.data.id!;
  } catch (error) {
    throw error;
  }
};
