import User from '../models/user.model.js';

//
export const getUsersForSidebar = async (req,res) => {
    try{
      //Giriş yapan kullanıcının ID'sini alır
      const loggedInUserId = req.user._id;

      // Giriş yapmış kullanıcı hariç tüm kullanıcıları bulur. 
      //Bu sorgu, parola alanını dışarıda bırakacak şekilde yapılandırılmıştır.
      // "$ne" operatörü, "not equal" anlamına gelir ve burada giriş yapmış 
      //olan kullanıcının ID'si dışındaki tüm kullanıcıları getirir.
      const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select('-password');

      res.status(200).json(filteredUsers)
    }catch(error){
      // Herhangi bir hata oluştuğunda, hata mesajını konsola loglar ve istemciye 500 Internal server error hatası döndürür.
      console.error("Error in getUsersForSidebar: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
}