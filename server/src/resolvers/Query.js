function feed(parent, args, ctx, info) {
  return ctx.db.query.posts({ where: { isPublished: true } }, info);
}
function drafts(parent, args, ctx, info) {
  return ctx.db.query.posts({ where: { isPublished: false } }, info);
}
function post(parent, { id }, ctx, info) {
  return ctx.db.query.post({ where: { id } }, info);
}
function courseFeed(parent, args, ctx, info) {
  return ctx.db.query.courses({ where: { isPublished: false } }, info);
}
function course(parent, { id }, ctx, info) {
  return ctx.db.query.course({ where: { id } }, info);
}
module.exports = {
  feed,
  drafts,
  post,
  courseFeed,
  course
};
