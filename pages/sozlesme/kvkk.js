import React, { Component } from 'react';
import { Container, Header, Title,  Button, Left, Right, Body, Icon, Text } from 'native-base';
import {StatusBar,Dimensions,TouchableOpacity,Image,StyleSheet} from 'react-native';


import HTMLView from 'react-native-htmlview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { withNavigation } from 'react-navigation';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class Kvkk extends Component {
  render() {
const kvkk = `
<p class="bold">KİŞİSEL VERİLERE İLİŞKİN AYDINLATMA METNİ</p>
<p class="bold">Veri Sorumlusu:</p>
<p>ARCON Bilişim Teknolojileri Ticaret Anonim Şirketi</p>

<p>
  Biz, ARCON Bilişim Teknolojileri Ticaret Anonim Şirketi olarak; üyelerimiz
  ve çalışanlarımız dahil Şirketimiz ile ilişkili şahısların kişisel
  verilerinin Türkiye Cumhuriyeti Anayasası, insan haklarına ilişkin
  ülkemizin tarafı olduğu uluslararası sözleşmeler ile 6698 sayılı Kişisel
  Verilerin Korunması Kanunu (“KVKK”) başta olmak üzere, 6361 sayılı
  Finansal Kiralama, Faktoring ve Finansman Şirketleri Kanunu, BDDK Destek
  Hizmetleri Yönetmeliği, 5411 sayılı Bankacılık Kanunu ve ilgili diğer
  mevzuatlar çerçevesinde; güvence altına alınması ve işlenmesi konusuna
  hassasiyetle yaklaşmaktayız. Bu çerçevede, KVKK kapsamında Veri Sorumlusu
  sıfatıyla sizleri aydınlatmak istiyoruz. Şirketimiz ile paylaştığınız
  kişisel verileriniz KVKK’ ya uygun şekilde, faaliyet ve hizmet amaçlarımız
  ile bağlantılı ve ölçülü olarak işlenebilecek, yurtiçi ve yurtdışındaki
  üçüncü kişilere aktarılabilecek, saklanacak, profilleme için
  kullanılabilecek ve sınıflandırılabilecektir. Kişisel Verilerinizin
  İşlenme Amacı Kişisel verileriniz;
</p>
<p>i) Hukuka ve dürüstlük kuralının öngördüğü biçimde,</p>
<p>ii) İşlenme amaçları ile bağlantılı, sınırlı ve ölçülü olarak,</p>
<p>iii) Doğru ve güncel olarak,</p>
<p>iv) Belirli açık ve meşru amaçlar ile işlenecektir.</p>
<p>
  Veri sorumlusu olarak Şirketimiz tarafından kişisel verileriniz, uzun
  süreli çalışmalarımızdan ödün vermeden, sizleri daha iyi tanıyarak
  ihtiyaçlarınızı anlamak, isteklerinize daha hızlı cevap verebilmek ve
  sizlerle olan iletişimimizi geliştirerek sizlere daha iyi hizmet vermek ve
  daha kişisel ürün, hizmet ve teklif sunabilmek, bunları yapabilmek için
  analiz yapmak, sizleri ürün ve hizmetlerimiz hakkında bilgilendirebilmek,
  ürün ve hizmetlerimiz hakkında memnuniyetinizi ölçmek, istekleriniz ve
  ihtiyaçlarınız doğrultusunda ürün ve hizmetlerimizi geliştirmek ve
  çeşitlendirmek için bunlarla birlikte gerekli kalite ve standart
  denetimlerimizi ilgili kanun mevzuatların öngördüğü şekilde yapabilmek ya
  da bizim tabi olduğumuz kanun ve mevzuatlar tarafından öngörülen raporlama
  ve sair yükümlülüklerimizin yerine getirilmesi gibi amaçlar için kişisel
  verileriniz işlenebilecektir. Çalışanlarımızın verileri, İş Kanunu,
  çalışma ve sosyal güvenlik mevzuatı ile yürürlükte olan diğer mevzuatın
  öngördüğü zorunlulukların yanı sıra insan kaynakları politikamız dahilinde
  veya performans düzeyini ve çalışan memnuniyetini arttırmak ve iş
  güvenliği ve iş barışının KVKK ve yürürlükte bulunan diğer mevzuat
  çerçevesinde kalmak kaydıyla,
</p>
<p>i) Kişisel verilerinizin işlenip işlenmediğini öğrenme,</p>
<p>ii) Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</p>
<p>
  iii) Kişisel verilerin işlenme amacını ve bunların amacına uygun
  kullanılıp kullanılmadığını öğrenme,
</p>
<p>
  iv) Yurtiçinde veya yurtdışında kişisel verilerinizin aktarıldığı üçüncü
  kişileri bilme,
</p>
<p>
  v) Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde
  bunların düzeltilmesini isteme,
</p>
<p>
  vi) KVKK mevzuatında öngörülen şartlar çerçevesinde kişisel verilerinizin
  silinmesini veya yok edilmesini isteme,
</p>
<p>
  vii) Eksik veya yanlış verilerin düzeltilmesi ile kişisel verilerinizin
  silinmesi veya yok edilmesini talep ettiğinizde, bu durumun kişisel
  verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme,
</p>
<p>
  viii) İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz
  edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,
</p>
<p>
  ix) Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara
  uğramanız halinde bu zararın giderilmesini talep etme haklarına
  sahipsiniz.
</p>
<p>
  Bu haklarınızı kullanmak ile ilgili talebinizi yazılı olarak veya Kişisel
  Verileri Koruma Kurulu tarafından ayrı bir yöntem belirlenmesi halinde bu
  yönteme uygun olarak bize iletebilirsiniz. Yazılı talebinizi,
  <span class="bold">
    Meşrutiyet Mah. Şair Nigar Sok. No: 81/4 Nişantaşı, Şişli / İstanbul
  </span>
  adresine ıslak imzalı olarak veya info@faktodeks.com kayıtlı elektronik
  posta adresimize güvenli elektronik imza ile imzalanmış olarak
  gönderebilirsiniz.
</p>

<p>
  Kişisel Verilerin Korunması Kanunu ile İlgili Açık Rıza Beyanı 6698 sayılı
  Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, ARCON Bilişim
  Teknolojileri Ticaret Anonim Şirketi'nce Faktodeks üzerinden mali, ticari,
  finansal ve kişisel bilgi ve verilerimin depolamasına, arşivlenmesine,
  analiz etmesine, mevcut bilgi ve/veya verilerim üzerinden kurum ve/ veya
  şahsımın finansal geçerliliğinnin rakamsal, sayısal, yazı ve grafiksel
  olarak analiz edilip yorumlamasına, bu bilgi ve detayların kaydedilmesine,
  loglanmasına, saklanmasına, güncellenmesine, işlenmesine, 3. kişilerle
  paylaşılmasına, 3. kişilere açıklanabilmesine, devredilebilmesine,
  sınıflandırılabilmesine ve Kişisel Verilerin Korunması Kanunu (KVKK)'nda
  sayılan şekillerde izlenebilmesine açık rıza verdiğimi beyan ederim.
</p>
`

    return (
        <HTMLView
        value={kvkk}
    />
    );
  }
}


export default withNavigation(Kvkk);
const styles = StyleSheet.create({
});