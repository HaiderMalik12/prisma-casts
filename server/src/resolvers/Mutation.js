const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function createDraft(parent, { title, text }, ctx, info) {
  return ctx.db.mutation.createPost(
    {
      data: {
        title,
        text
      }
    },
    info
  );
}
function createCourse(parent, { name, description }, ctx, info) {
  return ctx.db.mutation.createCourse(
    {
      data: {
        name,
        description
      }
    },
    info
  );
}
function updateCourse(parent, { id, name, description }, ctx, info) {
  return ctx.db.mutation.updateCourse(
    {
      data: { name, description },
      where: { id: id }
    },
    info
  );
}
function deletePost(parent, { id }, ctx, info) {
  return ctx.db.mutation.deletePost({ where: { id } }, info);
}
function deleteCourse(parent, { id }, ctx, info) {
  return ctx.db.mutation.deleteCourse({ where: { id } }, info);
}
function publish(parent, { id }, ctx, info) {
  return ctx.db.mutation.updatePost(
    {
      where: { id },
      data: { isPublished: true }
    },
    info
  );
}
async function signup(parent, { email, password }, ctx, info) {
  const hash = await bcrypt.hash(password, 10);
  const user = await ctx.db.mutation.createUser(
    {
      data: {
        email,
        password: hash
      }
    },
    `{id}`
  );
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  return {
    token,
    user
  };
}
module.exports = {
  createDraft,
  createCourse,
  updateCourse,
  deletePost,
  deleteCourse,
  publish,
  signup
};
