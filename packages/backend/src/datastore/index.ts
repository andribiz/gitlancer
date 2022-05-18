const PGstore = () => {
  let a = "Halo";
  return {
    UserStore: "",
  };
};

export default PGstore;

// export default class Postgres {
//   public userStore: IUsers;
//   constructor() {
//     const app = initializeApp({
//       credential: cert("./firebase-key.json"),
//       storageBucket: process.env.BUCKET_NAME,
//     });
//     const db = getFirestore();
//     db.settings({
//       ignoreUndefinedProperties: true,
//     });
//     this.userStore = new FirestoreUsers(db);
//   }
// }
