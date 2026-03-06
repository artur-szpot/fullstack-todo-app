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
