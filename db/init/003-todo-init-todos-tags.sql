CREATE TABLE todos_tags (
   task_id VARCHAR(40) NOT NULL,
   tag_id VARCHAR(40) NOT NULL
);

ALTER TABLE todos_tags 
   ADD CONSTRAINT todos_tags_pk 
   PRIMARY KEY (task_id, tag_id);
CREATE INDEX todos_tags_idx_task
   ON todos_tags
   USING btree(task_id);
CREATE INDEX todos_tags_idx_tag_id
   ON todos_tags
   USING btree(tag_id);
ALTER TABLE todos_tags 
   ADD CONSTRAINT todos_tags_fk_task
   FOREIGN KEY(task_id) 
   REFERENCES todos(id)
   ON DELETE CASCADE;
ALTER TABLE todos_tags 
   ADD CONSTRAINT todos_tags_fk_tag
   FOREIGN KEY(tag_id) 
   REFERENCES tags(id)
   ON DELETE CASCADE;
