CREATE TABLE repair_maintenance
(
    id            bigint IDENTITY (1, 1) NOT NULL,
    return_nf     varchar(255),
    return_date   date,
    justification varchar(255),
    repair_id     varchar(255),
    CONSTRAINT pk_repairmaintenance PRIMARY KEY (id)
)
    GO

ALTER TABLE repair_maintenance
    ADD CONSTRAINT FK_REPAIRMAINTENANCE_ON_REPAIR FOREIGN KEY (repair_id) REFERENCES repair (request)
    GO