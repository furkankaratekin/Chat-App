// Mongoose kütüphanesini içe aktar.
import mongoose from "mongoose";

// Yeni bir Mongoose şeması oluştur. Bu şema, konuşmalar koleksiyonu için veri yapısını tanımlar.
const conversationSchema = new mongoose.Schema(
  {
    // Konuşmanın katılımcılarının listesi. Her katılımcı bir ObjectId tipinde ve "User" modeline referans verir.
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Konuşmanın mesajlarının listesi. Her mesaj bir ObjectId tipinde ve "Message" modeline referans verir.
    // Varsayılan olarak, bu liste boş bir dizi olarak başlar.
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
    // createdAt ve updatedAt alanları otomatik olarak yönetilir.
    // Bu, şemanın zaman damgaları ile birlikte oluşturulmasını ve güncellenmesini sağlar.
  },
  { timestamps: true }
);

// "Conversation" adında bir model oluştur. Bu model, tanımlanan şemayı kullanarak MongoDB'de "conversations" koleksiyonu ile iletişim kurar.
const Conversation = mongoose.model("Conversation", conversationSchema);

// Oluşturulan Conversation modelini dışa aktar.
export default Conversation;
