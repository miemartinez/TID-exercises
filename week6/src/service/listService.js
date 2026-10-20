import "parse/dist/parse.min.js";

const List = Parse.Object.extend("List");

// function toPlainObject(parseObject) {
//   const owner = parseObject.get("owner");

//   return {
//     id: parseObject.id,
//     name: parseObject.get("name"),
//     owner: owner ? owner.id : null,
//   };
// }

export async function fetchLists() {
  const query = new Parse.Query(List);
  query.equalTo("owner", Parse.User.current());
  return await query.find(); // returns array
}

export async function createList(name) {
  const list = new List();
  const user = Parse.User.current();

  list.set("name", name);
  list.set("owner", user);
  list.setACL(new Parse.ACL(user));

  return await list.save();
}
