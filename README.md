KonyMbaaSDemo
=========

This application will showcase how to use JS MBaaS SDK to invoke identity, integration, messaging services.

# To run this app

1. Download the project
2. Import project to your Kony IDE.
3. In the project, Go to js folder under modules and open 'config.js' file
4. Write down below required details in the space provided against each parameter in config.js file.
	* AppKey : AppKey that you got from your Kony MobileFabric console after app configuration  
	* AppSecret : AppKey that you got from your Kony MobileFabric console after app configuration  
	* ServiceURL : Service URL that you got from your Kony MobileFabric console after app configuration 
	* DefaultUsername :  Salesforce Developer Account User Name
	* DefaultPassword : Salesforce Developer Account Password. Please note that you must concatenate your password with security token that you got from salesforce.
	* IdentityService: Your KonyMobileFabric Identity Service Name
	* AccountIntegrationService : Your KonyMobileFabric Account Related Integration Service Name
	* LeadIntegrationService : Your KonyMobileFabric Lead Related Integration Service Name
	* ContactIntegrationService : Your KonyMobileFabric Contact Related Integration Service Name
	* OpportunitiesIntegrationService : Your KonyMobileFabric Opportunity Related Integration Service Name
	* KMSID : Any Unique identifier for the application. For example email id.	
* Build and run the app
 
config.js:

MBaaSConfig ={	

	"DefaultUsername" : "<Enter Your Salesforce Developer Account User Name>", 
    "DefaultPassword" : "<Enter Your Salesforce Developer Account Password>",    
	"AppKey" : "<Enter Your KonyMobileFabric App Key>", 
    "AppSecret" : "<Enter Your KonyMobileFabric App Secret>", 
    "IdentityService" : "<Enter Your KonyMobileFabric Identity Service Name>",
    "AccountIntegrationService":"<Enter Your KonyMobileFabric Account Related Integration Service Name>",
    "LeadIntegrationService":"<Enter Your KonyMobileFabric Lead Related Integration Service Name>",
	"ContactIntegrationService":"<Enter Your KonyMobileFabric Contact Related Integration Service Name>",
    "OpportunitiesIntegrationService":"<Enter Your KonyMobileFabric Opportunity Related Integration Service Name>",
    "ServiceURL" : "<Enter Your KonyMobileFabric Service-URL>",
    "KMSID":"<Please provide any Unique identifier for the application. For example your email id.>",    
    "getContactQuery":{ "queryString":"SELECT ID,NAME,FIRSTNAME,LASTNAME,TITLE,PHONE,EMAIL FROM Contact"},
    "getAccountQuery":{ "queryString":"SELECT name,type,BillingCity,BillingState,AnnualRevenue,website,Industry,phone,BillingStreet from Account where type!=null"},
    "getLeadQuery":   { "queryString":"SELECT ID,NAME,FIRSTNAME,LASTNAME,TITLE,PHONE,EMAIL FROM Lead"},
    "getOpportunityQuery":{ "queryString":"SELECT name,Amount,CloseDate,Type,LeadSource,StageName,ExpectedRevenue,Probability from Opportunity"}
};
	

**Note:**
You need to setup and configure your Kony MobileFabric environment on your cloud before running the app. Follow these tutorials at  http://docs.kony.com/tutorials/MobileFabric/ to know how to set up Kony MobileFabric environment

# Supported platforms:
**Mobile**
 * Android
 * iPhone

 

