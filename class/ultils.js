class Ultils {

     static dateFormat(date){
//static=sem criar instancia da class.
        return (date.getDate())+'/'+(date.getMonth()+1)+'/'+date.getFullYear() + ' '+date.getHours()+':'+date.getMinutes();
    }
}