CREATE TABLE additional_nf
(
    id        bigint IDENTITY (1, 1) NOT NULL,
    nf_number varchar(255),
    file_name varchar(255),
    repair_id varchar(255),
    CONSTRAINT pk_additionalnf PRIMARY KEY (id)
)
    GO

ALTER TABLE additional_nf
    ADD CONSTRAINT FK_ADDITIONALNF_ON_REPAIR FOREIGN KEY (repair_id) REFERENCES repair (request)
    GO