//Llamada al contrato
const notas = artifacts.require('notas'); 

contract ('notas', accounts => {

    it ('1. Función: Evaluar(string _subject, string memory _idAlumno, uint _nota)', async () => {
        //Smart contract desplegado
        let instance = await notas.deployed(); 
        //Llamada al método de evaluación del Smart Contract
        const tx1 = await instance.Evaluar('Mates', '12345X', 9, {from: accounts[0]})//parte del profesor. 
        const tx2 = await instance.Evaluar('Mates', '12345X', 9, {from: accounts[0]})
        //Imprimir valores:
        console.log(accounts[0]) //Dirección del profesor
        console.log(tx1)          //Transacción de la evaluación académica
        console.log(tx2) 
        //Comrpobación de la información de la BlockChain
        const nota_alumno_mates = await instance.VerNotas.call('Mates', '12345X', {from: accounts[1]});
        const nota_alumno_biologia = await instance.VerNotas.call('Biología', '12345X', {from: accounts[1]});
        //Condición para pasar el test: nota_alumno = 9
        console.log(nota_alumno_mates); 
        console.log(nota_alumno_biologia);
        //Verificaciones
        assert.equal(nota_alumno_mates, 9);
        assert.equal(nota_alumno_biologia, 0); 
    }); 

    it ('2. Función: revision(string memoty _subject, string memory _idAlumno)', async () =>  {
        //Smart contract desplegado
        let instance = await notas.deployed(); 
        const rev1 = await instance.revision('Mates', '12345X', {from: accounts[1]}); 
        const rev2 = await instance.revision('Biologia', '12345X', {from: accounts[1]}); 
        const evaluacion_maria = await instance.Evaluar('Musica', '02468T', 5, {from: accounts[0]}); 
        //Imprimir los valores recibidos de la revsión
        console.log(rev1); 
        console.log(rev2); 
       
        //Verificación del test
        const id_alumno_mates = await instance.VerRevisiones.call('Mates', {from: accounts[0]}); 
        const id_alumno_biologia = await instance.VerRevisiones.call('Musica', {from: accounts[0]}); 
        console.log(id_alumno_mates); 
        console.log(id_alumno_biologia); 

    })


}); 