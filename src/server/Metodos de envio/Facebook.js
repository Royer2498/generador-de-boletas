class Facebook {
    constructor() {}

    enviar(contenido, callback) {
        if (callback !== undefined)
            callback();
        else
            return "Facebook";
    }
}

module.exports = Facebook;
