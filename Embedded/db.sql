CREATE TABLE `user`(
    User_code VARCHAR(25) NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(255) NOT NULL
);
CREATE TABLE `admin`(
    admin_code VARCHAR(25) NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL
);

CREATE TABLE Farm(
    User VARCHAR(25) NOT NULL,
    Farm_name VARCHAR(25) NOT NULL PRIMARY KEY,
    save_time int(11) NOT NULL,
    CONSTRAINT fk_farm FOREIGN KEY(user) REFERENCES user(User_code) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Fishbowl(
    Farm_name VARCHAR(25) NOT NULL,
    Temperature_sensor FLOAT NOT NULL,
    PH_sensor FLOAT(11) NOT NULL,
    date DATE NOT NULL,
    Time TIME NOT NULL,
    CONSTRAINT fk_fishbowl FOREIGN KEY(Farm_name) REFERENCES Farm(Farm_name) ON DELETE CASCADE ON UPDATE CASCADE
);



