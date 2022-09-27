

export const onResizePageDisplay  = (otherCont) => {
	let height = 0;
    let headfoot = 0;

    let divAppHeader = document.getElementById("divAppHeader")
    if(!isObjectEmpty(divAppHeader) )
        headfoot += divAppHeader.offsetHeight;

    let divAppFooter = document.getElementById("divAppFooter")
    if(!isObjectEmpty(divAppFooter))
         headfoot += divAppFooter.offsetHeight;

  
    if(!isObjectEmpty(otherCont)){
        for (var i = 0; i < otherCont.length; i++) {
            let div = document.getElementById(otherCont[i]);
            if(!isObjectEmpty(div)){
                headfoot += div.offsetHeight;
            }
        }
    }

    if(getOrientation()==="P"){
        height = (window.innerHeight - headfoot );
    }else{
        height = (window.innerHeight - headfoot - 5);
    }
    // console.log('window.innerHeight  :' + window.innerHeight );
    // console.log('headfoot  :' + headfoot );
    // console.log('height  :' + height );
    return height;
}




export const  setHoverByClass = (classname, colorover = "yellow", colorout='transparent')=> {
    let elms = document.getElementsByClassName(classname);
    for (let i = 0;i < elms.length;i++) {
        elms[i].onmouseover = function(){
            for (let k = 0; k < elms.length; k++) {
                elms[k].style.backgroundColor = colorover;
            }
        }

        elms[i].onmouseout = function(){
            for (let k = 0; k < elms.length; k++) {
                elms[k].style.backgroundColor = colorout;
            }
        }



        elms[i].ontouchstart = function(){
            for (let k = 0; k < elms.length; k++) {
                elms[k].style.backgroundColor = colorover;
            }
        }
      

        elms[i].ontouchmove = function(){
            for (let k = 0; k < elms.length; k++) {
                elms[k].style.backgroundColor = colorout;
            }
        }

        elms[i].ontouchcancel = function(){
            for (let k = 0; k < elms.length; k++) {
                elms[k].style.backgroundColor = colorout;
            }
        }
        elms[i].ontouchend = function(){
            setTimeout(()=>{
                for (let k = 0; k < elms.length; k++) {
                     elms[k].style.backgroundColor = colorout;
                 }
                },750
            )
        }
    }

}


export const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    Blackberry: function () {
        return navigator.userAgent.match(/Blackberry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        let mobile = ['iphone', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
        for (let i in mobile) {
            if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) >= 0) return true;
        }
        return false;
    }
};

export const onGetTagName= (tag)=> {
    var objStyle = {};

    if (this.is_highlight && !this.list_tag_exception.includes(tag))
      return objStyle;

    switch (tag) {
      case "para":
        objStyle.key = "para";
        if (this.onlyverse) objStyle.classname = "clsParagraph_onlyverse";
        else objStyle.classname = "clsParagraph";
        break;
      case "table":
        objStyle.key = "table";
        objStyle.classname = "clsTable";
        break;
      case "thead":
        objStyle.key = "thead";
        //objStyle.classname = 'clsTable';
        break;
      case "tbody":
        objStyle.key = "tbody";
        //objStyle.classname = 'clsTable';
        break;
      case "tfoot":
        objStyle.key = "tfoot";
        //objStyle.classname = 'clsTable';
        break;
      case "caption":
        objStyle.key = "caption";
        //objStyle.classname = 'clsTable';
        break;
      case "col":
        objStyle.key = "col";
        //objStyle.classname = 'clsTable';
        break;
      case "colgroup":
        objStyle.key = "colgroup";
        //objStyle.classname = 'clsTable';
        break;

      case "tr":
        objStyle.key = "tr";
        //objStyle.classname = 'clsTable';
        break;
      case "th":
        objStyle.key = "th";
        //objStyle.classname = 'clsTable';
        break;
      case "td":
        objStyle.key = "td";
        //objStyle.classname = 'clsTable';
        break;
      case "quote":
        objStyle.key = "quote";
        if (this.onlyverse) objStyle.classname = "clsQuote_onlyverse";
        else objStyle.classname = "clsQuote";
        break;
      case "poetry":
        objStyle.key = "poetry";
        if (this.onlyverse) objStyle.classname = "clsPoetry_onlyverse";
        else objStyle.classname = "clsPoetry";
        break;

      case "ul":
        objStyle.key = "ul";
        objStyle.classname = "clsUL";
        break;
      case "ol":
        objStyle.key = "ol";
        objStyle.classname = "clsOL";
        break;
      case "li":
        objStyle.key = "li";
        //objStyle.classname = 'clsLI';
        break;
      case "br":
        objStyle.key = "br";
        objStyle.classname = "clsBR";
        break;
      case "sup":
        objStyle.key = "sup";
        objStyle.classname = "clsSup";
        break;
      case "sub":
        objStyle.key = "sub";
        objStyle.classname = "clsSub";
        break;
      case "b":
        objStyle.key = "bold";
        objStyle.classname = "clsBold";
        break;
      case "u":
        objStyle.key = "underline";
        objStyle.classname = "clsUnderline";
        break;
      case "i":
        objStyle.key = "italic";
        objStyle.classname = "clsItalic";
        break;
      case "hebrew":
      case "greek":
        objStyle.key = "grkhrw";
        objStyle.classname = "clsGrkhrw";
        break;
      case "vref":
        objStyle.key = "vref";
        objStyle.classname =
          "clsVref" + (this.book_theme_color === "B" ? "Black" : "");
        break;
      case "xref":
        objStyle.key = "xref";
        objStyle.classname =
          "clsXref" + (this.book_theme_color === "B" ? "Black" : "");
        break;
      case "cmt":
        objStyle.key = "cmt";
        objStyle.classname =
          "clsCmt" + (this.book_theme_color === "B" ? "Black" : "");
        break;
      case "entity":
        objStyle.key = "entity";
        objStyle.classname =
          "clsEntity" + (this.book_theme_color === "B" ? "Black" : "");
        break;
      case "lex":
        objStyle.key = "lex";
        objStyle.classname =
          "clsLex" + (this.book_theme_color === "B" ? "Black" : "");
        break;
      case "lex_def":
        objStyle.key = "lex_def";
        objStyle.classname =
          "clsLexDef" + (this.book_theme_color === "B" ? "Black" : "");
        break;
      case "louwnida":
        objStyle.key = "louwnida";
        objStyle.classname =
          "clsLouw" + (this.book_theme_color === "B" ? "Black" : "");
        break;
      case "biblex":
        objStyle.key = "biblelex";
        objStyle.classname = "clsBibleLex";
        break;

      case "bookchp":
        objStyle.key = "bookchp";
        objStyle.classname = "clsBookChapter";
        break;
      case "bookchplink":
        objStyle.key = "bookchplink";
        objStyle.classname = "clsBookChapter_link";
        break;

      case "pericope":
        objStyle.key = "pericope";
        objStyle.classname = "clsPericope";
        break;
      case "pericopelink":
        objStyle.key = "pericope_link";
        objStyle.classname = "clsPericope_link";
        break;

      case "subtitle":
        objStyle.key = "subtitle";
        objStyle.classname = "clsSubtitle";
        break;

      case "versetext":
        objStyle.key = "versetext";
        if (this.onlyverse) objStyle.classname = "clsVerseText_onlyverse";
        else objStyle.classname = "clsVerseText";
        break;

      case "chapverse":
        objStyle.key = "chapverse";
        objStyle.classname =
          "clsChapVerse" + (this.book_theme_color === "B" ? "Black" : "");
        break;
      case "j":
        objStyle.key = "JWord";
        objStyle.classname = "clsJWord";
        break;
      case "p":
        objStyle.key = "p";
        objStyle.classname = "clsP";
        break;
      case "eshigh":
        objStyle.key = "esHigh";
        objStyle.classname = "clsESHigh";
        break;
      case "bcprint":
        objStyle.key = "bcprint";
        objStyle.classname = "clsBCPrint";
        break;
      default:
        objStyle.key = "unkw";
        objStyle.classname = "";
        break;
    }
    return objStyle;
  }

export const isStringEmpty = (value, istrim = true) => {
    if (value === null || value === '' || value === "" || value === 'null' || value === undefined || value === 'undefined')
        return true;
    else {
        if(istrim)
            value = value.toString().trim();
        else 
            value = value.toString();
        
        if (value === null || value ==='' || value === "" || value === 'null')
            return true;
        else
            return false;

    }
}

export const isObjectEmpty = (value) => {
    try {
        if (value === null || value === 'null' || value === undefined || value === 'undefined')
            return true;
        else if (value.length <= 0)
            return true;
        else
            return false;
    } catch (err) {
        return false;
    }

}


export const convertNullOrEmpty = (value) =>{
    if (isStringEmpty(value))
        return '';
    else
        return value.toString();
}




/*Date*/
export const ConvertDateToYYYYMMDD =  (date) => {
    if (!isStringEmpty(date) && date !== "Invalid Date") {
        let tanggal = new Date(date)
        let year = tanggal.getFullYear().toString();

        let month = ('0' + (tanggal.getMonth() + 1));
        month = month.substring(month.length, month.length - 2);

        let day = ('0' + (tanggal.getDate()));
        day = day.substring(day.length, day.length - 2);

        return (year + month + day);
    } else return "";
}


export const dayDiff =  (deStartDate, deEndDate) => {
    let oneDay = 1000 * 60 * 60 * 24;
    let startDate = deStartDate.getTime();
    let endDate = deEndDate.getTime();
    let dayDiff = Math.round((endDate - startDate) / oneDay);
    return dayDiff;
}


export const onClickArrow = (id, color ='Black', delay) => {
 
    if (!isStringEmpty(delay)) {
        if (!isNaN(delay)) {
            delay = parseInt(delay, 10);
        } else {
            delay = 500;
        }
    } else {
        delay = 500;
    }
   // var obj = document.getElementById(id);
    var objImg = document.getElementById(id + 'Img');
    var objDet = document.getElementById(id + 'Detail');
    if (!isObjectEmpty(objImg)) {
        //console.log(objImg.className);
        if (objImg.className === "imgArrowRight" + color) {
            objImg.className = "imgArrowDown" + color;
            //objDet.slideDown(500); //.show();
            objDet.style.display ='block';
        } else {
            objImg.className = "imgArrowRight" + color;
            objDet.style.display = 'none';
            //objDet.slideUp(500); //.hide();
        }
    }
}

export const dynamicSort  = (property) => {
    var sortOrder = 1;
  
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
  
    return function(a, b) {
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  }

export const sortFunction = (a, b) => {
    let aSort = a;
    let bSort = b;
    return ((aSort < bSort) ? -1 : ((aSort > bSort) ? 1 : 0));
}

export const addRangeArray = (arrSource, arrList) =>  {
    if (arrSource !=null && !isObjectEmpty(arrList)) {
        for (let i = 0; i < arrList.length; i++) {
            arrSource.push(arrList[i]);
        }
    }
    return arrSource;
}


export const deepCloneObject = (obj) => {
    let r, i = 0, len = obj.length;

    if (typeof (obj) !== 'object') {
        r = obj;
    } else if (obj instanceof Date) {
        r = obj;
    }
    else if (len) {
        r = [];
        for (i = 0; i < len; i++) {
            r.push(deepCloneObject(obj[i]));
        }
    }
    else {
        r = {};
        for (i in obj) {
            if (obj[i] != null)
                r[i] = deepCloneObject(obj[i]);
            else
                r[i] = null;
        }
    }

    return r;
}







export const onResponseError = (params) => {

    let objResponse = params.objResponse; //must

    if (isObjectEmpty(objResponse)) {

    } else {
        //kode cek document
        switch (objResponse.Code) {
            case 80:
                //Log Out
                //window.localStorage.clear();
                //window.sessionStorage.clear();
                break;
            default:
                break;
        }
    }
    if(isDevMode())
        alert(JSON.stringify(params))
}



export const onAJAXCall = function (params) {

    
    var promise1 = new Promise(function(resolve, reject){
        let methodType = params.methodType; //must
        let method = params.method; //must
        let data = params.data; //must   //data jangan di stringify ketika dikirim


        if (!isObjectEmpty(data))
            data = JSON.stringify(data);

        if (!isStringEmpty(convertNullOrEmpty(methodType)))
            methodType = methodType.toUpperCase();
        
        //let auth = 'Basic ' + new Buffer('user:pass').toString('base64');

        //let auth = 'Basic c2FiZGE6U0BiREAxMjM0NTYh';


        if((methodType === "GET" || methodType === "POST" )&& true){
            // let header = new Headers();
            // header.append("Authorization", auth);
            // header.append("Content-Type", "application/json; charset=utf-8");

            fetch(GetAPIAddress() + '/' + method,{
              method: methodType,
              accept: 'application/json',
              data: data,
              //headers: header,
              dataType: "json"
            }).then(res=> res.json() )
              .then(
                (result) => {
                    resolve(result);

              }, (err)=>{
                reject(err);
              }
            )
        }

    });
    return promise1;
    
}



export const getDeviceOrientation = () => {
    let orientDeg = 0;
    try {
        orientDeg = window.screen.orientation.angle; //web
    } catch (error) {
        orientDeg = window.orientation; //device
    }
    return orientDeg;
}





export const redirectPage =  (address) => {
    let web = GetWebsiteAddress();

    if(!isStringEmpty(address)){
        if(address.substr(0,1)==='/'){
            web = web + address;
        }else{
             web = web + "/" + address;
        }
    }
    window.location = web;
}

export const openForm = (formName) => {
    window.open(formName, '_blank');
}


export const setActivatedByClass =  (className) =>  {
    if (!isStringEmpty(className)) {
        let listclass = document.getElementsByClassName(className);
        //if(className!=='divButtonClickGray') console.log(listclass)
        if (!isObjectEmpty(listclass)) {
            for (let i = 0; i < listclass.length; i++) {
                let element = listclass[i];
                if (!isObjectEmpty(element)) {
                    if (isMobile.any()) {
                        element.addEventListener('touchstart', function () {
                            element.className = className + " activated";
                        });

                        element.addEventListener('touchend', function () {
                            element.className = className;
                        });

                        element.addEventListener('touchmove', function () {
                            setTimeout(function(){element.className = className;},500);
                        }, false);


                    } else {
                       
                        element.addEventListener('mousedown', function () {
                            element.className = className + " activated";
                        });

                        element.addEventListener('mouseup', function () {
                            element.className = className;
                        });

                        element.addEventListener('mousemove', function () {
                            setTimeout(function(){element.className = className;},500);
                            //element.style.backgroundColor = "transparent";
                        },false);

                    }
                }
            }
        }
    }
}







export const convertToDate =  (dateString) => {
    let year = dateString.substring(0, 4);
    let month = dateString.substring(4, 6);
    let day = dateString.substring(6, 8);

    let date = new Date(year, month - 1, day);
    return date;
}




export const MathRandom = (min = 97,max =122) =>{
    return Math.floor(Math.random() *(max - min +1))+min;
}


export const GetUniqString = () =>{
    return String.fromCharCode(MathRandom(), MathRandom(), MathRandom(), MathRandom()) + MathRandom(0,9999) ;
}

export const getUniqueId = (tag)=>{
    let dt = new Date();
    let id = dt.getTime();
    id += '_'+ GetUniqString();
    if(!isStringEmpty(tag))  id += '#'+ tag.toString().replace(" ","#");
    return id;
}






export const SmoothExpCol = {
    init: (id)=>{
        var el = document.getElementById(id);

        if(!el.hasAttribute('data-height')){
            el.style.display = 'block';
            el.dataset.height = el.offsetHeight +'px';
            el.className =   el.className + " smoothExpCol";
            el.style.height = 0;
        }
        return el;
    },
    expand:(id) =>{
        var div = SmoothExpCol.init(id);
        setTimeout(()=>{
            div.style.height = div.dataset.height;
            //div.style.display ='block';
        },100);
    },
    collapse:(id)=>{
        var div = SmoothExpCol.init(id);
        //div.style.display ='none';
        div.className =  div.className.replace("smoothExpCol","");
        div.style.height = 0;
    }
}


export const fadeIn = (elem,ms) =>{
    if(!elem){
        return;
    }



    if(elem.style.visibility !== "visible"){
        if( ms>0){ //mili second
           
            var opacity = 0;
            var timer = setInterval(()=>{
               
                opacity += 100/ms;
                if(opacity >=1){
                    opacity =1;
                   
                    elem.style.opacity= opacity;
                    elem.style.filter = "alpha(opacity=" + opacity * 100 +")";
                    clearInterval(timer);
                }else{
                    elem.style.opacity= opacity;
                    elem.style.filter = "alpha(opacity=" + opacity * 100 +")";
                }
                
            },100);
        }else{
            elem.style.opacity= 1;
            elem.style.filter = "alpha(opacity=1)";
            //elem.style.display = "table";
            elem.style.visibility = "visible";
        }   
    }
}

export const fadeOut = (elem,ms) =>{
    if(!elem){
        return;
    }

    if(elem.style.visibility !== "hidden"){
        if(ms>0){ //mili second
            var opacity = 1;
            var timer = setInterval(()=>{
                
                opacity -= 100/ms;
                if(opacity <= 0 ){
                    opacity =0;
                    elem.style.visibility = "hidden";
                    elem.style.opacity= opacity;
                    elem.style.filter = "alpha(opacity=" + opacity * 100 +")";
                    clearInterval(timer);
                }else{
                    elem.style.opacity= opacity;
                    elem.style.filter = "alpha(opacity=" + opacity * 100 +")";
                }
                
            },100);
        }else{
            elem.style.opacity= 0;
            elem.style.filter = "alpha(opacity=0)";
            elem.style.visibility = "hidden";
        }
    }
}




export const slideLeft = (elem,ms,source_value, target_value, ishow) =>{
    if(!elem){
        return;
    }

    let srcval,tgtval;
    if(ishow){
        srcval= source_value;
        tgtval= target_value;
    }


    if(ms>0){ //mili second
        elem.style.right = srcval+'px';
        var dist = tgtval - srcval;
        var right, inc =  parseInt(dist/ (ms/200),10);
        var timer;

        if(ishow){
            right = srcval;
            timer = setInterval(()=>{
                if(dist>0){
                    right += inc;
                }
                if(right >= tgtval ){
                    right = tgtval;
                    elem.style.right= right +'px';
                    clearInterval(timer);
                }else{
                     elem.style.right= right +'px';
                }
            },200);
        }else{
            right = tgtval;
            timer = setInterval(()=>{
                if(dist>0){
                    right -= inc;
                }
                if( right <= srcval){
                    right = srcval;
                    elem.style.right= right +'px';
                    elem.style.display = 'none';
                    clearInterval(timer);
                }else{
                     elem.style.right= right +'px';
                }
            },200);
        }
    }else{
        elem.style.right= tgtval +'px';
    }
    
}


export const slideRight = (elem,ms,source_value, target_value) =>{
    if(!elem){
        return;
    }

    if(ms>0){ //mili second
        elem.style.left = source_value +'px';
        var dist = target_value - source_value;
        var left = source_value;
        var inc =  parseInt(dist/ (ms/200),10);
        var timer = setInterval(()=>{
                if(dist>0){
                    left += inc;
                }
                if(left >= target_value ){
                    left = target_value;
                    elem.style.left= target_value +'px';
                    clearInterval(timer);
                }else{
                     elem.style.left= left +'px';
                }
            
        },200);
    }else{
        elem.style.right= target_value +'px';
    }
    
}


export const getOrientation = () =>{
    if(window.matchMedia("(orientation: portrait)").matches){
        return 'P';
    }else{
        return 'L';
    }
}




export const isMobileScreen = () => {
 
    if(isMobile.any()){
        if(getOrientation()  === 'P' && window.innerWidth < 800){
            return true;
        }else{
            if(window.innerWidth < 800){
                return true;
            }else{
                return false
            }
        }
    }else{
        return false;
    }
   

}





export  const shallowEqual = (objA,objB) =>{
    if(objA===objB){
        return true
    }

    if(typeof(objA) !== 'object' || objA ===null || typeof(objB) !== 'object' || objB === null){
        return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    
    if(keysA.length !== keysB.length){
        return false;
    }

    var bHasOwnProperty = hasOwnProperty.bind(objB);
    for (var i = 0; i < keysA.length; i++) {
        
        if(!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]])
        return false;
    }

    return true;
       
}


export  const shallowCompare =(instance,nextProps, nextState)=>{
    return (
         !shallowEqual(instance.props,nextProps) || !shallowEqual(instance.state,nextState)
    );
}



export const setLoadMore = (_instance, cont_name ,listdata, total_min_data) =>{
   let totalMinData = getMinShowData(),
        totalData = !isObjectEmpty(listdata)? listdata.length : 0,
        hasDataMore =false,
        t_listdata = listdata;

    if(!isNaN(total_min_data) && parseInt(total_min_data,10)>0){
        totalMinData =  parseInt(total_min_data,10);
    }
    // console.log(cont_name)
    // console.log(totalData)
    // console.log(totalMinData)
    if(totalData > totalMinData && !this.SessionLimit){
      hasDataMore = true;
      t_listdata = t_listdata.slice(0,totalMinData);
      _instance.start_idx = _instance.start_idx + totalMinData;
    }else{
       hasDataMore = false;
       t_listdata = t_listdata.slice(0,totalData);
       _instance.start_idx = _instance.start_idx + totalData;
    }
    //console.log(_instance.start_idx )
    //console.log(t_listdata)

    if(_instance.isReadMore){
      listdata = addRangeArray(_instance[cont_name], t_listdata);
      _instance[cont_name] = listdata;
      
    }else{
      listdata = t_listdata;
      _instance[cont_name] = listdata; 
    }   
    // console.log(hasDataMore)
    // console.log("====================")
    return {
        data : listdata,
        hasDataMore: hasDataMore
    }
}






export const swipedetect = (el,_instance, callback)=>{
    var touchsurface = el,
        swipedir,startX,startY,distX,distY,
        thresholdX = 150,
        thresholdY =150, 
        restraint = 100, 
        allowedTime = 300, elapsedTime, startTime, 
        handleswipe  =callback || function(swipedir){};

        touchsurface.addEventListener('touchstart',(e)=>{

            var touchobj = e.changedTouches[0];
            swipedir = 'none';
            distX = 0;
            distY = 0;

            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime();
            if(e.cancelable)
                e.preventDefault();
        }, false);

        touchsurface.addEventListener('touchmove',(e)=>{
            if(e.cancelable)
                e.preventDefault();
        },false);

        touchsurface.addEventListener('touchend',(e)=>{
            var last_swipe = _instance.is_swipe;
            var touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX;
            distY = touchobj.pageY - startY;
            elapsedTime = new Date().getTime() -  startTime;
          
            if(elapsedTime <= allowedTime){
                _instance.is_swipe = true;
                if(Math.abs(distX) >= thresholdX && Math.abs(distY) <= restraint){
                    swipedir = (distX < 0) ? 'left' : 'right';
                }else if(Math.abs(distY) >= thresholdY && Math.abs(distX) <= restraint){
                    swipedir = (distY < 0) ? 'up' : 'down';
                }
            }
            
            if(!last_swipe){
                //if false can callback
                handleswipe(swipedir);
            }
            if(e.cancelable)
                e.preventDefault();

        },false)

}


export const touchclick = (_instance,callback)=>{
    if(!isObjectEmpty(_instance)){

        if(!isObjectEmpty(_instance.lastTap)){
          var currTime = new Date().getTime();
          var tapLength = currTime - _instance.lastTap;

          if(tapLength < 80){
            if(typeof(callback)==='function')callback()
          }
        }
        _instance.lastTap = null;
    }
}