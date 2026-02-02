ALTER TABLE item
    ADD all_sub_items_assigned bit
    CONSTRAINT DF_item_all_sub_items_assigned DEFAULT 0
GO