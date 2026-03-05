CREATE TABLE users (
   id VARCHAR(40) NOT NULL,
   email TEXT UNIQUE NOT NULL,
   password TEXT NOT NULL,
   joined_date TIMESTAMP(6) NOT NULL DEFAULT(CURRENT_TIMESTAMP),
   last_login TIMESTAMP(6)
);

ALTER TABLE users 
   ADD CONSTRAINT users_pk 
   PRIMARY KEY (id);

CREATE TABLE tags (
   id VARCHAR(40) NOT NULL,
   created_by VARCHAR(40) NOT NULL,
   created_on TIMESTAMP(6) NOT NULL DEFAULT(CURRENT_TIMESTAMP),
   updated_on TIMESTAMP(6) NOT NULL DEFAULT(CURRENT_TIMESTAMP),
   public BOOLEAN NOT NULL,
   name VARCHAR(40) NOT NULL
);

ALTER TABLE tags 
   ADD CONSTRAINT tags_pk 
   PRIMARY KEY (id);
CREATE INDEX tags_idx_created_by
   ON tags
   USING btree(created_by);
CREATE INDEX tags_idx_public 
   ON tags
   USING btree(public);
ALTER TABLE tags 
   ADD CONSTRAINT tags_fk_created_by 
   FOREIGN KEY(created_by) 
   REFERENCES users(id)
   ON DELETE CASCADE;

CREATE TABLE tasks (
   id VARCHAR(40) NOT NULL,
   created_by VARCHAR(40) NOT NULL,
   created_on TIMESTAMP(6) NOT NULL DEFAULT(CURRENT_TIMESTAMP),
   updated_on TIMESTAMP(6) NOT NULL DEFAULT(CURRENT_TIMESTAMP),
   assigned_to VARCHAR(40) NOT NULL,
   due_date TIMESTAMP(6),
   title VARCHAR(100) NOT NULL,
   description TEXT
);

ALTER TABLE tasks 
   ADD CONSTRAINT tasks_pk 
   PRIMARY KEY (id);

CREATE TABLE tasks_tags (
   task_id VARCHAR(40) NOT NULL,
   tag_id VARCHAR(40) NOT NULL
);

ALTER TABLE tasks_tags 
   ADD CONSTRAINT tasks_tags_pk 
   PRIMARY KEY (task_id, tag_id);
CREATE INDEX tasks_tags_idx_task
   ON tasks_tags
   USING btree(task_id);
CREATE INDEX tasks_tags_idx_tag_id
   ON tasks_tags
   USING btree(tag_id);
ALTER TABLE tasks_tags 
   ADD CONSTRAINT tasks_tags_fk_task
   FOREIGN KEY(task_id) 
   REFERENCES tasks(id)
   ON DELETE CASCADE;
ALTER TABLE tasks_tags 
   ADD CONSTRAINT tasks_tags_fk_tag
   FOREIGN KEY(tag_id) 
   REFERENCES tags(id)
   ON DELETE CASCADE;
