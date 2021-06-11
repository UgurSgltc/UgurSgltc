import { toJS, observable, action, computed } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class appStore {
    @observable malzeme = [];
    @observable extra = [];
    @observable sepetCount = 0;
    @observable scrollHeight = '';
    @observable malzemeFiyat=[]; //değiştirildi
    @observable extraFiyat=[]; //değiştirildi

    @action
    setScrollHeight(gelen) {
        this.scrollHeight = gelen;
    }
    @action
    async sepetSifirla() {
        this.sepetCount = 0;
        await AsyncStorage.removeItem('mySepet');

    }
    @action
    async sepetNo() {
        let sepet = await AsyncStorage.getItem('mySepet');
        if (sepet) {
            let sepetJson = await JSON.parse(sepet);
            if (sepetJson) {
                this.sepetCount = sepetJson.length;
            }

        }

    }
    @action 
    malzemeSifirla(){ //değiştirildi
        this.malzeme=[];
        this.malzemeFiyat=[];
    }
    @action 
    extraSifirla(){ //değiştirildi
        this.extra=[];
        this.extraFiyat=[];
    }
    @action
    async setMalzeme(gelen, fiyat) { //değiştirildi
        //this.malzeme.push(gelen);

        if (this.malzeme.length == 0) {
            this.malzeme.push(gelen);
            this.malzemeFiyat.push(fiyat);
        } else {
            var b = this.malzeme.find(function (a) {
                return a == gelen;
            });
            if (b) {
                this.malzeme.map((val, key) => {
                    if (val == b) {
                        this.malzeme.splice(key, 1)
                        this.malzemeFiyat.splice(key, 1)
                    }
                })
            } else {
                this.malzeme.push(gelen);
                this.malzemeFiyat.push(fiyat);
            }
            // b ? '' :this.malzeme.push(gelen) ;
        }
        console.log(toJS(this.malzeme))
        console.log('malzeme fiyat: ',toJS(this.malzemeFiyat))
    }
    async setExtra(gelen, fiyat) { //değiştirildi
        //this.malzeme.push(gelen);

        if (this.extra.length == 0) {
            this.extra.push(gelen);
            this.extraFiyat.push(fiyat);
        } else {
            var b = this.extra.find(function (a) {
                return a == gelen;
            });
            if (b) {
                this.extra.map((val, key) => {
                    if (val == b) {
                        this.extra.splice(key, 1)
                        this.extraFiyat.splice(key, 1)
                    }
                })
            } else {
                this.extra.push(gelen);
                this.extraFiyat.push(fiyat);
            }
            // b ? '' :this.malzeme.push(gelen) ;
        }
        console.log(toJS(this.extra))
        console.log('extra fiyat: ',toJS(this.extraFiyat))
    }
  
}
export default new appStore();