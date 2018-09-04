function feed(parent, args, ctx, info) {
  return ctx.db.query.posts({ where: { isPublished: true } }, info);
}
function drafts(parent, args, ctx, info) {
  return ctx.db.query.posts({ where: { isPublished: false } }, info);
}
function post(parent, { id }, ctx, info) {
  return ctx.db.query.post({ where: { id } }, info);
}
async function courseFeed(parent, { skip, first }, ctx, info) {
  const courses = await ctx.db.query.courses({ skip, first }, `{id}`);
  const selectionField = `{
   aggregate{
     count
   }
 }`;
  const courseConnection = await ctx.db.query.coursesConnection(
    {},
    selectionField
  );
  return {
    courseIds: courses.map(course => course.id),
    count: courseConnection.aggregate.count
  };
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
