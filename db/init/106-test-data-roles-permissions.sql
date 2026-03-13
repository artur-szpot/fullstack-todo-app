INSERT INTO roles_permissions(
   role_id,
   permission_id,
   permission_level
)
VALUES (
   'todo-role-admin',
   'todo-permission-users',
   'FULL'
), (
   'todo-role-admin',
   'todo-permission-roles',
   'FULL'
), (
   'todo-role-admin',
   'todo-permission-permissions',
   'FULL'
), (
   'todo-role-user',
   'todo-permission-todos',
   'FULL'
);
