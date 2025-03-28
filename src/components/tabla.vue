<template> 
  <div>
    <h1>Actores y Productores</h1>
    <table v-if="actoresProductores.length > 0" class="tabla">
      <thead>
        <tr>
          <th v-for="(columna, index) in encabezadoActores" :key="index">{{ columna }}</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in actoresProductores" :key="item.id">
          <td v-for="clave in clavesActores" :key="clave">{{ item[clave] }}</td>
          <td>
            <button class="btn edit" @click="editarRegistro(item, 'actores_productores')">Editar</button>
            <button class="btn delete" @click="eliminarRegistro(item.id, 'actores_productores')">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No hay datos disponibles para Actores y Productores.</p>

    <h1>Personajes</h1>
    <table v-if="personajes.length > 0" class="tabla">
      <thead>
        <tr>
          <th v-for="(columna, index) in encabezadoPersonajes" :key="index">{{ columna }}</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in personajes" :key="item.id">
          <td v-for="clave in clavesPersonajes" :key="clave">{{ item[clave] }}</td>
          <td>
            <button class="btn edit" @click="editarRegistro(item, 'personajes')">Editar</button>
            <button class="btn delete" @click="eliminarRegistro(item.id, 'personajes')">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No hay datos disponibles para Personajes.</p>

    <div v-if="registroEdicion" class="modal">
      <div class="modal-content">
        <h2>Editar Registro</h2>
        <form @submit.prevent="guardarEdicion">
          <div v-for="(valor, clave) in registroEdicion" :key="clave">
            <label>{{ clave }}:</label>
            <input type="text" v-model="registroEdicion[clave]" />
          </div>
          <button type="submit" class="btn save">Guardar</button>
          <button type="button" class="btn cancel" @click="cancelarEdicion">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      actoresProductores: [],
      personajes: [],
      registroEdicion: null,
      encabezadoActores: ['Nombre', 'Rol', 'Personaje Asociado', 'Película'],
      clavesActores: ['nombre', 'rol', 'personaje_asociado', 'pelicula'],
      encabezadoPersonajes: ['Nombre', 'Especie', 'Rol', 'Descripción'],
      clavesPersonajes: ['nombre', 'especie', 'rol', 'descripcion']
    };
  },
  mounted() {
    this.fetchDatos();
  },
  methods: {
    async fetchDatos() {
      try {
        const response = await axios.get('http://localhost:5000/api/registros');
        this.actoresProductores = response.data.actores_productores;
        this.personajes = response.data.personajes;
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    },

    async eliminarRegistro(id, tipo) {
      try {
        if (tipo === 'actores_productores') {
          await axios.delete(`http://localhost:5000/api/registros/actores_productores_rey_leon/${id}`);
          this.actoresProductores = this.actoresProductores.filter(item => item.id !== id);
        } else {
          await axios.delete(`http://localhost:5000/api/registros/personajes_rey_leon/${id}`);
          this.personajes = this.personajes.filter(item => item.id !== id);
        }
        console.log(`Registro ${id} eliminado.`);
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    },

    editarRegistro(item, tipo) {
      this.registroEdicion = { ...item, tipo };
    },

    async guardarEdicion() {
      try {
        const tipo = this.registroEdicion.tipo;
        if (tipo === 'actores_productores') {
          await axios.put(`http://localhost:5000/api/registros/actores_productores_rey_leon/${this.registroEdicion.id}`, this.registroEdicion);
          const index = this.actoresProductores.findIndex(item => item.id === this.registroEdicion.id);
          if (index !== -1) {
            this.actoresProductores[index] = { ...this.registroEdicion }; 
          }
        } else {
          await axios.put(`http://localhost:5000/api/registros/personajes_rey_leon/${this.registroEdicion.id}`, this.registroEdicion);
          const index = this.personajes.findIndex(item => item.id === this.registroEdicion.id);
          if (index !== -1) {
            this.personajes[index] = { ...this.registroEdicion }; 
          }
        }
        this.registroEdicion = null; 
        console.log("Edición guardada correctamente.");
      } catch (error) {
        console.error("Error al actualizar:", error);
      }
    },

    cancelarEdicion() {
      this.registroEdicion = null; 
    }
  }
};
</script>

<style scoped>

.tabla {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1em;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tabla th, .tabla td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.tabla th {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  font-weight: bold;
}

.tabla tr:nth-child(even) {
  background-color: #f2f2f2;
}

.btn {
  padding: 8px 12px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn.edit {
  background-color: #60acf8;
  color: rgb(255, 255, 255);
}

.btn.delete {
  background-color: #ff2323;
  color: rgb(255, 255, 255);
}

.btn.save {
  background-color: #4CAF50;
  color: white;
}

.btn.cancel {
  background-color: #f44336;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
}
</style>