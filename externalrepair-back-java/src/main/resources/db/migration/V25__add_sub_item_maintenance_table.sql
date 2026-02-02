CREATE TABLE sub_item_maintenance
(
    id               bigint IDENTITY (1, 1) NOT NULL,
    return_nf_number varchar(255),
    return_nf_date   date,
    justification    varchar(255),
    sub_item_id      bigint,
    CONSTRAINT pk_subitemmaintenance PRIMARY KEY (id)
)
    GO

ALTER TABLE sub_item_maintenance
    ADD CONSTRAINT FK_SUBITEMMAINTENANCE_ON_SUB_ITEM FOREIGN KEY (sub_item_id) REFERENCES sub_item (id)
    GO