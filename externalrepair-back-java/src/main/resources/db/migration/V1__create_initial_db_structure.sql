CREATE TABLE action
(
    id                bigint IDENTITY (1, 1) NOT NULL,
    title             varchar(255),
    message           varchar(255),
    nf                varchar(255),
    is_read           bit                    NOT NULL,
    created_at        datetime,
    supplier_document varchar(255),
    CONSTRAINT pk_action PRIMARY KEY (id)
)
    GO

CREATE TABLE item
(
    id                bigint IDENTITY (1, 1) NOT NULL,
    material          varchar(255),
    description       varchar(255),
    quantity          bigint,
    output_quantity   bigint,
    received_quantity bigint,
    unit_weight       float(53),
    unit_value        float(53),
    total_value       float(53),
    dimensions        varchar(255),
    label             varchar(255),
    receipt_date          date,
    repair_id         varchar(255),
    CONSTRAINT pk_item PRIMARY KEY (id)
)
    GO

CREATE TABLE logistic
(
    name varchar(255) NOT NULL,
    CONSTRAINT pk_logistic PRIMARY KEY (name)
)
    GO

CREATE TABLE notification
(
    id                bigint IDENTITY (1, 1) NOT NULL,
    name              varchar(255),
    action            varchar(255),
    nf                varchar(255),
    is_read           bit                    NOT NULL,
    created_at        datetime,
    supplier_document varchar(255),
    CONSTRAINT pk_notification PRIMARY KEY (id)
)
    GO

CREATE TABLE person
(
    email       varchar(255) NOT NULL,
    name        varchar(255),
    person_type varchar(255),
    CONSTRAINT pk_person PRIMARY KEY (email)
)
    GO

CREATE TABLE photo
(
    id        bigint IDENTITY (1, 1) NOT NULL,
    name      varchar(255),
    repair_id varchar(255),
    CONSTRAINT pk_photo PRIMARY KEY (id)
)
    GO

CREATE TABLE repair
(
    request                  varchar(255) NOT NULL,
    fluig_number             varchar(255),
    nf                       varchar(255),
    incoterms                varchar(255),
    priority                 varchar(255),
    desirable_return_date    date,
    departure_date_uisa      date,
    order_number             varchar(255),
    warehouse_name           varchar(255),
    status_name              varchar(255),
    supplier_document        varchar(255),
    counterparty_email       varchar(255),
    technical_manager_email  varchar(255),
    logistic_name            varchar(255),
    CONSTRAINT pk_repair PRIMARY KEY (request)
)
    GO

CREATE TABLE status
(
    name varchar(255) NOT NULL,
    CONSTRAINT pk_status PRIMARY KEY (name)
)
    GO

CREATE TABLE supplier
(
    document varchar(255) NOT NULL,
    dtype    varchar(31),
    code     bigint,
    name     varchar(255),
    email    varchar(255),
    password varchar(255),
    city     varchar(255),
    state    varchar(255),
    role     varchar(255),
    CONSTRAINT pk_supplier PRIMARY KEY (document)
)
    GO

CREATE TABLE warehouse
(
    name varchar(255) NOT NULL,
    CONSTRAINT pk_warehouse PRIMARY KEY (name)
)
    GO

ALTER TABLE action
    ADD CONSTRAINT FK_ACTION_ON_SUPPLIER_DOCUMENT FOREIGN KEY (supplier_document) REFERENCES supplier (document)
    GO

ALTER TABLE item
    ADD CONSTRAINT FK_ITEM_ON_REPAIR FOREIGN KEY (repair_id) REFERENCES repair (request)
    GO

ALTER TABLE notification
    ADD CONSTRAINT FK_NOTIFICATION_ON_SUPPLIER_DOCUMENT FOREIGN KEY (supplier_document) REFERENCES supplier (document)
    GO

ALTER TABLE photo
    ADD CONSTRAINT FK_PHOTO_ON_REPAIR FOREIGN KEY (repair_id) REFERENCES repair (request)
    GO

ALTER TABLE repair
    ADD CONSTRAINT FK_REPAIR_ON_COUNTERPARTY_EMAIL FOREIGN KEY (counterparty_email) REFERENCES person (email)
    GO

ALTER TABLE repair
    ADD CONSTRAINT FK_REPAIR_ON_LOGISTIC_NAME FOREIGN KEY (logistic_name) REFERENCES logistic (name)
    GO

ALTER TABLE repair
    ADD CONSTRAINT FK_REPAIR_ON_STATUS_NAME FOREIGN KEY (status_name) REFERENCES status (name)
    GO

ALTER TABLE repair
    ADD CONSTRAINT FK_REPAIR_ON_SUPPLIER_DOCUMENT FOREIGN KEY (supplier_document) REFERENCES supplier (document)
    GO

ALTER TABLE repair
    ADD CONSTRAINT FK_REPAIR_ON_TECHNICAL_MANAGER_EMAIL FOREIGN KEY (technical_manager_email) REFERENCES person (email)
    GO

ALTER TABLE repair
    ADD CONSTRAINT FK_REPAIR_ON_WAREHOUSE_NAME FOREIGN KEY (warehouse_name) REFERENCES warehouse (name)
    GO