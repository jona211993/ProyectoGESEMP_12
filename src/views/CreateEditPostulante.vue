<template>
  <div class="container-postulant dark-bg">
    <div class="postulant-header">
      <h1>></h1>
      <input type="text" :placeholder="postulanteName" v-model="form.name" />
      <input
        type="text"
        :placeholder="postulanteLastName"
        v-model="form.lastname"
      />
    </div>
    <hr />
    <div class="postulant-body">
      <div class="row">
        <div class="col-6">
          <p>Formacion:</p>
          <input
            type="text"
            :placeholder="postulanteFormacion"
            v-model="form.formacion"
          />
        </div>
        <div class="col-6">
          <p>Carrera:</p>
          <input
            type="text"
            :placeholder="postulanteCarrera"
            v-model="form.carrera"
          />
        </div>
        <div class="col-6">
          <p>Documento de Identidad:</p>
          <input type="text" :placeholder="postulanteDni" v-model="form.dni" />
        </div>
        <div class="col-6">
          <p>Correo Electrónico:</p>
          <input
            type="text"
            :placeholder="postulanteEmail"
            v-model="form.email"
          />
        </div>
        <div class="col-6">
          <p>Número de Teléfono:</p>
          <input
            type="text"
            :placeholder="postulanteCelular"
            v-model="form.celular"
          />
        </div>
        <div class="col-6">
          <p>Centro Educativo:</p>
          <input
            type="text"
            :placeholder="postulanteCentroE"
            v-model="form.centro_e"
          />
        </div>
        <div class="col-6">
          <p>Edad del Postulante:</p>
          <input
            type="text"
            :placeholder="postulanteEdad"
            v-model="form.edad"
          />
        </div>
        <div class="col-6">
          <p>Lugar de Residencia:</p>
          <input
            type="text"
            :placeholder="postulanteDireccion"
            v-model="form.direccion"
          />
        </div>
        <div class="col-6" v-if="!$route.params.unique">
          <p>Contraseña:</p>
          <input
            type="password"
            :placeholder="postulantePassword"
            v-model="form.password"
          />
        </div>
      </div>
    </div>
    <div class="postulant-accion">
      <router-link :to="{ name: 'postulantes' }">
        <button class="btn btn-dark btn-lg btn-block">
          Volver a los Postulantes
        </button>
      </router-link>
      <button
        :disabled="loading"
        @click="submit"
        class="btn btn-lg btn-block"
        :class="loading ? 'btn-secondary' : 'btn-success'"
      >
        <span v-if="!loading"> {{ toHappen }}</span>
        <div v-else class="lds-dual-ring"></div>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lds-dual-ring {
  display: inline-block;
  height: 20px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.btn {
  span {
    color: #fff !important;
  }
}

input {
  border: none;
  background: #000;
  width: 100%;
  height: 100%;
  color: #fff;
  padding: 0.9rem 1rem;
  &::placeholder {
    color: rgb(194, 194, 194);
    font-family: "Poppins", sans-serif;
    font-weight: 500;
  }

  & + input {
    margin-left: 0.5rem;
  }
}

.col-6 {
  display: grid;
  align-items: center;
  grid-template-columns: 2fr 3fr;
  grid-auto-rows: auto;
  border-bottom: 2px solid #000;

  p {
    margin: 0;
  }
}

.postulant-accion {
  padding: 2rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 1rem;
  .btn-block {
    width: 100%;
  }
}

.dark-bg {
  min-height: 100vh;
  background: #2c3e50;

  hr {
    color: #000;
  }

  h1,
  p,
  span {
    color: #000;
  }
}

.container-postulant {
  padding: 3rem;
}

.postulant-header {
  background: #fff;
  padding: 2rem 0.8rem;
  display: flex;
  h1 {
    font-family: consolas;
    margin-right: 15px;
  }
}

.postulant-body {
  background: #fff;
  padding: 2rem 0.8rem;
  .col-6,
  .col-12 {
    padding: 2rem 0.6rem;

    p {
      font-family: consolas;
      font-weight: 300;
      font-size: 1.5rem;

      span {
        font-weight: 500;
        text-transform: uppercase;
      }
    }
  }
}
</style>

<script>
import axios from "axios";

const defaultForm = {
  name: "",
  lastname: "",
  dni: "",
  edad: "",
  email: "",
  celular: "",
  direccion: "",
  formacion: "",
  password: "",
  centro_e: "",
  carrera: "",
};

export default {
  data() {
    return {
      toHappen: "",
      postulanteName: "",
      postulanteLastName: "",
      postulanteFormacion: "",
      postulanteCarrera: "",
      postulanteDni: "",
      postulanteEmail: "",
      postulanteCelular: "",
      postulanteCentroE: "",
      postulanteEdad: "",
      postulanteDireccion: "",
      postulantePassword: "",

      form: { ...defaultForm },
      loading: false,
    };
  },

  mounted() {
    this.form = { ...defaultForm };
    this.loading = false;

    if (this.$route.params.unique) {
      this.toHappen = "Editar Postulante";
      this.getPostulante();
    } else {
      this.toHappen = "Crear Postulante";
    }

    this.startTyping(`Aqui puede escribir su nombre`, "postulanteName", true);
    this.startTyping(
      `Aqui puede escribir su apellido`,
      "postulanteLastName",
      true
    );
    this.startTyping(
      `Escriba su formación academica`,
      "postulanteFormacion",
      true
    );
    this.startTyping(`Escriba su carrera`, "postulanteCarrera", true);
    this.startTyping(
      `Escriba su documento de identidad`,
      "postulanteDni",
      true
    );
    this.startTyping(`Escriba su correo electrónico`, "postulanteEmail", true);
    this.startTyping(`Escriba su contraseña`, "postulantePassword", true);
    this.startTyping(`Escriba su número telefónico`, "postulanteCelular", true);
    this.startTyping(`Escriba su centro educativo`, "postulanteCentroE", true);
    this.startTyping(`Escriba su edad`, "postulanteEdad", true);
    this.startTyping(
      `Escriba su lugar de residencia`,
      "postulanteDireccion",
      true
    );
  },

  methods: {
    async submit() {
      if (!this.form.name) return;
      if (!this.form.lastname) return;
      if (!this.form.formacion) return;
      if (!this.form.dni) return;
      if (!this.form.celular) return;
      if (!this.form.edad) return;
      if (!this.form.direccion) return;
      if (!this.form.email) return;
      if (!this.form.password && !this.$route.params.unique) return;

      this.loading = true;

      if (this.$route.params.unique) {
        try {
          //* Aqui es la peticion de edicion
          delete this.form._id;

          const response = await axios.put(
            `http://localhost:4000/Postulantes/${this.$route.params.unique}`,
            this.form
          );
        } catch (e) {
          this.loading = false;

          console.log(e);
          alert(e.message);
        }
      } else {
        //* Aqui es la peticion de creacion
        try {
          const response = await axios.post(
            "http://localhost:4000/Postulantes/",
            this.form
          );
        } catch (e) {
          this.loading = false;

          console.log(e);
          alert(e.message);
        }
      }

      this.loading = false;
      this.$router.push({ name: "postulantes" });
    },

    getPostulante() {
      const unique = this.$route.params.unique;

      axios
        .get(`http://localhost:4000/Postulantes/${unique}`)
        .then((response) => {
          this.form = { ...response.data.data };
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },

    startTyping(fullnameStr, target, cursor = false) {
      let n = 0;

      let timer = setInterval(() => {
        ++n;
        this[target] = cursor
          ? "> " + fullnameStr.slice(0, n)
          : fullnameStr.slice(0, n);

        if (n === fullnameStr.length) {
          clearInterval(timer);
          this[target] = cursor
            ? "> " + fullnameStr.slice(0, n)
            : fullnameStr.slice(0, n);
          n = 0;

          setInterval(() => {
            if (n === 0) {
              this[target] = cursor
                ? "> " + fullnameStr + "|"
                : fullnameStr + "|";
              n = 1;
            } else {
              this[target] = cursor ? "> " + fullnameStr : fullnameStr;
              n = 0;
            }
          }, 500);
        }
      }, 60);
    },
  },
};
</script>
