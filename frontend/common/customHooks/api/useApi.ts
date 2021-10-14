import { useContext, useRef } from "react";
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
    // const token = await auth.getToken();

    const initParams: RequestInit = {
      ...rest,
      credentials: "same-origin",
      headers: {
        // "Content-Type": "application/json",
        "Accept-Language": "en",
        // Authorization: `Bearer ${token.id_token || token.access_token}`,
        ...headers,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };

    return window.fetch(url, initParams);
  };
}

export default function useApi<T>(clientClass: IClientClass<T>) {
  //   const auth = useContext(AuthenticationContext);

  const client = new clientClass("https://localhost:44335", {
    fetch: createFetch(), //(auth),
  });
  const api = useRef(client);
  return api.current;
}
