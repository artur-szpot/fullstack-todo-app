CREATE TABLE users (
   id VARCHAR(40) NOT NULL,
   email TEXT UNIQUE NOT NULL,
   password TEXT NOT NULL,
   joined_date TIMESTAMP(6) NOT NULL DEFAULT(NOW),
   last_login TIMESTAMP(6)
);

MODIFY TABLE users 
   ADD CONSTRAINT users_pk 
   PRIMARY KEY id;

CREATE TABLE tags (
   id VARCHAR(40) NOT NULL,
   created_by VARCHAR(40) NOT NULL,
   created_on TIMESTAMP(6) NOT NULL DEFAULT(NOW),
   updated_on TIMESTAMP(6) NOT NULL DEFAULT(NOW),
   public BOOLEAN NOT NULL,
   name VARCHAR(40) NOT NULL
)

MODIFY TABLE tags 
   ADD CONSTRAINT tags_pk 
   PRIMARY KEY id;
MODIFY TABLE tags 
   ADD INDEX tags_idx_created_by 
   USING btree(created_by);
MODIFY TABLE tags 
   ADD INDEX tags_idx_public 
   USING btree(public);
CONSTRAINT tags_fk_created_by 
   FOREIGN KEY(created_by) 
   REFERENCES users(id)
   ON DELETE CASCADE;

CREATE TABLE tasks (
   id VARCHAR(40) NOT NULL,
   created_by VARCHAR(40) NOT NULL,
   created_on TIMESTAMP(6) NOT NULL DEFAULT(NOW),
   updated_on TIMESTAMP(6) NOT NULL DEFAULT(NOW),
   assigned_to VARCHAR(40) NOT NULL,
   due_date TIMESTAMP(6),
   title VARCHAR(100) NOT NULL,
   description TEXT,
)

CREATE TABLE tasks_tags (
   task_id VARCHAR(40) NOT NULL,
   tag_id VARCHAR(40) NOT NULL
);

MODIFY TABLE tasks_tags 
   ADD CONSTRAINT tasks_tags_pk 
   PRIMARY KEY (task_id, tag_id);
MODIFY TABLE tasks_tags 
   ADD INDEX tasks_tags_idx_task
   USING btree(task_id);
MODIFY TABLE tasks_tags 
   ADD INDEX tasks_tags_idx_tag_id
   USING btree(tag_id);
CONSTRAINT tasks_tags_fk_task
   FOREIGN KEY(task_id) 
   REFERENCES tasks(id)
   ON DELETE CASCADE;
CONSTRAINT tasks_tags_fk_tag
   FOREIGN KEY(tag_id) 
   REFERENCES tags(id)
   ON DELETE CASCADE;
