<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Programación Front End</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Cálculo de calificaciones</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/registro">Formulario de registro</router-link>
            </li>
            <!-- Espacio guardado -->
            <li class="nav-item">
              <span class="nav-link">En construcción</span>
            </li>
          </ul>

          <!-- Barra de búsqueda añadida -->
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Buscar"
              aria-label="Buscar"
            />
            <button class="btn btn-outline-success" type="submit">Búsqueda</button>
          </form>
        </div>
      </div>
    </nav>

    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>
