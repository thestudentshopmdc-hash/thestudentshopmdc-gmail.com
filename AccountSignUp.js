
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
    const Subname = document.getElementById("username").value
    const Subemail = document.getElementById("email").value
    const Subpassword = document.getElementById("password").value
    const Subrepassword = document.getElementById("re-password").value
        console.log(Subname)
        console.log(Subemail)
        console.log(Subpassword)
        console.log(Subrepassword)
    const {data, error}= await supabaseClient.auth.signUp({
        email: Subemail, 
        password: Subpassword,
        options: {
            data: {
                name: Subname
            }
        }
    })

 if (error) {
        alert("Đăng ký không thành công do "+ error.message )
    }
 else{
        alert("Đăng ký thành công, kiểm tra và xác nhận email của bạn nhé!")
        window.location.href="UserPage.html"
    } 
 if (Subrepassword !== Subpassword) {
  alert("Mật khẩu nhập lại không đúng!");
  return;
 }
 if (Subname ==="" || Subemail ==="" || Subpassword ==="" || Subrepassword ==="") {
  alert("Vui lòng nhập đầy đủ thông tin");
  return;
 }
}); 

async function Login() {
 const LoginEmail = document.getElementById("LoginEmail").value
 const LoginPassword = document.getElementById("LoginPassword").value

 const { data, error } = await supabase.auth.signInWithPassword ({
  email : LoginEmail,
  password : LoginPassword
 });
 if (error) {
  alert("Đăng nhập thất bại");
  return;
 }
 alert("Đăng nhập thành công");
 
}
