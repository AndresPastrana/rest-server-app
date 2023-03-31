export const calculateTotalPages = (totalUsers, perPage) => {
  const pages =
    (totalUsers % perPage === 0 && totalUsers / perPage) ||
    Math.floor(totalUsers / perPage) + 1;

  return pages;
};
