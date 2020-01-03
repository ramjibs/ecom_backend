module.exports = {

        wallet:
                `create table wallet(wallet_id serial primary key, user_id integer references users(user_id), product_id integer references product(product_id), quantity integer, meta_json varchar(200), transaction_date timestamp default now());`,

    user_address: `CREATE TABLE USER_ADDRESS( USER_ID INT REFERENCES USERS(USER_ID), ID SERIAL CONSTRAINT PK_ADRS PRIMARY KEY, TITLE VARCHAR(100) NOT NULL, LINE_1 VARCHAR(400) NOT NULL, LINE_2 VARCHAR(400) NOT NULL, CITY VARCHAR(300) NOT NULL, STATE VARCHAR(150) NOT NULL, LANDMARK VARCHAR(450), PINCODE VARCHAR(6) NOT NULL, LATITUDE VARCHAR(50), LONGITUDE VARCHAR(50), IS_PRIMARY INT,ADDRESS_TYPE VARCHAR(100), CREATED_ON TIMESTAMPTZ DEFAULT NOW(), UPDATED_ON TIMESTAMPTZ DEFAULT NOW(),PHONE_NUMBER VARCHAR(15)  );`,

     wallet:
                `create table wallet(wallet_id serial primary key, user_id integer references users(user_id), product_id integer references product(product_id), quantity integer, meta_json varchar(200), transaction_date timestamp default now());`,


        Offers:

                `create table offers(offer_id serial primary key, product_id integer references product(product_id), name varchar(100), description varchar(500), from_date timestamp, to_date timestamp, created_on timestamp default now(), updated_on timestamp default now());`,

        Product:

                `CREATE TABLE product(product_id serial NOT NULL, name varchar(500) NOT NULL, description varchar(500), meta_json varchar(2000) NOT NUll, price integer NOT NULL, discount integer, created_on TIMESTAMP NOT NULL DEFAULT now(), updated_on TIMESTAMP NOT NULL DEFAULT now(), is_delete BOOLEAN DEFAULT 'False', CONSTRAINT Product_pk PRIMARY KEY(product_id));`,


        Slot:
                `create table slot(slot_id serial primary key, from_time timestamp, to_time timestamp);`
        ,
        /*         Users:
        
                        `CREATE TABLE USERS(USER_ID SERIAL CONSTRAINT PK_USER PRIMARY KEY, USER_NAME VARCHAR(30) CONSTRAINT CHK_MIN_LEN_UN CHECK(LENGTH(USER_NAME) >= 3) NOT NULL, EMAIL_ID VARCHAR(150) CONSTRAINT UNQ_EMAIL UNIQUE NOT NULL, PHONE_NUMBER VARCHAR(15) CONSTRAINT UNQ_PH UNIQUE NOT NULL, CREATED_ON TIMESTAMPTZ DEFAULT NOW(), UPDATED_ON TIMESTAMPTZ DEFAULT NOW(), password varchar(100), CONSTRAINT CHK_MIN_LEN_PH CHECK(LENGTH(PHONE_NUMBER) >= 10), CONSTRAINT CHK_MIN_LEN_EMAIL CHECK(LENGTH(EMAIL_ID) >= 7), CONSTRAINT CHK_ONLY_NUM_PH CHECK(CAST(PHONE_NUMBER AS BIGINT) <= 9999999999 AND CAST(PHONE_NUMBER AS BIGINT) >= 1000000000));`, */

        orders:
                `CREATE TABLE orders (order_id serial PRIMARY KEY,user_id varchar(500),time_slot_id varchar(500),order_date   date,quantity        integer,frequency  integer,price float,from_date  float,to_date    float,order_status varchar(100),order_type  varchar(50),address_id varchar(100),product_id varchar(50))`
        , purchase_history:
                `CREATE TABLE purchase_history (purchase_ID    serial PRIMARY KEY,order_id varchar(100),quantity integer ,delivery_date float,time_slot_id integer,address_id varchar(100),deliver_status varchar(100),user_id varchar(100),product_id varchar(100))`

}

