# Ejercicio 3

Tenemos ya un servicio que encapsula el envío de mensajes a un proveedor externo y nos ofrece un contrato en forma de API,
que tenemos correctamente documentado, y que hemos testeado.

Ahora queremos añadir una funcionalidad nueva que consiste en llevar un registro de mensajes de tal forma que podamos conocer en todo momento qué notificaciones hemos realizado.

## 1. Crear un API de almacenamiento de mensajes en el registro

Para la capa de persistencia del registro utilizaremos [MongoDB](https://www.mongodb.com/), para ello hay que:

- Opcionalmente, construir el modelo con [mongoose](https://mongoosejs.com/) (si prefieres hacerlo de otra forma, ¡perfecto! hazlo y explica por qué has elegido hacerlo de manera diferente).
- Implementar un módulo que se encargue de persistir los mensajes en el registro.

Como hemos visto en los ejercicios anteriores, aquí también es interesante encapsular esta funcionalidad en un módulo.
Esto nos permite desarrollar de manera independiente la funcionalidad de almacenamiento del registro del resto de componentes del servicio,
y facilita hacer cambios en la capa de persistencia, cosa que haremos en futuros ejercicios.

Esto quiere decir, de nuevo, que tenemos que definir el API que tendrá el módulo, documentarlo y testearlo, es decir,
entregar un componente con un contrato bien definido que hemos validado que funciona correctamente.

## 2. Persistir los mensajes en el registro

Haciendo uso del módulo implementado en el punto anterior ya podemos persistir los mensajes que nos llegan a través del endpoint `/messages` en el registro de mensajes.

## 3. Consultar los mensajes enviados

Queremos poder consultar los mensajes, para ello necesitaremos acceder al registro pero...
¿hemos tenido en cuenta esta posibilidad a la hora de diseñar el API del módulo de persistencia?
Si la respuesta es no, habrá que hacerlo ahora.

- Modificar el módulo de persistencia si hace falta para poder obtener los mensajes del registro.
- Añadir un endpoint en nuestro API HTTP con un método GET que devuelva todos los mensajes.

## 4. ¿Tenemos un registro robusto?

El servicio externo de envío de mensajes nos cobra por mensaje, pero no nos cuadran las cuentas.
Se quiere utilizar el registro para comprobar el gasto de las facturas del proveedor... ¿estamos seguros de que el registro dice la verdad?

Debemos asegurarnos de que el comportamiento es correcto en todos los posibles escenarios:
- Si el proveedor externo nos da el OK al envío del mensaje, debe aparecer una entrada en el registro
- Si el proveedor externo nos da un error en el envío del mensaje, deber aparecer como no enviado en el registro
- Si el proveedor externo ha dado timeout, debe aparecer como enviado y no confirmado en el registro

¿Qué pasa si se envía si la base de datos da un error?
¿Es igual de importante el error en el envío de un mensaje o en la consulta del registro?
Pensar cómo gestionar los errores en cada caso para garantizar la consistencia en los datos de acuerdo al contrato del registro.
