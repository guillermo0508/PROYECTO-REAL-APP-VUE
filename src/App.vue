<template>
  <div id="app" class="container">
    <div class="header">
      <h1>Crud</h1>
    </div>
    <div class="content">
      <Tabla class="tabla-container" :registros="registros" />
      <Formulario class="formulario-container" @nuevo-registro="agregarRegistro" />
    </div>
  </div>
</template>

<script>
import Tabla from './components/tabla.vue';
import Formulario from './components/formulario.vue';
import './assets/styles.css'; 

export default {
  name: 'App',
  components: {
    Tabla,
    Formulario
  },
  data() {
    return {
      registros: [] // Almacena los registros obtenidos de la API
    };
  },
  methods: {
    async obtenerRegistros() {
      try {
        const response = await fetch('https://proyecto-real-apis-1.onrender.com/api/registros');
        if (!response.ok) {
          throw new Error('Error al obtener registros');
        }
        this.registros = await response.json();
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async agregarRegistro(nuevoRegistro) {
      try {
        const response = await fetch('https://proyecto-real-apis-1.onrender.com/api/registros/actores_productores_rey_leon', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevoRegistro)
        });
        if (!response.ok) {
          throw new Error('Error al agregar registro');
        }
        this.obtenerRegistros(); // Actualiza la lista de registros
      } catch (error) {
        console.error('Error:', error);
      }
    }
  },
  mounted() {
    this.obtenerRegistros(); // Llama a la función al montar el componente
  }
};
</script>