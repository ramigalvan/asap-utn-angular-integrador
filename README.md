# ASAP UTN Angular Integrador 🎬

Este proyecto fue desarrollado como parte del **Final Integrador** del curso de **Angular** impartido por la **UTN** (Universidad Tecnológica Nacional) para la empresa **ASAP**, bajo la dirección del profesor Marcelo Bettini.


## 🌟 Descripción General

Esta aplicación web de entretenimiento está diseñada para **consolidar y aplicar la mayoría de los conceptos** aprendidos durante el curso de Angular.

### Características Principales

| Característica | Detalle |
| :--- | :--- |
| **Página Principal (Trending)** | Muestra una grilla con **películas y series en tendencia** de la semana. |
| **Detalles del Ítem** | Permite ver la información detallada de cada película o serie. |
| **Paginado** | Implementado para navegar y visualizar más contenido en la sección Trending. |
| **Búsqueda Avanzada** | Permite buscar contenido específico (películas o series). Los resultados se muestran en un *dropdown* que es **interactivo** (clickeable) para acceder directamente a los detalles. |
| **Gestión de Favoritos** | Los usuarios pueden marcar ítems como favoritos mediante un **icono de corazón** ❤️ dentro de la grilla. Estos se almacenan localmente utilizando **`localStorage`** para evitar peticiones a la API. |


### 🚀 Roadmap de Próximas Implementaciones

| Categoría | Funcionalidad | Descripción |
| :--- | :--- | :--- |
| **Experiencia de Usuario** | **Modo Oscuro (Night Mode)** | Implementar un tema oscuro para optimizar la visualización en condiciones de baja luminosidad. |
| **Internacionalización** | **Soporte Multi-idioma** | Integrar la funcionalidad de *Change Language* para expandir el alcance de la aplicación. |
| **Plataforma (Core)** | **Autenticación de Usuarios** | Desarrollar un sistema de `User Authentication` (registro y login) para ofrecer experiencias personalizadas. |
| **Contenido** | **Detalles Extendidos** | Ampliar la información en las vistas de detalle, incluyendo datos sobre el reparto, equipo técnico y otros detalles relevantes de películas y series. |
| **Diseño** | **Mejoras UX/UI** | Aplicar optimizaciones en la Interfaz y Experiencia de Usuario para mejorar la usabilidad y el atractivo visual. |
| **Arquitectura** | **Refactorización del Código** | Mejorar la estructura y calidad del código, enfocándose en la separación de responsabilidades (separar la lógica de los componentes) para facilitar el mantenimiento y la escalabilidad. |


## ⚙️ Configuración del Entorno

### Development Server

Para iniciar el servidor de desarrollo local, ejecuta el siguiente comando:

```bash
ng serve
```

Una vez que el servidor esté en ejecución, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente al modificar cualquier archivo fuente.

### Building

Para compilar el proyecto para producción, utiliza el siguiente comando:

```bash
ng build
```

Esto generará los artefactos de *build* en el directorio `dist/`. Por defecto, la construcción de producción optimiza la aplicación para un mejor rendimiento.


## 🔗 Recursos Adicionales

  * **API Utilizada:** [The Movie Database (TMBD)](https://www.themoviedb.org/)
  * **Tutorial de Despliegue (Deploy):** [Video de YouTube](https://youtu.be/aRmsXQibyEY?si=MBrmzoN9iB1g518D)