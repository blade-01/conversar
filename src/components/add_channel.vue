<template>
  <div class="modal" v-show="scale" id="modal" @click="closeModal">
    <div class="modal-content">
      <h3>new channel</h3>
      <form @submit.prevent="submitChannel">
        <div v-if="errMssg" class="errMssg">
          <p>{{ errMssg }}</p>
        </div>
        <input
          type="text"
          id="channel_name"
          placeholder="Channel Name"
          v-model="channel_name"
        />
        <textarea
          placeholder="Channel Description"
          rows="5"
          cols="50"
          v-model="description"
        ></textarea>
        <input type="submit" class="btn" value="Save" />
      </form>
    </div>
  </div>
</template>
<script>
import firebaseApp from "@/fb/fb";
import { getAuth } from "firebase/auth";
const auth = getAuth(firebaseApp);
export default {
  data() {
    return {
      channel_name: "",
      description: "",
      errMssg: "",
    };
  },
  props: ["scale"],
  emits: ["close-modal", "add-channel"],
  methods: {
    closeModal() {
      window.addEventListener("click", (e) => {
        if (e.target.id == "modal") {
          this.$emit("close-modal");
        }
      });
    },
    submitChannel() {
      if (this.channel_name === "" && this.description === "") {
        this.errAlert("Please fill all fields");
      } else if (this.channel_name.length < 4) {
        this.errAlert("Channel name must be at least 4 characters long");
      } else if (this.description === "") {
        this.errAlert("Channel description cannot be left empty");
      } else {
        const data = {
          channelId: auth.currentUser.uid,
          id: Math.random()
            .toString(36)
            .substring(7)
            .toUpperCase(),
          name: this.channel_name,
          desc: this.description,
        };
        this.$emit("add-channel", data);
        this.$emit("close-modal");
        this.channel_name = "";
        this.description = "";
      }
    },
    errAlert(message) {
      this.errMssg = message;
      setTimeout(() => {
        this.errMssg = "";
      }, 2000);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/scss/global.scss";
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $modal-backdrop;
  z-index: 100;
  overflow: hidden;

  &-content {
    background: $accmod-bg;
    padding: 1.5rem;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    transform: translate(-50%, -50%) scale(0);
    animation: scaleIn 0.4s forwards;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    margin: 0.1rem;

    & h3 {
      text-transform: uppercase;
    }

    & form {
      display: flex;
      justify-content: start;
      align-items: flex-end;
      flex-direction: column;
      margin-top: 1.5rem;

      & input,
      textarea {
        background: $input-bg;
        border-radius: 5px;
        border: none;
        outline: none;
        padding: 1rem;
        color: $pri-color;
        width: 100%;
        box-sizing: border-box;
        display: block;
        margin-bottom: 1rem;

        &::placeholder {
          color: $sec-color;
        }
      }

      & .btn {
        background: $btn;
        font-weight: bold;
        padding: 0.7rem 1.5rem;
        width: auto;
        margin: 0;
        cursor: pointer;
      }
    }
  }
}

.errMssg {
  display: block;
  width: 100%;
  background: transparent;
  color: #fa5d5d;
  margin-bottom: 0.5rem;
  border: solid 1px #fa5d5d;
  text-align: center;
  border-radius: 5px;

  & p {
    padding: 0.5rem;
  }
}

@keyframes scaleIn {
  to {
    transform: translate(-50%, -50%) scale(1);
  }
}

@media screen and (min-width: 700px) {
  .modal-content {
    width: 400px;
  }
}
</style>
