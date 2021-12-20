<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use Freshbitsweb\LaravelCartManager\Models\Cart;
use App\Models\User;
use App\Models\Order;
use App\Models\Wallet;
use App\Models\OrderItem;
use App\Models\Address;
use Illuminate\Support\Facades\DB;
use App\Models\DeliveryMethod;
class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::guard('api')->user();
        if ($user &&  $user->is_admin == 1) {
             return $next($request);
        }

        return redirect('home')->with('error','You cannot access admin panel');
    }
    
}
