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
), (
   'todo-permission-roles',
   'Allows the user to interact with roles',
   'ROLES'
), (
   'todo-permission-permissions',
   'Allows the user to interact with permissions',
   'PERMISSIONS'
);