ALTER TABLE item
    ADD received bit
        CONSTRAINT DF_item_received DEFAULT 0
GO