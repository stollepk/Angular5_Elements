export class FileUpload {
  documentType: string;
  side: string;
  base64: string;
  fileName: string;
  contentType: string;

  constructor() {
    this.side = "front";
  }
}
