//Llamada al contrato
const notas = artifacts.require('notas'); 

contract ('notas', accounts => {

    it ('1. Función: Evaluar(string memory _idAlumno, uint _nota)', async () => {
        //Smart contract desplegado
        let instance = await notas.deployed(); 
        //Llamada al método de evaluación del Smart Contract
        const tx = await instance.Evaluar('12345X', 9, {from: accounts[0]})//parte del profesor. 
        //Imprimir valores:
        console.log(accounts[0]) //Dirección del profesor
        console.log(tx)          //Transacción de la evaluación académica
        //Comrpobación de la información de la BlockChain
        const nota_alumno = await instance.VerNotas.call('12345X', {from: accounts[1]});
        //Condición para pasar el test: nota_alumno = 9
        console.log(nota_alumno); 
        assert.equal(nota_alumno, 9);
    }); 

    it ('2. Función: revision(string memory _idAlumno)', async () =>  {
        //Smart contract desplegado
        let instance = await notas.deployed(); 
        const rev = await instance.revision('12345X', {from: accounts[1]}); 
        //Imprimir los valores recibidos de la revsión
        console.log(rev); 
        //Verificación del test
        const id_revisiones = await instance.VerReviciones.call({from: accounts[0]}); //solo funciona desde la cuenta 0, por los permisos que tiene el profesor. 
        console.log(id_revisiones); 

    })


}); 