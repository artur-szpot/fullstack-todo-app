CREATE TYPE permission_type 
   AS ENUM (
      'TODOS',
      'USERS',
      'ROLES',
      'PERMISSIONS'
   );

CREATE TABLE permissions (
   type permission_type NOT NULL,
   description TEXT NOT NULL
);

ALTER TABLE permissions 
   ADD CONSTRAINT permissions_pk 
   PRIMARY KEY (type);
