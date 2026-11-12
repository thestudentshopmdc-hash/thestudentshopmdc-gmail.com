const message = document.getElementById("message")
const SignupMessage = document.getElementById("SignupMessage")
const LoginMessage = document.getElementById("LoginMessage")
const NameMessage = document.getElementById("NameMessage")
const EmailMessage = document.getElementById("EmailMessage")

console.log("here")
const supabaseUrl = "https://rsndakviombsnwebuegy.supabase.co"
const supabaseAnonKey = "sb_publishable_jLDAR7Kpb6W65lgmvpVSMA_9shoqFxk"
// Truy cập trực tiếp qua hàm global do CDN cung cấp
 const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseAnonKey); 
// Đăng ký tài khoản cho người dùng

const submitbutton = document.getElementById("submitIn4")
// Chuyen du lieu len database (auth)
submitbutton.addEventListener("click", async (e)=>{
    e.preventDefault(); 
    const Subname = document.getElementById("username").value.trim()
    const Subemail = document.getElementById("email").value.trim()
    const Subpassword = document.getElementById("password").value
    const Subrepassword = document.getElementById("re-password").value
 
 if (Subname ==="" || Subemail ==="" || Subpassword ==="" || Subrepassword ==="") {
  alert("bruh");
  SignupMessage.textContent="Vui lòng nhập đầy đủ thông tin";
  return;
 }
 if (Subrepassword !== Subpassword) {
  message.textContent="Mật khẩu nhập lại không khớp!";
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
        alert("Đăng ký không thành công do "+ error.message )
    }
 if (data) {
        alert("Đăng ký thành công, kiểm tra và xác nhận email của bạn nhé!");
        window.location.href="UserPage.html";
    } 

async function Login() {
 const LoginEmail = document.getElementById("LoginEmail").value.trim()
 const LoginPassword = document.getElementById("LoginPassword").value

 if (LoginEmail === "" || LoginPassword === "") {
  alert("Vui lòng nhập đầy đủ thông tin");
  return;
 }
 
 const { data, error } = await supabaseClient.auth.signInWithPassword ({
  email : LoginEmail,
  password : LoginPassword
 });
 if (error) {
  alert("Đăng nhập thất bại");
  return;
 }
 alert("Đăng nhập thành công");
 
}

async function getUser() {
 const { data, error } = await supabaseClient.auth.getUser();
 if (error) {
  return null;
  }
 return data.user;
}

function updateUI(session) {
 if (session) {
  console.log("Đã đăng nhập");
 }
 else {
 console.log("Chưa đăng nhập");
 }
}

async function getSession() {
 const { data, error } = await supabaseClient.auth.getSession();
 if (error) {
  alert("Không thể kiểm tra phiên đăng nhập");
  return;
 }
 updateUI(data.session);
}


async function Logout() {
 const {error} = await supabaseClient.auth.signOut();
  if (error) {
   alert("Đăng xuất thất bại");
   return;
  }
  alert("Đăng xuất thành công");
}

supabaseClient.auth.onAuthStateChange((event, session) => {
 updateUI(session);
});

getSession();
