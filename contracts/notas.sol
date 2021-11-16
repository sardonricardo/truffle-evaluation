// SPDX-License-Identifier: MIT 
pragma solidity  >=0.4.4 < 0.7.0; 
pragma experimental ABIEncoderV2;  //para errores en los hash de variables


// Empezamos el contrato 

contract notas {
    
    //Direccion del profesor
    address public profesor; 
    string public my_string = "Ricardo"; 
    
    //constructor - Construir las variables iniciales del contrato. La primera direccion es la del profesor. 
    constructor () public {
        profesor = msg.sender; //cuenta que va a desplegar el contrato. 
    }
    
    // Mapping para relacionar el hash de la identidad del alumno con su nota del examen. 
    mapping (bytes32 => uint) Notas; 
    
    //Array para los alumnos que pidan revision de examen.
    string [] revisiones; 
    
    //Eventos 
    event alumno_evaluado(bytes32); 
    event evento_revisiones(string); 
    
    //Funciones, con sus respectivas variables, para evaluar a los alumnos.
    function Evaluar(string memory _idAlumno, uint _nota) public UnicamenteProfesor(msg.sender) {
        // Hash del id del alumno;
        bytes32 hash_idAlumno = keccak256(abi.encodePacked(_idAlumno)); 
        // Relacion entre el hash del id del alumno y su Notas
        Notas[hash_idAlumno] = _nota; 
        // Emision del evento
        emit alumno_evaluado(hash_idAlumno); 
    }
    
    //modificador para que solo pueda manipularlo el profesor
    modifier UnicamenteProfesor(address _direccion) {
        //Requiere que la direccion introducida por parámetro sea igual al owner(profesor)
        require(_direccion == profesor, "No tienes permisos"); 
        _;//muy importante poner siempre la "_" al terminar un modifier
    }
    
    //Funcion para ver las notas de los alumnos
    function VerNotas(string memory _idAlumno) public view returns(uint) {  //tipo view porq DEVOLVEMOS un valor
        bytes32 hash_idAlumno = keccak256(abi.encodePacked(_idAlumno)); 
        //Nota asociada al alumno
        uint nota_alumno = Notas[hash_idAlumno]; 
        // Visualizar nota con el return
        return nota_alumno; 
    }
    
    // Funcion para pedir revision del examen
    function revision(string memory _idAlumno) public {
        // Almacenamiento de la identidad del alumno en un array 
        revisiones.push(_idAlumno); 
        // Emision del evento
        emit evento_revisiones(_idAlumno); 
    }  
    
    function VerRevisiones() public view UnicamenteProfesor(msg.sender) returns (string [] memory ) {
        //resultado revisiones
        return revisiones; 
    }
        
    
}