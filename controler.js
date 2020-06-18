const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080; //porta padrão
const mysql = require('mysql');


app.use(function(req, res, next) {
	 res.header('Access-Control-Allow-Origin',req.headers.origin||"*");
	 res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,HEAD,OPTIONS');
	 res.header('Access-Control-Allow-Headers','content-Type,x-requested-with');
	 next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);
app.listen(port);
console.log('API funcionando!');


 app.get('/produtos/:cod_prod?', (req, res) =>{

	 var sql="";
	 var filtro1 =""

	 if(req.params.cod_prod)
	  filtro1 = " WHERE cod_prod = "+req.params.cod_prod.toString();

	 sql = "SELECT * FROM produtos";

     execSQLQuery(sql+filtro1, res, 0)
     });


 app.post('/produtos/', (req, res) =>{

	 var sql="";
	 var filtro1="";
	 var filtro2="";
	 var filtro3="";
	 var filtro4="";

	 if(req.body.cod_prod)
	  filtro1 = req.body.cod_prod.toString();

	 if(req.body.nome_prod)
	  filtro2 = req.body.nome_prod.toString();

	 if(req.body.descricao)
	  filtro3 = req.body.descricao.toString();

	 if(req.body.preco)
	  filtro4 = req.body.preco.toString();

	 sql  = " INSERT INTO produtos(cod_prod,nome_prod,descricao,preco)";
	 sql += " VALUES("+filtro1+",'"+filtro2+"','"+filtro3+"',"+filtro4+")";

     execSQLQuery(sql, res, 0)
     });


 app.put('/produtos/', (req, res) =>{

	 var sql="";
	 var filtro1="";
	 var filtro2="";

	 if(req.body.cod_prod)
	  filtro1 = req.body.cod_prod.toString();

	 if(req.body.preco)
	  filtro2 = req.body.preco.toString();


	 sql  = " UPDATE produtos SET preco = "+ filtro2 ;
	 sql += " WHERE cod_prod ="+filtro1;

     execSQLQuery(sql, res, 0)
     });

 app.put('/produtos/', (req, res) =>{

	 var sql="";
	 var filtro1="";
	 var filtro2="";

	 if(req.body.cod_prod)
	  filtro1 = req.body.cod_prod.toString();

	 if(req.body.preco)
	  filtro2 = req.body.preco.toString();


	 sql  = " UPDATE produtos SET preco = "+ filtro2 ;
	 sql += " WHERE cod_prod ="+filtro1;

     execSQLQuery(sql, res, 0)
     });


 app.delete('/produtos/:cod_prod', (req, res) =>{

	 var sql="";
	 var filtro1="";

	 if(req.params.cod_prod)
	  filtro1 = req.params.cod_prod.toString();

	 sql = "DELETE FROM produtos WHERE cod_prod = "+filtro1;

     execSQLQuery(sql, res, 0)
     });

 app.get('/pedidos/:cod_ped?', (req, res) =>{

	 var sql="";
	 var filtro1="";

	 if(req.params.cod_ped)
	  filtro1 = " WHERE cod_pedido = "+req.params.cod_ped.toString();

	 sql = "SELECT * FROM pedidos PE LEFT JOIN produtos P ON P.cod_prod = PE.cod_prod";

     execSQLQuery(sql+filtro1, res, 0)
     });

 app.post('/pedidos/', (req, res) =>{

	 var sql="";
	 var filtro1="";
	 var filtro2="";
	 var filtro3="";
	 var filtro4="";

	 if(req.body.cod_prod)
	  filtro2 = req.body.cod_prod.toString();

	 if(req.body.cod_pedido)
	  filtro1 = req.body.cod_pedido.toString();

	 if(req.body.qtd)
	  filtro3 = req.body.qtd.toString();

	 if(req.body.preco_unit)
	  filtro4 = req.body.preco_unit.toString();


	 sql  = " INSERT INTO pedidos(cod_pedido,cod_prod,qtd,preco_total)";
	 sql += " VALUES("+filtro1+","+filtro2+","+filtro3+",("+filtro4+"*"+filtro3+"))";

     execSQLQuery(sql, res, 0)
     });


 app.put('/pedidos/', (req, res) =>{

	 var sql="";
	 var filtro1="";
	 var filtro2="";
	 var filtro3="";

	 if(req.body.cod_prod)
	  filtro3 = req.body.cod_prod.toString();

	 if(req.body.preco_total)
	  filtro2 = req.body.preco_total.toString();

	 if(req.body.cod_pedido)
	  filtro1 = req.body.cod_pedido.toString();

	 sql  = " UPDATE pedidos SET preco_total = "+ filtro2 ;
	 sql += " WHERE cod_pedido = "+filtro1+" AND cod_prod = "+filtro3;

     execSQLQuery(sql, res, 0)
     });


  app.delete('/pedidos/:cod_ped', (req, res) =>{

	 var sql="";
	 var filtro1="";

	 if(req.params.cod_ped)
	  filtro1 = req.params.cod_ped.toString();

	 sql = "DELETE FROM pedidos WHERE cod_pedido = "+filtro1;

     execSQLQuery(sql, res, 0)
     });

function execSQLQuery(sqlQry, res, up){
 const connection = mysql.createConnection({
	host:'remotemysql.com',
	port: 3306,
	user: 'XhjZ83Dtc1',
	password:'6UH7cN0zeR',
	database:'XhjZ83Dtc1'
});


  connection.query(sqlQry, function(error, results, fields){

	 if(error == null)
	 {
	  if(results.affectedRows != 0 && results.affectedRows != null && results.affectedRows != undefined && sqlQry.indexOf("INSERT") != -1 )
	   res.json("Registro Inserido!");
	  else if(results.affectedRows != 0 && results.affectedRows != null && results.affectedRows != undefined && sqlQry.indexOf("UPDATE") != -1)
	   res.json("Registro Atualizado!");
	  else if(results.affectedRows != 0 && results.affectedRows != null && results.affectedRows != undefined && sqlQry.indexOf("DELETE") != -1)
	   res.json("Registro Deletado!");
	  else
 	   res.json(results);
 	 }
	 else if(error.code == "ER_DUP_ENTRY") res.json("Registro Existente");
	 else if(error) res.json(error);



      connection.end();
      console.log('executou!');
  });

}
