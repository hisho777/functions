const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
 
exports.product = functions.https.onRequest((request, response) => {
 
    if (request.method === "POST") {
        const body = request.body;
        const pushRef = admin.database().ref("/product").push();
 
        pushRef.set({
            name: body["name"],
            price: body["price"]
        }, error => {
 
            if (error) {
                console.log("save error", error.message);
                response.status(500).send(error.message).end();
            } else {
                console.log("save success");
                response.status(200).end();
            }
        });
 
    } else {
        response.status(404).end();
    }
});
