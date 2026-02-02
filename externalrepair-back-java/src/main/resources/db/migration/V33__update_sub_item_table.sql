ALTER TABLE sub_item
    ADD warehouse_receipt_date date
GO

ALTER TABLE sub_item
    ADD warehouse_received_quantity bigint
GO

ALTER TABLE sub_item
    ADD warehouse_received bit
    CONSTRAINT DF_sub_item_warehouse_received DEFAULT 0
GO