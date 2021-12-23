<template>
  <div class="dark-bg p-5">
    <!-- VISTA GENERAL -->

    <!-- Cabecera -->
    <div class="container-header">
      <h1>Postulantes</h1>
      <router-link :to="{name: 'nuevo-postulante'}">
        <button type="button" class="btn btn-primary">
        <i class="bi bi-plus"></i> Crear Postulante
      </button>
      </router-link>
    </div>
    <hr />

    <!-- Contenido -->
    <div class="container-content">
      <!-- Sidebar -->
      <div class="sidebar">
        <div class="sidebard__item">
          <form class="form">
            <input type="type" class="form__field" v-model="filterQuery" />
            <button
              type="button"
              @click="applyFilter"
              class="btn-text btn-text--primary btn-text--inside uppercase"
            >
              Filtrar
            </button>
          </form>
        </div>

        <hr />

        <div class="filter-options">
          <input
            type="radio"
            name="select"
            id="option-1"
            value="edad"
            v-model="filterType"
          />
          <input
            type="radio"
            name="select"
            id="option-2"
            value="formacion"
            v-model="filterType"
          />
          <label for="option-1" class="option option-1">
            <div class="dot"></div>
            <span>Edad</span>
          </label>
          <label for="option-2" class="option option-2">
            <div class="dot"></div>
            <span>Formacion</span>
          </label>
        </div>

        <div>
          <button
            type="button"
            @click="getPostulantes"
            class="btn-text btn-text--block btn-text--primary uppercase"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      <!-- Tarjetas de postulantes -->
      <div class="card-container">
        <div
          v-for="(postulante) in postulants"
          :key="postulante._id"
          class="card"
        >
          <div class="card-body">
            <h5 class="card-title">
              <span>{{ postulante.name }} {{ postulante.lastname }}</span>
              <div>
                <router-link
                  :to="{
                    name: 'postulantes-unique',
                    params: { unique: postulante._id },
                  }"
                >
                  <button type="button" class="btn btn-light mx-2">
                    <i class="bi bi-eye-fill"></i></button
                ></router-link>
                <router-link
                  :to="{
                    name: 'nuevo-postulante-unique',
                    params: { unique: postulante._id },
                  }"
                >
                  <button type="button" class="btn btn-success">
                    <i class="bi bi-pen-fill"></i>
                  </button>
                </router-link>
              </div>
            </h5>
            <hr />
            <h6 class="card-subtitle mb-2 text-muted">
              {{ postulante.carrera || "Ninguna" }}
            </h6>
            <p class="card-text">
              Formacion: {{ postulante.formacion || "Ninguna" }}
            </p>
            <p><i class="bi bi-telephone-fill"></i> {{ postulante.celular }}</p>
            <p><i class="bi bi-card-checklist"></i> {{ postulante.dni }}</p>
            <button
              @click="showModal(postulante)"
              type="button"
              class="btn btn-danger btn-delete"
            >
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="bg-modal" :class="isModalActive ? '' : 'hide'">
      <div class="modal-container p-4">
        <div class="modal-mid">
          <div class="modal-title" v-if="tempPostulante">
            ¿Seguro que quieres borrar a {{ tempPostulante.name }}
            {{ tempPostulante.lastname }}?
          </div>
          <hr />
          <div class="modal-cuerpo">
            Si borras a este postulante no podras recuperarlo luego. Por favor
            verifique que sea el postulante que usted ha indicado y si es asi
            entonces presione en ELIMINAR.
          </div>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Cancelar
          </button>
          <button
            @click="deletePermanently"
            type="button"
            class="btn btn-danger"
          >
            ELIMINAR Permanentemente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap");

$background: #f5f6fa;
$text: #9c9c9c;
$input-bg-color: #2f3640;
$input-text-color: #fff;
$button-bg-color: #7f8ff4;
$button-text-color: #fff;

.uppercase {
  text-transform: uppercase;
}

//** button
.btn-text {
  display: inline-block;
  background: transparent;
  color: inherit;
  font: inherit;
  border: 0;
  outline: 0;
  padding: 0;
  transition: all 200ms ease-in;
  cursor: pointer;

  &--block {
    width: 100%;
  }

  &--primary {
    background: $button-bg-color;
    color: $button-text-color;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    padding: 12px 36px;

    &:hover {
      background: darken($button-bg-color, 4%);
    }

    &:active {
      background: $button-bg-color;
      box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, 0.2);
    }
  }

  &--inside {
    margin-left: -96px;
  }
}

//** form
.form {
  &__field {
    width: 360px;
    background: #2f3640;
    color: $input-text-color;
    font-family: "Poppins", sans-serif;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    border: 0;
    outline: 0;
    padding: 22px 18px;
  }
}

.filter-options {
  display: inline-flex;
  height: 100px;
  width: 400px;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  padding: 20px 15px;

  .option {
    background: #fff;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 0 10px;
    border-radius: 5px;
    cursor: pointer;
    padding: 0 10px;
    border: 2px solid lightgrey;
    transition: all 0.3s ease;
  }
  .option .dot {
    height: 20px;
    width: 20px;
    background: #d9d9d9;
    border-radius: 50%;
    position: relative;
  }
  .option .dot::before {
    position: absolute;
    content: "";
    top: 4px;
    left: 4px;
    width: 12px;
    height: 12px;
    background: #0069d9;
    border-radius: 50%;
    opacity: 0;
    transform: scale(1.5);
    transition: all 0.3s ease;
  }
  input[type="radio"] {
    display: none;
  }
  #option-1:checked:checked ~ .option-1,
  #option-2:checked:checked ~ .option-2 {
    border-color: #0069d9;
    background: #0069d9;
  }
  #option-1:checked:checked ~ .option-1 .dot,
  #option-2:checked:checked ~ .option-2 .dot {
    background: #fff;
  }
  #option-1:checked:checked ~ .option-1 .dot::before,
  #option-2:checked:checked ~ .option-2 .dot::before {
    opacity: 1;
    transform: scale(1);
  }
  .option span {
    font-size: 20px;
    color: #808080;
  }
  #option-1:checked:checked ~ .option-1 span,
  #option-2:checked:checked ~ .option-2 span {
    color: #fff;
  }
}

.dark-bg {
  min-height: 100vh;
  background: #2c3e50;

  hr {
    color: #fff;
  }

  h1 {
    color: #fff;
  }
}

.bg-modal {
  &.hide {
    opacity: 0;
    pointer-events: none;
  }

  background: rgba(25, 42, 86, 0.5);
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-container {
    height: 15rem;
    width: 40%;
    background: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    hr {
      color: #000;
    }

    .modal-title {
      font-size: 1.8rem;
      font-weight: 500;
    }

    .modal-actions {
      display: flex;
      justify-content: space-between;
    }
  }
}

.container-header {
  display: flex;
  justify-content: space-between;
}

.container-content {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto;
  gap: 0 1rem;

  .sidebar {
    background: #3c6382;
    border-radius: 10px;
    padding: 1.5rem;
    height: 250px;

    input[type="text"] {
      width: 100%;
      background: none;
      border: #fff 2px solid;
      color: #fff;
      padding: 0.5rem 1.5rem;
      border-radius: 10px;

      &:focus,
      &:active {
        outline: none;
      }

      &::placeholder {
        color: #fff;
      }
    }

    .filter-options {
      .filter {
        width: 100%;
        display: flex;
        align-items: center;

        input[type="radio"] {
          margin: 0.7rem 0.6rem;
        }

        label {
          color: #fff;
          font-family: "Poppins", sans-serif;
        }
      }
    }
  }
  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 10px 20px;
  }
}

.btn-delete {
  float: right;
}

.card {
  background: #2f3640;
  color: #fff;

  &-body {
  }

  &-title {
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
  }
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      postulants: [],
      tempPostulante: null,
      isModalActive: false,
      filterQuery: "",
      filterType: "formacion",
    };
  },

  mounted() {
    this.getPostulantes();
  },

  methods: {
    async deletePermanently() {
      try {
        const response = await axios.delete(
          `http://localhost:4000/Postulantes/${this.tempPostulante._id}`
        );

        this.closeModal();
        this.getPostulantes();
      } catch (err) {}
    },

    closeModal() {
      this.isModalActive = false;
      this.tempPostulante = null;
    },

    showModal(postulant) {
      this.isModalActive = true;
      this.tempPostulante = postulant;
    },

    applyFilter() {
      if (!this.filterQuery) return;

      axios
        .get(
          `http://localhost:4000/Postulantes?${this.filterType}=${this.filterQuery}`
        )
        .then((response) => {
          this.postulants = response.data.data;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },

    getPostulantes() {
      this.filterQuery = "";
      axios
        .get("http://localhost:4000/Postulantes/")
        .then((response) => {
          this.postulants = response.data.data;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
  },
};
</script>
