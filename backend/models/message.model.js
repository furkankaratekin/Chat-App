// Mongoose kütüphanesini içe aktar.
import mongoose from "mongoose";

// Yeni bir Mongoose şeması oluştur. Bu şema, mesajlar koleksiyonu için veri yapısını tanımlar.
const messageSchema = new mongoose.Schema(
  {
    // Mesajın göndericisinin kimlik bilgisi. Bu bir ObjectId tipinde ve "User" modeline referans verir.
    // Gönderici ID'si zorunlu bir alandır.
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Mesajın alıcısının kimlik bilgisi. Bu da bir ObjectId tipinde ve "User" modeline referans verir.
    // Alıcı ID'si zorunlu bir alandır.
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Gönderilen mesajın içeriği. Bu bir String tipinde ve zorunlu bir alandır.
    message: {
      type: String,
      required: true,
    },
    // createdAt ve updatedAt alanları otomatik olarak yönetilir.
    // Bu, şemanın zaman damgaları ile birlikte oluşturulmasını ve güncellenmesini sağlar.
  },
  { timestamps: true }
);

// "Message" adında bir model oluştur. Bu model, tanımlanan şemayı kullanarak MongoDB'de "messages" koleksiyonu ile iletişim kurar.
const Message = mongoose.model("Message", messageSchema);

export default Message;
// Oluşt
