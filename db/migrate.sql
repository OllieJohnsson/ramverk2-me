CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);



CREATE TABLE IF NOT EXISTS reports (
    kmom INT NOT NULL,
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255),
    UNIQUE(kmom, question)
);
