//Type your code here
var newsList;
var jsonResponse;
var imgRegExp=/src="[\S]+\"/g;
var pos;
var intgService;
var d,weekDay;
var days,frmName;
var menuPos;
//document.getElementById("demo").innerHTML = days[d.getDay()];
function menuToggle()
{
	kony.print("\n--in menu toggle");
	if(typeof menuPos==undefined)
		menuPos="90%";
	else if(menuPos==="90%")
		menuPos="0%";
	else if(menuPos==="0%")
		menuPos="90%";
   frmNews.flexNewsContainer.animate(
			  kony.ui.createAnimation({100:{left:menuPos,"stepConfig":{}}}),
			  {delay:0,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.40},
			  {animationEnd: function() {
			  } 
		});
}
function getNews(category){
 // kony.alert(JSON.stringify(eventObj));
	kony.print("\n---in getNews---\n");
  	if(category==="w"){
		frmNews.lblFrmNewsTitle.text="World";
	}else	if(category==="n"){
		frmNews.lblFrmNewsTitle.text="U.S.";
	}else if(category==="b"){
		frmNews.lblFrmNewsTitle.text="Business";
	}else	if(category==="tc"){
		frmNews.lblFrmNewsTitle.text="Technology";
	}else	if(category==="e"){
		frmNews.lblFrmNewsTitle.text="Entertainment";
	}else	if(category==="s"){
		frmNews.lblFrmNewsTitle.text="Sports";
	}else if(category==="snc"){
		frmNews.lblFrmNewsTitle.text="Science";
	}else if(category==="m"){
		frmNews.lblFrmNewsTitle.text="Health";
	}else if(category==="h"){
		frmNews.lblFrmNewsTitle.text="Top Stories";
	}
	if(firstLogin==false){
  		frmNews.flexNewsContainer.animate(
			  kony.ui.createAnimation({100:{left:"0%","stepConfig":{}}}),
			  {delay:0,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.40},
			  {animationEnd: function() { }	});
	}
  
  	newsList=[];
  	frmNews.segmentNews.removeAll();
	try{
		//Making MBaaS client instance to invoke getIntegrationService method.
		if(kony.os.deviceInfo().name == "iPhone" ||kony.os.deviceInfo().name == "iPhone Simulator" ||  kony.os.deviceInfo().name == "iPad"  )
			kony.application.showLoadingScreen("sknLoading","Please wait...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,{shouldShowLabelInBottom :true,separatorHeight:30});
		else
			kony.application.showLoadingScreen("sknLoading","Please wait...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,null);
		intgService = client.getIntegrationService(MBaaSConfig.NEWS_SERVICE_NAME);//Accounts is service name and accountsClient is Accounts integration service instance
		intgService.invokeOperation(MBaaSConfig.NEWS_OPERATION_NAME,{},{"category":category}, integSuccessCallback, integFailureCallback);
	 }catch(excp){
	 	 kony.application.dismissLoadingScreen();
	 	kony.print(JSON.stringify(excp));
	 }
  function integSuccessCallback(response){
  if(kony.os.deviceInfo().name==="android")
  		jsonResponse=response;
  else
	jsonResponse=JSON.parse(response);
   // jsonResponse=response;
    // kony.print("\nresponse:-"+JSON.stringify(jsonResponse));
	var len=jsonResponse["news_list"].length;
	var description,descriptionArray;
	var imgSrc;
	var news={};
	var start,end,descLen;	
	for(var i=0;i<len;i++)
	{
		news={};
		kony.print(i+".\n"+JSON.stringify(jsonResponse["news_list"][i]));
		//msg.imgProfile={"src":"profile1.png","top": "8dp","right": "0%","containerWeight":5};
		//news.richTextTitle={"text":jsonResponse["news_list"][i]["news_item"]["title"]};
		news.lblTitle={"text":jsonResponse["news_list"][i]["news_item"]["title"]};
		description=jsonResponse["news_list"][i]["news_item"]["description"];
		kony.print("\n---full description--\n"+description);
		start=description.search('img src="//');
		end=start+10;
		kony.print("\n--start-->"+start);
		while(description[end]!='"'){
		//	kony.print(description[end]);
			end++;
		}
		imgSrc=description.substring(start+9,end);
		imgSrc="http:"+imgSrc;
		kony.print("\n--image src--\n"+imgSrc);
		news.imgNews={"src":imgSrc,"skin":"sknKonyImg"};
		descriptionArray=description.split("<font size=\"-1\">");
		kony.print("\ndescription-->"+descriptionArray[2]);
		descLen=descriptionArray[2].length;
		if(descLen>120)
			descLen=120;
		description=descriptionArray[2].substring(0,descLen)+"..";
		news.richTextDesc={"text":description};
		//news.lblNewsDesc={"text":descriptionArray[2]};
		newsList.push(news);
		kony.print("\n--link-->"+JSON.stringify(jsonResponse["news_list"][i]["news_item"]["link"]));
		kony.print("\n--desc after spliting--\n"+descriptionArray[1]);
	}
	frmNews.segmentNews.setData(newsList);
/*	if(typeof pos !=undefined && pos==9)
	{
		var weatherArray=jsonResponse["ForecastList"];
		kony.print("\n--weatherArray0"+JSON.stringify(weatherArray[0]));
	}*/
//	kony.application.dismissLoadingScreen();
//	frmNews.show();
    if(firstLogin==true)
     { 
     	kony.print("\n-----displaying news form------\n");
       frmNews.show();
       firstLogin=false;
     }
    kony.application.dismissLoadingScreen();
	}
	function integFailureCallback(error){
	
		kony.print("\n--error in getNews---\n"+JSON.stringify(error));
		kony.application.dismissLoadingScreen();
	}
}
function newsDetails(frmID){
	var index;
	frmName=frmID;
	if(frmID==="frmNews"){
  		kony.print("selected indices:-  "+(frmNews.segmentNews.selectedIndices)[0][1]);
  		index=(frmNews.segmentNews.selectedIndices)[0][1];
  	}else if(frmID==="frmWeather"){
  		kony.print("selected indices:-  "+(frmWeather.segmentNews.selectedIndices)[0][1]);
  		index=(frmWeather.segmentNews.selectedIndices)[0][1];
  	}
	//kony.print("\n index"+JSON.stringify(index));
	kony.print("\nurl-->"+jsonResponse["news_list"][index]["news_item"]["link"]);
	frmBrowser.browserNews.requestURLConfig={"URL":jsonResponse["news_list"][index]["news_item"]["link"],"requestMethod":constants.BROWSER_REQUEST_METHOD_GET};
	frmBrowser.show();
}
function destroyForm(){
//frmBrowser.browserNews.clearHistory();
	frmBrowser.destroy();
	if(frmName==="frmNews")
		frmNews.show();
	else if(frmName=="frmWeather")
		frmWeather.show();
}


//var city,zipcode;

function getWeatherForecast(){
	function integSuccessCallback(response)
	{
		var weatherList=[];
		response=JSON.parse(response);
		frmWeather.lblFrmWeatherTitle.text=response["cityName"]+","+response["country"];
		var day;
		var weather;
		var temp;
		var minTemp,maxTemp;
		var imgUrl;
		var weatherData,weatherDataList=[];
		var lblDay="lblDay";
		var imgCloud;
		var lblMinTemp,lblMaxTemp;
		for(var i=1;i<8;i++)
		{
			day=JSON.parse(response["day"+i]);
			kony.print("\n"+i+" day-"+JSON.stringify(day));
			weather=day["weather"];
			//temp=day["temp"];
			minTemp=((day["temp"]["min"]-273.5).toFixed(2))+"°C";
			maxTemp=((day["temp"]["max"]-273.5).toFixed(2))+"°C";
			imgUrl="http://openweathermap.org/img/w/"+day["weather"][0]["icon"]+".png";
			lblDay="lblDay"+i;
			imgCloud="imgCloud"+i;
			lblMinTemp="lblMinTemp"+i;
			lblMaxTemp="lblMaxTemp"+i;
			var count=(weekDay+i-1)%7;
			kony.print("\n-count-"+count);
			kony.print("\nDay--"+days[(weekDay+i-1)%7]);
			frmWeather[lblDay].text=days[(weekDay+i-1)%7];
			frmWeather[imgCloud].src=imgUrl;
			frmWeather[lblMinTemp].text=minTemp;
			frmWeather[lblMaxTemp].text=maxTemp;
		}
		//setting news............
		if(kony.os.deviceInfo().name==="android")
  			jsonResponse=response;
  		else
			jsonResponse=response;
		var len=jsonResponse["news_list"].length;
		var description,descriptionArray;
		var imgSrc;
		var news={};
		var start,end,descLen;
		kony.print("\n-----clear----\n");
		for(var i=0;i<len;i++)
		{
			news={};
			kony.print(i+".\n"+JSON.stringify(jsonResponse["news_list"][i]));
			news.lblTitle={"text":jsonResponse["news_list"][i]["news_item"]["title"]};
			description=jsonResponse["news_list"][i]["news_item"]["description"];
			kony.print("\n---full description--\n"+description);
			start=description.search('img src="//');
			end=start+10;
			kony.print("\n--start-->"+start);
			while(description[end]!='"'){
				end++;
			}
			imgSrc=description.substring(start+9,end);
			imgSrc="http:"+imgSrc;
			kony.print("\n--image src--\n"+imgSrc);
			news.imgNews={"src":imgSrc,"skin":"sknKonyImg"};
			descriptionArray=description.split("<font size=\"-1\">");
			kony.print("\ndescription-->"+descriptionArray[2]);
			descLen=descriptionArray[2].length;
			if(descLen>120)
				descLen=120;
			description=descriptionArray[2].substring(0,descLen)+"..";
			news.richTextDesc={"text":description};
			newsList.push(news);
			kony.print("\n--link-->"+JSON.stringify(jsonResponse["news_list"][i]["news_item"]["link"]));
			kony.print("\n--desc after spliting--\n"+descriptionArray[1]);
		}
		kony.print("\n-----clear----\n");
		frmWeather.segmentNews.setData(newsList);
		frmWeather.show();
		kony.application.dismissLoadingScreen();
	}
	function integFailureCallback(error){
		kony.print("\n in failure:-"+JSON.stringify(error));
		kony.application.dismissLoadingScreen();
	}
	frmWeather.segmentNews.removeAll();
	newsList=[];
	try{
		//Making MBaaS client instance to invoke getIntegrationService method.
	if(kony.os.deviceInfo().name == "iPhone" ||kony.os.deviceInfo().name == "iPhone Simulator" ||  kony.os.deviceInfo().name == "iPad"  )
		kony.application.showLoadingScreen("sknLoading","Please wait...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,{shouldShowLabelInBottom :true,separatorHeight:30});
	else
		kony.application.showLoadingScreen("sknLoading","Please wait...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,null);
		accountsClient = client.getIntegrationService("NewsNForecast");//Accounts is service name and accountsClient is Accounts integration service instance
		//accountsClient.invokeOperation(Accounts service name,headers,query params, SuccessCallback,FailureCallback);
	 	accountsClient.invokeOperation("NewsNForecast",{},{"lat":lat.toString(),"lon":lon.toString()}, integSuccessCallback, integFailureCallback);
	 }catch(excp){
	 		kony.application.dismissLoadingScreen();
	 		kony.print(JSON.stringify(excp));
	 }
}
function showNewsForm(){
 frmNews.flexNewsContainer.animate(
			  kony.ui.createAnimation({100:{left:"90%","stepConfig":{}}}),
			  {delay:0,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.40},
			  {animationEnd: function() {
					
			  } 
		});
}