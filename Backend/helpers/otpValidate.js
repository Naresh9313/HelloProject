const otpVerification = (otpTime) => {
    try {
        const cDateTime = new Date();
        let differenceValue = (otpTime - cDateTime.getTime()) / 1000;
        differenceValue /= 60;

        const minutes = Math.abs(differenceValue);
        console.log('Expired minutes:', minutes);

        return minutes <= 2; 
    } catch (error) {
        console.error(error.message);
        return false;
    }
};

module.exports = { otpVerification };
