'use strict';

module.exports = function(app) {
  var router = app.loopback.Router();
  var Cliente = app.models.Cliente;
  var Cochera = app.models.Cochera;
  var DetalleMovServ = app.models.DetalleMovServ;
  var Empleado = app.models.Empleado;
  var Empresa = app.models.Empresa;
  var MovimientoServicio = app.models.MovimientoServicio;
  var ServicioCochera = app.models.ServicioCochera;
  var TipoServicio = app.models.TipoServicio;

  router.get('/', app.loopback.status());

  router.get('/todaCocheraConServicios', function(req, res){
    var idCochera = req.query.idCochera;
    var servicios = {};

    Cochera.find({
      include: {
        relation: 'servicioCocheras',
        scope: {
          include: {
            relation: 'tipoServicio',
          }
        }
      }
    }, function(err, obj) {
      if(!err) return res.json(obj);
      else return res.json({"no": "encontrado"});
    });
  });

  router.get('getCocheraServEmp', function(req,res) {
    var idCochera = req.query.idCochera;
    Cochera.findById(idCochera, {
      include: ['empleado', 'servicioCocheras']
    }, function(err, obj) {
      if(!err) return res.json(obj);
      else return res.sendStatus(400);
    });


  })


  app.use(router);
};
