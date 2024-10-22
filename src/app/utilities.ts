import getConfig from "next/config"
import { headers } from 'next/headers';

export function getBasePath(): string{
    const { publicRuntimeConfig } = getConfig();
    const basePath = publicRuntimeConfig.basePath || '';
    return basePath
}

export function isReverseProxy(): boolean{
    const reqHeaders = headers();
    const headersObject = Object.fromEntries(reqHeaders.entries());

    let isReverseProxy = true;
    if(headersObject?.["x-forwarded-host"] != "localhost") isReverseProxy = false;
    if(headersObject?.["x-forwarded-port"] != "3000") isReverseProxy = false;
    
    return isReverseProxy
}

export function getRoute(path: string): string{
    return (isReverseProxy() ? '/njs/' + path : path).replaceAll('//','/')
}