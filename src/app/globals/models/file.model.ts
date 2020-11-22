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
    fileName: string,
    dateOfCreation: string,
    owner: string,
    path: string,
    status: string,
    requiresVerification: boolean,
    verificationStatus: string, 
    storageId: string,
    sharedWith: any[],
    isDirectory: boolean,
    comments: FileComment[]
}
