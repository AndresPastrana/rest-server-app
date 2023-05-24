export const calculateTotalPages = (totalDocs, perPage) => {
  const pages =
    (totalDocs % perPage === 0 && totalDocs / perPage) ||
    Math.floor(totalDocs / perPage) + 1;

  return pages;
};


export const pagination = async (Model,perPage, page, query)=>{
  let skip;
  const totalDocs = await Model.count(query);

  const pages = calculateTotalPages(totalDocs, perPage);

  if (page > 0 && page != 1) {
    skip = (page - 1) * perPage;
  }

  if (page == 1 || page <= 0) {
    skip = 0;
  }

  return { totalDocs, pages, skip, page };
}

