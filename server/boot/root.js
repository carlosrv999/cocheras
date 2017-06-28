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

  router.get('/getCocheraServEmp', function(req,res) {
    Cochera.find({
      include: ['empleado', {
        relation: 'servicioCocheras',
        scope: {
          include: 'tipoServicio'
        }
      }]
    }, function(err, obj) {
      if(!err) return res.json(obj);
      else return res.sendStatus(400);
    });
  })

  router.get('/getEmpleadosPorCochera', function(req,res) {
    var idCochera = req.query.idCochera;
    Empleado.find({
      where: {
        "id_cochera": idCochera
      }
    }, function(err, obj) {
      if(!err) return res.json(obj);
      else return res.sendStatus(400);
    });
  });

  router.get('/serviciosPorCochera', function(req,res) {
    var idCochera = req.query.idCochera;
    ServicioCochera.find({
      where: {
        "id_cochera": idCochera
      },
      include: 'tipoServicio'
    }, function(err, obj) {
      if(!err) return res.json(obj);
      else return res.sendStatus(400);
    })
  });

  router.get('/empleadosPorEmpresa', function(req,res) {
    var idEmpresa = req.query.idEmpresa;
    Empleado.find({
      where: {
        "id_empresa": idEmpresa
      }
    }, function(err, obj) {
      if(!err) return res.json(obj);
      else return res.sendStatus(400);
    });
  });

  router.get('/obtenerEmails', function(req,res) {
    Cochera.find({
      fields: {
        "id_empresa": false,
        "id_empleado": false,
        "nombre": false,
        "coordenadas": false,
        "direccion": false,
        "telefono": false,
        "estado": false,
        "capacidad": false,
        "cupos_disp": false,
        "username": true,
        "email": true,
        "id": false
      }
    }, function(err,obj) {
      if(!err) return res.json(obj);
      else return res.sendStatus(400);
    });
  });

  app.use(router);
};
