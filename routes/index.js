var express = require('express');
var router = express.Router();
var bancoModel = require('../modelos/Banco');

//crear bancos
router.post('/create',(req, res, next)=> {
  console.log(req.body);
  var newBanco = new bancoModel();
  newBanco.nombre = req.body.nombre;
  newBanco.cadena = req.body.cadenaMundial;
  newBanco.aniFuncion = req.body.anioFuncion;

  newBanco.save((error, banco)=>{
    if(error) return res.status(500).json({success: false, message: "No funciona"})
    if(banco) return res.status(200).json({success: true, message:"Si funciona", banco})
  });
});

//actualizar bancos
router.put('/update/:id',(req, res, next)=>{
  var bancoId = req.params.id;
  var updateBanco = req.body;

  bancoModel.findByIdAndUpdate(bancoId, updateBanco, {new: true}, (error, banco)=>{
    if(error) return res.status(500).json({success: false, message: "No funciona"})
    if(banco) return res.status(200).json({success: true, message:"Si funciona", banco})
  });
});

//Eliminar bancos
router.delete('/delete/:id',(req, res, next)=>{
  var bancoId = req.params.id;

  bancoModel.findByIdAndDelete(bancoId, (error, banco)=>{
    if(error) return res.status(500).json({success: false, message: "No funciona"})
    if(banco) return res.status(200).json({success: true, message:"Si funciona", banco})
  })
})

//dame un banco en especifico
router.get('/banco/:id', (req, res, next)=>{
  var bancoId=req.param.id;

  bancoModel.findById(bancoId, (error, banco)=>{
    if(error) return res.status(500).json({success: false, message: "No Funciona"});
    if(banco){
        return res.status(200).json({success: true, message: "Funciona", banco})
    }else{
      return res.status(404).json({success: false, message:"Not found"})
    }
  })
})

//dame todos los bancos
router.get('/banco',(req, res, next)=>{
  bancoModel.find({},(error, bancos)=>{
    if(error) return res.status(500).json({success: false, message: "No Funciona"});
    if(bancos){
        return res.status(200).json({success: true, message: "Funciona", bancos})
    }else{
      return res.status(404).json({success: false, message:"Not found"})
    }
  });
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
