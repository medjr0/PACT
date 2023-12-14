DROP DATABASE ineed;
CREATE DATABASE ineed;
DROP TABLE user;
DROP TABLE associaton;

CREATE TABLE association(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64),
    phone VARCHAR(64),
    address VARCHAR(64),
    mail VARCHAR(64),
    website VARCHAR(64)
);

CREATE TABLE user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64),
    mail VARCHAR(64),
    psw VARCHAR(64),
    role VARCHAR(64),
    association_id INT,
    CONSTRAINT fk_user_association
        FOREIGN KEY (association_id)
        REFERENCES association(id)
        ON DELETE SET NULL
);

CREATE TABLE service(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(256),
    logo VARCHAR(256),
    description TEXT,
    association_id INT,
    isApproved BOOLEAN,
    price INT,
    planning TEXT,
    tutorial VARCHAR(256),
    CONSTRAINT fk_service_association
        FOREIGN KEY (association_id)
        REFERENCES association(id)
        ON DELETE CASCADE
);

DROP TABLE category;

CREATE TABLE category(
    id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(64)
);

CREATE TABLE service_category(
    service_id INT,
    category_id INT,
    PRIMARY KEY (service_id, category_id),
    CONSTRAINT fk_sc_service
        FOREIGN KEY (service_id)
        REFERENCES service(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_sc_category
        FOREIGN KEY (category_id)
        REFERENCES category(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

DROP TABLE type;

CREATE TABLE type(
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(64)
);

DROP TABLE service_type;

CREATE TABLE service_type(
    service_id INT,
    type_id INT,
    PRIMARY KEY (service_id, type_id),
    CONSTRAINT fk_st_service
        FOREIGN KEY (service_id)
        REFERENCES service(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_st_type
        FOREIGN KEY (type_id)
        REFERENCES type(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE lang(
    id INT PRIMARY KEY AUTO_INCREMENT,
    lang VARCHAR(64)
);

CREATE TABLE service_lang(
    service_id INT,
    lang_id INT,
    PRIMARY KEY (service_id, lang_id),
    CONSTRAINT fl_sl_service
        FOREIGN KEY (service_id)
        REFERENCES service(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fl_sl_lang
        FOREIGN KEY (lang_id)
        REFERENCES lang(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE rating(
    id INT PRIMARY KEY AUTO_INCREMENT,
    service_id INT,
    user_key VARCHAR(256),
    rating INT,
    CONSTRAINT fk_rating_service
        FOREIGN KEY (service_id)
        REFERENCES service(id)
        ON DELETE CASCADE
);

CREATE TABLE question(
    id INT PRIMARY KEY AUTO_INCREMENT,
    service_id INT,
    user_key VARCHAR(256),
    question TEXT,
    question_date DATETIME,
    CONSTRAINT fk_question_service
        FOREIGN KEY (service_id)
        REFERENCES service(id)
        ON DELETE CASCADE
);

CREATE TABLE answer(
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT,
    user_key VARCHAR(256),
    answer TEXT,
    answer_date DATETIME,
    CONSTRAINT fk_answer_question
        FOREIGN KEY (question_id)
        REFERENCES question(id)
        ON DELETE CASCADE
);