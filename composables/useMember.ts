import {
  collection,
  deleteDoc,
  query,
  orderBy,
  setDoc,
  doc
} from "firebase/firestore";
export default (props?: any) => {
  // Variables
  const { id } = useRoute().params;
  const { $modal } = useNuxtApp();
  const { user } = useAuth();
  const db = useFirestore();
  const isLoading = ref(false);
  const memberExceededModal = ref(false);
  const memberModal = ref(false);

  // All Users
  const { data: allUsers, pending: pendingUsers } = useCollection(
    query(collection(db, "users"), orderBy("name"))
  );

  // Filtered users
  const filteredUsers = computed(() => {
    return allUsers.value.filter((use) => use.uid !== user.value.uid);
  });

  // Users within the channel
  const { data: channelUsers, pending } = useCollection<{
    uid: string;
    name: string;
    avatar: string;
  }>(
    query(
      collection(
        db,
        "channels",
        (id as string)?.toLocaleLowerCase(),
        "members"
      ),
      orderBy("name")
    )
  );

  // Conditional display of users based on default channel
  const users = computed(() => {
    if (
      channelUsers.value &&
      (id as string)?.toLocaleLowerCase() !== "introduction"
    ) {
      return channelUsers.value;
    } else {
      return allUsers.value;
    }
  });

  // Default channel check
  const introductionChannel = computed(() => {
    return (id as string)?.toLocaleLowerCase() === "introduction";
  });

  // Members limit exceeded
  const memberExceeded = computed(() => {
    return users.value.length === 6;
  });

  // Members collection reference
  const membersCollectionRef = collection(
    doc(db, "channels", (id as string)?.toLocaleLowerCase()),
    "members"
  );

  // Add Members/Users to channel
  async function handleAddMembers(values: any, { resetForm }: any) {
    isLoading.value = true;
    try {
      // Add selected users to the members collection
      await Promise.all(
        values.users.map(async (user: any) => {
          const memberDocRef = doc(membersCollectionRef, user.uid);
          await setDoc(
            memberDocRef,
            {
              ...user,
              channelId: (id as string)?.toLocaleLowerCase()
            },
            { merge: true }
          );
        })
      );
      // Add current user to the members collection
      await setDoc(
        doc(membersCollectionRef, user?.value?.uid),
        {
          uid: user?.value?.uid,
          name: user?.value?.displayName,
          avatar: user?.value?.photoURL,
          email: user?.value?.email
        },
        { merge: true }
      );
      resetForm();
      memberModal.value = false;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  // Add member modal logic
  function addMembers() {
    if (memberExceeded.value) {
      memberExceededModal.value = true;
      return;
    }
    memberModal.value = true;
  }

  // Get selected members
  const initialValues = computed(() => {
    return {
      users: users?.value
        ?.map((user) => {
          return {
            uid: user.uid,
            name: user.name,
            avatar: user.avatar,
            email: user.email
          };
        })
        ?.filter((member) => member.uid !== user?.value?.uid)
    };
  });

  // Delete Member
  function handleMemberDelete(id: string) {
    $modal.show({
      type: "danger",
      title: "Are you sure?",
      body: "You won't be able to revert this!",
      primary: {
        label: "Delete",
        theme: "red",
        action: () => deleteMember(id)
      },
      secondary: {
        label: "Cancel",
        theme: "white",
        action: () => {}
      }
    });
  }

  async function deleteMember(id: string) {
    await deleteDoc(
      doc(
        db,
        "channels",
        (id as string)?.toLocaleLowerCase(),
        "members",
        props?.user?.id
      )
    );
  }

  return {
    handleMemberDelete,
    deleteMember,
    allUsers,
    pendingUsers,
    filteredUsers,
    channelUsers,
    pending,
    users,
    introductionChannel,
    memberExceeded,
    memberExceededModal,
    memberModal,
    membersCollectionRef,
    handleAddMembers,
    addMembers,
    initialValues,
    isLoading
  };
};
