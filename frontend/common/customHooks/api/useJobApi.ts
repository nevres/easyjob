import { JobClient } from "../../../api/Clients/JobClient";
import useApi from "./useApi";

export function useJobApi() {
  return useApi(JobClient);
}
