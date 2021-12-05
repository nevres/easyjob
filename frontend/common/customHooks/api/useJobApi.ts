import { JobClient } from "../../../apis/jobProcessingApi//Clients/JobClient";
import useApi from "./useApi";

export function useJobApi() {
  return useApi(JobClient);
}
