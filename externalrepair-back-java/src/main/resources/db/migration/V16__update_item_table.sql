ALTER TABLE item
    ADD warehouse_received bit
    CONSTRAINT DF_item_warehouse_received DEFAULT 0
GO