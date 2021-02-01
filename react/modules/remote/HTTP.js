import { Platform } from "react-native";
import { settings } from "../storage/SettingsStorage";

const url = "https://music.youtube.com/"
const partialEndpoint = "youtubei/v1/"
const parameter = "?alt=json&key="

export function getUrl(endpoint, apiKey) {
    return url + partialEndpoint + endpoint + parameter + apiKey;
}

export const getHttpResponse = async (url, input, type) => {
    if (Platform.OS == "web" || settings.proxyYTM) {
        const location = window.location.protocol + "//" +
                         window.location.host + "/proxy/";

        if (url[23] == "/")
            url = location + url.slice(24);
        else {
            if (url.length == 26)
                url = location + "start";
            else if (url.length > 26)
                url = location + url.slice(26);
        }
    }

    const response = await fetch(url, input);

    if (type == "json")
        return await response.json();
    else if (type == "blob")
        return await response.blob();
    else
        return await response.text();
}

export const getPublicHttpResponse = async (url, input, type) => {
    const response = await fetch(url, input);

    if (type == "json")
        return await response.json();
    else if (type == "blob")
        return await response.blob();
    else
        return await response.text();
}