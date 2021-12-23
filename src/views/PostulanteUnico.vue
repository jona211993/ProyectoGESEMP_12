<template>
  <div class="container-postulant dark-bg" v-if="postulante">
    <div class="postulant-header">
      <h1>
        {{ postulanteFullName }}
      </h1>
    </div>
    <hr />
    <div class="postulant-body">
      <div class="row">
        <div class="col-6">
          <p>
            {{ postulanteFormacion }}
          </p>
        </div>
        <div class="col-6">
          <p>
            {{ postulanteCarrera }}
          </p>
        </div>
        <div class="col-6">
          <p>
            {{ postulanteDni }}
          </p>
        </div>
        <div class="col-6">
          <p>
            {{ postulanteEmail }}
          </p>
        </div>
        <div class="col-6">
          <p>
            {{ postulanteCelular }}
          </p>
        </div>
        <div class="col-6">
          <p>
            {{ postulanteCentroE }}
          </p>
        </div>
        <div class="col-6">
          <p>
            {{ postulanteEdad }}
          </p>
        </div>
        <div class="col-6">
          <p>
            {{ postulanteDireccion }}
          </p>
        </div>
      </div>
    </div>
    <div class="postulant-accion">
      <router-link :to="{name: 'postulantes'}">
        <button class="btn btn-dark btn-lg btn-block">
        Volver a los Postulantes
      </button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.postulant-accion {
  padding: 2rem 0;
  .btn-block {
    width: 100%;
  }
}

.dark-bg {
  min-height: 100vh;
  background: #2c3e50;

  hr {
    color: #fff;
  }

  h1,
  p,
  span {
    color: #fff;
  }
}

.container-postulant {
  padding: 3rem;
}

.postulant-header {
  background: #000;
  padding: 2rem 0.8rem;
  h1 {
    font-family: consolas;
  }
}

.postulant-body {
  background: #000;
  padding: 2rem 0.8rem;
  .col-6,
  .col-12 {
    padding: 2rem 0.6rem;

    p {
      font-family: consolas;
      font-weight: 300;
      border-bottom: 2px solid #fff;
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

export default {
  data() {
    return {
      postulante: null,
      postulanteFullName: "",
      postulanteFormacion: "",
      postulanteCarrera: "",
      postulanteDni: "",
      postulanteEmail: "",
      postulanteCelular: "",
      postulanteCentroE: "",
      postulanteEdad: "",
      postulanteDireccion: "",
    };
  },

  mounted() {
    this.getPostulante();
  },

  methods: {
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

    getPostulante() {
      const unique = this.$route.params.unique;

      axios
        .get(`http://localhost:4000/Postulantes/${unique}`)
        .then((response) => {
          this.postulante = response.data.data;

          this.startTyping(
            `Postulante: ${this.postulante.name} ${this.postulante.lastname}`,
            "postulanteFullName",
            true
          );

          this.startTyping(
            `Formación: ${this.postulante.formacion}`,
            "postulanteFormacion"
          );
          this.startTyping(
            `Carrera Ejercida: ${this.postulante.carrera}`,
            "postulanteCarrera"
          );
          this.startTyping(
            `Documento de Identidad: ${this.postulante.dni}`,
            "postulanteDni"
          );
          this.startTyping(
            `Correo Electrónico: ${this.postulante.email}`,
            "postulanteEmail"
          );
          this.startTyping(
            `Número de Teléfono: ${this.postulante.celular}`,
            "postulanteCelular"
          );
          this.startTyping(
            `Centro Educativo: ${this.postulante.centro_e}`,
            "postulanteCentroE"
          );
          this.startTyping(
            `Edad del Postulante: ${this.postulante.edad}`,
            "postulanteEdad"
          );
          this.startTyping(
            `Lugar de Residencia: ${this.postulante.direccion}`,
            "postulanteDireccion"
          );
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
  },
};
</script>
