/* eslint-disable prettier/prettier */
import { appDirectoryName, fileEncoding, welcomeNoteFileName } from '@shared/constants';
import { NoteInfo } from '@shared/models';
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types';
import { dialog } from 'electron';
import { ensureDir, readdir, readFile, remove, stat, writeFile } from 'fs-extra';
import { isEmpty } from 'lodash';
import { homedir } from 'os';
import path from 'path';
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset';

export const getRootDir = () => {
  return path.join(homedir(), appDirectoryName); // Use path.join for platform-independent path construction
};

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir();
  await ensureDir(rootDir);
  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false,
  });

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'));

 if(isEmpty(notes)){
  console.info('No notes found, showing welcome note');

  const content = await readFile(welcomeNoteFile, { encoding: fileEncoding });

  await writeFile(path.join(rootDir, welcomeNoteFileName), content, { encoding: fileEncoding });

  notes.push(welcomeNoteFileName);

 }

  return Promise.all(notes.map(getNoteInfoFromFilename));
};

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const filePath = path.join(getRootDir(), filename);
  try {
    const fileStats = await stat(filePath);
    return {
      title: filename.replace(/\.md$/, ''),
      lastEditTime: fileStats.mtimeMs,
    };
  } catch (error) {
    console.error('Error while getting file stats:', error);
    throw error; // Propagate the error
  }
};

export const readNote: ReadNote = async (filename) => {
  const filePath = path.join(getRootDir(), `${filename}.md`);
  try {
    return await readFile(filePath, { encoding: fileEncoding });
  } catch (error) {
    console.error('Error while reading file:', error);
    throw error; // Propagate the error
  }
};

export const writeNote: WriteNote = async (filename, content) => {
  const filePath = path.join(getRootDir(), `${filename}.md`);
  console.info(`Writing note to ${filename}`, { encoding: fileEncoding });
  try {
    await writeFile(filePath, content, { encoding: fileEncoding });
  } catch (error) {
    console.error('Error while writing file:', error);
    throw error; // Propagate the error
  }
};

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir();

  await ensureDir(rootDir);

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: path.join(rootDir, 'Untitled.md'),
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }],
  });

  if (canceled || !filePath) {
    console.info('Note creation canceled');
    return false;
  }

  const { name: filename, dir: parentDir } = path.parse(filePath);

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All notes must be saved under ${rootDir}. Avoid using other directories!`,
    });

    return false;
  }

  console.info(`Creating note: ${filePath}`);
  await writeFile(filePath, '');

  return filename;
};


export const deleteNote: DeleteNote = async (filename) => {
    const rootDir = getRootDir();
    const filePath = path.join(rootDir, `${filename}.md`);
  
    const { response } = await dialog.showMessageBox({
      type: 'warning',
      title: 'Delete note',
      message: `Are you sure you want to delete ${filename}?`,
      buttons: ['Delete', 'Cancel'], // 0 is Delete, 1 is Cancel
      defaultId: 1,
      cancelId: 1,
    });
  
    if (response === 1) {
      console.info('Note deletion canceled');
      return false;
    }
  
    try {
      console.info(`Deleting note: ${filename}`);
      await remove(filePath);
      return true;
    } catch (error) {
      console.error('Error while deleting file:', error);
      return false; // Return false to indicate deletion failure
    }
  };