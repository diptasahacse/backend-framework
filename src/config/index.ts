export const config = {
  database: {
    url: process.env.DATABASE_URL!,
  },
  defaultPagination: {
    limit: 10,
    offset: 0,
  },
};
