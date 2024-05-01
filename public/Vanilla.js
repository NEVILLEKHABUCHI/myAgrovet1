let contactInfo=document.querySelector('.contactInfo');
let adminTabs=document.querySelector('.centerTop');
let adminFeeds=document.querySelector('#FeedsTabs');
let addNewProduct=document.querySelector('.addProduct');

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
    // addNewProduct.style.display="none";
}
function closeAdminFeeds(){
    adminFeeds.style.display="none";
}
//Functions for the add New Item on the admin Feeds page
function addNewItem(){
    addNewProduct.style.display="flex";
    // adminFeeds.style.display="none";
}
function closeNewItem(){
    addNewProduct.style.display="none";
}
