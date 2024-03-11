import jwt  from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req,res,next) => {
    try{
        const token = req.cookies.jwt;

        //Tokenın varlığı kontrol ediliyor eğer yok ise yetkisiz giriş hatası veriyoruz.
        if(!token) {
            return res.status(401).json({error: "Yetkisiz - Token sağlanamadı"})
        }

        //Tokenı .env dosyasından çekmek için
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Tokenın geçerli olup olmadığını kontrol ediyoruz.Geçersiz ise hata döndür
        if(!decoded) {
            return res.status(401).json({error: "Yetkisiz - Geçersiz Token"})
        }

        //Tokenın çözülmüş halini kullanarak (userId ile ) veritabanında kullanıcıyı arıyoruz
        //Güvenlik için sorgu sonuçlarından çıkartıyoruz (tokenı ayıkladık gibi düşün)
        const user = await User.findById(decoded.userId).select("-password");

        //Eğer kullanıcı mevcut değil ise kullanıcı bulunanmadı hatası döndürüyoruz.
        if(!user) {
            return res.status(404).json({error: "Kullanıcı bulunamadı"});
        }

        //Kullanıcı objesini istek objesine ekliyoruz böylece sonraki  middleware ve controller'da erişebilecektir.
        req.user = user;

        //Yığın içindeki sonraki middleware'e geçiş yapıyoruz.
        next();
    }catch(error){
      // Middleware'in yürütülmesi sırasında oluşan hataları logluyoruz
      console.log("protectRoute middleware'inde hata: ", error.message);
      // Bir istisna yakalanırsa iç sunucu hatası yanıtı dönüyoruz
      res.status(500).json({ error: "İç sunucu hatası" });
    }
}

export default protectRoute;

//Bu middleware genellikle kullanıcı kimlik doğrulaması gerektiren rotalarda kullanılır.
//Tokenı doğrulayarak ve kullancının varlığını kontrol ederek,yalnızca kimlik doğrulaması
//yapılmış ve yetkilendirilmiş kullanıcıların belirli endpointlere erişmesini sağlar.
//Herhangi bir kontrol başarısız olursa, isteği işleme sürecinde daha ileri
//gitmesini önleyen uygun bir hata yanıtı döner
