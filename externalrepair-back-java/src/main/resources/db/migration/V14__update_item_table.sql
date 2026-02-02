ALTER TABLE item
    ADD warehouse_receipt_date date
GO

ALTER TABLE item
    ADD warehouse_received_quantity bigint
GO