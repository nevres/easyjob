// import { useAsync } from "react-async-hook";
// import { Control, FieldPath } from "react-hook-form";
// import { CategoryResponse } from "../../api/Models/CategoryResponse";
// import { useJobApi } from "../customHooks/api/useJobApi";
// import MultiSelectElement from "../react-hook-mui/MultiSelectElement";

// export type CategoriesSelectProps<T> = {
//     name: FieldPath<T>;
//     control: Control<T, object>;
// }

// export function CategoriesSelect<T>() {
//   const jobApi = useJobApi();
//   let categoriesPromise = useAsync<CategoryResponse[]>(
//     async () => await jobApi.getJobCategories(),
//     []
//   );

//   return (
//     <div>
//       <MultiSelectElement />
//     </div>
//   );
// }
