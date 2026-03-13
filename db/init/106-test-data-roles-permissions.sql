INSERT INTO roles_permissions(
   role_id,
   permission_type,
   permission_level
)
VALUES (
   'todo-role-admin',
   'USERS',
   'FULL'
), (
   'todo-role-admin',
   'ROLES',
   'FULL'
), (
   'todo-role-admin',
   'PERMISSIONS',
   'FULL'
), (
   'todo-role-user',
   'TODOS',
   'FULL'
);
