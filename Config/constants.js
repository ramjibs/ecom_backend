module.exports = {
    error_messages: {
        auth: {
            invalid_phone_number: "Invalid Phone Number",
            internal_server_error: "Some Error Occured",
            phone_number_not_found: "Phone number/email_id not found, Please Sign up",
            invalid_otp: "Invalid OTP entered",
            incorrect_otp: "Incorrect OTP entered",
            invalid_session_id: "Invalid Session Id for OTP",
            otp_request_failed: "Otp provider failed to send, Please try again",
            otp_verify_failed: "Otp provider failed to verify, Please try again",
            invalid_username: "Invalid username",
            invalid_email_id: "Invalid email id",
            invalid_gender: "Invalid Gender",
            email_id_exists: "Email Id already exists, please use different one",
            phone_number_exists: "Phone number exists, Please use different one",
            invalid_dob: "Invalid Date of Birth",
        },
        address: {
            invalid_address_id: "Invalid address id",
            address_not_found: "Address not found for user",
            invalid_title: "Invalid title",
            invalid_line_1: "Invalid line 1",
            invalid_line_2: "Invalid line 2",
            invalid_city: "Invalid city",
            invalid_state: "Invalid state",
            invalid_landmark: "Invalid landmark",
            invalid_pincode: "Invalid pincode"
        },
        product: {
            not_found: "Product not found",
            invalid_id: "Invalid Product Id",
            invalid_product_id: "Invalid Product Id",
            invalid_name: "Invalid Product name",
            inalid_description: "Invlid Product Description",
            invalid_image: "Invalid Image",
            invalid_price: "Invalid Price",
            invalid_discount: "Invalid Discount"
        },
        slot: {
            not_found: "slot not found",
            invalid_time: "invalid timings",
            invalid_from_time: "Invalid from time",
            invalid_to_time: "Invalid to time",
            invalid_slot_id:"Invalid slot id"
        },
        order: {
            not_found: "order not found",
            invalid_time: "invalid timings",
            invalid_from_time: "Invalid from time",
            invalid_to_time: "Invalid to time",
            invalid_order_id:"Invalid order id"
        },
        user:{
            not_found:"user not found",
            invalid_user_id:"Invalid User Id",
            invalid_page_number:"Invalid Page Number",
            invalid_page_count:"Invalid Page Count",
            invalid_user_name:"Invalid User Name"
        },
        offer:{
            not_found: "Offer not found",
            invalid_offer_id: "Invalid Offer Id",
            invalid_name: "Invalid Offer Name",
            inalid_description: "Invlid Offer Description",
            invalid_discount: "Invalid Discount",
            invalid_product_id:"Invalid Product Id"
        },

        wallet:
        {
            not_found: "No data found",
            invalid_wallet_id: "Invalid Wallet Id",
            invalid_user_id: "Invalid User Id",
            invalid_quantity: "Invalid Quantity",
            invalid_transaction_date: "Invalid Transaction Date",
            invalid_date: "Invalid date",
            invalid_meta_json: "Invalid Data",
            quantity_check: "Invalid quantity. Quantity cannot be less than zero",
            invalid_product_id: "Invalid Product ID",
            invalid_page_number:"Invalid Page Number",
            invalid_page_count:"Invalid Page Count"

        },

        general:
        {
            internal_server_error: "Internal Server Error",
            bad_request: "error in validation"
        },
        cart: {
            not_found: "Cart Id not found",
            invalid_id: "Invalid Cart Id",
            invalid_quantity: "Invalid Quantity"
        },
        rating_and_review: {
            not_found: "Rating or Review is not found",
            invalid_title: "Invalid title, please make sure to enter more than 2 characters",
            invalid_rating: "Invalid rating"
        }
    },
    query: {
        sign_in_query: "SELECT * FROM USERS WHERE (PHONE_NUMBER=$1 or email_id=$1) and PASSWORD=$2",
        //sign_in_query: "SELECT PHONE_NUMBER FROM USERS WHERE PHONE_NUMBER = $1",
        verify_otp_query: "SELECT USER_ID,USERNAME,EMAIL_ID,PHONE_NUMBER FROM USERS WHERE PHONE_NUMBER = $1",
        sign_up_check_query: "SELECT * FROM USERS WHERE PHONE_NUMBER = $1 OR EMAIL_ID = $2",
        // sign_up_query: "INSERT INTO USERS(USERNAME,EMAIL_ID,PHONE_NUMBER,DATE_OF_BIRTH,GENDER) VALUES($1,$2,$3,$4,$5)",
        sign_up_query: "INSERT INTO USERS(USER_NAME,EMAIL_ID,PHONE_NUMBER,PASSWORD,IS_ADMIN,CREATED_ON) VALUES($1,$2,$3,$4,$5,$6)",
        update_password_query: "update users set password=$2 where phone_number=$1",
        getUserId: "select user_id from users where email_id=$1 and phone_number=$2",
        auth_query: "SELECT * FROM USERS WHERE USER_ID = $1",
        address: {
            add: "INSERT INTO USER_ADDRESS(USER_ID,TITLE, LINE_1, LINE_2, CITY, STATE, LANDMARK, PINCODE, IS_PRIMARY,longitude,latitude,address_type) VALUES($1,$2,$3,$4,$5,$6,$7,$8,CASE WHEN (SELECT COUNT(*) FROM USER_ADDRESS WHERE USER_ID = $1) > 0 THEN 0 ELSE 1 END,$9,$10,$11)",
            get: "SELECT * FROM USER_ADDRESS WHERE USER_ID = $1",
            delete: "DELETE FROM USER_ADDRESS WHERE USER_ID = $1 AND ID = $2",
            update: "UPDATE USER_ADDRESS SET TITLE = $3, LINE_1 = $4, LINE_2 = $5, CITY = $6, STATE = $7, LANDMARK = $8, PINCODE = $9,,longitude=$10,latitude=$11,address_type=$12, UPDATED_ON = NOW() WHERE USER_ID = $1 AND ID = $2",
            set_primary: "UPDATE USER_ADDRESS SET IS_PRIMARY = 1, UPDATED_ON = NOW() WHERE USER_ID = $1 AND ID = $2;",
            remove_primary: "UPDATE USER_ADDRESS SET IS_PRIMARY = 0, UPDATED_ON = NOW() WHERE USER_ID = $1 AND ID <> $2;"
        },
        orders: {
            add: "INSERT INTO ORDERS (user_id,time_slot_id,order_date,quantity,frequency,price,from_date,to_date,order_status,ORDER_TYPE,address_id,product_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)"

        },
        purchase_history: {
            add: "INSERT INTO PURCHASE_HISTORY(quantity,delivery_date,time_slot_id,address_id,deliver_status,user_id,product_id) VALUES($1,$2,$3,$4,$5,$6,$7)"
            , get: "SELECT * FROM PURCHASE_HISTORY WHERE USER_ID = $1",
        },
        product:
        {
            addProduct: "insert into product(name,description,meta_json,price,discount)values($1,$2,$3,$4,$5)",
            getAllProduct: "select product_id,name,description,product_image,meta_json,price,discount from product where is_delete='False'",
            getProduct: "select product_id,name,description,meta_json,product_image,price,discount from product where is_delete='False' and product_id=$1",
            updateProduct: "update product set name=$2,description=$3,meta_json=$4,price=$5,discount=$6,updated_on=now() where product_id=$1",
            deleteProduct: "update product set is_delete='True' where product_id=$1"
        },
        slot:
        {
            addSlot: "insert into time_slot(from_time,to_time)values($1,$2)",
            getSlot: "select time_slot_id,from_time,to_time from time_slot where is_delete='False'",
            updateSlot: "update time_slot set from_time=$2,to_time=$3 where time_slot_id=$1",
            deleteSlot: "update time_slot set is_delete='True' where time_slot_id=$1"
        },
        Offer:
        {
            addOffer: "insert into offer(product_id,offer_name,offer_description,offer_discount,valid_from,valid_to)values($1,$2,$3,$4,$5,$6)",
            getValidOffer: "select offer_id,offer_name,offer_description,valid_from,valid_to,offer_discount,b.product_id,b.name,b.price,b.description,round((b.price*(offer_discount/100.0)),2) as discounted_price from offer a join product b on a.product_id=b.product_id  where a.is_delete='False' and  CAST (valid_from AS bigint) <= extract(epoch FROM now()) * 1000 and CAST (valid_to AS bigint) >= extract(epoch FROM now()) * 1000",
            getAllOffer: "select offer_id,offer_name,offer_description,valid_from,valid_to,offer_discount,b.product_id,b.product_image,b.name,b.price,b.description,round((b.price*(offer_discount/100.0)),2) as discounted_price from offer a join product b on a.product_id=b.product_id  where a.is_delete='False'",
            getOfferByDate:"select offer_id,offer_name,offer_description,valid_from,valid_to,offer_discount,b.product_id,b.product_image,b.name,b.price,b.description,round((b.price*(offer_discount/100.0)),2) as discounted_price from offer a join product b on a.product_id=b.product_id  where a.is_delete='False' and CAST (valid_from AS bigint) <= $1 and CAST (valid_to AS bigint) >= $2",
            getProductOffer: "select offer_id,offer_name,offer_description,valid_from,valid_to,offer_discount,b.name,b.product_id,b.product_image,b.price,b.description,round((b.price*(offer_discount/100.0)),2) as discounted_price from offer a join product b on a.product_id=b.product_id  where a.is_delete='False' and a.product_id=$1 and  CAST (valid_from AS bigint) <= extract(epoch FROM now()) * 1000 and CAST (valid_to AS bigint) >= extract(epoch FROM now()) * 1000",
            updateOffer: "update offer set product_id=$2,offer_name=$3,offer_description=$4,offer_discount=$5,valid_from=$6,valid_to=$7 where offer_id=$1",
            deleteOffer: "update offer set is_delete='true' where offer_id=$1",
            getOffer:"select offer_id,offer_name,offer_description,offer_discount from offer where is_delete='False' and offer_id=$1",
            offerCheck:"select * from offer where offer_id=$1 and is_delete='False'",
            productCheck:"select * from product where product_id=$1 and is_delete='false'"
        },
        wallet:
        {
            addWallet: "insert into wallet (user_id,product_id,quantity,meta_json) values ($1,$2,$3,$4)",
            getWalletDetail: "select user_id,a.product_id,sum(quantity) as quantity,max(transaction_date) as last_trans_date,max(wallet_id) as last_trans_id,b.name,b.description,b.price,b.discount from wallet a join product b on a.product_id=b.product_id group by user_id,a.product_id,b.name,b.description,b.price,b.discount having user_id=$1",
            getAllTransaction: "select wallet_id,user_id,a.product_id,a.product_image,quantity,transaction_date,b.name,b.description,b.price,b.discount from wallet a join product b on a.product_id=b.product_id offset  $1 rows fetch first $2 rows only",
            getAllUserWallet: "select user_id,a.product_id,a.product_image,sum(quantity) as quantity,max(transaction_date) as last_trans_date,max(wallet_id) as last_trans_id,b.name,b.description,b.price,b.discount from wallet a join product b on a.product_id=b.product_id group by user_id,a.product_id,b.name,b.description,b.price,b.discount offset $1 rows fetch first $2 rows only",
            getTransaction: "select wallet_id,user_id,a.product_id,a.product_image,quantity,transaction_date,b.name,b.description,b.price,b.discount from wallet a join product b on a.product_id=b.product_id where wallet_id =$1",
            getUserTransaction: "select wallet_id,user_id,a.product_id,a.product_image,quantity,transaction_date,b.name,b.description,b.price,b.discount from wallet a join product b on a.product_id=b.product_id where user_id =$1 offset  $2 rows fetch first $3 rows only",
            getTransactionByDate: "select wallet_id,user_id,a.product_id,a.product_image,quantity,transaction_date,b.name,b.description,b.price,b.discount from wallet a join product b on a.product_id=b.product_id where to_char(transaction_date,'dd-mm-yyyy')>=$1 and to_char(transaction_date,'dd-mm-yyyy')<=$2 order by transaction_date offset  $3 rows fetch first $4 rows only",
            checkWallet: "select sum(quantity) as quantity from wallet where product_id=$2 group by user_id having user_id=$1"
        },
        user:
        {
            getUserList : "select user_name,email_id,phone_number from users",
            getUser : "select user_name,email_id,phone_number from users where user_id=$1",
            getUserByName: "select user_name,email_id,phone_number from users where user_name like '%$1%'",
            getUserByPhone: "select user_name,email_id,phone_number from users where phone_number=$1"
        }
    },
    response_code: {
        not_found: 404,
        external_server_error: 503,
        internal_server_error: 500,
        bad_request: 400,
        conflict_occured: 409
    },
    index_name: {
        product: "product_3",
        user_view_product: "user_view_product"
    },
    type: "doc",
    log_file_name: "log.csv",
    bucket_name: "bucket-for-majestic"
}
