import { useContext, useRef } from "react";
import authService from "../../auth/AuthorizeService";
// import AuthenticationContext, {
//   IAuthenticationContext,
// } from "../../../contexts/authentication/AuthenticationContext";

interface IHttp {
  fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
}
interface IClientClass<T> {
  new (baseUrl?: string, http?: IHttp): T;
}

// function createFetch(auth: IAuthenticationContext): IHttp["fetch"] {
function createFetch(): IHttp["fetch"] {
  return async (url: RequestInfo, init?: RequestInit): Promise<Response> => {
    let { headers, ...rest } = init ? init : { headers: null };
    const token = await authService.getAccessToken();

    const initParams: RequestInit = {
      ...rest,
      credentials: "same-origin",
      headers: {
        // "Content-Type": "application/json",
        "Accept-Language": "en",
        Authorization: `Bearer ${token}`,
        ...headers
      },
      redirect: "follow",
      referrerPolicy: "no-referrer"
    };

    return window.fetch(url, initParams);
  };
}

export default function useApi<T>(clientClass: IClientClass<T>) {
  //   const auth = useContext(AuthenticationContext);

  const client = new clientClass("https://localhost:7001", {
    fetch: createFetch() //(auth),
  });
  const api = useRef(client);
  return api.current;
}
