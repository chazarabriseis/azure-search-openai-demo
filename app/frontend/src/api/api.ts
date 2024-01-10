import { BlobServiceClient, StorageSharedKeyCredential, AnonymousCredential } from "@azure/storage-blob";
import { InteractiveBrowserCredential } from "@azure/identity";
import axios from "axios";

const BACKEND_URI = "";

import { ChatAppResponse, ChatAppResponseOrError, ChatAppRequest, Config } from "./models";
import { useLogin, appServicesToken } from "../authConfig";

function getHeaders(idToken: string | undefined): Record<string, string> {
    var headers: Record<string, string> = {
        "Content-Type": "application/json"
    };
    // If using login and not using app services, add the id token of the logged in account as the authorization
    if (useLogin && appServicesToken == null) {
        if (idToken) {
            headers["Authorization"] = `Bearer ${idToken}`;
        }
    }

    return headers;
}

// Use the obtained access token to get a Shared Access Signature (SAS)
const getBlobSasToken = async (accessToken: string | undefined) => {
    const blobName = "fragenkatalog.json";

    // Make a request to your backend to generate a SAS token using the obtained access token
    // Your backend should be responsible for creating a SAS token for the specific blob
    // Example: /api/GetBlobSasToken?blobName=your-append-blob-name&accessToken=your-access-token
    const response = await axios.get(`/api/GetBlobSasToken?blobName=${blobName}&accessToken=${accessToken}`);

    return response.data.sasToken;
};

export async function appendToBlobApi(dataToAppend: string, accessToken: string | undefined): Promise<void> {
    console.log("writing to Blob");
    console.log(dataToAppend);
    const accountUrl = "https://stv2cjdtder3zq6.blob.core.windows.net";
    const containerName = "appdata";
    const blobName = "fragenkatalog.json";

    const sasToken = await getBlobSasToken(accessToken);
    const blobServiceClient = new BlobServiceClient(`${accountUrl}?${sasToken}`, new AnonymousCredential());

    //const sharedKeyCredential = new StorageSharedKeyCredential(accountUrl, "your-storage-account-key");
    //const blobServiceClient = new BlobServiceClient(accountUrl, sharedKeyCredential);

    //const credential = new InteractiveBrowserCredential({ tenantId: "dd089e65-09bc-4657-8ad6-0c1cb6181625", clientId: "b3896f94-09f1-45fe-99fe-bfc314d23706" });
    //const blobServiceClient = new BlobServiceClient("https://stv2cjdtder3zq6.blob.core.windows.net", credential);

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getAppendBlobClient(blobName);

    // Append data to the blob
    await blobClient.appendBlock(dataToAppend, dataToAppend.length);
}

export async function askApi(request: ChatAppRequest, idToken: string | undefined): Promise<ChatAppResponse> {
    const response = await fetch(`${BACKEND_URI}/ask`, {
        method: "POST",
        headers: getHeaders(idToken),
        body: JSON.stringify(request)
    });

    const parsedResponse: ChatAppResponseOrError = await response.json();
    if (response.status > 299 || !response.ok) {
        throw Error(parsedResponse.error || "Unknown error");
    }

    return parsedResponse as ChatAppResponse;
}

export async function configApi(idToken: string | undefined): Promise<Config> {
    const response = await fetch(`${BACKEND_URI}/config`, {
        method: "GET",
        headers: getHeaders(idToken)
    });

    return (await response.json()) as Config;
}

export async function chatApi(request: ChatAppRequest, idToken: string | undefined): Promise<Response> {
    return await fetch(`${BACKEND_URI}/chat`, {
        method: "POST",
        headers: getHeaders(idToken),
        body: JSON.stringify(request)
    });
}

export function getCitationFilePath(citation: string): string {
    return `${BACKEND_URI}/content/${citation}`;
}
