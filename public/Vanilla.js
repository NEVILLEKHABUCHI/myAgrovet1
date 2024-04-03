let contactInfo=document.querySelector('.contactInfo');
let adminTabs=document.querySelector('.centerTop');
let adminFeeds=document.querySelector('#FeedsTabs');

//Functions for the contact information on the landing page
function showContactInfo(){
    contactInfo.style.display="block";
}
function closeContactInfo(){
    contactInfo.style.display="none";
}
//Functions for the adminTabs on the admin page
function showAdminTabs(){
    adminTabs.style.display="flex";
}
function closeAdminTabs(){
    adminTabs.style.display="none";
}
//Functions for the adminFeeds tabs on the admin Feeds page 
function showAdminFeeds(){
    adminFeeds.style.display="flex";
}
function closeAdminFeeds(){
    adminFeeds.style.display="none";
}

