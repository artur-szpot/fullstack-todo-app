CREATE TABLE todos (
   id VARCHAR(40) NOT NULL,
   created_by VARCHAR(40) NOT NULL,
   created_on TIMESTAMP(6) NOT NULL DEFAULT(CURRENT_TIMESTAMP),
   updated_on TIMESTAMP(6) NOT NULL DEFAULT(CURRENT_TIMESTAMP),
   assigned_to VARCHAR(40) NOT NULL,
   due_date TIMESTAMP(6),
   title VARCHAR(100) NOT NULL,
   description TEXT
);

ALTER TABLE todos 
   ADD CONSTRAINT todos_pk 
   PRIMARY KEY (id);
ALTER TABLE todos 
   ADD CONSTRAINT todos_fk_created_by 
   FOREIGN KEY(created_by) 
   REFERENCES users(id)
   ON DELETE CASCADE;
