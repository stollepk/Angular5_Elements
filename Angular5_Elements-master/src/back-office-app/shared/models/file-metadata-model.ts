import {UploadBucket} from "../../../common/enums/upload-bucket";

export class FileMetadataModel {
  key: string;
  uploadBucket: UploadBucket;
  size: number;
  contentType: string;
}
