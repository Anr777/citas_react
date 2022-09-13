import {useState, useEffect} from 'react';
import Error from './Error';


const Formulario = ( { pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false);

  useEffect( () => {
    if( Object.keys(paciente).length > 0 ) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    
    }
  }, [paciente])

  

  const generarID = () => {
    const random = Math.random().toString(36).slice(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enviando Formulario');
    // Validación del Formulario

    if([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log('Hay almenos un campo vacio');
      setError(true);
      return;
    } 
    setError(false);
    // Objeto de paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    }

    if(paciente.id) {
      //Editando el Registro
      objetoPaciente.id = paciente.id

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      setPaciente({})

    } else {
      //Nuevo Registro
      objetoPaciente.id = generarID();
      setPacientes([...pacientes, objetoPaciente]);
    }

    

    // Reiniciar el form 
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  }



  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>
      <p className='text-lg mt-5 text-center mb-10'>
        Añate Pacientes y {''}
        <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>

      <form
      onSubmit={handleSubmit}
      className='bg-white shadow-md rounded-lg py-10 px-5 mb-10' action="">
      { error && <Error mensaje='Todos los campos son obligatorios'/>}
        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='mascota'>
            Nombre Mascota</label>
          <input id='mascota' className='border-2 w-full p-2 mt-2 placeholderbg-gray-400 rounded-md' type="text" placeholder='Nombre de la Mascota'
          value={nombre}
          onChange={ (e) => setNombre(e.target.value) }/>
        </div>


        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='Propietario'>
            Nombre Propietario</label>
          <input id='Propietario' className='border-2 w-full p-2 mt-2 placeholderbg-gray-400 rounded-md' type="text" placeholder='Nombre del Propietario'
          value={propietario}
          onChange={ (e) => setPropietario(e.target.value) } />
        </div>


        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='Email'>
            Email</label>
          <input id='Email' className='border-2 w-full p-2 mt-2 placeholderbg-gray-400 rounded-md' type="email" placeholder='Email Contacto Propietario'
          value={email}
          onChange = { (e) => setEmail(e.target.value) }
          />
        </div>


        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='Alta'>
            Alta</label>
          <input id='Alta className=' className='border-2 w-full p-2 mt-2 placeholderbg-gray-400 rounded-md' type="date"
          value={fecha}
          onChange = { (e) => setFecha(e.target.value) }
          />
        </div>

        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='Sintomas'>
            Síntomas</label>
          <textarea id='Sintomas' className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" cols="30" rows="10"
          value={sintomas}
          onChange = { (e) => setSintomas(e.target.value) }
          >
  
          </textarea>
        </div>

        <input type="submit"
        className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all' 
        value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} />
      </form>
    </div>
  )
}

export default Formulario







