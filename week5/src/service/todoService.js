import "parse/dist/parse.min.js";
const Parse = window.Parse; // already initialized in the app.jsx

const TodoItem = Parse.Object.extend("TodoItem");

function toPlainObject(parseObject) {
  const owner = parseObject.get("owner");
  return {
    id: parseObject.id,
    text: parseObject.get("text"),
    done: parseObject.get("done"),
    owner: owner ? owner.id : null,
  };
}

export async function fetchTodos() {
  const query = new Parse.Query(TodoItem);
  query.ascending("createdAt"); // oldest first
  const result = await query.find();
  return result.map(toPlainObject);
}

export async function createTodo(text) {
  const item = new TodoItem();
  item.set("text", text);
  item.set("done", false);
  item.set("owner", Parse.User.current());
  return toPlainObject(await item.save());
}

export async function setTodoDone(id, done) {
  const item = TodoItem.createWithoutData(id);
  item.set("done", done);
  return toPlainObject(await item.save());
}

export async function deleteTodo(id) {
  const item = TodoItem.createWithoutData(id);
  await item.destroy();
}
