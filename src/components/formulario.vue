<template> 
  <div class="container">
    <h2>Formulario de Registro</h2>

    <label class="label">Seleccionar tipo de registro:</label>
    <select v-model="tablaSeleccionada" class="select">
      <option value="actores_productores_rey_leon">Actores/Productores</option>
      <option value="personajes_rey_leon">Personajes</option>
    </select>

    <form @submit.prevent="guardarRegistro" class="formulario">
      <label class="label">Nombre:</label>
      <input type="text" v-model="registro.nombre" class="input" required />

      <label class="label">Rol:</label>
      <input type="text" v-model="registro.rol" class="input" required />

      <template v-if="tablaSeleccionada === 'actores_productores_rey_leon'">
        <label class="label">Personaje Asociado:</label>
        <input type="text" v-model="registro.personaje_asociado" class="input" />

        <label class="label">Película:</label>
        <input type="text" v-model="registro.pelicula" class="input" />
      </template>

      <template v-if="tablaSeleccionada === 'personajes_rey_leon'">
        <label class="label">Especie:</label>
        <input type="text" v-model="registro.especie" class="input" required />

        <label class="label">Descripción:</label>
        <textarea v-model="registro.descripcion" class="textarea" required></textarea>
      </template>

      <button type="submit" class="boton">Guardar</button>
    </form>

    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      registro: {
        nombre: "",
        rol: "",
        personaje_asociado: "",
        pelicula: "",
        especie: "",
        descripcion: ""
      },
      tablaSeleccionada: "actores_productores_rey_leon", 
      mensaje: ""
    };
  },
  methods: {
    async guardarRegistro() {
      try {
        console.log("Enviando datos:", this.registro);
        const response = await axios.post(
          `http://localhost:5000/api/registros/${this.tablaSeleccionada}`,
          this.registro
        );
        console.log("Respuesta del servidor:", response.data);
        this.mensaje = "Registro guardado con éxito";
        this.limpiarFormulario();
      } catch (error) {
        console.error("Error al guardar:", error.response ? error.response.data : error.message);
        this.mensaje = "Ocurrió un error al guardar el registro. Verifica la conexión con el servidor.";
      }
    },
    limpiarFormulario() {
      this.registro = {
        nombre: "",
        rol: "",
        personaje_asociado: "",
        pelicula: "",
        especie: "",
        descripcion: ""
      };
    }
  }
};
</script>

