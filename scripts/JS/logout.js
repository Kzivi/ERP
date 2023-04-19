let expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() -1);
document.cookie = "erp_permission=; expires=" + expirationDate.toUTCString() + "; path=/";
document.cookie = "erp_usermail=; expires=" + expirationDate.toUTCString() + "; path=/";
window.location.assign("index.html");