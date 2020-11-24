export interface filesResponse {
    files: File[],
    folders: File[]
}

export interface FileComment {
    date: string,
    comment: string,
    author: string
}

export interface File {
    _id: string,
    fileName: string,
    dateOfCreation: string,
    owner: {id: string, email:string},
    path: string,
    status: string,
    requiresVerification: boolean,
    verificationStatus: string, 
    storageId: string,
    sharedWith: any[],
    isDirectory: boolean,
    version: number;
    comments: FileComment[]
}
