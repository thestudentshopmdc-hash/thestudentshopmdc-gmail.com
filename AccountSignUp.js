const SignupMessage = document.getElementById("SignupMessage")
const LoginMessage = document.getElementById("LoginMessage")
const LogoutMessage = document.getElementById("LogoutMessage")
const NameMessage = document.getElementById("NameMessage")
const EmailMessage = document.getElementById("EmailMessage")

const supabaseUrl = "https://rsndakviombsnwebuegy.supabase.co"
const supabaseAnonKey = "sb_publishable_jLDAR7Kpb6W65lgmvpVSMA_9shoqFxk"
// Truy cập trực tiếp qua hàm global do CDN cung cấp
 const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseAnonKey); 
// Đăng ký tài khoản cho người dùng

// Chuyen du lieu len database (auth)
document.getElementById("submitIn4").addEvenlistener("click", function async userSignUp(){
 SignupMessage.textContent="";
    const Subname = document.getElementById("username").value.trim()
    const Subemail = document.getElementById("email").value.trim()
    const Subpassword = document.getElementById("password").value
    const Subrepassword = document.getElementById("repassword").value
 
 if (Subname ==="" || Subemail ==="" || Subpassword ==="" || Subrepassword ==="") {
  SignupMessage.textContent="Vui lòng nhập đầy đủ thông tin";
  return;
 }
 if (Subrepassword !== Subpassword) {
  SignupMessage.textContent="Mật khẩu nhập lại không khớp!";
  return;
 }
    const {data, error}= await supabaseClient.auth.signUp({
        email: Subemail, 
        password: Subpassword,
        options: {
            data: {
                name: Subname
            }
        }
    });

 if (error) {
  SignupMessage.textContent="Đăng ký thất bại: "+ error.message;
  return;
 }
 window.location.href="UserPage.html";
}

}); 
async function Login() {
 LoginMessage.textContent="";

 const { data: currentData } = await supabaseClient.auth.getSession();
 if (currentData.session) {
  LoginMessage.textContent = "Tài khoản đang được đăng nhập";
  return;
 }
 
 const LoginEmail = document.getElementById("LoginEmail").value.trim();
 const LoginPassword = document.getElementById("LoginPassword").value;

 if (LoginEmail === "" || LoginPassword === "") {
  LoginMessage.textContent="Vui lòng nhập đầy đủ thông tin";
  return;
 }
 
 const { data, error } = await supabaseClient.auth.signInWithPassword ({
  email : LoginEmail,
  password : LoginPassword
 });
 if (error) {
  LoginMessage.textContent="Đăng nhập thất bại: " + error.message;
  return;
 }
 LoginMessage.textContent="Đăng nhập thành công!";
 window.location.href="index.html";
 
}

async function getUser() {
 const { data, error } = await supabaseClient.auth.getUser();
 if (error) {
  return null;
  }
 return data.user;
}

function updateUI(session) {
 if (!NameMessage || !EmailMessage) return;
 if (session) {
  const user = session.user;
  NameMessage.textContent = user.user_metadata?.name || "chưa có tên";
  EmailMessage.textContent = user.email || "chưa có email";
 }
 else {
  NameMessage.textContent = "Chưa có thông tin";
  EmailMessage.textContent = "Chưa có thông tin";
 }
}

async function Logout() {
 LogoutMessage.textContent ="";

 const { data } = await supabaseClient.auth.getSession();
 if (!data.session) {
  LogoutMessage.textContent = "Bạn hiện chưa đăng nhập";
  return;
 }
 
 const {error} = await supabaseClient.auth.signOut();
  if (error) {
   LogoutMessage.textContent="Đăng xuất thất bại: " + error.message;
   return;
  }
 LogoutMessage.textContent="Đăng xuất thành công";
}

supabaseClient.auth.onAuthStateChange((event, session) => {
 updateUI(session);
});

async function getSession() {
 const { data, error } = await supabaseClient.auth.getSession();
 if (error) {
  console.log(error.message);
  return;
 }
 updateUI(data.session);
}


