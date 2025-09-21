<template>
  <div class="container mt-4">
    <form @submit.prevent="calcularPromedio">
      <!-- Campos de notas -->
      <div v-for="(nota, index) in form.notas" :key="index" class="mb-3">
        <label :for="'nota' + index" class="form-label">Nota {{ index + 1 }}</label>
        <input
          type="number"
          class="form-control"
          :id="'nota' + index"
          v-model.number="form.notas[index]"
          min="10"
          max="70"
          step="1"
          required
          :placeholder="'Nota ' + (index + 1)"
        />
      </div>

      <!-- Campo de asistencia -->
      <div class="mb-3">
        <label for="asistencia" class="form-label text-center d-block">Asistencia (%)</label>
        <input
          type="number"
          class="form-control"
          id="asistencia"
          v-model.number="form.asistencia"
          min="0"
          max="100"
          step="1"
          required
          placeholder="Asistencia"
        />
      </div>

      <button type="submit" class="btn btn-primary btn-centrar" @click="calcularPromedio">Calcular</button>
    </form>

    <!-- Mensaje -->
    <p v-if="hayErrores" class="text-danger">
      Por favor, ingrese valores válidos para las notas y la asistencia.
    </p>

    <!-- Resultado -->
    <div v-if="resultado !== null" class="mt-4">
      <div class="alert" :class="estado === 'aprobado' ? 'alert-success' : 'alert-danger'">
        <p><strong>El promedio es:</strong> {{ resultado.toFixed(2) }}</p>
        <p><strong>Tu estado es:</strong> {{ estado }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { notas: [null, null, null], asistencia: null },
      resultado: null,
      estado: null,
      errors: { notas: ['', '', ''], asistencia: '' }
    }
  },
  computed: {
    hayErrores() {
      return (
        this.errors.notas.some(e => e !== '') ||
        this.errors.asistencia !== ''
      )
    }
  },
  methods: {
    validateNotas() {
      this.errors.notas = ['', '', '']
      this.form.notas.forEach((n, i) => {
        if (n === null || n === '') {
          this.errors.notas[i] = 'La nota es requerida'
        } else if (n < 10 || n > 70) {
          this.errors.notas[i] = 'La nota debe estar entre 10 y 70'
        }
      })
    },
    validateAsistencia() {
      if (this.form.asistencia === null || this.form.asistencia === '') {
        this.errors.asistencia = 'La asistencia es requerida'
      } else if (this.form.asistencia < 0 || this.form.asistencia > 100) {
        this.errors.asistencia = 'La asistencia debe estar entre 0 y 100'
      } else {
        this.errors.asistencia = ''
      }
    },
    calcularPromedio() {
      this.resultado = null
      this.estado = null

      // Ejecutar validaciones
      this.validateNotas()
      this.validateAsistencia()

      // Si hay errores, no calcular
      if (this.hayErrores) return

      // Cálculo promedio ponderado
      const ponderaciones = [0.35, 0.35, 0.30]
      const promedio =
        this.form.notas[0] * ponderaciones[0] +
        this.form.notas[1] * ponderaciones[1] +
        this.form.notas[2] * ponderaciones[2]

      this.resultado = promedio
      this.estado = promedio >= 40 && this.form.asistencia >= 80 ? 'aprobado' : 'reprobado'
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
.btn-centrar {
  display: block;
  margin: 0 auto;
}
.text-danger {
  text-align: center;
  margin-top: 1rem;
}
</style>