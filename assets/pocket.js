window.Pocket = {
    eventListeners: {
        onPayInvoiceComplete: () => {
            throw new NotImplementedException('This method is not implemented.');
        },
        onGetTokenComplete: () => {
            throw new NotImplementedException('This method is not implemented.');
        },
        onGoBackComplete: () => {
            throw new NotImplementedException('This method is not implemented.');
        }
    },

    payInvoice(data, callback) {
        this.eventListeners.onPayInvoiceComplete = callback;
        window.PocketMobile.postMessage(JSON.stringify({action: 'payInvoice', data}));
    },

    getToken(data, callback){
        this.eventListeners.onGetTokenComplete = callback;
        window.PocketMobile.postMessage(JSON.stringify({action: 'getToken', data}));
    },

    goBack(data, callback){
        this.eventListeners.onGoBackComplete = callback;
        window.PocketMobile.postMessage(JSON.stringify({action: 'getBack', data}));
    },

    payButton(data, callback) {
        var element = document.createElement("button");
        element.innerText = "Төлбөр төлөх";
        element.classList.add("pocket-btn");
        document.getElementById("total").appendChild(element);
        element.addEventListener("click", function(){
            Pocket.payInvoice(data, callback);
        })
    }
};