//const accountUrl = "https://stv2cjdtder3zq6.blob.core.windows.net";
//const containerName = "appdata";
//const blobName = "fragenkatalog.json";

//const sasToken = await getBlobSasToken(accessToken);
//const blobServiceClient = new BlobServiceClient(`${accountUrl}?${sasToken}`, new AnonymousCredential());

//const sharedKeyCredential = new StorageSharedKeyCredential(accountUrl, "your-storage-account-key");
//const blobServiceClient = new BlobServiceClient(accountUrl, sharedKeyCredential);

//const credential = new InteractiveBrowserCredential({ tenantId: "dd089e65-09bc-4657-8ad6-0c1cb6181625", clientId: "b3896f94-09f1-45fe-99fe-bfc314d23706" });
//const blobServiceClient = new BlobServiceClient("https://stv2cjdtder3zq6.blob.core.windows.net", credential);

//const containerClient = blobServiceClient.getContainerClient(containerName);
//const blobClient = containerClient.getAppendBlobClient(blobName);

// Append data to the blob
//await blobClient.appendBlock(dataToAppend, dataToAppend.length);
