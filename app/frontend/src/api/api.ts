import { BlobServiceClient, StorageSharedKeyCredential, AnonymousCredential } from "@azure/storage-blob";
import { InteractiveBrowserCredential, DefaultAzureCredential } from "@azure/identity";
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

export async function appendToBlobApi(dataToAppend: string, accessToken: string | undefined): Promise<string> {
    console.log("writing to Blob");
    console.log(dataToAppend);
    return `${BACKEND_URI}/appendtoBlob/${dataToAppend}`;
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

export async function marketingApi(request: ChatAppRequest, idToken: string | undefined): Promise<ChatAppResponse> {
    const response = await fetch(`${BACKEND_URI}/marketingqa`, {
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
    console.log("getting citation");
    console.log(citation);
    return `${BACKEND_URI}/content/${citation}`;
}

export async function chatoriginalApi(request: ChatAppRequest, idToken: string | undefined): Promise<Response> {
    return await fetch(`${BACKEND_URI}/chatoriginal`, {
        method: "POST",
        headers: getHeaders(idToken),
        body: JSON.stringify(request)
    });
}
