 standards and example for maintaining log writer
    never have a space inbetween unless its a message
    method_name-log_type-user_id-ip_address-controller_name-message-date_time
        example:
                `get-i-1-123.343.556.09-address-started-${new Date().toUTCString()}`
                `get-i-null-123.343.556.09-address-started-${new Date().toUTCString()}` if user is not authenticated (user_id is null)