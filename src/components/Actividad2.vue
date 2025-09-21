<template>
  <div class="container mt-4">
    <form @submit.prevent="registrar">
      <!-- Nombre -->
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre:</label>
        <input
          type="text"
          id="nombre"
          v-model="nombre"
          class="form-control"
          @input="validateNombre"
        />
        <p v-if="errors.nombre" class="text-danger">{{ errors.nombre }}</p>
      </div>

      <!-- Correo -->
      <div class="mb-3">
        <label for="correo" class="form-label">Correo:</label>
        <input
          type="email"
          id="correo"
          v-model="correo"
          class="form-control"
        />
        <p v-if="errors.correo" class="text-danger">{{ errors.correo }}</p>
      </div>

      <!-- Contraseña -->
      <div class="mb-3">
        <label for="password" class="form-label">Contraseña:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-control"
          @blur="validatePassword"
        />
        <p v-if="errors.password" class="text-danger">{{ errors.password }}</p>
      </div>

      <!-- Confirmar contraseña -->
      <div class="mb-3">
        <label for="confirmar" class="form-label">Repetir Contraseña:</label>
        <input
          type="password"
          id="confirmar"
          v-model="confirmar"
          class="form-control"
        />
        <p v-if="errors.confirmar" class="text-danger">{{ errors.confirmar }}</p>
      </div>

      <button type="submit" class="btn btn-success">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      correo: '',
      password: '',
      confirmar: '',
      errors: {
        nombre: '',
        correo: '',
        password: '',
        confirmar: ''
      }
    }
  },
  methods: {
    // Validación en tiempo nombre
    validateNombre() {
      if (!this.nombre) {
        this.errors.nombre = 'El campo nombre es requerido'
      } else if (/\d/.test(this.nombre)) {
        this.errors.nombre = 'El nombre no puede contener números'
      } else {
        this.errors.nombre = ''
      }
    },
    // Validación contraseña
    validatePassword() {
      if (!this.password) {
        this.errors.password = 'El campo contraseña es requerido'
      } else if (this.password.length < 5) {
        this.errors.password = 'La contraseña debe tener al menos 5 caracteres'
      } else {
        this.errors.password = ''
      }
    },
    registrar() {
      // Reiniciar errores
      this.errors = { nombre: '', correo: '', password: '', confirmar: '' }

      // Validaciones
      this.validateNombre()
      this.validatePassword()

      if (!this.correo) {
        this.errors.correo = 'El campo correo es requerido'
      } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.correo)) {
        this.errors.correo = 'El correo es inválido'
      }

      if (!this.confirmar) {
        this.errors.confirmar = 'El campo repetir contraseña es requerido'
      } else if (this.password && this.password !== this.confirmar) {
        this.errors.confirmar = 'Las contraseñas no coinciden'
      }

      // Si no hay errores
      const hayErrores = Object.values(this.errors).some(e => e !== '')
      if (!hayErrores) {
        alert('El registro se ha realizado correctamente')

        // Limpiar formulario
        this.nombre = ''
        this.correo = ''
        this.password = ''
        this.confirmar = ''
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
.form-label {
  display: block;
  text-align: center;
}
</style>
