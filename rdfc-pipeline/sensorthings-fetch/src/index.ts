import { Stream, Writer } from "@rdfc/js-runner";
import { getLoggerFor } from "./utils/logUtil";

const logger = getLoggerFor("log");

/**
 * The logging function is a very simple processor which simply logs the
 * incoming stream to the console and pipes it directly into the outgoing
 * stream.
 *
 * @param outgoing The data stream into which the incoming stream is written.
 */
export function fetchStapi(
    url: string,
    outgoing: Writer<string>,
    pageSize: number,
): () => Promise<void> {

    console.log('[SensorThings API fetcher] Running fetch function for URL:', url, "with page size:", pageSize);
    let nextLink: string;

    if (!url.includes('$top=')) {
        nextLink = url.includes('?') ? url + `&$skip=0&$top=${pageSize}` :  url + `?$skip=0&$top=${pageSize}`
    } else nextLink = url;

    // Set the orderBy on resultTime and make it ascending to ensure observations are requested from old to new
    // url += "?%0A%24orderby%3DresultTime%20asc"

    return async () => {
        while(nextLink) {
            nextLink += `&$orderby=resultTime%20asc`
            console.log('[SensorThings API fetcher] fetching', nextLink)
            const res = await fetch(nextLink);
            const page = (await res.json()) as any
            outgoing.push(JSON.stringify(page))   
            console.log('[SensorThings API fetcher] Pushing entries:', (page.value && page.value.length) || "unknown");
            nextLink = page["@iot.nextLink"];
            console.log('[SensorThings API fetcher] Next link:', nextLink); 
            // await (new Promise((res, rej) => {
            //     setTimeout(res, 2000); // Wait 2 seconds to avoid overwhelming the API
            // }))
        }
    };
}
