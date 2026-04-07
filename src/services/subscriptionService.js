export const getSortParamsByOption = (value) => {
  switch (value) {
    case "name-asc":
      return {
        sortBy: "name",
        sortOrder: "asc",
      };
    case "name-desc":
      return {
        sortBy: "name",
        sortOrder: "desc",
      };
    case "price-asc":
      return {
        sortBy: "price",
        sortOrder: "asc",
      };
    case "price-desc":
      return {
        sortBy: "price",
        sortOrder: "desc",
      };
    case "end-date-asc":
      return {
        sortBy: "endDate",
        sortOrder: "asc",
      };
    case "end-date-desc":
      return {
        sortBy: "endDate",
        sortOrder: "desc",
      };
    case "default":
      return {};
  }
};
