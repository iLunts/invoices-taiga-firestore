export class FileUpload {
  _userId: string;
  file: File;
  key: string;
  name: string;
  size: number;
  type: string;
  url: string;
  lastModified: number;

  constructor(
    file: File,
    _userId?: string,
    key?: string,
    name?: string,
    url?: string,
    type?: string,
    size?: number,
    lastModified?: number
  ) {
    this.file = file;
    this._userId = _userId || null;
    this.key = key || null;
    this.name = name || null;
    this.url = url || null;
    this.type = type || null;
    this.size = size || null;
    this.lastModified = lastModified || null;
  }
}
