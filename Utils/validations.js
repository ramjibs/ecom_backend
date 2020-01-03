
const emailRegex = /^.*$/

exports.validatePhoneNumber = (value) => {
    return (value == undefined ||
        !(Number(value) >= 1000000000) ||
        !(Number(value) <= 9999999999));
}

exports.validateOtp = (value) => {
    return (value == undefined ||
        !(Number(value) >= 100000) ||
        !(Number(value) <= 999999))
}

exports.validateEmailId = (value) => {
    return value == undefined || !emailRegex.test(value);
}

exports.validateGender = (value) => {
    return value == undefined || (value != 'm' && value != 'f' && value != 'o');
}


exports.validateDob = (value) => {
    return value == undefined;
}

var numberRegex = /^[0-9]*$/
exports.validateTitle = (value) => {
    return value == undefined;
}

exports.validateDescription = (value) => {
    return value == undefined;
}

exports.validateImage = (value) => {
    return value == undefined;
}

exports.validatePrice = (value) => {
    return value == undefined || !numberRegex.test(value);
}

exports.validateProductName = (value) => {
    return (value == undefined);
}

exports.validateProductId = (value) => {
    return (value == undefined || !Number.isInteger(value));
}

exports.validateDescription = (value) => {
    return (value == undefined);
}
exports.validatePrice = (value) => {
    return (value == undefined || !Number.isInteger(value));
}
exports.validateDiscount = (value) => {
    return (value == undefined || !Number.isInteger(value));
}
exports.validateProductMetaData = (value) => {
    return (value == undefined);
}
exports.validateFromTime = (value) => {
    return (value == undefined);
}
exports.validateToTime = (value) => {
    return (value == undefined);
}
exports.validateTiming = (from_time, to_time) => {
    if (from_time > to_time) {
        return true;
    }
    else {
        return false;
    }
}
exports.validateOfferId = (value) => {
    return (value == undefined || !Number.isInteger(value));
}
exports.validateWalletId = (value) => {
    return (value == undefined || !Number.isInteger(value));
}
exports.validatePageNumber = (value) => {
    return (value == undefined || !Number.isInteger(value));
}
exports.validatePageCount = (value) => {
    return (value == undefined || !Number.isInteger(value));
}
exports.validateProductId = (value) => {
    return (value == undefined || !Number.isInteger(parseInt(value)));
}
exports.validateSlotId = (value) => {
    return (value == undefined || !Number.isInteger(parseInt(value)));
}
exports.validateUserId = (value) => {
    return (value == undefined || !Number.isInteger(parseInt(value)));
}

exports.validateTransactionDate = (value) => {
    return (value == undefined);
}
exports.validateQuantity = (value) => {
    return (value == undefined || !Number.isInteger(parseInt(value)));
}
exports.validateMetaJson = (value) => {
    return (value == undefined);
}

exports.validateUndefined = (value) => {
    return (value == undefined ||!value.trim().length);
}

exports.validateUserName = (value) => {
    return (value == undefined);
}