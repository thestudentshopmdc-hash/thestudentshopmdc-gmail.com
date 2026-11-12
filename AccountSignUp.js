
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
    const Subname = document.getElementById("username").value.trim();
    const Subemail = document.getElementById("email").value.trim();
    const Subpassword = document.getElementById("password").value;
    const Subrepassword = document.getElementById("re-password").value;
 
 if (Subrepassword !== Subpassword) {
  alert("Mật khẩu nhập lại không đúng!");
  return;
 }
 if (Subname ==="" || Subemail ==="" || Subpassword ==="" || Subrepassword ==="") {
  alert("Vui lòng nhập đầy đủ thông tin");
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
 else{
        alert("Đăng ký thành công, kiểm tra và xác nhận email của bạn nhé!")
        window.location.href="UserPage.html"
    } 
}); 

async function Login() {
 const LoginEmail = document.getElementById("LoginEmail").value.trim();
 const LoginPassword = document.getElementById("LoginPassword").value;

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

async function Logout() {
 const {error} = await supabaseClient.auth.signOut({
  if (error) {
   return;
  }
  alert("Đăng xuất thành công");
 });
}
