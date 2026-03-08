// firebase-config.js

// TODO: 请在这里填入您从 Firebase 控制台获取的 firebaseConfig 对象
// 这是一个示例，请务必替换成您自己的真实配置！
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:000000000000000000"
};

// 初始化 Firebase App
const app = firebase.initializeApp(firebaseConfig);

// 导出我们需要用到的 Firebase 服务
const auth = firebase.auth();
const db = firebase.firestore();

export { app, auth, db };
