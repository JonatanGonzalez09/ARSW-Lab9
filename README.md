### Escuela Colombiana de Ingeniería
### Arquitecturas de Software - ARSW

## Escalamiento en Azure con Maquinas Virtuales, Sacale Sets y Service Plans

### Dependencias
* Cree una cuenta gratuita dentro de Azure. Para hacerlo puede guiarse de esta [documentación](https://azure.microsoft.com/en-us/free/search/?&ef_id=Cj0KCQiA2ITuBRDkARIsAMK9Q7MuvuTqIfK15LWfaM7bLL_QsBbC5XhJJezUbcfx-qAnfPjH568chTMaAkAsEALw_wcB:G:s&OCID=AID2000068_SEM_alOkB9ZE&MarinID=alOkB9ZE_368060503322_%2Bazure_b_c__79187603991_kwd-23159435208&lnkd=Google_Azure_Brand&dclid=CjgKEAiA2ITuBRDchty8lqPlzS4SJAC3x4k1mAxU7XNhWdOSESfffUnMNjLWcAIuikQnj3C4U8xRG_D_BwE). Al hacerlo usted contará con $200 USD para gastar durante 1 mes.

### Parte 0 - Entendiendo el escenario de calidad

Adjunto a este laboratorio usted podrá encontrar una aplicación totalmente desarrollada que tiene como objetivo calcular el enésimo valor de la secuencia de Fibonnaci.

**Escalabilidad**
Cuando un conjunto de usuarios consulta un enésimo número (superior a 1000000) de la secuencia de Fibonacci de forma concurrente y el sistema se encuentra bajo condiciones normales de operación, todas las peticiones deben ser respondidas y el consumo de CPU del sistema no puede superar el 70%.

### Escalabilidad Serverless (Functions)

1. Cree una Function App tal cual como se muestra en las  imagenes.

![](images/part3/part3-function-config.png)

![](images/part3/part3-function-configii.png)

2. Instale la extensión de **Azure Functions** para Visual Studio Code.

![](images/part3/part3-install-extension.png)

3. Despliegue la Function de Fibonacci a Azure usando Visual Studio Code. La primera vez que lo haga se le va a pedir autenticarse, siga las instrucciones.

![](images/part3/part3-deploy-function-1.png)

![](images/part3/part3-deploy-function-2.png)

4. Dirijase al portal de Azure y pruebe la function.

![](images/part3/part3-test-function.png)

5. Modifique la coleción de POSTMAN con NEWMAN de tal forma que pueda enviar 10 peticiones concurrentes. Verifique los resultados y presente un informe.

6. Cree una nueva Function que resuleva el problema de Fibonacci pero esta vez utilice un enfoque recursivo con memoization. Pruebe la función varias veces, después no haga nada por al menos 5 minutos. Pruebe la función de nuevo con los valores anteriores. ¿Cuál es el comportamiento?.

_**Se comporta casi de la misma manera solo se ve una mejora en el tiempo de ejecución muy poca, de segundos. Se puede observar mas detalladamente en el informe que se presenta al final del README.**_

**Preguntas**

* **¿Qué es un Azure Function?**

Azure Function es una solución para ejecutar fácilmente pequeños fragmentos de código o “funciones” en la nube. Toma los conceptos básicos de los ya conocidos WebJobs y los amplía de forma interesante. Azure Function nos presenta una multitud de nuevos triggers para poder ejecutarlo.

* **¿Qué es serverless?**

La computación sin servidor (o serverless para abreviar) es un modelo de ejecución en el que el proveedor en la nube (AWS, Azure o Google Cloud) es responsable de ejecutar un fragmento de código mediante la asignación dinámica de los recursos. Y cobrando solo por la cantidad de recursos utilizados para ejecutar el código. El código, generalmente, se ejecuta dentro de contenedores sin estado que pueden ser activados por una variedad de eventos que incluyen solicitudes HTTP, eventos de base de datos, servicios de colas, alertas de monitoreo, carga de archivos, eventos programados (trabajos cron), etc. El código que se envía a al proveedor en la nube para la ejecución es generalmente en forma de una función. Por lo tanto, serverless a veces se denomina “Funciones como servicio” o “FaaS”. Las siguientes son las ofertas de FaaS de los principales proveedores en la nube:

AWS: AWS Lambda
Microsoft Azure: Azure Functions
Google Cloud: Cloud Functions

* **¿Qué es el runtime y que implica seleccionarlo al momento de crear el Function App?**

Las versiones principales del tiempo de ejecución de Azure Functions están relacionadas con la versión de .NET en la que se basa el tiempo de ejecución. La siguiente tabla indica la versión actual del tiempo de ejecución, el nivel de lanzamiento y la versión relacionada de .NET.

* **¿Por qué es necesario crear un Storage Account de la mano de un Function App?**

Porque proporciona un espacio de nombres único para que los datos de Azure Storage sean accesibles a través de HTTP.

* **¿Cuáles son los tipos de planes para un Function App?, ¿En qué se diferencias?, mencione ventajas y desventajas de cada uno de ellos.**

_**Plan de consumo**: Según la cantidad de eventos se agregan y quitan las instancias del host de Azure Functions._

_**Ventajas:**_
- _Se paga solo cuando se ejecutan las funciones._
- _Se agota el tiempo de espera de una ejecución de función tras un período de tiempo configurable._
- _La facturación depende del uso de la memoria, número de ejecuciones, tiempo de ejecución._
- _Se pueden ejecutar varias aplicaciones en el mismo plan sin ningún problema._

_**Desventajas:**_
- _Tiene duración de tiempo de espera predeterminada mínima (5min)._
- _Cuenta con poca memoria por instancia (max 1.5GB)._
- _Solo tiene 1GB de almacenamiento._

_**Plan Premium:** Además de que las instancias se agregan o se quitan dinámicamente, admite tener las instancias semiactivas, conectividad de red virtual, 60 minutos de ejecución ilimitada, el tamaño de la instancia tiene un núcleo, dos núcleos y cuatro instancias de núcleo._

_La facturación es por la cantidad de núcleos por segundo y la memoria utilizada en las instancias._

_**Ventajas:**_
- _Sirve para aplicaciones que se ejecutan de forma continua._
- _Posee conectividad de red virtual._

_**Desventajas:**_
- _Tiene un  costo mensual independiente del número de ejecuciones._

_**Plan Dedicado (App Service)**: Sirve para que sea posible ejecutarlo en las máquinas virtuales dedicadas a otras aplicaciones de App Service. A diferencia de los otros planes el escalado horizontal es manual o escalabilidad automática._

_**Ventajas:**_
- _Se puede usar cuando se tienen máquinas virtuales subutilizadas que ejecuten otras instancias._
- _Si desea proporcionar una imagen personalizada en la que ejecutar sus funciones._
- _Se puede agregar más instancias de máquina virtual._
- _Se puede habilitar el escalamiento automático._

_**Desventajas:**_
- _El escritorio remoto no está disponible._
- _Límites para instalar software de terceros y herramientas de administración._
- _Los contadores de rendimiento no están disponibles._
- _Se debe habilitar la configuración Always On para que la aplicación de función se ejecute correctamente._

* **¿Por qué la memoization falla o no funciona de forma correcta?**

_El problema aquí es que la memorización solo se aplica en el nivel superior, es decir que, en cada llamada recursiva, se construyen varias funciones en memoria y cada una con su propio caché.
En el programa no se ve reflejada la importancia de la memorización ya que los costos de espacio y complejidad de código de almacenamiento en caché de los resultados son relativamente bajos en comparación con los ahorros de tiempo de ejecución, entonces no se ve una gran diferencia al implementar una correcta memorización._

* **¿Cómo funciona el sistema de facturación de las Function App?**

_El plan de consumo de **Azure Functions se factura en función del consumo de recursos y las ejecuciones por segundo**. Los precios del plan de consumo incluyen una concesión gratuita mensual de 1 millones de solicitudes y 400.000 GB-segundos de consumo de recursos por suscripción en el modelo de precios de pago por uso, para todas las aplicaciones de funciones de esa suscripción. 
El plan **Azure Functions Premium** proporciona un rendimiento mejorado y se factura por segundo en función del número de vCPU/s y de GB/s que consuman sus funciones premium._


* **Informe**

## Informe ##
_Haciendo una comparación entre las pruebas de un programa de Fibonnaci sin recurrencia y el otro implementado recurrentemente y con memorización podemos ver que el programa sin memorización dura en resolver 10 peticiones de 1000000 en 17min con 51s, y el programa implementado recursivamente y con memorización dura en resolver la misma cantidad de pruebas y la misma petición en 18min con 19s._

_**Sin Recursión**_

![](https://github.com/JonatanGonzalez09/ARSW-Lab9/blob/master/images/pruebas/prueba2.png)

_**Recursivo**_

![](https://github.com/JonatanGonzalez09/ARSW-Lab9/blob/master/images/pruebas/prueba%20newman%20recursivo.png)

_Pasados 7 minutos se vuelve a ejecutar la segunda prueba del programa con recurrencia y memorización y se ejecuta la misma cantidad de pruebas (10) con la misma petición (f(1’000.000)), y el resultado que arroja es una poca disminución en el tiempo de responder todas las solicitudes, ya que lo hace en 17min 47s._

_**Segunda Prueba programa Recurrente**_

![](https://github.com/JonatanGonzalez09/ARSW-Lab9/blob/master/images/pruebas/2da%20prueba%20rec.png)


## Autores ##
- David Caycedo
- Jonatan Gonzalez
