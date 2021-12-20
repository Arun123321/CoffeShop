<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wallet;
use Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
class WalletController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = Product::all();
  return response()->json(['message' => 'Success','data'=>$users]);
    }
  /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function get()
    {


            $user = Auth::guard('api')->user();

        $wallet = Wallet::where('user_id', $user->id)->first();
           if($wallet!=null)
           {
            return response()->json(['message' => 'Success','data'=>$wallet]);
           }
  return response()->json(['message' => 'Success','data'=>0],422);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        
        if(Product::create($request->all()))
        {
            return response()->json(['message' => 'Success']);
        }
        else
        {
            return response()->json(['message' => 'Error'],422);
        }
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
    public function add(Request $request)
    {
          $user = Auth::guard('api')->user();

         $validator = Validator::make($request->all(), [
            'balance' => 'integer|min:0',
        ]);
 if($validator->fails()){
              $errors='';
            foreach ($validator->errors()->getMessages() as $key => $value) {
//$errors+=$errors.$value.',';
              $errors .=ucfirst($key).'-'.$value[0].' ,';
            }

           return response()->json($errors, 422);
        }
        $wallet = Wallet::where('user_id','=', $user->id)->first();
        if($wallet==null)
        {
            Wallet::create(['balance'=>$request->balance,'user_id'=>$user->id]);
            $wallet = Wallet::where('user_id','=', $user->id)->first();
        }
        else
        {$wallet->balance = $wallet->balance+$request->balance;}

//

if($wallet->save())
{

     return response()->json(['message' => 'Success']);
}
else
{
     return response()->json(['message' => 'Error'],422);
}

    }




  /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function withdraw(Request $request)
    {
          $user = Auth::guard('api')->user();
        $wallet = Wallet::where('user_id', $user->id)->first();
         $validator = Validator::make($request->all(), [
            'balance' => 'integer|min:0',
        ]);
 if($validator->fails()){
              $errors='';
            foreach ($validator->errors()->getMessages() as $key => $value) {
//$errors+=$errors.$value.',';
              $errors .=ucfirst($key).'-'.$value[0].' ,';
            }

           return response()->json($errors, 422);
        }
       

$wallet->balance = $wallet->balance-$request->balance;

if($wallet->save())
{

     return response()->json(['message' => 'Success']);
}
else
{
     return response()->json(['message' => 'Error'],422);
}

    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $product = Product::find($request->id);
       
        if($product->delete())
{

     return response()->json(['message' => 'Success']);
}
else
{
     return response()->json(['message' => 'Error'],422);
}
    
}
}
