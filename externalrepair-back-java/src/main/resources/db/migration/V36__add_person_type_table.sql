CREATE TABLE person_type
(
    email varchar(255) NOT NULL,
    person_type varchar(255)
)
    GO

ALTER TABLE person_type
    ADD CONSTRAINT fk_person_type_on_person FOREIGN KEY (email) REFERENCES person (email)
    GO