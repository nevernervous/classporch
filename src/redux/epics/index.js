import {combineEpics} from 'redux-observable';
import {getUnreadMessageCount} from './DashboardEpics';
import {loadChats} from './ChatEpics';
import {loadMessages, sendMessage, findChat, uploadFile, shareFile} from './MessagingEpics';
import {uploadFileWithProgress} from './ProfileEpics';

export default combineEpics(
  loadChats,
  uploadFileWithProgress,
  loadMessages,
  sendMessage,
  findChat,
  getUnreadMessageCount,
  uploadFile,
  shareFile
);