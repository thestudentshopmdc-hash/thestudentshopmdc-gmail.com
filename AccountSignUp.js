
console.log("here")
const supabaseUrl = "https://xsgtgcajktmyhnqdvmwx.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzZ3RnY2Fqa3RteWhucWR2bXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ0MTQ4NjIsImV4cCI6MjEwOTk5MDg2Mn0.DtIVL6cpck1iC94PcvNzfspEIjWUIGQEr1QcIbmhxbw"
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
        window.location.href="index.html"
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
