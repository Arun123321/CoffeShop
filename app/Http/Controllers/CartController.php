<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use Freshbitsweb\LaravelCartManager\Models\Cart;
use App\Models\User;

use Illuminate\Support\Facades\DB;


class CartController extends Controller
{
	
	
	
	
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
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
		
		try
		{
       cart()->setQuantityAt($request->id, $request->quantity);
	   
	     $data=cart()->data();
		 
		$collectionItems = collect(cart()->items())->map(function ($item,$key) {
			//collect($item)->prepend($key, 'itemId');
        return collect($item)->prepend($key, 'itemId');
           });
        $data['id']=cart()->Id();
$data['items']= $collectionItems;
			 return response()->json([
              'message' => "Success",
			  'data'=> $data
            
			
        ]);
    }	catch(\Exception $e)
		{
			return response()->json([
              'message' => $e->getMessage(),
            
			
        ],422);
		}
	}
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
		try
		{
		if(cart()->removeAt($id))
		{
			 $data=cart()->data();
		$collectionItems = collect(cart()->items())->map(function ($item,$key) {
        return collect($item)->prepend($key, 'itemId');
           });
		   $data['items']= $collectionItems;
		   return response()->json([
              'message' => "Success",
			  'data'=> $data
            
			
        ]);
		}
		else
			
			{
				return response()->json([
              'message' => "Error",
            
			
        ],422);
		
			}
		}
		catch(\Exception $e)
		{
			return response()->json([
              'message' => $e->getMessage(),
            
			
        ],422);
		}
    }
	 /**
     * Add a product to cart
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function Add(Request $request)
    {
		try
		{
            $product =Product::find($request->id);
            $preCart=Cart::find(cart()->Id());
            $wasEmpty=cart()->isEmpty();
           
            if( $wasEmpty)
            { 
              $cart = Product::addToCart($request->id,$request->quantity);
            
            }
            else

            {
             
             

            
 if(!$wasEmpty)
            {
               $cart = Product::addToCart($request->id,$request->quantity);
            }

            }
         
           
          
            
        $user = Auth::guard('api')->user();
        
		//cart()->setUser($user->id);
        $data=cart()->data();
		 
		$collectionItems = collect(cart()->items())->map(function ($item,$key) {
        return collect($item)->prepend($key, 'itemId');
           });
		   $collectionItems2 =   $collectionItems->map(function ($item,$key) {
        return collect($item)->prepend($key, 'itemId');
           });
$data['items']= $collectionItems;
			 return response()->json([
              'message' => "Success",
			  'data'=> $data
            
			
        ]);
		
    }
		catch(\Exception $e)
		{
			return response()->json([
              'message' => $e->getMessage(),
            
			
        ],422);
		}
	}
	
	   public function get(Request $request)
    {
		
		try
		{
       
	   
	     $data=cart()->data();
		 
		$collectionItems = collect(cart()->items())->map(function ($item,$key) {
			//collect($item)->prepend($key, 'itemId');
        return collect($item)->prepend($key, 'itemId');
           });
         $data['id']=cart()->Id();
$data['items']= $collectionItems;
			 return response()->json([
              'message' => "Success",
			  'data'=> $data
            
			
        ]);
    }	catch(\Exception $e)
		{
			return response()->json([
              'message' => $e->getMessage(),
            
			
        ],422);
		}
	}


    


   
    
}



 