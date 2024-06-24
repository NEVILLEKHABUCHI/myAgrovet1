
let adminTabs=document.querySelector('.centerTop');
let adminFeeds=document.querySelector('#FeedsTabs');
let addNewProduct=document.querySelector('.addProduct');
let productEditing=document.querySelector('.productEditing');


// Functions for showing right1 tabs in the main page
function showRight1(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let welcome_message=document.querySelector('.welcome_message');
    right_1.style.display="flex";
    openTab.style.display="none";
    closeTab.style.display="block";
    welcome_message.style.display="none";
}
//Function for closing right1 tab in the main page
function closeRight1(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let welcome_message=document.querySelector('.welcome_message');
    right_1.style.display="none";
    openTab.style.display="block";
    closeTab.style.display="none";
    welcome_message.style.display="block";
}
// Function for showing the right1 tab in the about page
function OpenRight1(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let about_message=document.querySelector('.about-message');
    right_1.style.display="flex";
    openTab.style.display="none";
    closeTab.style.display="block";
    about_message.style.display="none";
}
// Function for closing the right1 tab in the about page
function CloseRight1(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let about_message=document.querySelector('.about-message');
    right_1.style.display="none";
    openTab.style.display="block";
    closeTab.style.display="none";
    about_message.style.display="block";
}
// Function for showing the right1 tab in ourServices page
function showingRight1(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let services_message=document.querySelector('.services-message')
    right_1.style.display="flex";
    openTab.style.display="none";
    closeTab.style.display="block";
    services_message.style.display="none";
}
function notshowingRight1(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let services_message=document.querySelector('.services-message')
    right_1.style.display="none";
    openTab.style.display="block";
    closeTab.style.display="none";
    services_message.style.display="block";
}

// Functions for showing the right1 tab in ourProducts page
function right1Showing(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let products_message=document.querySelector('.products-message');
    right_1.style.display="flex";
    openTab.style.display="none";
    closeTab.style.display="block";
    products_message.style.display="none";
}
function right1Notshowing(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let products_message=document.querySelector('.products-message');
    right_1.style.display="none";
    openTab.style.display="block";
    closeTab.style.display="none";
    products_message.style.display="block";
}

// Functions for showing the right1 tab in the signup page
function right1_Showing(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let signup_message=document.querySelector('.signup-message');
    right_1.style.display="flex";
    openTab.style.display="none";
    closeTab.style.display="block";
    signup_message.style.display="none";
}
function right1_Notshowing(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let signup_message=document.querySelector('.signup-message');
    right_1.style.display="none";
    openTab.style.display="block";
    closeTab.style.display="none";
    signup_message.style.display="block";
}
// Functions for showing the right1 tab in  the login page
function right1_Show_ing(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let login_message=document.querySelector('.login-message');
    right_1.style.display="flex";
    openTab.style.display="none";
    closeTab.style.display="block";
    login_message.style.display="none";
}
function right1_Not_showing(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let login_message=document.querySelector('.login-message');
    right_1.style.display="none";
    openTab.style.display="block";
    closeTab.style.display="none";
    login_message.style.display="block";
}
// Functions for showing  the right1 tab in the admin page
function right_1Showing(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let admin_message=document.querySelector('.admin-message');
    right_1.style.display="flex";
    openTab.style.display="none";
    closeTab.style.display="block";
    admin_message.style.display="none";
}
function right_1Notshowing(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let admin_message=document.querySelector('.admin-message');
    right_1.style.display="none";
    openTab.style.display="block";
    closeTab.style.display="none";
    admin_message.style.display="block";
}

// Functions for showing the right1 tab on the adminFeeds page
function ri_ght1Showing(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let adminFeeds_message=document.querySelector('.adminFeeds-message');
    right_1.style.display="flex";
    openTab.style.display="none";
    closeTab.style.display="block";
    adminFeeds_message.style.display="none";
}
function ri_ght1Notshowing(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let adminFeeds_message=document.querySelector('.adminFeeds-message');
    right_1.style.display="none";
    openTab.style.display="block";
    closeTab.style.display="none";
    adminFeeds_message.style.display="block";
}

//Functions for the add New Item on the admin Feeds page
function showAddFeed(){
    console.log('Hello');
    let addfeedDiv=document.querySelector('.addFeed');
    if(addfeedDiv.style.display==='none' || addfeedDiv.style.display===''){
        addfeedDiv.style.display='block';
    }
    else{
        addfeedDiv.style.display='none';
    }
}
function showDetails(productId){
    let detailDiv=document.getElementById('detail-'+productId);
    if(detailDiv.style.display==='none' || detailDiv.style.display===''){
        detailDiv.style.display='block';
    }
    else{
        detailDiv.style.display='none';
    }
}
function hideDetails(productId){
    let detailDiv=document.getElementById('detail-'+productId);
    detailDiv.style.display='none';
}

//Functions to delete a product in the adminFeeds page
function confirmDeleteFeed(productId){
    if(confirm('Are you sure you want to delete this product?')){
        window.location.href='/feed/'+productId+'/delete';
    }
}


// Functions for the adminDrugs page
// Functions for showing the right1 tab on the adminFeeds page
function showRight1tab(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let adminDrugs_message=document.querySelector('.adminDrugs-message');
    right_1.style.display="flex";
    openTab.style.display="none";
    closeTab.style.display="block";
    adminDrugs_message.style.display="none";
}
function closeRight1tab(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let adminDrugs_message=document.querySelector('.adminDrugs-message');
    right_1.style.display="none";
    openTab.style.display="block";
    closeTab.style.display="none";
    adminDrugs_message.style.display="block";
}

//Functions for the add New Item on the admin Feeds page
function showAddDrug(){
    let adddrugDiv=document.querySelector('.addDrug');
    if(adddrugDiv.style.display==='none' || adddrugDiv.style.display===''){
        adddrugDiv.style.display='block';
    }
    else{
        adddrugDiv.style.display='none';
    }
}
function showDetails(productId){
    let detailDiv=document.getElementById('detail-'+productId);
    if(detailDiv.style.display==='none' || detailDiv.style.display===''){
        detailDiv.style.display='block';
    }
    else{
        detailDiv.style.display='none';
    }
}
function hideDetails(productId){
    let detailDiv=document.getElementById('detail-'+productId);
    detailDiv.style.display='none';
}

//Functions to delete a product in the adminFeeds page
function confirmDeleteDrug(productId){
    if(confirm('Are you sure you want to delete this product?')){
        window.location.href='/drug/'+productId+'/delete';
    }
}

// Functions for the adminMachinery page
// Functions for showing the right1 tab on the adminFeeds page
function showadminMachineryRight1tab(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let adminMachineries_message=document.querySelector('.adminMachineries-message');
    right_1.style.display="flex";
    openTab.style.display="none";
    closeTab.style.display="block";
    adminMachineries_message.style.display="none";
}
function closeadminMachineryRight1tab(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let adminMachineries_message=document.querySelector('.adminMachineries-message');
    right_1.style.display="none";
    openTab.style.display="block";
    closeTab.style.display="none";
    adminMachineries_message.style.display="block";
}

//Functions for the add New Item on the adminMachinery page
function showAddMachinery(){
    let addmachineryDiv=document.querySelector('.addMachinery');
    if(addmachineryDiv.style.display==='none' || addmachineryDiv.style.display===''){
        addmachineryDiv.style.display='block';
    }
    else{
        addmachineryDiv.style.display='none';
    }
}
function showDetails(productId){
    let detailDiv=document.getElementById('detail-'+productId);
    if(detailDiv.style.display==='none' || detailDiv.style.display===''){
        detailDiv.style.display='block';
    }
    else{
        detailDiv.style.display='none';
    }
}
function hideDetails(productId){
    let detailDiv=document.getElementById('detail-'+productId);
    detailDiv.style.display='none';
}

//Functions to delete a product in the adminMachinery page
function confirmDeleteMachinery(productId){
    if(confirm('Are you sure you want to delete this product?')){
        window.location.href='/machinery/'+productId+'/delete';
    }
}

// Functions for the adminSeeds page
// Functions for showing the right1 tab on the adminFeeds page
function showadminSeedsRight1tab(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let adminSeeds_message=document.querySelector('.adminSeeds-message');
    right_1.style.display="flex";
    openTab.style.display="none";
    closeTab.style.display="block";
    adminSeeds_message.style.display="none";
}
function closeadminSeedsRight1tab(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    let adminSeeds_message=document.querySelector('.adminSeeds-message');
    right_1.style.display="none";
    openTab.style.display="block";
    closeTab.style.display="none";
    adminSeeds_message.style.display="block";
}

//Functions for the add New Item on the adminMachinery page
function showAddSeed(){
    let addseedDiv=document.querySelector('.addSeed');
    if(addseedDiv.style.display==='none' || addseedDiv.style.display===''){
        addseedDiv.style.display='block';
    }
    else{
        addseedDiv.style.display='none';
    }
}
function showDetails(productId){
    let detailDiv=document.getElementById('detail-'+productId);
    if(detailDiv.style.display==='none' || detailDiv.style.display===''){
        detailDiv.style.display='block';
    }
    else{
        detailDiv.style.display='none';
    }
}
function hideDetails(productId){
    let detailDiv=document.getElementById('detail-'+productId);
    detailDiv.style.display='none';
}

//Functions to delete a product in the adminMachinery page
function confirmDeleteSeed(productId){
    if(confirm('Are you sure you want to delete this product?')){
        window.location.href='/seed/'+productId+'/delete';
    }
}

// Functions for the shop page that is rendered after a user successfully signs up
// Functions for showing the right1 tab on the adminFeeds page
function showShopRight1tab(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    right_1.style.display="flex";
    openTab.style.display="none";
    closeTab.style.display="block";
}
function closeShopRight1tab(){
    let right_1=document.querySelector('.right-1');
    let openTab=document.querySelector('#openTab');
    let closeTab=document.querySelector('#closeTab');
    right_1.style.display="none";
    openTab.style.display="block";
    closeTab.style.display="none";
}

// Functions for handling the navigation tabs
function showFeeds(){
    let feeds=document.querySelector('.Feed');
    feeds.style.display="block";
}
// Handling the "Add to Cart" functionality
$(document).ready(function(){
    $('.add-to-cart').click(function(){
        const productId=$(this).data('product-id');

        $.ajax({
            url: '/add-to-cart',
            method: 'POST',
            data: {productId: productId},
            success: function(response){
                if(response.success){
                    const cartCount=parseInt($('#cart-count').text());
                    $('#cart-count').text(cartCount+1);
                }else{
                    alert('Error adding to cart');
                }
            }
        })
    })
})
