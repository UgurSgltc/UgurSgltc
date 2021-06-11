import React, { Component } from 'react';
import { Container, Header, Title,  Button, Left, Right, Body, Icon, Text } from 'native-base';
import {StatusBar,Dimensions,TouchableOpacity,Image,StyleSheet} from 'react-native';


import HTMLView from 'react-native-htmlview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { withNavigation } from 'react-navigation';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class Faktodeks extends Component {
  render() {
    const fakto = `
    <p class="bold">FAKTODEKS KULLANICI SÖZLEŞMESİ</p>
    <p>
      İşbu Üyelik Sözleşmesi; bir tarafta ARCON Bilişim Teknolojileri Ticaret
      Anonim Şirketi (ARCON) ile diğer tarafta KULLANICI KOBİ ve TİCARİ
      İŞLETMELER arasında aşağıda yazılı şartlar dâhilinde akdedilmiştir
    </p>
    <p class="bold">1. TARAF BİLGİLERİ</p>
    <table>
      <tr>
        <td>Unvan</td>
        <td>ARCON Bilişim Teknolojileri Ticaret Anonim Şirketi</td>
      </tr>
      <tr>
        <td>Adres</td>
        <td>
          Meşrutiyet Mah. Şair Nigar Sok. No: 81/4 Nişantaşı, Şişli / İstanbul
        </td>
      </tr>
      <tr>
        <td>Telefon</td>
        <td>0212 275 75 13</td>
      </tr>
      <tr>
        <td>Vergi NO</td>
        <td>0730436460</td>
      </tr>
      <tr>
        <td>E-posta</td>
        <td>info@faktodeks.com</td>
      </tr>
      <tr>
        <td>İnternet Adresi</td>
        <td>www.faktodeks.com</td>
      </tr>

      <tr>
        <td>MERSİS NO</td>
        <td>0073043646000001</td>
      </tr>

      <tr>
        <td>Ticaret Sicil NO</td>
        <td>87574-5</td>
      </tr>
    </table>

    <p class="bold">KULLANICI TİCARİ İŞLETME</p>
    <table>
      <tr>
        <td>Ad Soyad / Unvan</td>
        <td>${this.props.name}</td>
      </tr>
      <tr>
        <td>TCKN/VKN</td>
        <td>${this.props.tckn}</td>
      </tr>
      <tr>
        <td>Telefon</td>
        <td>${this.props.tel}</td>
      </tr>
      <tr>
        <td>E-posta</td>
        <td>${this.props.email}</td>
      </tr>
    </table>

    <p class="bold">2. SÖZLEŞMENİN KONUSU</p>

    <p>
      İşbu kullanıcı sözleşmesi, her türlü fikri mülkiyet hakları ARCON’a ait
      bulunan FAKTODEKS platformunun (FAKTODEKS) kullanım şartlarını
      düzenlemektedir.
    </p>

    <p class="bold">3. SÖZLEŞMENİN HÜKÜMLERİ </p>

    <p>
      <span class="bold">3.1.</span> Faktodeks, kullanıcı Kobi ve Ticari
      İşletmelerin faturalı alacaklarına ve bu alacağa konu olan fatura/lar ve
      vadeli çek/ lerini finansman sağlamak amacıyla Faktodeks’e yüklemelerine,
      Üye Finans Kurumlarının da söz konusu evrakları Faktodeks’ten belirleyerek
      temlik karşılığı finanse etme iradelerini, teklif vermek suretiyle ortaya
      koymalarına imkan tanımaktadır.
    </p>

    <p>
      <span class="bold">3.2.</span> Kullanıcı Kobi ve Ticari İşletmeler,
      FAKTODEKS’i, kendilerine ait oluşturulacak hesaba
      <span class="bold"> (“Kullanıcı Hesabı”) </span>giriş yaparak kullanacaklardır.
      Kullanıcı Hesabı, Kullanıcı Kobi ve Ticari İşletmelere, FAKTODEKS’i
      kullanma ve tekliflerini kabul ettikleri Kullanıcı Üye Finans Kurumları
      ile FAKTODEKS muhtelif sözleşmeler, mobil uygulamalar, sms bildirimleri,
      elektronik posta, başvuru formları ve benzeri araçlar üzerinden sözlü,
      yazılı veya elektronik ortamda bildirilmesine, toplanmasına açık rıza
      verdiğini kabul ve beyan eder.
    </p>

    <p>
      <span class="bold">3.15.</span> ARCON, FAKTODEKS üzerinden sağlanan DEKS
      uygulamasıyla kullanıcının faktodeks içinde yaptığı tüm işlemlerde ve
      oluşturduğu talepler de toplam yaptığı işlem sayısı , işlem tutarı ,
      ortalamaları finansal geçerliliğini sayısal değerlerle ölçümlenmesine bu
      değerleri grafiksel olarak göstermesine Deks alanının çalışma prensipleri
      dahilinde bu koşullar altında vergi kimlik numarasının sorgulanmasına
      yukarıda yazılsın yazılmasın bu bilgileri finansal geçerlilik ve güven
      koşullarının ölçümlenmesi için sorgulayan üyeleriyle paylaşmasına izin ve
      onay verip kabul etmiş olup beyan eder.
    </p>

    <p class="bold">4. SÖZLEŞMENİN SÜRESİ </p>

    <p>
      İşbu Sözleşme kabul tarihinde yürürlüğe girecek olup taraflarca
      feshedilmedikçe yürürlükte kalacaktır. Ancak gizlilik ve güvenlik
      hükümleri süresiz olarak yürürlükte kalacaktır. Taraflar işbu Kullanıcı
      Sözleşmesini, herhangi bir sebep bildirmeksizin, her zaman uygun bir
      şekilde bildirmek kaydıyla feshedebilecektir.
    </p>

    <p class="bold">5. SON HÜKÜMLER </p>

    <p>
      <span class="bold">5.1.</span> İşbu Kullanıcı Sözleşmesi, Türkiye
      Cumhuriyeti Devleti kanunlarına tabi olup, Sözleşme'nin ifasından doğan
      uyuşmazlıkların çözümünde, İstanbul Merkez Mahkemeleri ve İcra Daireleri
      yetkilidir.
    </p>
    <p>
      <span class="bold">5.2.</span> İşbu Kullanıcı Sözleşmesi'nin herhangi bir
      maddesinin geçersiz sayılması veya uygulanmasının imkânsız hale gelmesi,
      diğer maddelerinin geçerliliğini ve ifasını etkilemeyecektir.
    </p>
    <p>
      <span class="bold">5.3.</span> Taraflar, işbu Sözleşmede belirtilen
      adreslerinde meydana gelen değişiklikleri karşı tarafa yazılı olarak
      bildirmedikleri takdirde, işbu sözleşmede belirtilen adreslere yapılacak
      tebligat ve bildirimler geçerli tebliğ hükmünde olacaktır.
    </p>
    <p>
      <span class="bold">5.4.</span> İşbu Sözleşme, tarafların karşılıklı
      anlaşması ile yürürlüğe girmiş olup KULLANICI KOBİ ve TİCARİ İŞLETMELER
      okuduğunu, anladığını, dijital olarak onayladığını kabul ederler.
    </p>
    <p class="bold">
      Arcon Bilişim Teknolojileri Ticaret Anonim Şirketi Kullanıcı Kobi ve
      Ticari İşletme
    </p>
    `
    return (
        <HTMLView
        value={fakto}
    />
    );
  }
}


export default withNavigation(Faktodeks);
const styles = StyleSheet.create({
});