<?php

namespace App\Http\Controllers;

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

class OrderController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       
       $orders = Order::all();
  return response()->json(['message' => 'Success','data'=>$orders]);
    }
 /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getmyindex()
    {

          $user = Auth::guard('api')->user();


       $orders = Order::where('user_id',"=", $user->id)->get();

       
  return response()->json(['message' => 'Success','data'=>$orders]);
    }



 /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function get($id)
    {
        $order = Order::find($id);

  return response()->json(['message' => 'Success','data'=>$order]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        
     $orderItems=[];
     $data=cart()->items();
       $dataCartMain=cart()->data();
     $Order=new Order;
    $user = Auth::guard('api')->user();
     $Order->user_id=  $user->id;
      $Order->subtotal= $dataCartMain['subtotal'];

     $Order->status= 0;
  $Order->payment= $request->payment;
  $Order->save();
    foreach ($data as  $value) {
        $OItem= new orderItem;
         $OItem->product_id=$value['modelId'];
          $OItem->name=$value['name'];
          $OItem->price=$value['price'];
            $OItem->quantity=$value['quantity'];
        $orderItems[]=$OItem;
    }

  
 $Order->orderItems()->saveMany($orderItems);
 cart()->clear();
 //$Order->save();
 return response()->json([
              'message' => 'success',
            
            
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function changestatus(Request $request)
    {    $user = Auth::guard('api')->user();

if($user->is_admin!=1)
{
      return response()->json([
              'message' => 'Unauthenticated',
            
            
        ]);
}


        $order = Order::find($request->id);
        $message='Order Cancelled';

if($request->status==3)
{
     $wallet = Wallet::where('user_id', $order->user_id)->first();
        if($wallet==null)
        {
            Wallet::create(['balance'=>$order->subtotal,'user_id'=> $order->user_id]);
            $wallet = Wallet::where('user_id', $order->user_id)->first();
        }
        else
         {$wallet->balance = $wallet->balance+$order->subtotal;}
         $message='Order Cancelled & Money Refunded to wallet';
}
        $order->status=$request->status;

        if($order->save())
        {
             return response()->json([
              'message' => $message,
            
            
        ]);
        }
        else
        {
             return response()->json([
              'message' => 'error',
            
            
        ],422);
        }
    }
        /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function changestatusself(Request $request)
    {
        $order = Order::find($request->id);
 $message='Order Cancelled';
         $user = Auth::guard('api')->user();
if($request->status==3 && $order->payment=='Wallet')
{
     $wallet = Wallet::where('user_id', $user->id)->first();
        if($wallet==null)
        {
            Wallet::create(['balance'=>$order->subtotal,'user_id'=>$user->id]);
            $wallet = Wallet::where('user_id', $user->id)->first();
        }
        else
         {$wallet->balance = $wallet->balance+$order->subtotal;}
     $wallet->save();
        $message='Order Cancelled & Rs '.$order->subtotal.' INR is  Refunded to wallet';
}
        $order->status=$request->status;
        if($order->save())
        {
             return response()->json([
              'message' => $message,
            
            
        ]);
        }
        else
        {
             return response()->json([
              'message' => 'error',
            
            
        ],422);
        }
    }
    

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = Auth::guard('api')->user();

if($user->is_admin!=1)
{
      return response()->json([
              'message' => 'Unauthenticated',
            
            
        ]);
}
          $order = Order::find($id);

        if($order->delete())
{

     return response()->json(['message' => 'Success']);
}
else
{
     return response()->json(['message' => 'Error'],422);
}
    }
}
