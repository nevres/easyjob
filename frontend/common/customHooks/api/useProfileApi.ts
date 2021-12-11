import { ProfileClient } from "../../../apis/profileApi/Clients/ProfileClient";
import useApi from "./useApi";

export function useProfileApi() {
  return useApi(ProfileClient, "https://localhost:6001");
}
