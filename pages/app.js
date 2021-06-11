import {enableScreens} from 'react-native-screens';

enableScreens();

import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  Image,
} from 'react-navigation';

import register from './register';
import splash from './splash';
import barcode from './taleplerim/barcode';
import smsOnay from './sifre/smsOnay';
import tcSifre from './sifre/tcSifre';
import mailOnay from './sifre/mailOnay';
import karekod from './taleplerim/karekod';
import cekInfo from './taleplerim/cekInfo';
import cekOn from './taleplerim/cekOn';
import cekArka from './taleplerim/cekArka';
import cekFirma from './taleplerim/cekFirma';
import cekFatura from './taleplerim/cekFatura';
import cekFaturaInput from './taleplerim/cekFaturaInput';
import profilim from './ayarlar/profilim';
import yeniSifre from './ayarlar/yeniSifre';
import bildirimler from './ayarlar/bildirimler';
import bizeYazin from './ayarlar/bizeYazin';
import cekFaturaYeni from './taleplerim/cekFaturaYeni';
import teklifler from './taleplerim/teklifler';
import cekDetay from './taleplerim/cekDetay';
import talepOnayla from './taleplerim/talepOnayla';
import smsOnayYeniSifre from './sifre/smsOnayYeniSifre';
import sifreDegistir from './sifre/sifreDegistir';
import islemDetay from './taleplerim/islemDetay';
import editInfo from './ayarlar/editInfo';
import addFirma from './sifre/addFirma';
import anasayfa from './taleplerim/anasayfa';
import resimler from './taleplerim/resimler';
import talepler from './taleplerim/talepler';
import faturalar from './taleplerim/faturalar';
import cekInfoDetay from './taleplerim/cekInfoDetay';
import customDraw from './ayarlar/customDraw';
import temlik from './taleplerim/temlik';
import islemGecmis from './taleplerim/islemGecmis';
import firmaDetay from './taleplerim/firmaDetay';
import proforma from './ihracaat/proforma';
import choose from './taleplerim/choose';
import input from './deks/input';
import lehtar from './deks/lehtar';
import kesideci from './deks/kesideci';

const MainNavigator = createStackNavigator({
  Anasayfa: {
    screen: anasayfa,
    navigationOptions: {
      header: null,
    },
  },
  Talepler: {
    screen: talepler,
    navigationOptions: {
      header: null,
    },
  },
  Resimler: {
    screen: resimler,
    navigationOptions: {
      header: null,
    },
  },
  CekInfoDetay: {
    screen: cekInfoDetay,
    navigationOptions: {
      header: null,
    },
  },
  Input: {
    screen: input,
    navigationOptions: {
      header: null,
    },
  },
  Lehtar: {
    screen: lehtar,
    navigationOptions: {
      header: null,
    },
  },
  Kesideci: {
    screen: kesideci,
    navigationOptions: {
      header: null,
    },
  },
  Faturalar: {
    screen: faturalar,
    navigationOptions: {
      header: null,
    },
  },

  FirmaDetay: {
    screen: firmaDetay,
    navigationOptions: {
      header: null,
    },
  },
  Profilim: {
    screen: profilim,
    navigationOptions: {
      header: null,
    },
  },

  BizeYazin: {
    screen: bizeYazin,
    navigationOptions: {
      header: null,
    },
  },
  Teklifler: {
    screen: teklifler,
    navigationOptions: {
      header: null,
    },
  },
  CekDetay: {
    screen: cekDetay,
    navigationOptions: {
      header: null,
    },
  },
  IslemDetay: {
    screen: islemDetay,
    navigationOptions: {
      header: null,
    },
  },
  Bildirimler: {
    screen: bildirimler,
    navigationOptions: {
      header: null,
    },
  },
  TalepOnayla: {
    screen: talepOnayla,
    navigationOptions: {
      header: null,
    },
  },

  EditInfo: {
    screen: editInfo,
    navigationOptions: {
      header: null,
    },
  },
  Barcode: {
    screen: barcode,
    navigationOptions: {
      header: null,
    },
  },
  CekFirma: {
    screen: cekFirma,
    navigationOptions: {
      header: null,
    },
  },
  CekFatura: {
    screen: cekFatura,
    navigationOptions: {
      header: null,
    },
  },
  CekFaturaYeni: {
    screen: cekFaturaYeni,
    navigationOptions: {
      header: null,
    },
  },
  CekFaturaInput: {
    screen: cekFaturaInput,
    navigationOptions: {
      header: null,
    },
  },

  CekInfo: {
    screen: cekInfo,
    navigationOptions: {
      header: null,
    },
  },
  CekOn: {
    screen: cekOn,
    navigationOptions: {
      header: null,
    },
  },
  CekArka: {
    screen: cekArka,
    navigationOptions: {
      header: null,
    },
  },
  MailOnay: {
    screen: mailOnay,
    navigationOptions: {
      header: null,
    },
  },
  Karekod: {
    screen: karekod,
    navigationOptions: {
      header: null,
    },
  },
  AddFirma: {
    screen: addFirma,
    navigationOptions: {
      header: null,
    },
  },

  YeniSifre: {
    screen: yeniSifre,
    navigationOptions: {
      header: null,
    },
  },

  IslemGecmis: {
    screen: islemGecmis,
    navigationOptions: {
      header: null,
    },
  },
  Temlik: {
    screen: temlik,
    navigationOptions: {
      header: null,
    },
  },
  Proforma: {
    screen: proforma,
    navigationOptions: {
      header: null,
    },
  },
  Choose: {
    screen: choose,
    navigationOptions: {
      header: null,
    },
  },
});

const LoginNavigator = createStackNavigator({
  Splash: {
    screen: splash,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Register: {
    screen: register,
    navigationOptions: {
      header: null,
    },
  },
  SmsOnayYeniSifre: {
    screen: smsOnayYeniSifre,
    navigationOptions: {
      header: null,
    },
  },

  TcSifre: {
    screen: tcSifre,
    navigationOptions: {
      header: null,
    },
  },
  SmsOnay: {
    screen: smsOnay,
    navigationOptions: {
      header: null,
    },
  },

  SifreDegistir: {
    screen: sifreDegistir,
    navigationOptions: {
      header: null,
    },
  },
});

const MyDrawerNavigator = createDrawerNavigator(
  {
    MainNavigator: {
      screen: MainNavigator,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    contentComponent: customDraw,
    drawerType: 'front',
  },
);
export default createAppContainer(
  createSwitchNavigator({
    LoginNavigator: LoginNavigator,
    MyDrawerNavigator: MyDrawerNavigator,
  }),
);
