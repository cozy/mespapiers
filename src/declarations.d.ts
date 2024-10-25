declare module 'cozy-client/dist/models/file' {
  export const splitFilename: (file: IOCozyFile) => {
    filename: string
    extension: string
  }
  export const uploadFileWithConflictStrategy: (
    client: import('cozy-client/types/CozyClient').CozyClient,
    file: Uint8Array,
    destination: {
      name: string
      contentType: string
      dirId: string
      conflictStrategy: string
    }
  ) => Promise<{ data: IOCozyFile }>
}
