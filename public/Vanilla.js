let contactInfo=document.querySelector('.contactInfo');
let adminTabs=document.querySelector('.centerTop');
let adminFeeds=document.querySelector('#FeedsTabs');
let addNewProduct=document.querySelector('.addProduct');
let productEditing=document.querySelector('.productEditing');


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
//Functions to edit a product in the admin feeds page
function showDetails(productId){
    let detailDiv=document.getElementById('detail-'+productId);
    if(detailDiv.style.display==='none' || detailDiv.style.display===''){
        detailDiv.style.display='block';
    }else{
        detailDiv.style.display='none';
    }
}
function hideDetails(productId){
    let detailDiv=document.getElementById('detail-'+productId);
    detailDiv.style.display='none';
}

//Functions to delete a product in the adminFeeds page
function showDeleteProduct(productId){
    let deleteDiv=document.getElementById('delete-'+productId);
    if(deleteDiv.style.display==='none' || deleteDiv.style.display===''){
        deleteDiv.style.display='block';
    }else{
        deleteDiv.style.display='none';
    }
}
function hideDeletion(productId){
    let deleteDiv=document.getElementById('delete-'+productId);
    deleteDiv.style.display='none';
}
function cancelDeletion(productId){
    let deleteDiv=document.getElementById('delete-'+productId);
    deleteDiv.style.display='none';
}