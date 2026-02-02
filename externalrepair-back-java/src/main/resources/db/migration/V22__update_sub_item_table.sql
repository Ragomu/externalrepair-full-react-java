ALTER TABLE sub_item
    ADD justification varchar(255)
    GO

ALTER TABLE sub_item
    ADD reproved bit
    CONSTRAINT DF_sub_item_reproved DEFAULT 0
    GO