INSERT INTO permissions(
   id,
   description,
   type
)
VALUES (
   'todo-permission-todos',
   'Allows the user to interact with todos',
   'TODOS'
), (
   'todo-permission-users',
   'Allows the user to interact with users',
   'USERS'
);