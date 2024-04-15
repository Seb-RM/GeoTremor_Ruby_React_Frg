# Aplicación de Datos Sísmicos - GeoTremor

La Aplicación de Datos Sísmicos - GeoTremor es un proyecto que combina el desarrollo en el lado del servidor con Ruby on Rails y en el lado del cliente con React para proporcionar una plataforma que permite acceder y visualizar información relacionada con eventos sísmicos en todo el mundo.

## Descripción del Proyecto

El objetivo principal de la Aplicación de Datos Sísmicos es obtener y presentar información sísmica relevante utilizando el estándar GeoJSON, el cual es ampliamente reconocido en el ámbito de las estructuras de datos geográficas. La aplicación aprovecha un endpoint proporcionado por el Servidor USGS (United States Geological Survey) para obtener datos sísmicos actualizados en formato GeoJSON.

La aplicación está diseñada para ofrecer las siguientes funcionalidades:

1. **Obtención de Datos Sísmicos**: A través de una tarea programada en el lado del servidor, la aplicación realiza solicitudes al sitio USGS para obtener información sobre eventos sísmicos ocurridos en los últimos 30 días. Estos datos son procesados y almacenados en la base de datos del servidor para su posterior visualización.

2. **Visualización de Datos Filtrados y Paginados**: En el lado del cliente, la aplicación React permite a los usuarios acceder a los datos sísmicos almacenados en la base de datos del servidor. Los usuarios pueden filtrar y paginar los resultados para visualizar únicamente la información que les interesa.

3. **Comentarios Asociados a Eventos Sísmicos**: Además de la visualización de datos sísmicos, la aplicación permite a los usuarios agregar comentarios a eventos sísmicos específicos. Estos comentarios se asocian con un evento sísmico en particular y se almacenan en la base de datos del servidor para su posterior consulta.

## Funcionalidades Principales

- Obtención automática de datos sísmicos desde el sitio USGS utilizando una tarea programada en el lado del servidor.
- Visualización de datos sísmicos filtrados y paginados en el lado del cliente utilizando la aplicación React.
- Posibilidad de agregar comentarios a eventos sísmicos específicos, los cuales se almacenan en la base de datos del servidor.

## Tecnologías Utilizadas

- Ruby on Rails: Utilizado en el lado del servidor para la obtención y almacenamiento de datos sísmicos.
- React: Utilizado en el lado del cliente para la visualización de datos sísmicos y la interacción con el usuario.
- Sass: Utilizado para escribir estilos CSS de manera más eficiente y organizada, aprovechando características como las variables.
- PostgreSQL: Proporciona un sistema robusto y confiable para gestionar la información, garantizando la integridad y la seguridad de los datos almacenados.
- GeoJSON: Formato estándar utilizado para estructuras de datos geográficas, utilizado para representar eventos sísmicos.

### Instalación

1. Clona el repositorio desde GitHub:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```

2. Entra en el directorio del proyecto:

```bash
cd nombre-de-tu-proyecto
```

3. Instala las dependencias del servidor. Asegúrate de estar en la carpeta server:

```bash
cd server
bundle install
```

4. Instala las dependencias del cliente:

```bash
cd .. # Asegúrate de estar en el carpeta client
npm install
```

5. Copia el archivo .env.example y renómbralo como .env:

```bash
cp .env.example .env
```

6. Define las variables de entorno en el archivo .env según sea necesario. Asegúrate de configurar correctamente las variables para la conexión a la base de datos PostgreSQL.

### Ejecución

1. Inicia el servidor Rails:

```bash
cd .. # Asegúrate de estar en la carpeta server
rails server
```

2. Inicia el cliente React (asegúrate de que el servidor Rails esté en ejecución antes):

```bash
cd .. # Asegúrate de estar en la carpeta client
npm start
```

El servidor estará configurado para funcionar en el puerto local 3000, mientras que el cliente se ejecutará en otro puerto que será indicado en la terminal al iniciar (3001 por defecto). Asegúrate de que no haya conflictos de puertos al iniciar ambos servicios.

### Rutas del Servidor

#### Obtener Datos Sísmicos

- **GET /api/features**
  - Descripción: Obtiene todos los eventos sísmicos almacenados en la base de datos.
  - Parámetros de consulta:
    - `page`: Número de página para la paginación.
    - `per_page`: Número de eventos sísmicos por página.
    - `mag_type`: Tipo de magnitud del evento sísmico.
  - Formato de respuesta:
    - `data`: Un arreglo que contiene objetos JSON representando cada evento sísmico. Cada objeto tiene los siguientes campos:
      - `id`: Un identificador único para el evento sísmico.
      - `type`: Tipo de recurso, en este caso, siempre será "feature".
      - `attributes`: Un objeto que contiene los atributos del evento sísmico, que incluyen:
        - `external_id`: Identificador externo del evento sísmico.
        - `magnitude`: Magnitud del evento sísmico.
        - `place`: Ubicación del evento sísmico.
        - `time`: Tiempo del evento sísmico en formato ISO 8601.
        - `tsunami`: Indicador booleano que especifica si el evento sísmico provocó un tsunami.
        - `mag_type`: Tipo de magnitud del evento sísmico.
        - `title`: Título o descripción del evento sísmico.
        - `coordinates`: Coordenadas geográficas del evento sísmico, que incluyen:
          - `longitude`: Longitud geográfica del evento sísmico.
          - `latitude`: Latitud geográfica del evento sísmico.
      - `links`: Un objeto que contiene enlaces relacionados con el evento sísmico, específicamente:
        - `external_url`: URL externa que proporciona más información sobre el evento sísmico.
    - `pagination`: Un objeto que proporciona información de paginación, que incluye:
      - `current_page`: Número de la página actual.
      - `total`: Número total de eventos sísmicos disponibles.
      - `per_page`: Número de eventos sísmicos por página.
    
#### Crear un Comentario

- **POST /api/features/:featureId/comments**
  - Descripción: Crea un nuevo comentario asociado a un evento sísmico específico.
  - Parámetros de ruta:
    - `featureId`: ID del evento sísmico al que se asociará el comentario.
  - Cuerpo de la solicitud:
    ```json
    {
      "body": "Texto del comentario"
    }
    ```
  - Formato de respuesta en caso de éxito:
    - `id`: Un número que identifica de forma única el comentario.
    - `body`: Texto que contiene el comentario.
    - `feature_id`: Número que indica la asociación del comentario con un evento sísmico específico.
    - `created_at`: Fecha y hora de creación del comentario en formato ISO 8601.
    - `updated_at`: Fecha y hora de la última actualización del comentario en formato ISO 8601.
      
  - Formato de respuesta en caso de error:
    ```json
    {
      "errors": ["Mensaje de error"]
    }
    ```
