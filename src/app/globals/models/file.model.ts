export interface filesResponse {
    files: File[],
    folders: File[]
}

export interface FileComment {
    body: string,
    date: string,
    fileId: string,
    fileName: string,
    senderEmail: string,
    senderId: string,
    type: string,
    _id: string
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

export interface Version {
    id : string,
    date : string,
    version : number,
    status : string,
    versionWithNumber : string
}