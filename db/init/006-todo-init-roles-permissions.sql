CREATE TYPE PERMISSION_LEVEL
   AS ENUM (
      'READ',
      'CREATE',
      'FULL'
   );

CREATE TABLE roles_permissions (
   role_id VARCHAR(40) NOT NULL,
   permission_id VARCHAR(40) NOT NULL,
   permission_level PERMISSION_LEVEL NOT NULL
);

ALTER TABLE roles_permissions 
   ADD CONSTRAINT roles_permissions_pk 
   PRIMARY KEY (role_id, permission_id);
ALTER TABLE roles_permissions 
   ADD CONSTRAINT roles_permissions_fk_role
   FOREIGN KEY(role_id) 
   REFERENCES roles(id)
   ON DELETE CASCADE;
ALTER TABLE roles_permissions 
   ADD CONSTRAINT roles_permissions_fk_permission
   FOREIGN KEY(permission_id) 
   REFERENCES permissions(id)
   ON DELETE CASCADE;
