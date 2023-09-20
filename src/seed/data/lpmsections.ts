import { Secciones } from '../interfaces/sections.interface';

export { informacion };

const informacion: Secciones[] = [
  {
    titulo: 'valores',
    titulo2: 'valores',
    subtitulo:
      '***Solo está para realizar busquedas, esto se edita manualmente',
    panel: 'Panel Valores',
    seccion: 'principal',
    ingreso: [
      {
        subtitles:
          'Para registrar las faltas ir a Asistencia y Registro de faltas',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          'Para registrar las faltas ir a Asistencia y Registro de faltas',
        imagesUrl: '',
      },
    ],
  },
  {
    titulo: 'procesos',
    titulo2: 'Procesos',
    subtitulo:
      '***Solo está para realizar busquedas, esto se edita manualmente',
    panel: 'Panel Procesos',
    seccion: 'principal',
    ingreso: [
      {
        subtitles:
          'Para registrar las faltas ir a Asistencia y Registro de faltas',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          'Para registrar las faltas ir a Asistencia y Registro de faltas',
        imagesUrl: '',
      },
    ],
  },
  {
    titulo: 'reportes',
    titulo2: 'Reportes',
    subtitulo: '**Solo está para realizar busquedas, esto se edita manualmente',
    panel: 'Panel Reportes',
    seccion: 'principal',
    ingreso: [
      {
        subtitles:
          'Para registrar las faltas ir a Asistencia y Registro de faltas',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          'Para registrar las faltas ir a Asistencia y Registro de faltas',
        imagesUrl: '',
      },
    ],
  },
  {
    titulo: 'faltas',
    subtitulo:
      'Las faltas se agregan antes de la inserción de valores, recordar NO descontar dias de pago, solo el dato informativo del mes se reduce, ejm: Si tiene un día de falta, se le calcula en base a 30 días, no colocar 29 de lo contario se le descontará el doble',
    panel: 'Panel Faltas',
    seccion: 'asistencias',
    titulo2: 'faltas',
    ingreso: [
      {
        subtitles:
          'Para registrar las faltas ir a Asistencia y Registro de faltas',
        imagesUrl: '',
      },
    ],

    contenido: [
      {
        subtitles:
          'Una vez en la interfaz filtra información para ver si hay trabajadores previamente ingresados',
        imagesUrl: '',
      },
      {
        subtitles:
          'Para ingresar faltas presionar en la esquina superior izquierda el ícono de insertar.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Ahora en la ventana de añadir falta, podemos elegir el trabajador y la fecha de inicio a fin (si no aparecen los días seleccionar la fecha inicial y presionar enter). Luego seleccionar aceptar.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Verificar que el concepto de faltas esté en la ficha del trabajador',
        imagesUrl: '',
      },
      {
        subtitles:
          'Encontrarás los valores de Días periodo y Horas x día vacíos, debes llenar esa información en base a los dos conceptos de la izquierda DIA SEMANA y HORAS SEMANA. Posteriormente volver a revisar la planilla mensual. EJM: Día semana = 5 | Horas semana = 40 | Días periodo 30 | Horas por día 8',
        imagesUrl: '',
      },
      {
        subtitles:
          'Ahora solo vamos a planilla mensual y procesamos al trabajador para agregar la falta,posteriormente verificar',
        imagesUrl: '',
      },
    ],
  },

  {
    titulo: 'tardanzas',
    subtitulo:
      'Las tardanzas se agregan en la tabla de valores, van en minutos y requieren tener la jornada laboral (en la ficha) correctamente configurada',
    panel: 'Panel Tardanzas',
    seccion: 'asistencias',
    titulo2: 'tardanzas',
    ingreso: [
      {
        subtitles: 'Para agregar tardanzas ir a Procesos  y luego a valores',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          'Agregar las tardanzas (en minutos) en el campo TARDE, luego guardar lo insertado en el ícono de la parte superior izquierda.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Antes de continuar, dar doble click al trabajador para observar si tiene su jornada laboral configurada, los campos indicados deben estar llenos',
        imagesUrl: '',
      },
      {
        subtitles:
          'Completar el recuadro anterior solo asegura que salgan en el periodo actual por eso debemos ir a su FICHA para afectar también los meses posteriores',
        imagesUrl: '',
      },
      {
        subtitles:
          'Para finalizar verificar que en conceptos tenga la tardanza especificada',
        imagesUrl: '',
      },
      {
        subtitles: 'Procesar los trabajadores',
        imagesUrl: '',
      },
    ],
  },

  {
    titulo: 'licencias',
    subtitulo:
      'Las licencias y subsidios se llenan desde el mismo panel, y se colocan antes de la inserción de valores, si se hace después, no se asignarán de manera automática después',
    panel: 'Panel Licencias',
    seccion: 'asistencias',
    titulo2: 'licencias',
    ingreso: [
      {
        subtitles: 'Dirigirse a Asistencia/licencias',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          'Una vez en la ventana de licencias ir al ícono de insertar.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Escoger el trabajador y seleccionar la Licencia o el subsidio a tratar(esta parte es la que será mostrada en los reportes de la planilla)',
        imagesUrl: '',
      },
      {
        subtitles:
          'Luego seleccionamos la licencia que está ligada a tablas paramétricas de la SUNAT, en este caso de ejemplo usaremos una licencia sin goce que tiene el código 05.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Elegir la fecha de inicio a fin, posteriormente escoger si el concepto afecta a goce o no. No es necesario especificar nada en Datos complementarios, presionar ACEPTAR',
        imagesUrl: '',
      },
      {
        subtitles: 'Verificar las licencias agregadas previamente.',
        imagesUrl: '',
      },
      {
        subtitles: 'Posteriormente nos dirigimos a valores',
        imagesUrl: '',
      },
      {
        subtitles:
          'Reducir los días trabajados en base a los días de silencia sin goce, y aumentar el campo de Dias LSG en base a estos también. EJM: Tiene 6 días de licencia sin goce, entonces reducimos 6 a el campo DIAS y aumentamos 6 al campo DIAS LSG.Si agregamos antes de insertar valores, no es necesario modificar',
        imagesUrl: '',
      },
      {
        subtitles:
          'Ir a planilla mensual, procesar al trabajador y verificar la información.',
        imagesUrl: '',
      },
    ],
  },

  {
    titulo: 'vacaciones',
    subtitulo:
      'El llenado de vacaciones va antes de la inserción de valores, si se hace después, no se asignarán los días de manera automática después',
    panel: 'Panel Vacaciones',
    seccion: 'asistencias',
    titulo2: 'vacaciones',
    ingreso: [
      {
        subtitles: 'Para las vacaciones ir a Asistencia y luego a Vacaciones.',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          'Para colocar vacaciones de este año actual (2022), ir al año 2021 y dar a la opción insertar',
        imagesUrl: '',
      },
      {
        subtitles:
          'Si hay trabajadores agregados al filtrar 2022 borrarlos de ahí y colocarlos en 2021, ya que si tienen vacaciones en el año actual, se tiene que tomar en cuenta su periodo laboral 2021',
        imagesUrl: '',
      },
      {
        subtitles:
          'Al seleccionar insertar se desplaza una ventana para seleccionar a los trabajadores,cambiar el año a 2018, seleccionar el trabajador y aceptar.',
        imagesUrl: '',
      },
      {
        subtitles:
          'A continuación aparecerá en la lista mostrada previamente, colocar la fecha de inicio,fecha de fin y guardar.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Doble clic y verificar el rango de fechas insertadas previamente ',
        imagesUrl: '',
      },
      {
        subtitles:
          'Verificar que el trabajador tenga el concepto vacaciones en su ficha',
        imagesUrl: '',
      },
      {
        subtitles: 'A continuación debemos ir a Valores ',
        imagesUrl: '',
      },
      {
        subtitles:
          'Colocar en el campo DIA los días de vacaciones y en DIAS (columna a su izquierda, reducir los días trabajados). Si esto se hizo antes de insertar valores, no será necesario mover aquí',
        imagesUrl: '',
      },
      {
        subtitles: 'Ahora vamos a planilla mensual y procesamos para verificar',
        imagesUrl: '',
      },
      {
        subtitles:
          'Buscamo al trabajador, procesamos y verificamos los campos, si seguimos los pasos correctamente debería salir un campo vacaciones.',
        imagesUrl: '',
      },
    ],
  },
  {
    titulo: 'cts',
    subtitulo:
      'En el panel CTS solo trabajar de manera semestral, hay opciones mensuales, pero no están aplicadas para este sistema.',
    panel: 'Panel CTS',
    seccion: 'especiales',
    titulo2: 'cts',
    ingreso: [
      {
        subtitles: 'Activar CTS',
        imagesUrl: '',
      },
      {
        subtitles:
          'Crear el periodo CTS y poner especificamente 1S para el primer periodo, y 2S para el segundo, son las claves de conexión',
        imagesUrl: '',
      },
      {
        subtitles: 'Dirigirse a Registro /calculo CTS',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          ' Debemos elegir solo semestral, luego especificamos el periodo que queremos y luego procesamos. Si es la segunda vez que entran y ya se ha procesado antes, solo dar Ver Resultados',
        imagesUrl: '',
      },
      {
        subtitles:
          'Una vez dentro tenemos varias opciones, además de ver la información podemos guardar,eliminar,procesar y exportar los datos a un excel, llevar el mouse sobre el icono generará una pequeña información',
        imagesUrl: '',
      },
      {
        subtitles:
          'Si hacemos algún cambio, seleccionar al personal, guardar y posteriormente procesar. ',
        imagesUrl: '',
      },
      {
        subtitles:
          'Si queremos borrar a alguien, basta con seleccionarlo y elegir eliminar. Si han eliminado trabajadores, y procesan desde la pestaña anterior donde elegían el periodo, estos regresarán, solo procesar de manera general desde esta tabla',
        imagesUrl: '',
      },
      {
        subtitles:
          'Para seleccionar reportes CTS, solo ir a reportes y elegir los seleccionados en el cuadro Si no aparecen los reportes, comuniquense con un administrador del sistema para la habilitación en su cuenta',
        imagesUrl: '',
      },
      {
        subtitles:
          'Para seleccionar reportes CTS, solo ir a reportes y elegir los seleccionados en el cuadro',
        imagesUrl: '',
      },
    ],
  },
  {
    titulo: 'gratificacion',
    subtitulo:
      'Es necesario entender que las las gratificaciones toman cada periodo de los últimos 6 meses, estos abarcan un contenedor especificado por un número, y al lado el periodo en curso. Si uno de estos no tiene número equivalente al de sus hermanos, ese mes no será tomado en cuenta.',
    panel: 'Panel Gratificacion',
    seccion: 'especiales',
    titulo2: 'gratificacion',
    ingreso: [
      {
        subtitles: 'Ir a periodos para habilitar el proceso de gratificación',
        imagesUrl: '',
      },
      {
        subtitles:
          'Elegimos la opción planilla y seleccionamos Gratificación ordinaria, posteriormente colocamos el mes 07 para Julio o 12 para Diciembre, y especificamos los rangos de fecha seguir el ejemplo de la imagen',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          'Vamos a valores y elegimos Gratificacion Ordinaria, para que esto funcione debemos estar en Julio o Diciembre del periodo mensual, de lo contrario no se podrá completar la configuración de la grati.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Ahora nos aseguramos de insertar la bonificación, para eso vamos a otros conceptos',
        imagesUrl: '',
      },
      {
        subtitles:
          'Elegimos los periodos de gratificación correspondientes, elegimos el concepto I060 y posteriormente seleccionamos a todos Un tip rapido es seleccionar uno, y presionar f6 hasta que se marquen todos',
        imagesUrl: '',
      },
      {
        subtitles:
          ' Nos dirigimos a procesar la planilla, en calculo planilla gratificación',
        imagesUrl: '',
      },
      {
        subtitles: 'Procesamos si es la primera vez que ingresamos',
        imagesUrl: '',
      },
      {
        subtitles:
          'Si queremos realizar un cambio en particular, solo modificar el valor de la gratificacion, no es necesario modificar la bonificación porque se ajutará automaticamente, ahora dar en guardar NO EN PROCESAR, y se actualizará automaticamente el cambio.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Los reportes son los mismo que tiene la planilla mensual, solo cambiamos el periodo al lado derecho y elegimos gratificación',
        imagesUrl: '',
      },
    ],
  },
  {
    titulo: 'rentaExterna',
    titulo2: 'renta Externa',
    subtitulo:
      'La renta aquí se calcula en base al mes declarado por primera vez y el total anual. Teniendo en cuenta que son 14 sueldos, si declaramos por primera vez en Enero, tendríamos total-anual/14, si declaramos en Febrero sería total/13, para Marzo total/12 etc, el resultado se va declarando mes a mes desde ese punto en adelante. Si estamos en Julio, el salto es de 2, es decir si en Junio es /9, para Julio será /7.',
    panel: 'Panel Renta Externa',
    seccion: 'renta',
    ingreso: [
      {
        subtitles:
          'Es indispensable primero, ir a la ficha del trabajador y habilitar su renta externa, posteriormente guardar.',
        imagesUrl: '',
      },
      {
        subtitles: 'Vamos a registro/Renta externa',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          'A continuación un ejemplo para calcular el monto respectivo, suponiendo que tenemos 20000 soles de total anual, y declaramos por primera vez en Febrero, ese mes se tomó el total/13 ya que estamos en Febrero, luego en los siguientes meses solo se coloca la misma cantidad calculada, a excepción de Julio y Diciembre donde se tomará el total, se restará lo ya declarado y se volverá a dividir pero ahora saltando un número a la secuencia, si tocaba /8 ahora es /7 por ejemplo.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Seleccionamos insertar y luego colocamos la información del trabajador y el importe calculado',
        imagesUrl: '',
      },
      {
        subtitles: 'Ahora solo procedemos a procesar al trabajador',
        imagesUrl: '',
      },
      {
        subtitles:
          'Podemos observar el monto insertado desde procesos/Calculo renta de quinta.',
        imagesUrl: '',
      },
    ],
  },
  {
    titulo: 'modificar',
    titulo2: 'Modificar Trabajadores',
    subtitulo:
      'Recuerda que si modificas la ficha de un trabajador después de haber insertado valores, estos datos no se actualizarán automáticamente. Puedes borrar el valor y volverlo a insertar en tabla de valores siempre y cuando no hayas ingresado registros ya que se borrarán, lo recomendable es ajustar los valores manualmente.',
    panel: 'Panel Usuarios',
    seccion: 'trabajadores',
    ingreso: [
      {
        subtitles:
          'Para modificar un trabajador debemos ir al panel de fichas de trabajadores',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          'Podemos realizar los cambios que creamos convenientes, recuerda guardar. Y de ser el caso no encuentres información, como el cargo se lo puedes comunicar a un administrador',
        imagesUrl: '',
      },
      {
        subtitles:
          'Si al guardar encuentras errores, verificar el mensaje que aparece, pueden existir casos de trabajadores migrados del sistema 1, que nunca han sido modificados hasta la fecha, un error es algo poco frecuente pero la posibilidad existe.',
        imagesUrl: '',
      },
    ],
  },

  {
    titulo: 'ingresarPersonal',
    subtitulo:
      'Antes de ingresar algún trabajador nuevo. Verificar si ya ha formado parte de la plantilla anteriormente, recuerda que cuando un trabajador es cesado no se borra de manera permanente, solo va al contenedor de BAJAS.',
    titulo2: 'Ingresar Trabajadores',
    panel: 'Panel Usuarios',
    seccion: 'trabajadores',
    ingreso: [
      {
        subtitles:
          'Seleccionar la opción de trabajadores en el icono de la parte superior izquierda.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Verificar trabajadores, para modificarlos solo debe dar doble clic al trabajador. De ser necesario filtrar su situación (activo, baja o todos)',
        imagesUrl: '',
      },
      {
        subtitles:
          'Aquí se encuentran las opciones de agregar y eliminar trabajadores. Para agregar trabajadores es necesario darle añadir para ir a la nueva ficha, de lo contrario si es eliminar basta con seleccionar al trabajador en la lista de trabajadores registrados en la parte inferior',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          'El software cuenta con multiples ventanas para pasar a la siguientes es necesario llenar la información obligatoria que esta marcada con * de lo contrario no podrá pasar a la siguiente ventana. No es necesario llenar las ventanas de Datos familiares, Estudios, Otros estudios y Prestadores de servicio.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Si se agrega a un nuevo trabajador se debe colocar como código el Documento de identidad, se debe tener enfásis en este paso porque mediante este campo se realizan los filtros en procesos posteriores.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Ahora en datos generales llenar los campos inferiores. Si hay información no especificada como el numero del interior se puede optar por usar el número 0,en caso de los nombres de vía y zona (colocar - - - - - -)',
        imagesUrl: '',
      },
      {
        subtitles:
          'En Datos del Empleo llenar la información del trabajador(si falta información relevante no se pasará a la siguiente ventana).',
        imagesUrl: '',
      },
      {
        subtitles:
          'Si no cuenta la información Años a desc, Moneda,Porc Jud, entre otras, no son necesarios rellenarlos, solo pasar a la siguiente sección.',
        imagesUrl: '',
      },
      {
        subtitles:
          'En la siguiente ventana de afiliación elegir el tipo de trabajador y su regimen, tanto para ONP como para AFP es necesario una fecha de ingreso y se debe seguir llenando información en la parte inferior, a excepción de Datos EPs y Datos Essalud.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Si existe un problema con los datos EPS.Se especifica con énfasis presionar ALT+255 en datos de ESSALUD-Número de Carnet, además en la parte inferior en Datos de EPS ( por más que no tenga) colocar en situación ACTIVO O SUBSIDIDADO.',
        imagesUrl: '',
      },
      {
        subtitles:
          'En Cuentas Bancarias indicar el banco al que pertenece en Deposito de planilla, si no especifican información dejar en blanco. No es necesario llenar la parte derecha Cuenta de CTS, aunque es recomendable.',
        imagesUrl: '',
      },
      {
        subtitles:
          'En la ventana Conceptos se especifican los conceptos tanto de ingresos, descuentos y aportes. Solo se pueden modificar los valores en la parte de ingresos, los descuentos y los aportes son calculados por el sistema. Conceptos como Asignación familiar no son calculados por el sistema por lo tanto indicar 93.00.',
        imagesUrl: '',
      },
      {
        subtitles:
          'En horarios de trabajo especificar los días y las horas POR SEMANA no es necesario especificar nada en turno, ni agregar más información.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Agregar información de Dias periodos y Horas por día. Esta parte es sumamente importante, de lo contrario no se calcularan horas extras, tardanzas o faltas',
        imagesUrl: '',
      },
      {
        subtitles: 'Crear nuevo contrato en el siguiente ícono.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Especificar la fecha de inicio, cargo y tipo contrato previamente insertada en la ventana de datos del empleo y darle a aceptar.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Marcar ambas casillas ubicadas en Sucursales asignados y Sucursal principal, si sale un error al guardar, volver a darle check a ambas, y guardar.',
        imagesUrl: '',
      },
    ],
  },
  {
    titulo: 'ceses',
    titulo2: 'Cesar trabajadores',
    subtitulo:
      'Es probable que se haya intentado cesar al trabajador directamente desde su ficha antes de insertar valores,esto es un error. Ya que si se cesa antes, este no aparecerá en la planilla del mes. Pero también si no se hace después, seguirá apareciendo en meses posteriores.',
    panel: 'Panel Cese',
    seccion: 'trabajadores',
    ingreso: [
      {
        subtitles:
          'Para agregar la fecha de cese a un trabajador ir a valores.',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          'Una vez en valores dar doble clic al trabajador y colocar la fecha de cese y el motivo.No es necesario procesar nada, si en un caso el trabajador fue cesado meses anteriores y sigue apareciendo aquí, eliminarlo con el ícono del lápiz de la parte superior izquierda.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Posteriormente ir a ficha del trabajador, seleccionar al trabajador e ir a Datos del empleo. En situación de trabajador indicar BAJA y colocar la fecha de CESE.Este procedimiento hace que el trabajador cesado no aparezca al mes siguiente. Para verificar la fecha de cese es suficiente con ir al reporte de planilla y/o boleta',
        imagesUrl: '',
      },
      {
        subtitles:
          'Nota: Si el trabajador sigue apareciendo en el periodo siguiente, basta con eliminar al trabajador de la tabla de valores verificar de manera estricta que se haya agregado correctamente el cese en la FICHA personal del trabajador',
        imagesUrl: '',
      },
    ],
  },
  {
    titulo: 'adelantos',
    titulo2: 'Adelantos',
    subtitulo:
      'El panel de adelantos para la gratificación y los datos del mes son el mismo',
    panel: 'Panel Adelantos',
    seccion: 'registros',
    ingreso: [
      {
        subtitles:
          'Ir a Registro / Prestamos/Adelantos / Registro de Prestamos / Adelantos',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          'Aparecerá un registro de adelantos de haberse hecho en periodos anteriores. Para registrar un nuevo adelanto ir a insertar.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Una vez en la ventana de insertar adelantos, elegir ADELANTOS DE SUELDO: Se debe resaltar con énfasis que no se debe colocar como concepto asociado ADELANTO DE SALARIO.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Seleccionar al empleado que tendrá el adelanto, llenar el campo Monto y Cuenta con la misma cantidad. Esto indica lo que se le adelantará y lo que se le tendrá que descontar. Indicar la fecha y verificar si en Proyección de Pago aparece el MES en el que se realiza el adelanto.',
        imagesUrl: '',
      },
      {
        subtitles:
          'En caso sea adelanto de gratificación, solo cambiar el monto registrado, enviar de saldo a gratificacion abajo en la matriz',
        imagesUrl: '',
      },
      {
        subtitles:
          'Para verificar la información ir a planilla mensual y verificar la información de adelantos en descuentos.',
        imagesUrl: '',
      },
    ],
  },
  {
    titulo: 'horasExtras',
    titulo2: 'Horas Extras',
    subtitulo:
      'Para el calculo de horas extras, debe tener la jornada laboral del trabajador correctamente configurado en su ficha, y además tienen que haber valores insertados',
    panel: 'Panel HorExt',
    seccion: 'registros',
    ingreso: [
      {
        subtitles:
          'Para agregar horas extras ir a Registro, Rol de Horas Extras',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          'En la ventana de horas extras, ir al ícono de insertar en la parte superior izquierda. Se abrirá una venta escoger al trabajador y dar clic en aceptar.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Normalmente las primeras columnas tendrían que salir con información, en caso no salga colocar el sueldo bruto en el campo Remun. Afecta ',
        imagesUrl: '',
      },
      {
        subtitles:
          'De izquierda a derecha, estos campos son 0.25, 0.35 y el doble. Agregar la información de las horas, el cálculo es automático y los resultados empiezan a salir en el mismo orden en el lado derecho.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Ir a planilla mensual y procesar al trabajador, posteriormente verificar el monto de horas extras recientemente agregados.',
        imagesUrl: '',
      },
    ],
  },
  {
    titulo: 'otrosConceptos',
    titulo2: 'Otros conceptos',
    subtitulo:
      'Abarca la gran mayoría de conceptos a utilizar, no solo para los datos del mes, si no también permite agregar liquidaciones, bonificaciones relacionadas a la grati, entre otros.',
    panel: 'Panel Otros Conceptos',
    seccion: 'registros',
    ingreso: [
      {
        subtitles:
          'Para insertar ir a Registro/Otros conceptos/Insertar conceptos.',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          'Una vez en insertar conceptos, seleccionar el concepto que queremos, en la imagen se muestra de manera de ejemplo Asignación por Educación',
        imagesUrl: '',
      },
      {
        subtitles: 'Seleccionar el monto del trabajador y guardar.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Si se equivocan insertando conceptos o desean cambiarlo más adelante, solo ir a Listado.',
        imagesUrl: '',
      },
      {
        subtitles: 'Seleccionar al trabajador y seleccionar eliminar.',
        imagesUrl: '',
      },
      {
        subtitles:
          'Una vez insertados los trabajadores correctamente procesar la información en planilla mensual.',
        imagesUrl: '',
      },
      {
        subtitles: 'Seleccionar a los trabajadores y procesarlos.',
        imagesUrl: '',
      },
    ],
  },
  {
    titulo: 'otrosIngresos',
    titulo2: 'Otros Ingresos',
    subtitulo:
      'Este panel es equivalente al valor que se puede obtener en Otros conceptos I049, aunque se recomienda usar este para evitar problemas.',
    panel: 'Panel Otros Ingresos',
    seccion: 'registros',
    ingreso: [
      {
        subtitles: 'Ir a Registro/ Otros ingresos',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          'En otros conceptos seleccionar Otros descuentos y añadir nuevo trabajador',
        imagesUrl: '',
      },
      {
        subtitles:
          'Una vez seleccionado, aparecerá en la tabla inferior (de no salir, retroceder y volver a entrar al panel de otros ingresos), ahora colocarle el monto en la columna correspondiente',
        imagesUrl: '',
      },
      {
        subtitles: '  Ahora, solo es cuestión de ir a procesar y listo',
        imagesUrl: '',
      },
    ],
  },
  {
    titulo: 'reporteRenta',
    titulo2: 'Renta 5ta',
    subtitulo:
      'La renta de 5ta no es un monto que vamos a modificar, esto lo hace únicamente el sistema de manera automática.Existen formas para modificarla manualmente, pero no se recomienda, por lo tanto no se enseñará.',
    panel: 'Panel Renta',
    seccion: 'renta',
    ingreso: [
      {
        subtitles: 'Vamos a Procesos/ calculo renta 5ta',
        imagesUrl: '',
      },
    ],
    contenido: [
      {
        subtitles:
          'Primero elegimos renta de quinta por personal, posteriormente a nuestro trabajador o a todos si así lo deseamos y aceptamos',
        imagesUrl: '',
      },
      {
        subtitles:
          'Aquí podemos visualizar la renta hasta el momento del trabajador, se puede exportar a excel con las opciones de la parte superior',
        imagesUrl: '',
      },
    ],
  },
];

/* {
    "titulo": "ceses",
    "titulo2": "Cesar trabajadores",
    "subtitulo":
      "Es probable que se haya intentado cesar al trabajador directamente desde su ficha antes de insertar valores,esto es un error. Ya que si se cesa antes, este no aparecerá en la planilla del mes. Pero también si no se hace después, seguirá apareciendo en meses posteriores.",
    "panel": "Panel Cese",
    "seccion": "trabajadores",
    "ingreso": [
      {
        "subtitles":
          "Para agregar la fecha de cese a un trabajador ir a valores.",
        "imagesUrl": ""
      }
    ],
    "contenido": [
      {
        "subtitles":
          "Una vez en valores dar doble clic al trabajador y colocar la fecha de cese y el motivo.No es necesario procesar nada, si en un caso el trabajador fue cesado meses anteriores y sigue apareciendo aquí, eliminarlo con el ícono del lápiz de la parte superior izquierda.",
        "imagesUrl": ""
      },
      {
        "subtitles":
          "Posteriormente ir a ficha del trabajador, seleccionar al trabajador e ir a Datos del empleo. En situación de trabajador indicar BAJA y colocar la fecha de CESE.Este procedimiento hace que el trabajador cesado no aparezca al mes siguiente. Para verificar la fecha de cese es suficiente con ir al reporte de planilla y/o boleta",
        "imagesUrl": ""
      },
      {
        "subtitles":
          "Nota: Si el trabajador sigue apareciendo en el periodo siguiente, basta con eliminar al trabajador de la tabla de valores verificar de manera estricta que se haya agregado correctamente el cese en la FICHA personal del trabajador",
        "imagesUrl": ""
      }
    ]
  } */
