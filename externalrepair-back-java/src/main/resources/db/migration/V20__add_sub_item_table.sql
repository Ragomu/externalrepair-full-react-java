CREATE TABLE sub_item
(
    id               bigint IDENTITY (1, 1) NOT NULL,
    return_nf_number varchar(255),
    return_nf_date   date,
    return_quantity  bigint,
    sub_item_status  varchar(255),
    sub_item_label   varchar(255),
    item_id          bigint,
    CONSTRAINT pk_subitem PRIMARY KEY (id)
)
    GO

ALTER TABLE sub_item
    ADD CONSTRAINT FK_SUBITEM_ON_ITEM FOREIGN KEY (item_id) REFERENCES item (id)
    GO