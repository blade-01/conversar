import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp
} from "firebase/firestore";
import useValidations from "~/composables/useValidations";
import UiInputChat from "~/components/Ui/Input/Chat.vue";

export default (props?: any) => {
  // Variables
  const { $modal } = useNuxtApp();
  const { id } = useRoute().params;
  const { mainSchema } = useValidations();
  const { user } = useAuth();
  const { copy, copied } = useClipboard();
  const db = useFirestore();
  const contentWrapper = ref<HTMLElement | null>(null);
  const chatInput = ref<InstanceType<typeof UiInputChat> | null>(null);
  const memberSheet = ref(false);
  const chat = ref("");
  const resetForm = ref<HTMLFormElement | null>(null);
  const isLoading = ref(false);
  const isEditing = ref(false);
  const showOptions = ref(false);
  const shallowMessage = shallowRef(props?.message?.message);
  const inputField = ref<HTMLTextAreaElement | null>(null);

  const options = ref([
    {
      icon: "bx:pencil",
      title: "edit",
      action: () => {
        isEditing.value = !isEditing.value;
      },
      isActive: props?.message?.uid === user?.value?.uid
    },
    {
      icon: "mdi:content-copy",
      title: "copy",
      action: () => {
        copy(props?.message?.message);
      },
      isActive: true
    },
    {
      icon: isLoading.value ? "bx:loader" : "bx:trash",
      title: "delete",
      action: () => handleMessageDelete(),
      isActive: props?.message?.uid === user?.value?.uid
    }
  ]);

  // Scroll to bottom
  function scrollToBottom() {
    nextTick(() => {
      const contentElement = contentWrapper.value;
      if (contentElement) {
        // contentElement.scrollTop = contentElement.scrollHeight;
        contentElement.scrollTo({ top: contentElement.scrollHeight });
      }
    });
  }

  onMounted(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 1000);
  });

  /**
   * Message/Chat CRUD
   */
  // Send Message
  async function handleMessageSend() {
    isLoading.value = true;
    if (chat.value.trim()) {
      try {
        resetForm.value?.reset();
        await addDoc(
          collection(
            db,
            "channels",
            (id as string).toLocaleLowerCase(),
            "messages"
          ),
          {
            message: chat.value,
            createdAt: Timestamp.now(),
            uid: user.value.uid,
            name: user.value.displayName,
            avatar: user.value.photoURL
          }
        );
        chatInput?.value?.reduceChatBoxHeight();
        chatInput?.value?.closePopup();
      } catch (error) {
        return Promise.reject(error);
      } finally {
        isLoading.value = false;
        scrollToBottom();
      }
    }
  }

  // Enter keypress
  function handleEnterPress() {
    if (!chat.value.trim()) {
      console.log("Empty chat, not submitting");
    } else {
      handleMessageSend();
    }
  }

  // Delete Message
  function handleMessageDelete() {
    $modal.show({
      type: "danger",
      title: "Are you sure?",
      body: "You won't be able to revert this!",
      primary: {
        label: "Delete",
        theme: "red",
        action: () => deleteMessage()
      },
      secondary: {
        label: "Cancel",
        theme: "white",
        action: () => {}
      }
    });
  }

  async function deleteMessage() {
    isLoading.value = true;
    await deleteDoc(
      doc(
        db,
        "channels",
        (id as string).toLocaleLowerCase(),
        "messages",
        props?.message?.id
      )
    );
    isLoading.value = false;
    isEditing.value = false;
  }

  // Update Message
  async function handleMessageUpdate() {
    if (props?.message?.message.trim()) {
      isLoading.value = true;
      try {
        await updateDoc(
          doc(
            db,
            "channels",
            (id as string).toLocaleLowerCase(),
            "messages",
            props?.message?.id
          ),
          {
            message: inputField.value!.value || props?.message?.message
          }
        );
      } catch (error: any) {
        return Promise.reject(error);
      } finally {
        isEditing.value = false;
        isLoading.value = false;
        showOptions.value = false;
        emojiPopup.value = false;
        shallowMessage.value = props?.message?.message;
      }
    } else {
      handleMessageDelete();
    }
  }

  // Handle cancel
  function handleCancel() {
    isEditing.value = false;
    isLoading.value = false;
    showOptions.value = false;
    emojiPopup.value = false;
    props.message.message = shallowMessage.value;
  }

  // Emoji selector logic
  const emojiPopup = ref(false);

  watch(emojiPopup, (val) => {
    if (val) {
      setTimeout(() => {
        document
          .querySelector("emoji-picker")!
          .addEventListener("emoji-click", (e: any) => {
            const emoji = e.detail.unicode;
            const textarea = inputField.value as HTMLTextAreaElement;
            textarea.focus();

            if (textarea) {
              const cursorPosition = textarea.selectionStart;
              const updatedText = insertAtCursor(
                textarea.value,
                emoji,
                cursorPosition
              );
              textarea.value = updatedText;
              textarea.focus();
              const newPosition = cursorPosition + emoji.length;
              textarea.setSelectionRange(newPosition, newPosition);
            }
          });
      }, 1000);
    }
  });

  return {
    mainSchema,
    contentWrapper,
    chatInput,
    memberSheet,
    chat,
    resetForm,
    isLoading,
    handleMessageSend,
    handleEnterPress,
    scrollToBottom,
    showOptions,
    handleCancel,
    emojiPopup,
    isEditing,
    handleMessageUpdate,
    inputField,
    options,
    copied
  };
};
