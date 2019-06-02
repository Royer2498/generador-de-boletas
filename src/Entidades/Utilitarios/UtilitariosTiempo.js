class UtilitariosTiempo {
    constructor() {
    }

    static convertirMilisegundosAHoras(milisegundos) {
        return milisegundos / (1000 * 60 * 60);
    }

    static convertirMilisegundosADias(milisegundos) {
        return Math.ceil(milisegundos / (1000 * 3600 * 24));
    }

    static obtenerMilisegundos(fecha) {
        return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()).getTime();
    }
}

module.exports = UtilitariosTiempo;