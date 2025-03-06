const ROUTES = {
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  BLOGS: '/blogs',
  BLOG_DETAIL: (id: string) => `/blogs/${id}`,
  WRITE_BLOG: '/blogs/write',
};

export default ROUTES;
