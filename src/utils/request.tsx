import createDebug from "debug";
import axios from "axios";
import {
    Method,
} from '@/type';

const debug = createDebug( "util:request" );

const SERVER = process.env.REACT_APP_API;
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : SERVER + '/';

const defaultOptions = {
    method: "GET",
    headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json;charset=utf-8",
        "Content-Type": "application/json",
    },
    withCredentials: true,
    credentials: 'include',
};

type Option = {
    url: string,
    method: Method,
    data?: { [ key: string ]: any },
}

/**
 * request common function
 * @param {*} opts 
 * 
 * example
 * 
 * url: 'document/{userId}/{documentId}',
 * 
 * method: 'get' // or post or patch or delete or etc...
 * 
 * data: {
 *    ...
 * }
 */
const request = async ( opts: Option, failDefault: any = null, redirect = true ) => {
    const options = {
        ...defaultOptions,
        ...opts,
        url: `${ opts.url }`,
        // url: `${ SERVER }/${ opts.url }`,
        validateStatus: () => true,
    };
    debug( "request options: ", options );
    const response = await axios( options );
    debug( "response status: ", response.status );
    if(redirect && response.status === 401) {
        window.location.href = "/login";
        return;
    }
    if ( /^20[0124]$/.test( "" + response.status ) ) {
        const { data } = response;
        debug( "request data: ", data );
        return data === "" || data === "SUCCESS" ? true : response.data;
    }
    return failDefault;
}

export default request;
