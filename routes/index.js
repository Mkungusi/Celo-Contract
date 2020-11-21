
module.exports = function (app) {
    //import all the controllers here
    const sendingController = require("../controller/send");
    const SellingController = require("../controller/selling");
    const getAccountController = require("../controller/getAccount");


    app.post('/api/vi/sendtransaction', sendingController.sendTransaction);
    app.post('api/vi/makeSell', SellingController.makeSell);
    app.post('api/vi/getaccount', getAccountController.getAccount);

}