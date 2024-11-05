import { AppComponent } from "../app.component";
import { Language } from "./Language";
import { translate } from "./translate";

export class translates {
    static translates:translate[] = []

    static make() {
        translates.translates.push(new translate("addToCart","اضافة للسلة","add to cart"))
        translates.translates.push(new translate("cart","السلة","Cart"))
        translates.translates.push(new translate("cartItems","عناصر السلة","Cart Items"))
        translates.translates.push(new translate("home","العودة","Home"))
        translates.translates.push(new translate("continuePurchase","متابعة الشراء","Continue Purchase"))
        translates.translates.push(new translate("continue","متابعة","Continue"))
        translates.translates.push(new translate("quantity","الكمية","Quantity"))
        translates.translates.push(new translate("price","السعر","Price"))
        translates.translates.push(new translate("total","المجموع","Total"))
        translates.translates.push(new translate("order","الطلب","Order"))
        translates.translates.push(new translate("number","رقم","Number"))
        translates.translates.push(new translate("date","تاريخ","Date"))
        translates.translates.push(new translate("city","المدينة","City"))
        translates.translates.push(new translate("mobile","الجوال","Mobile"))
        translates.translates.push(new translate("street","الشارع","Street"))
        translates.translates.push(new translate("building","المبنى","Building"))
        translates.translates.push(new translate("fullAddress","العنوان بالكامل","Full Addess"))
        translates.translates.push(new translate("name","الاسم","Name"))
        translates.translates.push(new translate("search","بحث","Search"))
        translates.translates.push(new translate("finalTotal","المجموع الكلي","Final Total"))
        translates.translates.push(new translate("shippingFees","رسوم التوصيل","Shippng Fees"))
        translates.translates.push(new translate("deliveryTime","وقت التوصيل","Delivery Time"))
        translates.translates.push(new translate("paymentMethod","طريقة الدفع","Payment Method"))
        translates.translates.push(new translate("confirmOrder","تأكيد الطلب","Confirm Order"))
        translates.translates.push(new translate("selectPaymentMethod","اختر طريقة الدفع","Select Payment Method"))
        translates.translates.push(new translate("deliveryAddress","عنوان التوصيل","Delivery Address"))
        translates.translates.push(new translate("addNewAddress","اضافة عنوان جديد","Add New Address"))
        translates.translates.push(new translate("myOrders","طلباتي","My Orders"))
        translates.translates.push(new translate("myProfile","معلوماتي","My Profile"))
        translates.translates.push(new translate("cashOnDelivery","نقدا عند الاستلام","Cash On Delivery"))
        translates.translates.push(new translate("visaOrMastercard","بطاقة فيزا او ماستركارد","Visa Or Mastercard"))

        // error messages
        translates.translates.push(new translate("error","خطأ","Error"))
        translates.translates.push(new translate("errorGettingMyOrders","حدث خطأ أثناء جلب طلباتك ","error while getting your orders"))
        translates.translates.push(new translate("tryAgain","المحاولة مرة أخرى ؟","Try again ?"))
    }

    public static translate(id:string,language:Language) {
        for (let i=0;i<translates.translates.length;i++) {
            if (translates.translates[i].id == id) {
                if (language.code == "ar") {
                    return translates.translates[i].ar
                }
                else if (language.code == "en") {
                    return translates.translates[i].en
                }
                else {
                    return id
                }
            }
        }
        return id
    }

    public static translateText(id:string) {
        for (let i=0;i<translates.translates.length;i++) {
            if (translates.translates[i].id == id) {
                if (AppComponent.Store != null && AppComponent.Store.Language != null) {
                    if (AppComponent.Store.Language.code == "ar") {
                        return translates.translates[i].ar
                    }
                    else if (AppComponent.Store.Language.code == "en") {
                        return translates.translates[i].en
                    }
                    else {
                        return id
                    }
                }
                else {
                    return translates.translates[i].ar
                }
            }
        }
        return id
    }
}