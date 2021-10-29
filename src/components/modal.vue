<template>
  <div class="modal" v-show="scale" id="modal" @click="closeModal">
    <div class="modal-content">
      <h3>new channel</h3>
      <form @submit.prevent="submitChannel">
        <input type="text" id="channel_name" placeholder="Channel Name" />
        <textarea
          placeholder="Channel Description"
          rows="5"
          cols="50"
        ></textarea>
        <input type="submit" class="btn" value="Save" />
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: ["scale"],
  emits: ["close-modal"],
  methods: {
    closeModal() {
      window.addEventListener("click", (e) => {
        if (e.target.id == "modal") {
          this.$emit("close-modal");
        }
      });
    },
    submitChannel() {},
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
      }
    }
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
