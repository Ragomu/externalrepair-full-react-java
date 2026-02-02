CREATE TABLE sub_item_status_names
(
    sub_item_id bigint NOT NULL,
    status_name varchar(255)
)
GO

ALTER TABLE sub_item_status_names
    ADD CONSTRAINT fk_sub_item_status_names_on_sub_item FOREIGN KEY (sub_item_id) REFERENCES sub_item (id)
GO