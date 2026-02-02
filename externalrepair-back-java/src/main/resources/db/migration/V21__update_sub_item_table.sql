ALTER TABLE sub_item
    ADD fiscal_approved bit
    CONSTRAINT DF_sub_item_fiscal_approved DEFAULT 0
GO