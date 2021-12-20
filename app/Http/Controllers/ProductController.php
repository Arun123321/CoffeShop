<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
class ProductController extends Controller
{




    /**
     * Create a new AuthController instance.
     * 
     * @return void
     */
    public function __construct() {
        $this->middleware('api');
    }
 
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
    public function get($id)
    {
        $user = Product::find($id);
  return response()->json(['message' => 'Success','data'=>$user]);
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
    public function update(Request $request)
    {
       
        $product = Product::find($request->id);
         $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
           'price' =>'required'
        ]);
 if($validator->fails()){
              $errors='';
            foreach ($validator->errors()->getMessages() as $key => $value) {
//$errors+=$errors.$value.',';
              $errors .=ucfirst($key).'-'.$value[0].' ,';
            }

           return response()->json($errors, 422);
        }
       

$product->name = $request->name;
$product->description = $request->description;
$product->price = $request->price;
if($product->save())
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
