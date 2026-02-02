CREATE TABLE repair_history
(
    id          bigint IDENTITY (1, 1) NOT NULL,
    repair_id   varchar(255),
    status      varchar(255),
    description varchar(255),
    date        date,
    CONSTRAINT pk_repairhistory PRIMARY KEY (id)
)
    GO

ALTER TABLE repair_history
    ADD CONSTRAINT FK_REPAIRHISTORY_ON_REPAIR FOREIGN KEY (repair_id) REFERENCES repair (request)
    GO