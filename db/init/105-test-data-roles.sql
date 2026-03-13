INSERT INTO roles(
   id,
   name,
   description,
   protected
)
VALUES (
   'todo-role-admin',
   'Admin',
   'Grants administrative access to the application',
   true
), (
   'todo-role-user',
   'User',
   'Grants access to the main functionality of the application',
   true
);
