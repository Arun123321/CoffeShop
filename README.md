<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>
<h3> Coffee Shop</h3>
<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Coffee Shop 

CoffeShop is a web application developed using Laravel + React JS

##Steps to install

1.Copy the files to your web root folder  
 
 1.1 Run **sudo chown -R $USER:www-data storage** then Run **chmod -R 775 storage**  For setting permission for writing & reading by www-data
 


2.Run **composer install  --ignore-platform-reqs**


3.Run **npm install**

4.create your database & update .env file with all details

5. Run **php artisan key:generate**

6.Run **php artisan migrate**

7.Run  **php artisan db:seed --class=UserSeeder**

8. Open file in /resources/js/App.js   & modify line with  **Router basename="/CoShop** Change **CoShop** to your laravel root folder name (project folder)
    
    
             ** Done**



