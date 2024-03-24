import {
  collection,
  query,
  where,
  orderBy,
  Timestamp,
  setDoc,
  doc,
  collectionGroup
} from "firebase/firestore";
export default () => {
  const db = useFirestore();
  const { user } = useAuth();
  // All channels
  const { data: allChannels } = useCollection(
    query(collection(db, "channels"), orderBy("name"))
  );

  // Channels created by the user
  const { data: userChannels, pending } = useCollection(
    query(
      collection(db, "channels"),
      where("id", "==", user.value.uid),
      orderBy("name")
    )
  );

  // Default channel
  const { data: defaultChannel } = useCollection(
    query(collection(db, "channels"), where("id", "==", "introduction"))
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

  const channels = ref();
  watchEffect(() => {
    channels.value = [...defaultChannel.value, ...userChannels.value];
  });

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

  const toggleDropdown = (item: any): void => {
    item.show = !item.show;
  };

  const channelModal = ref(false);
  const comingSoon = ref(false);
  const isLoading = ref(false);

  const channelTaken = ref(false);
  const channelExceededModal = ref(false);
  const channelExceeded = computed(() => {
    return userChannels.value.length === 2;
  });

  function createChannel() {
    if (channelExceeded.value) {
      channelExceededModal.value = true;
      return;
    }
    channelModal.value = true;
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
    createChannel
  };
};
