-- SCRIP DATA BASE POSTGRES


CREATE TABLE Ciudad(
	Ciudad_Id serial PRIMARY KEY,
	Ciudad_Nombre varchar (50)
	);

CREATE TABLE Nacionalidad(
	Nacionalidad_Id serial PRIMARY KEY,
	Nacionalidad_Nombre varchar (50)
	);

CREATE TABLE Cliente(
	Cliente_Id serial PRIMARY KEY,
	Ciudad_Id int REFERENCES Ciudad (Ciudad_Id),
	Nacionalidad_Id int REFERENCES Nacionalidad (Nacionalidad_Id),
	Cliente_Nombre varchar (50),
	Cliente_Apellido varchar (50),
	Cliente_FNac varchar (50),
    Cliente_Cedula int
	);

CREATE TABLE Empleado(
	Empleado_Id serial PRIMARY KEY,
	Ciudad_Id int REFERENCES Ciudad (Ciudad_Id),
	Nacionalidad_Id int REFERENCES Nacionalidad (Nacionalidad_Id),
	Empleado_Nombre varchar (50),
	Empleado_Apellido varchar (50),
	Empleado_FNac varchar (50),
    Empleado_Cedula int
	);


CREATE TABLE Plan(
	Plan_Id serial PRIMARY KEY,
	Plan_Nombre varchar (50),
	Plan_Descripcion varchar(500),
	Plan_Precio real Default 0
	);
    
    
CREATE TABLE Membresia(
	Membresia_Id serial PRIMARY KEY,
	Cliente_Id int REFERENCES Cliente (Cliente_Id),
	Plan_Id int REFERENCES Plan ( Plan_Id),
	Membresia_Tipo varchar (50),
	Fecha_Inicio varchar (50),
	Fecha_Final varchar (50)
	);
