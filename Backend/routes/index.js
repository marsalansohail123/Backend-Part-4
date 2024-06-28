var express = require("express");
var router = express.Router();

router.get("/api/test", (request, response) => {
    response.send("testing")
});

module.exports = router;

// Agr apko Apni  Api's kisi dusri file ya folder mie bnaani hon tou