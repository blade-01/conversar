import {
  collection,
  query,
  where,
  orderBy,
  collectionGroup,
  deleteDoc,
  updateDoc,
  setDoc,
  Timestamp,
  doc
} from "firebase/firestore";
export default (props?: any) => {
  // Variables
  const { $modal } = useNuxtApp();
  const { user } = useAuth();
  const db = useFirestore();
  const channelModal = ref(false);
  const comingSoon = ref(false);
  const isLoading = ref(false);
  const channelTaken = ref(false);
  const channelExceededModal = ref(false);
  const isEditing = ref(false);
  const shallowName = shallowRef(props?.channel?.name);
  const inputField = ref<HTMLElement | null>(null);

  // All channels
  const { data: allChannels } = useCollection(
    query(collection(db, "channels"), orderBy("name"))
  );

  // Default channel
  const { data: defaultChannel } = useCollection(
    query(collection(db, "channels"), where("id", "==", "introduction"))
  );

  // Channels created by the user
  const { data: userChannels, pending } = useCollection(
    query(
      collection(db, "channels"),
      where("id", "==", user.value.uid),
      orderBy("name")
    )
  );

  // Channels where the user is invited
  const { data, pending: pendingInvitedChannels } = useCollection(
    query(collectionGroup(db, "members"), where("uid", "==", user.value.uid))
  );

  const invitedChannels = computed(() => {
    if (data.value) {
      return data.value
        .map((member: any) => {
          return allChannels.value.find(
            (channel: any) => channel.id === member.channelId
          );
        })
        .filter((f) => f != null);
    }
  });

  // Combine default and user channels
  const channels = ref();
  watchEffect(() => {
    channels.value = [...defaultChannel.value, ...userChannels.value];
  });

  // Channel exceeded
  const channelExceeded = computed(() => {
    return userChannels.value.length === 2;
  });

  // Sidebar links
  const links = ref<
    {
      name: string;
      show?: boolean;
      icon?: string;
      route?: string;
      hasCreate?: boolean;
      isEditable?: boolean;
      hasQuery?: boolean;
      sub?: {
        name: string;
        icon?: string;
        id?: string;
      }[];
    }[]
  >([
    {
      name: "Channels",
      show: true,
      sub: computed(() => channels.value) as any,
      hasCreate: true,
      isEditable: true,
      hasQuery: false
    },
    {
      name: "Invited Channels",
      show: true,
      hasCreate: false,
      isEditable: false,
      hasQuery: true,
      sub: computed(() => invitedChannels.value) as any
    }
  ]);

  // Toggle dropdown
  const toggleDropdown = (item: any): void => {
    item.show = !item.show;
  };

  /**
   * Channel CRUD
   */
  // Create channel
  async function handleCreateChannel(values: any, { resetForm }: any) {
    if (values.channelName) {
      const channelExists = channels.value.find(
        (channel: any) => channel.name === values.channelName.toLowerCase()
      );
      if (channelExists) {
        channelTaken.value = true;
        return;
      }
      try {
        isLoading.value = true;
        await setDoc(
          doc(db, "channels", values.channelName.toLowerCase()),
          {
            name: values.channelName.toLowerCase(),
            id: user.value.uid,
            createdAt: Timestamp.now()
          },
          { merge: true }
        );
        resetForm();
        channelModal.value = false;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        isLoading.value = false;
        channelTaken.value = false;
      }
    }
  }

  function createChannel() {
    if (channelExceeded.value) {
      channelExceededModal.value = true;
      return;
    }
    channelModal.value = true;
  }

  // Delete Channel
  function handleChannelDelete() {
    $modal.show({
      type: "danger",
      title: "Are you sure?",
      body: "You won't be able to revert this!",
      primary: {
        label: "Delete",
        theme: "red",
        action: () => deleteChannel()
      },
      secondary: {
        label: "Cancel",
        theme: "white",
        action: () => {}
      }
    });
  }

  async function deleteChannel() {
    isLoading.value = true;
    await deleteDoc(doc(db, "channels", props?.channel?.id.toLowerCase()));
    isLoading.value = false;
    useRouter().push({
      name: "channel-id",
      params: { id: "introduction" }
    });
  }

  // Update Channel
  async function handleChannelUpdate() {
    await updateDoc(doc(db, "channels", props?.channel?.id.toLowerCase()), {
      name: props?.channel.name
    });
    isEditing.value = false;
    shallowName.value = props?.channel.name;
  }

  // Toggle edit state
  function handleToggle() {
    isEditing.value = !isEditing.value;
  }

  // Cancel edit
  function handleCancel() {
    isEditing.value = false;
    props.channel.name = shallowName.value;
  }

  return {
    links,
    toggleDropdown,
    channels,
    allChannels,
    userChannels,
    defaultChannel,
    invitedChannels,
    pending,
    pendingInvitedChannels,
    user,
    channelModal,
    comingSoon,
    isLoading,
    channelTaken,
    channelExceededModal,
    channelExceeded,
    createChannel,
    handleCancel,
    handleChannelUpdate,
    handleChannelDelete,
    handleToggle,
    isEditing,
    inputField,
    handleCreateChannel
  };
};
