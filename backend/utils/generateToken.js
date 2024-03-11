import jwt  from "jsonwebtoken";

//Bir kullanıcı için JWT oluşturan ve bunu cookie olarak ayarlayan fonksiyon
const  generateTokeAndSetCookie = (userId, res) => {
    //Yeni bir token oluşturuyoruz. Token içerisinde kullanıcı ID'sini saklıyoruz ve 15 gün boyunca duruyor
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });

    //Oluşturlan tokeni cookie olarak aktarıyoruz.
    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000, //Tokenın yaşını milisaniye cinsinden ayarla
        httpOnly: true, //Çerezi, javascript tarafından erişilemez yapıyoruz bu sayede XSS saldırılanından koruyoruz.
        sameSite: "strict", //Çerezi CSRF saldırılarına karşı koruyoruz.
        //secure: process.env.NODE_ENV !== "devolopment", //Uygulama geliştirme ortamında değilse yalnızca güvenli bağlantılar üzerinden gönderilir
    })
}

export default generateTokeAndSetCookie;