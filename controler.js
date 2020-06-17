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

	 sql = "SELECT * FROM produtos";

     execSQLQuery(sql, res, 0)
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

	 values = [[filtro1,filtro2,filtro3,filtro4]]

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

	 values = [[filtro1,filtro2,filtro3,filtro4]]

	 sql  = " UPDATE TABLE produtos SET preco = "+ filtro2 ;
	 sql += " WHERE cod_prod ="+filtro1;

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
	 if(error == null) res.json(results);
	 else if(error.code == "ER_DUP_ENTRY") res.json("Usuario Existente");
	 else if(error) res.json(error);
      connection.end();
      console.log('executou!');
  });

}
