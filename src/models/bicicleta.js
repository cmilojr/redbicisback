const db = require('../db')

let Bicicleta = function (id, color, modelo, ubicacion) {
  this.id = id;
  this.color = color;
  this.modelo = modelo;
  this.ubicacion = ubicacion;
};

Bicicleta.prototype.toString = function () {
  return `id: ${this.id} | color: ${this.color}`;
};

module.exports = {
  Bicicleta,
  allBicis,
};