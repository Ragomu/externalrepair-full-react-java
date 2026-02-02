CREATE TABLE sub_item_detail
(
    id          bigint IDENTITY (1, 1) NOT NULL,
    quantity    bigint,
    action      varchar(255),
    sub_item_id bigint,
    CONSTRAINT pk_subitemdetail PRIMARY KEY (id)
)
GO

ALTER TABLE sub_item_detail
    ADD CONSTRAINT FK_SUBITEMDETAIL_ON_SUB_ITEM FOREIGN KEY (sub_item_id) REFERENCES sub_item (id)
GO

ALTER TABLE sub_item
    ADD counterparty_item_status varchar(255)
GO